import elasticsearch
import os

from app.schemas.essays import EssayQueryRequest, EssayQueryResponse, Essay


class ElasticSearchService:
    def __init__(self):
        self.ES_HOST = os.getenv("ES_HOST")
        self.ES_PORT = os.getenv("ES_PORT")
        self.ES_URL = f"https://{self.ES_HOST}:{self.ES_PORT}"
        self.ES_USER = os.getenv("ES_USER")
        self.ES_PASSWORD = os.getenv("ES_PASSWORD")

        self.es = elasticsearch.Elasticsearch(
            [self.ES_URL],
            http_auth=(self.ES_USER, self.ES_PASSWORD),
            verify_certs=False,
            timeout=60,
        )

    def search(self, index: str, data: EssayQueryRequest):
        # take two parameters, index name and the query
        query = {
            "from": data.offset,
            "size": data.limit,
            "query": {"match": {"essay": data.query}},
            "highlight": {"fields": {"essay": {}}},
        }

        results = self.es.search(index=index, body=query)

        return self.build_response(results, data)

    def build_response(self, response, data: EssayQueryRequest):
        count = response["hits"]["total"]["value"]
        if count == 0:
            return EssayQueryResponse(
                count=count, next=None, results=[], debug=dict(**response)
            )

        results = [Essay(**h["_source"], highlight=h["highlight"]["essay"]) for h in response["hits"]["hits"]]

        next_offset = data.offset + data.limit
        if next_offset >= count:
            return EssayQueryResponse(
                count=count, next=None, results=results, debug=dict(**response)
            )

        return EssayQueryResponse(
            count=count,
            next=EssayQueryRequest(
                query=data.query,
                limit=data.limit,
                offset=next_offset,
            ),
            results=results,
            debug=dict(**response),
        )
