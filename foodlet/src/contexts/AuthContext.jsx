import { createContext, useCallback, useState, useEffect, useMemo } from "react";
import { getCurrentUser as getCurrentUserService } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { getAccessToken, setAccessToken } from "../stores/AccessTokenStore";

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  const getCurrentUser = useCallback(callback => {
    getCurrentUserService()
      .then(user => {
        setCurrentUser(user)
        setIsAuthLoaded(true)
        callback && callback()
      })
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()

  const login = useCallback(token => {
    const navigateToProfile = () => {
      navigate('/profile')
    }

    setAccessToken(token)
    getCurrentUser(navigateToProfile)
  }, [getCurrentUser])

  useEffect(() => {
    if(getAccessToken()) {
      return getCurrentUser() // i added the return, if smth's not working it's probably that
    }
    setIsAuthLoaded(true)
  }, [getCurrentUser])

  const value = useMemo(() => {
    return {
      currentUser,
      isAuthLoaded,
      login
    }
  }, [currentUser, isAuthLoaded, login])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}