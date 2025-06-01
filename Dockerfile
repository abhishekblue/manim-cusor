FROM node:18-bullseye AS base

WORKDIR /app

FROM base AS backend

COPY backend/requirements.txt ./backend/requirements.txt
RUN apt-get update && apt-get install -y python3-pip ffmpeg
RUN pip3 install -r backend/requirements.txt

COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

FROM base AS final

WORKDIR /app

COPY --from=backend /usr/local/lib/python3.10 /usr/local/lib/python3.10
COPY backend/ ./backend/
COPY --from=backend /usr/local/bin/uvicorn /usr/local/bin/uvicorn

COPY --from=frontend /app/frontend/.next /app/frontend/.next
COPY --from=frontend /app/frontend/public /app/frontend/public
COPY --from=frontend /app/frontend/package*.json /app/frontend/

COPY start.sh ./start.sh

RUN chmod +x ./start.sh

RUN npm install

RUN apt-get update && apt-get install -y ffmpeg

EXPOSE 3000

CMD ["./start.sh"]
