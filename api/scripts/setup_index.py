import polars as pl
import elasticsearch
import os

df = pl.read_excel("data/valid_set.xlsx")

ES_HOST = os.getenv("ES_HOST")
ES_PORT = os.getenv("ES_PORT")
ES_USER = os.getenv("ES_USER")
ES_PASSWORD = os.getenv("ES_PASSWORD")

ES_URL = f"https://{ES_HOST}:{ES_PORT}"

es = elasticsearch.Elasticsearch(
    [ES_URL],
    http_auth=(ES_USER, ES_PASSWORD),
    verify_certs=False,
)

if not es.indices.exists(index="essays"):
  es.indices.create(index="essays")

actions = []

for row in df.iter_rows(named=True):
  action = {"index": {"_index": "essays", "_id": row["essay_id"]}}
  doc = {
    "essay_id": row["essay_id"],
    "essay_set": row["essay_set"],
    "essay": row["essay"],
    "domain1_predictionid": row["domain1_predictionid"],
    "domain2_predictionid": row["domain2_predictionid"],
  }
  actions.append(action)
  actions.append(doc)

es.bulk(index="essays", operations=actions)

result = es.count(index="essays")
print(result.body["count"])
