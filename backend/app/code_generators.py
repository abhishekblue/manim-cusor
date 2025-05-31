import math
from click import wrap_text

def to_vec3(pos):
    if not pos:
        return [0, 0, 0]
    if isinstance(pos, list):
        if len(pos) == 2:
            return [pos[0], pos[1], 0]
        if len(pos) == 3:
            return pos
    raise ValueError(f"Invalid position format: {pos}")


def gen_set_axes(args):
    x_step = (
        args.x_step
        if hasattr(args, "x_step") and args.x_step
        else (args.x_range[1] - args.x_range[0]) / 4
    )
    return (
        f"axes = Axes(\n"
        f"    x_range=[{args.x_range[0]}, {args.x_range[1]}, {x_step}],\n"
        f"    y_range=[{args.y_range[0]}, {args.y_range[1]}],\n"
        f"    axis_config={{'color': {args.color}}}\n"
        f")\n"
        f"self.play(FadeIn(axes), run_time=1)"
    )


def gen_plot_graph(args):
    safe_funcs = [name for name in dir(math) if callable(getattr(math, name))]
    func = args.function.strip()

    if any(f in func and f"math.{f}" not in func for f in safe_funcs):
        for f in safe_funcs:
            func = func.replace(f"{f}(", f"math.{f}(")

        return (
            f"graph = axes.plot(lambda x: {func}, "
            f"x_range={args.x_range}, color={args.color})\n"
            f"self.play(Create(graph), run_time=2)"
        )
    else:
        return (
            f"graph = axes.plot(lambda x: {func}, "
            f"x_range={args.x_range}, color={args.color})\n"
            f"self.play(Create(graph), run_time=2)"
        )


def gen_label_axes(args):
    return (
        f"x_label = MathTex(\"{args.x_label}\", font_size=36, color={args.color})\n"
        f"y_label = MathTex(\"{args.y_label}\", font_size=36, color={args.color})\n"
        f"labels = axes.get_axis_labels(x_label=x_label, y_label=y_label)\n"
        f"self.play(FadeIn(labels), run_time=1)"
    )


def gen_add_axis_markings(args):
    x_ticks = {float(k): f"{v}" for k, v in args.x_ticks.items()}
    y_ticks = {float(k): f"{v}" for k, v in args.y_ticks.items() if float(k) != 0}
    return (
        f"tick_labels = axes.add_coordinates({x_ticks}, {y_ticks})\n"
        f"self.play(FadeIn(tick_labels), run_time=1)"
    )


def gen_add_text(args):
    content = wrap_text(args.content.strip(), width=40)
    font_size = args.font_size
    color = args.color
    pos = to_vec3(args.position)

    if "label" in args.__dict__ :
        font_size = 24
    else:
        font_size = args.font_size

    if len(content) > 80:
        return (
            f'text = Paragraph({repr(content)}, font_size={font_size}, color={color}, line_spacing=0.4)\n'
            f'text.set_max_width(6)\n'
            f'text.move_to({pos})\n'
            f'self.play(FadeIn(text), run_time=1)'
        )
    else:
        return (
            f'text = Text({repr(content)}, font_size={font_size}, color={color})\n'
            f'text.move_to({pos})\n'
            f'self.play(FadeIn(text), run_time=1)'
        )


def gen_add_shape(args):
    pos = to_vec3(args.position)
    name = args.object_name

    if args.shape == "square":
        width = 2 
        args.shape = "rectangle"
        args.width = args.width or width
        args.height = args.height or args.width

    if args.shape == "rectangle":
        return (
            f"{name} = Rectangle(width={args.width}, height={args.height}, color={args.color})\n"
            f"{name}.move_to({pos})\n"
            f"self.play(DrawBorderThenFill({name}), run_time=1)"
        )

    elif args.shape == "circle":
        return (
            f"{name} = Circle(radius={args.radius}, color={args.color})\n"
            f"{name}.move_to({pos})\n"
            f"self.play(DrawBorderThenFill({name}), run_time=1)"
        )

    elif args.shape == "ellipse":
        return (
            f"{name} = Ellipse(width={args.width}, height={args.height}, color={args.color})\n"
            f"{name}.move_to({pos})\n"
            f"self.play(DrawBorderThenFill({name}), run_time=1)"
        )
    
    elif args.shape == "triangle":
        return (
            f"{name} = RegularPolygon(n=3, color={args.color})\n"
            f"{name}.move_to({pos})\n"
            f"self.play(DrawBorderThenFill({name}), run_time=1)"
        )

    else:
        raise ValueError(f"Unsupported shape: {args.shape}")



def gen_add_latex(args):
    pos = to_vec3(args.position)
    latex_str = args.latex.replace("\\\\", "\\")
    if "\\n" in latex_str or "\n" in latex_str:
        return (
            f'latex = MathTex(r"""{latex_str}""", substrings_to_isolate=[], color={args.color})\n'
            f'latex.scale(0.7)\n'
            f'latex.move_to({pos})\n'
            f'self.play(FadeIn(latex), run_time=1)'
        )
    else:
        return (
            f'latex = MathTex(r"""{latex_str}""", color={args.color})\n'
            f'latex.move_to({pos})\n'
            f'self.play(FadeIn(latex), run_time=1)'
        )


def gen_surround_with_shape(args):
    if args.shape == "square":
        width = 3
        args.shape = "rectangle"
        args.width = args.width or width
        args.height = args.height or args.width
    
    shape_var = "surround_rect"
    surround_code = (
        f"{shape_var} = SurroundingRectangle({args.content_name}, color={args.shape_color}, buff={args.buff})"
    )
    return (
        f"{surround_code}\n"
        f"group = VGroup({shape_var}, {args.content_name})\n"
        f"self.play(FadeIn(group), run_time=1)"
    )


def gen_fade_in(args):
    return f"self.play(FadeIn({args.object_name}, run_time={args.duration}))"


def gen_fade_out(args):
    return f"self.play(FadeOut({args.object_name}, run_time={args.duration}))"


def gen_wait(args):
    return f"self.wait({args.duration})"


def gen_move_object(args):
    to_pos = to_vec3(args.to_position)
    return f"self.play({args.object_name}.animate.move_to({to_pos}), run_time={args.duration})"


def gen_transform_object(args):
    return f"self.play(Transform({args.from_object}, {args.to_object}, run_time={args.duration}))"


def gen_rotate_object(args):
    return f"self.play(Rotate({args.object_name}, angle={args.angle}), run_time={args.duration})"


def gen_scale_object(args):
    return f"self.play({args.object_name}.animate.scale({args.scale_factor}), run_time={args.duration})"


def gen_set_background_color(args):
    return f"self.camera.background_color = {args.color}"


def gen_group_objects(args):
    return f"{args.group_name} = VGroup({', '.join(args.object_names)})"


def gen_set_color(args):
    return f"self.play({args.object_name}.animate.set_color({args.color}))"


def gen_draw_arrow(args):
    start = to_vec3(args.start)
    end = to_vec3(args.end)
    return (
        f'arrow = Arrow(start={start}, end={end}, color={args.color})\n'
        f'self.play(Create(arrow), run_time=1)'
    )


def gen_create_number_line(args):
    return (
        f'number_line = NumberLine(x_range={args.range}, tick_size=0.1, tick_frequency={args.tick_frequency}, color={args.color})\n'
        f'self.play(Create(number_line), run_time=1)'
    )


def gen_animate_text_change(args):
    return (
        f"new_text = Text({repr(args.new_text)}, color={args.color}, font_size={args.font_size})\n"
        f"self.play(Transform({args.object_name}, new_text), run_time={args.duration})"
    )
