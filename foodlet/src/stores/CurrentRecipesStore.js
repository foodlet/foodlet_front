const RECIPES_KEY = 'currentRecipes'

let _currentRecipes = localStorage.getItem(RECIPES_KEY) || ''

export const setCurrentRecipes = (recipes) => {
  localStorage.setItem(RECIPES_KEY, recipes)
  _currentRecipes = recipes
}

export const getCurrentRecipes = () => {
  return _currentRecipes
}