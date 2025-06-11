from fastapi.responses import JSONResponse
from middleware.rate_limit import RateLimitMiddleware, request_counts
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import HTTPException, Request
from dotenv import  load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI
import traceback, os, json
from openai import OpenAI
from .db import supabase
from .executor import *
from .registry import *
from .schemas import *
from .prompt import *

load_dotenv()

app = FastAPI()

ENV = os.getenv("ENVIRONMENT", "local")

if ENV == "production":
    ALLOWED_ORIGINS = ["https://renderconcepts.com", "https://www.renderconcepts.com"]
else:
    ALLOWED_ORIGINS = ["http://localhost:3000", "http://192.168.1.6:3000"]

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENAI_API_KEY"),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RateLimitMiddleware)

class ToolCall(BaseModel):
    tool: str
    args: dict

class ToolCallRequest(BaseModel):
    tool_calls: list[ToolCall]

class Prompt(BaseModel):
    prompt: str


def classify_prompt(prompt: str) -> str:
    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a classifier that only answers 'simple' or 'complex'."
            },
            {
                "role": "user",
                "content": f"Classify this Manim animation prompt:\n\n\"{prompt}\"\n\nAnswer only with 'simple' or 'complex'."
            }
        ],
        max_tokens=100,
        temperature=0
    )
    return response.choices[0].message.content.strip().lower()

def is_complex_prompt(prompt: str) -> bool:
    complex_keywords = [
        "plot", "graph", "function", "equation", "axis", "axes", "sine", "cosine", "logarithmic",
        "matrix", "vector field", "integral", "derivative", "parametric", "bar chart", "histogram"
    ]
    prompt_lower = prompt.lower()
    if any(keyword in prompt_lower for keyword in complex_keywords):
        return True
    elif len(prompt) > 80:
        return True
    else:
        return False


def get_tool_calls(prompt: str):
    try:
        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {
                "role": "system",
                "content": SYSTEM_PROMPT
                },
                
                {"role": "user", "content": prompt}
            ],
            temperature=0
            # max_tokens=1000
        )
        final_response = response.choices[0].message.content
        final_response = final_response.replace('\\', '\\\\')
        print("\n--- RAW TOOLCALL JSON ---")
        print(final_response)
        print("--- END ---\n")

        if not final_response:
            raise ValueError("Empty response from LLM")        
        try:
            tool_calls = json.loads(final_response)
        except json.JSONDecodeError:
            print("\n--- RAW LLM RESPONSE ---")
            print(final_response)
            print("--- END ---\n")
            raise ValueError("LLM response is not valid JSON")

        if not isinstance(tool_calls, list) or not all(
            isinstance(item, dict) and "tool" in item and "args" in item
            for item in tool_calls
        ):
            raise ValueError("LLM returned malformed tool_calls")

        return final_response

    except Exception as e:
        print(f"LLM ERROR: {e}")
        return None

def get_direct_manim_code(prompt: str) -> str:
    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT_FOR_DIRECT_CODE
            },
            {
                "role": "user",
                "content": prompt
            }
            
        ],
        temperature=0
    )
    # print (response.choices[0].message.content.strip())
    return response.choices[0].message.content.strip()

app.mount("/videos", StaticFiles(directory=os.path.abspath("render/output/videos")))
app.mount("/code", StaticFiles(directory=os.path.abspath("render/code")))

############################################################

@app.post("/generate")
def generate_video_from_prompt(payload: Prompt, request: Request):
    prompt = payload.prompt
    print(classify_prompt(prompt))
    try:
        if classify_prompt(prompt) == "complex" or is_complex_prompt(prompt):
            raw_json = get_tool_calls(prompt)
            tool_calls = json.loads(raw_json)
            video_path, py_path, error = process_tool_calls(tool_calls)
        else:
            code = get_direct_manim_code(prompt)
            video_path, py_path, error = save_and_render(code)
        
        if video_path is not None:
            ip = request.client.host
            request_counts[ip] = request_counts.get(ip, 0) + 1

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Generation failed: {e}")

    if error:
        raise HTTPException(status_code=400, detail=error)

    return {"video_path": video_path, "py_path": py_path}


@app.get("/usage")
def get_usage(request: Request):
    ip = request.client.host
    x_auth = request.headers.get("x-auth")

    if x_auth == "true":
        is_logged_in = True
    else:
        is_logged_in = False

    if is_logged_in:
        limit = 10
    else:
        limit = 3

    if ip in request_counts:
        used = request_counts[ip]
    else:
        used = 0

    remaining = limit - used
    if remaining < 0:
        remaining = 0

    if used >= limit:
        limit_reached = True
    else:
        limit_reached = False

    return JSONResponse(content={
        "used": used,
        "limit": limit,
        "remaining": remaining,
        "limit_reached": limit_reached
    })



@app.post("/signup")
def handle_signup(request: Request):
    clerk_id = request.headers.get("x-user-id")
    if not clerk_id:
        raise HTTPException(status_code=400, detail="Missing Clerk ID")

    user = supabase.table("users").select("*").eq("clerk_id", clerk_id).single().execute()
    if user.data:
        return {"msg": "User already exists"}

    supabase.table("users").insert({
        "clerk_id": clerk_id,
        "credits": 10
    }).execute()

    return {"msg": "User created with 10 credits"}
