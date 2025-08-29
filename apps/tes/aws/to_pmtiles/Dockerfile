# Use a standard Python base image
FROM python:3.8-slim

# Install tippecanoe and its dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libsqlite3-dev \
    zlib1g-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install tippecanoe
RUN git clone https://github.com/felt/tippecanoe.git /tmp/tippecanoe-src --depth 1

# Create a directory and copy in all files
WORKDIR /tmp/tippecanoe-src

# Build tippecanoe
RUN make && make install

# Test tippecanoe
RUN make test

WORKDIR /app

COPY requirements.txt .
COPY main.py .

# Install the specified packages
RUN pip install -r requirements.txt

# Set the entrypoint
ENTRYPOINT ["python", "main.py"]