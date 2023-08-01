export interface EssayQueryRequest {
  query: string;
  limit: number;
  offset: number;
}

export interface Essay {
  essay_id: number;
  essay_set: number;
  essay: string;
  domain1_predictionid: number;
  domain2_predictionid: number;
  highlight: string[];
}

export interface EssayQueryResponse {
  count: number;
  next: EssayQueryRequest | null;
  results: Essay[];
}
