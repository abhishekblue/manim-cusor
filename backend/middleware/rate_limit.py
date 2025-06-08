from fastapi import FastAPI, Request, HTTPException
from collections import defaultdict

request_counts = defaultdict(int)
app = FastAPI()

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    x_auth = request.headers.get("x-auth")

    if x_auth == "true":
        is_logged_in = True
    else:
        is_logged_in = False

    if is_logged_in:
        limit = 5
    else:
        limit = 2

    if request.url.path == "/generate":
        request_counts[ip] += 1

        if request_counts[ip] > limit:
            if not is_logged_in:
                msg = "Login to generate more videos"
            else:
                msg = "Limit reached. Buy more."

            raise HTTPException(status_code=403, detail=msg)

    response = await call_next(request)
    return response
