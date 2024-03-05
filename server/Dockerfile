# Use the tourmaline image as a parent image, which uses the official QIIME 2 image
FROM aomlomics/tourmaline:latest

# Label information
LABEL maintainer="Carter Rollins"
LABEL description="Docker image to build the Opal server for handling Tourmaline/QIIME2 requests."

# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True

# Determine whether to run the dev or prod build scripts. If no argument is given, it defaults to prod
ARG mode
RUN if [ "$mode" = "dev" ] ; then apt-get update && apt-get install -y screen ; fi
ENV MODE ${mode}

# Install production dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy local code to the container image
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Generate prisma client
RUN prisma generate --generator py

# We must listen on port $PORT, as per Google Cloud Run's Container runtime contract
ENV PORT 8080

# Run the web service on container startup. Here we use gunicorn with the uvicorn ASGI worker class
CMD exec bash docker/build${MODE}.sh
