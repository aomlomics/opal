# Use the tourmaline image as a parent image, which uses the official QIIME 2 image
FROM aomlomics/tourmaline:latest

# Label information
LABEL maintainer="Carter Rollins"
LABEL description="Docker image to build the Opal server for handling Tourmaline/QIIME2 requests."

# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED=True

# Install Python dependencies
COPY requirements.txt app/requirements.txt
RUN pip install --no-cache-dir -r app/requirements.txt

# Copy local code to the container image
WORKDIR /app
COPY . ./

# Generate prisma client
RUN prisma generate --generator py

# Run the web service on container startup on port 8080, as per Google Cloud Run's Container runtime contract.
# Here we use gunicorn with the uvicorn ASGI worker class.
CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 -k uvicorn.workers.UvicornWorker main:app