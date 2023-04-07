import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true)
const unautheticatedHttp = createHttp(false)

export const getRecipes = mainIngredient => unautheticatedHttp.get(`/api/${mainIngredient}`)