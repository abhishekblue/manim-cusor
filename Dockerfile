FROM python:3.10-bullseye AS base

RUN apt-get update && apt-get install -y \
    curl ffmpeg python3-pip libcairo2-dev libpango1.0-dev pkg-config \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

WORKDIR /app

FROM base AS backend
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --upgrade pip && pip install -r backend/requirements.txt
COPY backend/ ./backend/

FROM base AS frontend
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm install && npm run build

FROM base AS final
WORKDIR /app

COPY --from=backend /usr/local /usr/local
COPY --from=backend /app/backend /app/backend

COPY --from=frontend /app/frontend/.next /app/frontend/.next
COPY --from=frontend /app/frontend/public /app/frontend/public
COPY --from=frontend /app/frontend/package*.json /app/frontend/

COPY start.sh ./start.sh
RUN chmod +x ./start.sh

WORKDIR /app/frontend
RUN npm install

WORKDIR /app
EXPOSE 3000
CMD ["./start.sh"]
