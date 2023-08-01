from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.essays import router as essays_router

app = FastAPI()


def create_app():
    app = FastAPI(
        title="Essays API",
        version="1.0.0",
    )

    app.include_router(
        essays_router, prefix="/api/v1", tags=["essays"], include_in_schema=True
    )

    origins = [
        "https://localhost:3000",
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()
