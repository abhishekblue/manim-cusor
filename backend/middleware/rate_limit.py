from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse

request_counts = {}

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        ip = request.client.host
        x_auth = request.headers.get("x-auth")

        if x_auth == "true":
            is_logged_in = True
        else:
            is_logged_in = False

        if is_logged_in:
            limit = 20
        else:
            limit = 1

        if request.url.path == "/generate":
            if ip in request_counts:
                current_count = request_counts[ip]
            else:
                current_count = 0

            if current_count >= limit:
                if is_logged_in:
                    message = "Limit reached. Buy more."
                else:
                    message = "Login to generate more videos"
                return JSONResponse(status_code=403, content={"detail": message})

        response = await call_next(request)
        return response
