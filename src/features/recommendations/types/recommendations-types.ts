export interface RecommendationsResponse {
  uuid: string
  content: string
  userUuid: string
  createdAt: string
}


export interface RecommendationsListResponse {
  items: RecommendationsResponse[];
  total: number;
}
