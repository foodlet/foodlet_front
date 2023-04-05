import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import Signup from './views/Signup/Signup'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='profile' element={<Profile />}/>
        <Route path='signup' element={<Signup />}/>
      </Routes>
    </div>
  )
}

export default App
