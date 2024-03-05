echo "Starting gunicorn server..."
source .env
screen -S opalserver gunicorn --pid app.pid --bind :$PORT --workers 1 --threads 8 --timeout 0 -k uvicorn.workers.UvicornWorker main:app