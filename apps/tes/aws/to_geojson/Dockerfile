FROM amazonlinux:2

RUN yum update -y && \
    yum install -y \
    git \
    gcc \
    gcc-c++ \
    make \
    zip \
    unzip \
    tar \
    wget \
    gzip \
    openssl-devel \
    bzip2-devel \
    libffi-devel \
    proj \
    proj-devel \
    geos \
    geos-devel \
    gdal \
    gdal-devel \
    expat \
    expat-devel \
    python3 \
    python3-devel && \
    yum clean all

RUN python3 -m ensurepip
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install awslambdaric

WORKDIR /var/task

COPY requirements.txt .
COPY to_geojson.py .
COPY lambda_function.py .

RUN pip3 install -r requirements.txt

ENTRYPOINT [ "/usr/bin/python3", "-m", "awslambdaric" ]

CMD [ "lambda_function.handler" ]