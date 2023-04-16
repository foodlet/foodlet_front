import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true)
const unautheticatedHttp = createHttp(false)

export const createReview = (id, review) => {
  return authenticatedHttp.post(`/review/${id}`, review)
}

export const getReviewsByRecipe = (id) => {
  return unautheticatedHttp.get(`/review/${id}`)
}