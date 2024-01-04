import { API_URL } from '../consts'
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext({
  isLoggedIn: false,
  login: async (_username: string, _password: string) => {},
  logout: () => {},
})

const useAuthContext = (): {
  isLoggedIn: boolean
  login: (_username: string, _password: string) => Promise<void>
  logout: () => void
} => useContext(AuthContext)

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const token: string | null = localStorage.getItem('token')
    if (token !== null && token !== undefined) {
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}auth/login`, {
        username,
        password,
      })

      const { token, roles } = response.data

      setIsLoggedIn(true)
      localStorage.setItem('token', `Bearer ${token}`)
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

  const logout = (): void => {
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

export { useAuthContext, AuthProvider, getToken }
