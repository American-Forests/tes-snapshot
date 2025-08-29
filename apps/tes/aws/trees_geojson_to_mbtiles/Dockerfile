FROM public.ecr.aws/c3a9a6a1/tippecanoe-python-lambda AS BASE

WORKDIR /var/task

# Copy over required files
COPY requirements.txt .
COPY lambda_function.py .

# Install the specified packages
RUN pip install -r requirements.txt

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_function.handler" ]