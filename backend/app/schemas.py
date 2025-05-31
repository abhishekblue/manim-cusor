from pydantic import BaseModel, Field, field_validator, model_validator
from typing import List, Literal, Optional

class AddTextArgs(BaseModel):
    content: str
    font_size: int = 48
    color: str = "YELLOW"
    position: List[float] = [0, 0]
    @field_validator("content")
    @classmethod
    def content_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Text content cannot be empty or blank")
        return v

class AddLatexArgs(BaseModel):
    latex: str
    color: str = "YELLOW"
    position: List[float] = [0, 0]

class PlotGraphArgs(BaseModel):
    function: str
    x_range: List[float]
    y_range: Optional[List[float]] = None
    color: str = "YELLOW"

class SetAxesArgs(BaseModel):
    x_range: List[float]
    y_range: List[float]
    color: str
    label_ticks: bool = False
    x_step: float = None

class AddShapeArgs(BaseModel):
    object_name: str
    shape: Literal["rectangle", "circle", "ellipse", "triangle", "square"]
    width: Optional[float] = None
    height: Optional[float] = None
    radius: Optional[float] = None
    color: str = "WHITE"
    position: List[float] = Field(default_factory=lambda: [0, 0])

class AddCircleArgs(BaseModel):
    radius: float
    color: str = "YELLOW"
    position: List[float] = [0, 0]

class MoveObjectArgs(BaseModel):
    object_name: str
    to_position: List[float]
    duration: float = 1.0

class FadeInArgs(BaseModel):
    object_name: str
    duration: float = 1.0

class FadeOutArgs(BaseModel):
    object_name: str
    duration: float = 1.0

class WaitArgs(BaseModel):
    duration: float

class TransformObjectArgs(BaseModel):
    from_object: str
    to_object: str
    duration: float = 1.0

class RotateObjectArgs(BaseModel):
    object_name: str
    angle: float
    duration: float = 1.0

class ScaleObjectArgs(BaseModel):
    object_name: str
    scale_factor: float
    duration: float = 1.0

class SetBackgroundColorArgs(BaseModel):
    color: str

class GroupObjectsArgs(BaseModel):
    object_names: List[str]
    group_name: str

class SetColorArgs(BaseModel):
    object_name: str
    color: str

class DrawArrowArgs(BaseModel):
    start: List[float]
    end: List[float]
    color: str = "YELLOW"

class CreateNumberLineArgs(BaseModel):
    range: List[float]
    tick_frequency: float = 1.0
    color: str = "YELLOW"

class AnimateTextChangeArgs(BaseModel):
    object_name: str
    new_text: str
    duration: float
    color: Optional[str] = "WHITE"
    font_size: Optional[int] = 48

class LabelAxesArgs(BaseModel):
    x_label: str
    y_label: str
    color: str = "WHITE"

class AddAxisMarkingsArgs(BaseModel):
    x_ticks: dict  
    y_ticks: dict

class SurroundWithShapeArgs(BaseModel):
    shape: Literal["rectangle", "sqaure"] = "rectangle"
    content_name: str = Field(..., description="Name of the MObject to surround")
    shape_color: str = "YELLOW"
    buff: float = 0.3

    @model_validator(mode="before")
    @classmethod
    def resolve_aliases(cls, data):
        if "content_name" not in data:
            for alt in ("target", "object_name"):
                if alt in data:
                    data["content_name"] = data[alt]
        return data