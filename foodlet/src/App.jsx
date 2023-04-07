import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import Signup from './views/Signup/Signup'
import Navbar from './components/misc/Navbar/Navbar'
import GetRecipes from './views/recipes/GetRecipes/GetRecipes'
import ListRecipes from './views/recipes/ListRecipes/ListRecipes'

function App() {
  return (
    <div className="App">
      <Navbar />  
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='profile' element={<Profile />}/>
        <Route path='signup' element={<Signup />}/>
        <Route path='get-recipes' element={<GetRecipes />}/>
      </Routes>
    </div>
  )
}

export default App
