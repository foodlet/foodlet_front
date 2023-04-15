import { createContext, useMemo, useState } from "react";

const RecipesContext = createContext()
export default RecipesContext

export const RecipesProvider = ({ children }) => {
  const [currentRecipes, setCurrentRecipes] = useState(null)
  // const [areRecipesLoaded, setAreRecipesLoaded] = useState(false)

  
  const values = useMemo(() => {
    return {
      currentRecipes,
      setCurrentRecipes
    }
  })

  return (
    <RecipesContext.Provider value={values}>
      {children}
    </RecipesContext.Provider>
  )
}