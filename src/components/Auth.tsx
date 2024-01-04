import { createContext, useState, useContext, useEffect, type ReactNode } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext({
  isLoggedIn: false,
  login: async (_username: string, _password: string) => {},
  logout: () => {},
})

const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null && token !== undefined) {
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('https://localhost:3000/auth/login', {
        username,
        password,
      })

      const { token, roles } = response.data
      console.log(token)

      setIsLoggedIn(true)
      localStorage.setItem('token', token)
      localStorage.setItem('roles', roles)

      toast({
        title: 'Erfolgreich',
        description: 'Login erfolgreich',
        status: 'success',
      })
    } catch (error) {
      console.error('Login error:', error)

      toast({
        title: 'Fehler',
        description: 'Login fehlgeschlagen',
        status: 'error',
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)

    toast({
      title: 'Erfolgreich',
      description: 'Abmeldung ist erfolgreich',
      status: 'success',
    })
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider }
