# -------- BASE IMAGE WITH ALL TOOLS --------
FROM python:3.10-bullseye AS base

# Install system dependencies only once
RUN apt-get update && apt-get install -y \
    curl ffmpeg python3-pip libcairo2-dev libpango1.0-dev pkg-config \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

WORKDIR /app

# -------- BACKEND BUILD --------
FROM base AS backend
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --upgrade pip && pip install -r backend/requirements.txt
COPY backend/ ./backend/

# -------- FRONTEND BUILD --------
FROM base AS frontend
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm install && npm run build

# -------- FINAL IMAGE --------
FROM base AS final
WORKDIR /app

# Copy backend code
COPY --from=backend /app/backend /app/backend

# Copy frontend build output
COPY --from=frontend /app/frontend/.next /app/frontend/.next
COPY --from=frontend /app/frontend/public /app/frontend/public
COPY --from=frontend /app/frontend/package*.json /app/frontend/

# Startup script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Install frontend deps for runtime (if SSR)
WORKDIR /app/frontend
RUN npm install

# Start both servers (backend + frontend)
WORKDIR /app
EXPOSE 3000
CMD ["./start.sh"]
