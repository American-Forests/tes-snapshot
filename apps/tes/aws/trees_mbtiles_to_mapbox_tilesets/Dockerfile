FROM public.ecr.aws/lambda/python:3.8

WORKDIR /var/task

# Copy the Lambda function code and the requirements.txt into the container
COPY lambda_function.py ./
COPY requirements.txt ./

# Install necessary Python packages from the requirements.txt
RUN pip install -r requirements.txt 

CMD ["lambda_function.handler"]
