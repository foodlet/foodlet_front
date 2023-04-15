import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import Signup from './views/Signup/Signup'
import Navbar from './components/misc/Navbar/Navbar'
import GetRecipes from './views/recipes/GetRecipes/GetRecipes'
import ListRecipes from './views/recipes/ListRecipes/ListRecipes'
import GetRecipeDetail from './views/recipes/GetRecipeDetail/GetRecipeDetail'
import CreateRecipe from './views/recipes/CreateRecipe/CreateRecipe'
import EditRecipe from './views/recipes/EditRecipe/EditRecipe'

function App() {
  return (
    <div className="App">
      <Navbar />  
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='profile' element={<Profile />}/>
        <Route path='signup' element={<Signup />}/>
        <Route path='get-recipes' element={<GetRecipes />}/>
        <Route path='list-recipes' element={<ListRecipes />}/>
        <Route path='recipes/:id' element={<GetRecipeDetail />}/>
        <Route path='create-recipe' element={<CreateRecipe />}/>
        <Route path='edit-recipe/:id' element={<EditRecipe />}/>
      </Routes>
    </div>
  )
}

export default App
