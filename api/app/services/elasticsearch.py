import elasticsearch
import os

class ElasticSearchService:
    def __init__(self):
        self.ES_HOST = os.getenv("ES_HOST")
        self.ES_PORT = os.getenv("ES_PORT")
        self.ES_USER = os.getenv("ES_USER")
        self.ES_PASSWORD = os.getenv("ES_PASSWORD")

        self.es = elasticsearch.Elasticsearch(
            [f"{self.ES_HOST}:{self.ES_PORT}"],
            http_auth=(self.ES_USER, self.ES_PASSWORD),
            scheme="https",
            verify_certs=False,
            timeout=60,
        )