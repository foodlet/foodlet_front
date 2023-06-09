import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true)
const unautheticatedHttp = createHttp(false)

export const getRecipes = mainIngredient => unautheticatedHttp.get(`/api/${mainIngredient}`)

// export const createRecipe = (
//   {
//     name,
//     description,
//     ingredients,
//     time,
//     skillLevel,
//     image,
//     createdBy,
//     oven,
//     fridge,
//     steps
//   }
// ) => {
//   authenticatedHttp.post('/recipes', {
//     name,
//     description,
//     ingredients,
//     time,
//     skillLevel,
//     image,
//     createdBy,
//     oven,
//     fridge,
//     steps
//   })
// }

export const createRecipe = recipe => {
  return authenticatedHttp.post('/recipes', recipe)
}

export const getMyRecipes = () => authenticatedHttp.get('/recipes/me')

export const getMyRecipesById = id => authenticatedHttp.get(`/recipes/me/${id}`)

export const getExternalRecipesById = id => unautheticatedHttp.get(`/api/${id}`)

export const deleteRecipe = id => authenticatedHttp.delete(`/recipes/${id}`)

export const editRecipe = (id, recipe) => authenticatedHttp.patch(`/recipes/${id}`, recipe)

export const getFeedRecipes = () => authenticatedHttp.get('/recipes/not-me')

export const getUnauthenticatedFeedRecipes = () => unautheticatedHttp.get('/recipes')