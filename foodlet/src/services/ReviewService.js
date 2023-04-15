import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true)
const unautheticatedHttp = createHttp(false)

export const createReview = (id, review) => {
  console.log(review, id)
  return authenticatedHttp.post(`/review/${id}`, review)
}