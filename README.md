# Manim-Powered AI Animation Tool

A FastAPI-based backend and React frontend to convert natural language prompts into **3Blue1Brown-style animations** using the [Manim](https://www.manim.community/) library. Built with OpenAI's GPT model via OpenRouter API.

## Features

- Generate math visualizations from plain English.
- Automatic tool_call generation using LLM.
- Supports 20+ animation tools (text, LaTeX, graphs, shapes, transforms, etc.)
- Exposes Manim videos and generated code via static routes.
- React + Tailwind frontend for easy UX (WIP).

---

## How It Works

1. Prompt Input: A user provides a natural language prompt.
2. Classification: Prompt is checked for complexity.
3. LLM Interaction:
   - If *simple*, a direct Manim Python script is generated.
   - If *complex*, LLM generates a list of `tool_calls` in JSON.
4. Code Generation: Each tool_call is converted into valid Manim Python code.
5. Rendering: Code is saved and rendered using `manim`.
6. Result: A video (`.mp4`) and code file (`.py`) are returned via API.

---

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app, LLM calls, route handling
│   ├── executor.py          # Validation, scene builder, Manim subprocess call
│   ├── dispatcher.py        # tool -> code generator mapping
│   ├── code_generators.py   # Python code templates per tool
│   ├── registry.py          # Tool schema + validation
│   ├── schemas.py           # Pydantic models for all tool args
│   ├── prompt.py            # LLM system prompts
│   └── render/
│       ├── code/            # .py files generated
│       └── output/videos/   # .mp4 output files
frontend/
├── app/
│   ├── page.tsx             # Main UI with prompt input
│   └── components/page.tsx # Input form logic
```

---

## Getting Started

### Backend Setup (FastAPI + OpenRouter + Manim)

```bash
cd backend/app
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Create a `.env` file:
```bash
OPENAI_API_KEY=your-openrouter-api-key
```

Start the server:
```bash
uvicorn main:app
```

Make sure you have [Manim CE](https://docs.manim.community/en/stable/installation.html) installed and accessible in your PATH.

### Frontend Setup (Next.js + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

---

## API Usage

### POST /generate

**Request Body:**
```json
{
  "prompt": "Plot sine wave from -2π to 2π and label axes"
}
```

**Response:**
```json
{
  "video_path": "/videos/<uuid>.mp4",
  "py_path": "/code/<uuid>.py"
}
```

---

## Supported Tools

Includes but not limited to:

- `add_text`, `add_latex`
- `plot_graph`, `set_axes`, `label_axes`, `add_axis_markings`
- `add_shape`, `move_object`, `fade_in`, `fade_out`
- `wait`, `transform_object`, `rotate_object`, `scale_object`
- `group_objects`, `draw_arrow`, `set_color`
- `create_number_line`, `animate_text_change`, `surround_with_shape`
- `set_background_color`

Full argument validation handled via Pydantic models in `schemas.py`.

---

## Example Prompts

> "Show 'Hello World' in red"

> "Plot cosine graph with yellow axes and custom ticks"

> "Create a rectangle and transform it into a circle after 2 seconds"

---

## Credits

Inspired by [3Blue1Brown](https://www.3blue1brown.com/) and powered by [Manim Community Edition](https://github.com/ManimCommunity/manim). Prompt classification and tool_call generation via LLM (OpenAI GPT-4o-mini).

---

## Troubleshoot

You might have to use these commands, if you face error while running `pip install -r requirements.txt` during installation on `pangocairo`.
```
sudo apt install -y build-essential libcairo2-dev

sudo apt install -y libpango1.0-dev libgirepository1.0-dev

sudo apt install -y python3-dev pkg-config

```

## License

MIT License. See `LICENSE` file.