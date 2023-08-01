import { EssayQueryRequest, EssayQueryResponse } from "../types/api";
import api from "./api";

const essays_service = {
  search(data: EssayQueryRequest) {
    return api.get<EssayQueryResponse, EssayQueryRequest>(`api/v1/essays`, data);
  },
};

export default essays_service;
