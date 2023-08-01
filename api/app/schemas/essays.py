from pydantic import BaseModel, Field

from typing import List, Optional


class EssayQueryRequest(BaseModel):
    query: str = Field(..., example="hello world")
    limit: int = Field(10, example=10)
    offset: int = Field(0, example=0)


class Essay(BaseModel):
    essay_id: int = Field(..., example=1)
    essay_set: int = Field(..., example=1)
    essay: str = Field(..., example="hello world")
    domain1_predictionid: Optional[int] = Field(..., example=1)
    domain2_predictionid: Optional[int] = Field(..., example=1)
    highlight: List[str]


class EssayQueryResponse(BaseModel):
    count: int
    next: Optional[EssayQueryRequest]
    results: List[Essay]
    debug: dict
