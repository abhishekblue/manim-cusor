from .code_generators import *

code_generators = {
    "plot_graph": gen_plot_graph,
    "add_text": gen_add_text,
    "add_shape": gen_add_shape,
    "add_axis_markings": gen_add_axis_markings,
    "add_latex": gen_add_latex,
    "fade_in": gen_fade_in,
    "fade_out": gen_fade_out,
    "wait": gen_wait,
    "move_object": gen_move_object,
    "transform_object": gen_transform_object,
    "rotate_object": gen_rotate_object,
    "scale_object": gen_scale_object,
    "set_background_color": gen_set_background_color,
    "group_objects": gen_group_objects,
    "set_color": gen_set_color,
    "draw_arrow": gen_draw_arrow,
    "create_number_line": gen_create_number_line,
    "animate_text_change": gen_animate_text_change,
    "set_axes": gen_set_axes,
    "label_axes": gen_label_axes,
    "surround_with_shape": gen_surround_with_shape,
    "highlight": gen_surround_with_shape,
}

def generate_manim_code(tool_call):
    tool = tool_call.tool
    args = tool_call.args

    generator = code_generators.get(tool)
    if not generator:
        return f"# Unsupported tool: {tool}"

    return generator(args)
