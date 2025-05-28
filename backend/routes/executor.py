import os, textwrap, subprocess, uuid
from dispatcher import *
from registry import *
from schemas import *

RENDER_DIR = "render/code"
OUTPUT_DIR = "render/output"
os.makedirs(RENDER_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

import re

def format_latex_label(value: str) -> str:
    """Convert pi-ish strings to LaTeX and wrap in $...$ if needed."""
    if not isinstance(value, str):
        return value

    # Escape common patterns to LaTeX:
    value = re.sub(r'(?<!\\)pi', r'\\pi', value)  # "pi" → "\pi" (if not already escaped)
    value = re.sub(r'(?<!\\)frac', r'\\frac', value)  # "frac" → "\frac"
    
    # Wrap in $...$ only if it's not already
    if not (value.startswith("$") and value.endswith("$")):
        value = f"${value.strip('$')}$"

    return value

def validate_tool_call(raw_tool_call):
    tool = raw_tool_call["tool"]
    args_data = raw_tool_call["args"]

    # Fix individual label
    if "label" in args_data:
        args_data["label"] = format_latex_label(args_data["label"])

    # Fix tick labels
    for axis in ["x_ticks", "y_ticks"]:
        if axis in args_data:
            for k, v in args_data[axis].items():
                args_data[axis][k] = format_latex_label(v)

    # Normalize color
    if "color" in args_data:
        args_data["color"] = normalize_color(args_data["color"])

    # Schema parsing
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
        return None, str(e)

    return output_path, None

def process_tool_calls(raw_tool_calls):
    validated = []
    for raw_call in raw_tool_calls:
        try:
            validated.append(validate_tool_call(raw_call))
        except Exception as e:
            print(f"❌ Skipping invalid tool_call: {e}")
    
    if not validated:
        return None, "No valid tool_calls found"

    scene_code = build_scene_code(validated)
    return save_and_render(scene_code)
