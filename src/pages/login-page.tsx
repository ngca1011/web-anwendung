import { useState } from 'react'
import type { ReactElement } from 'react'
import { Center, Box, Heading, Button, Input } from '@chakra-ui/react'
import { useAuthContext } from '../components/authentication'

const Login = (): ReactElement => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isLoggedIn, login, logout } = useAuthContext()

  const handleLogin = (): void => {
    void login(username, password)
  }
  const handleLogout = (): void => {
    logout()
  }

  if (isLoggedIn) {
    const roles = localStorage.getItem('roles')

    return (
      <Center h='45vh'>
        <Box textAlign='center'>
          <Heading marginBottom='50' fontSize='30'>
            Sie sind als {roles} eingeloggt!
          </Heading>
          <Button color='blue' outlineColor='black' textAlign='center' onClick={handleLogout}>
            Abmelden
          </Button>
        </Box>
      </Center>
    )
  }

  return (
    <Center h='45vh'>
      <Box w='400px' h='auto' textAlign='center'>
        <Heading marginBottom='5'>Login</Heading>

        <Input
          type='text'
          value={username}
          variant='outline'
          placeholder='Username'
          width='auto'
          marginBottom='3'
          outlineColor='gray'
          onChange={(input) => {
            setUsername(input.target.value)
          }}
        />

        <Input
          type='password'
          value={password}
          variant='outline'
          placeholder='Password'
          width='auto'
          marginBottom='5'
          outlineColor='gray'
          onChange={(input) => {
            setPassword(input.target.value)
          }}
        />
        <br></br>
        <Button color='blue' outlineColor='black' onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Center>
  )
}

export { Login }
