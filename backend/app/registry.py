from typing import Union, Literal
from pydantic import BaseModel
from .schemas import *

tool_schemas = {
    "add_text": AddTextArgs,
    "add_latex": AddLatexArgs,
    "plot_graph": PlotGraphArgs,
    "set_axes": SetAxesArgs,
    "add_shape": AddShapeArgs,
    "move_object": MoveObjectArgs,
    "fade_in": FadeInArgs,
    "fade_out": FadeOutArgs,
    "wait": WaitArgs,
    "transform_object": TransformObjectArgs,
    "rotate_object": RotateObjectArgs,
    "scale_object": ScaleObjectArgs,
    "set_background_color": SetBackgroundColorArgs,
    "group_objects": GroupObjectsArgs,
    "set_color": SetColorArgs,
    "draw_arrow": DrawArrowArgs,
    "create_number_line": CreateNumberLineArgs,
    "animate_text_change": AnimateTextChangeArgs,
    "label_axes": LabelAxesArgs,
    "add_axis_markings": AddAxisMarkingsArgs,
    "surround_with_shape": SurroundWithShapeArgs,
}

class ToolCall(BaseModel):
    tool: Literal[
        "add_text", "add_latex", "plot_graph", "set_axes", "add_shape",
        "highlight_point", "move_object", "fade_in", "fade_out",
        "wait", "transform_object", "rotate_object", "scale_object",
        "set_background_color", "group_objects", "set_color", "draw_arrow",
        "create_number_line", "animate_text_change", "label_axes", "add_axis_markings",
        "surround_with_shape", "higlight"
    ]
    args: Union[
        AddTextArgs, AddLatexArgs, PlotGraphArgs, SetAxesArgs,
        AddShapeArgs, MoveObjectArgs,
        FadeInArgs, FadeOutArgs, WaitArgs, TransformObjectArgs,
        RotateObjectArgs, ScaleObjectArgs, SetBackgroundColorArgs,
        GroupObjectsArgs, SetColorArgs, DrawArrowArgs,
        CreateNumberLineArgs, AnimateTextChangeArgs, LabelAxesArgs, AddAxisMarkingsArgs,
        SurroundWithShapeArgs
    ]