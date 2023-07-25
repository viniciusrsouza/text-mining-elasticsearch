# fastapi

FROM python:3.8-slim-buster as base

WORKDIR /app
COPY requirements.txt /app

RUN pip install -r requirements.txt

FROM base as dev

COPY ./app /app
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]