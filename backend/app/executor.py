import os, textwrap, subprocess, uuid
from rapidfuzz import process
from .dispatcher import *
from .registry import *
from .schemas import *
import re

RENDER_DIR = "render/code"
OUTPUT_DIR = "render/output"
os.makedirs(RENDER_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


def format_latex_label(value: str) -> str:
    if not isinstance(value, str):
        return value

    value = re.sub(r'(?<!\\)pi', r'\\pi', value)
    value = re.sub(r'(?<!\\)frac', r'\\frac', value)
    if not (value.startswith("$") and value.endswith("$")):
        value = f"${value.strip('$')}$"

    return value

VALID_COLORS = ["RED", "BLUE", "GREEN", "YELLOW", "WHITE"]

COLOR_MAP = {
    "cyan": "BLUE",
    "magenta": "RED",
    "light green": "GREEN",
    "olive": "GREEN",
    "sky": "BLUE",
    "aqua": "BLUE",
    "grey": "WHITE",
}

def normalize_color(color: str) -> str:
    clean = color.strip().lower()
    if clean in COLOR_MAP:
        return COLOR_MAP[clean]
    match, score, _ = process.extractOne(clean, [c.lower() for c in VALID_COLORS])
    if score >= 80:
        return match.upper()
    raise ValueError(f"Unrecognized color: '{color}' (score: {score})")

def validate_tool_call(raw_tool_call):
    tool = raw_tool_call["tool"]
    args_data = raw_tool_call["args"]

    # Auto-fill default axis labels if missing
    if tool == "label_axes":
        args_data.setdefault("x_label", "x")
        args_data.setdefault("y_label", "y")
        args_data.setdefault("color", "WHITE")

    # Format LaTeX-like labels
    if "label" in args_data:
        args_data["label"] = format_latex_label(args_data["label"])

    for axis in ["x_ticks", "y_ticks"]:
        if axis in args_data:
            axis_data = args_data[axis]

            # Case 1: {"values": [...], "labels": [...]}
            if isinstance(axis_data, dict) and "values" in axis_data and "labels" in axis_data:
                args_data[axis] = {
                    float(k): format_latex_label(v)
                    for k, v in zip(axis_data["values"], axis_data["labels"])
                }

            # Case 2: {"locations": [...]} — fallback, use numbers as labels
            elif isinstance(axis_data, dict) and "locations" in axis_data:
                args_data[axis] = {
                    float(loc): format_latex_label(str(loc))
                    for loc in axis_data["locations"]
                }

            # Case 3: Already flat dict
            else:
                args_data[axis] = {
                    float(k): format_latex_label(v)
                    for k, v in axis_data.items()
                }

    # Normalize color if present
    if "color" in args_data:
        args_data["color"] = normalize_color(args_data["color"])

    # Schema validation
    args_class = tool_schemas.get(tool)
    if not args_class:
        raise ValueError(f"Unsupported tool: {tool}")

    args = args_class.parse_obj(args_data)
    return ToolCall(tool=tool, args=args)


def build_scene_code(validated_calls):
    code_lines = [generate_manim_code(call) for call in validated_calls]
    indented_code = textwrap.indent("\n\n".join(code_lines), "        ")

    return f"""from manim import *
import math

class AutoScene(Scene):
    def construct(self):
{indented_code}
        self.wait(1)
"""

def save_and_render(scene_code):
    uid = str(uuid.uuid4())
    py_path = os.path.join(RENDER_DIR, f"{uid}.py")
    output_path = os.path.join(OUTPUT_DIR, f"{uid}.mp4")

    with open(py_path, "w", encoding="utf-8") as f:
        f.write(scene_code)

    try:
        subprocess.run([
            "manim", py_path, "AutoScene", "-ql", "--output_file", f"{uid}.mp4",
            "--media_dir", OUTPUT_DIR
        ], check=True, shell=True, env=os.environ.copy(), creationflags=subprocess.CREATE_NEW_PROCESS_GROUP)
    except subprocess.CalledProcessError as e:
        return None, None, str(e)

    return output_path, py_path, None


def process_tool_calls(raw_tool_calls):
    validated = []
    for raw_call in raw_tool_calls:
        try:
            validated.append(validate_tool_call(raw_call))
        except Exception as e:
            print(f"❌ Skipping invalid tool_call: {e}")
    
    if not validated:
        return None

    scene_code = build_scene_code(validated)
    output_path, py_path, error = save_and_render(scene_code)
    return output_path, py_path, error
