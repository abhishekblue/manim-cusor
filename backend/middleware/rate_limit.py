from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

request_counts = {}

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        ip = request.client.host
        x_auth = request.headers.get("x-auth")

        is_logged_in = x_auth == "true"
        limit = 20 if is_logged_in else 5

        if request.url.path == "/generate":
            request_counts[ip] = request_counts.get(ip, 0) + 1
            if request_counts[ip] > limit:
                from fastapi.responses import JSONResponse
                return JSONResponse(
                    status_code=403,
                    content={"detail": "Login to generate more videos" if not is_logged_in else "Limit reached. Buy more."}
                )

        response = await call_next(request)
        return response
