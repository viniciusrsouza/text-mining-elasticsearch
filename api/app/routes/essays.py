from fastapi import APIRouter, Depends

from app.schemas.essays import EssayQueryRequest
from app.services.elasticsearch import ElasticSearchService

router = APIRouter()


@router.get("/essays")
async def get_essays(data: EssayQueryRequest = Depends()):
    es = ElasticSearchService()
    return es.search("essays", data)
