import { useState } from "react";
import axios from 'axios';
import {Stack, Button, Input, FormControl, Flex, Text, Box, Alert, AlertDescription, AlertIcon, CircularProgress} from '@chakra-ui/react'

const ErrorMessage = ({message}) => {
  return (
    <Box my = {4}>
       <Alert status = 'error' borderRadius = {4}>
          <AlertIcon />
          <AlertDescription>{message}</AlertDescription>
       </Alert>
    </Box>
  )
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:3000/auth/login', {
        auth:{
          username,
          password,
        }
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      
      setIsLoading(false);
      setIsLoggedIn(true);
    }
    catch (err) {
      setError("Invalid username or password");
      setIsLoading(false);
      setUsername('');
      setPassword('');
    }
  }

  return (
   <Flex align = "center" justify="center">
    {isLoggedIn? (
      <Box textAlign='center'>
        <Text>{username} logged in!</Text>
      <Button
        variant="outline"
        width="full"
        mt={4}
        onClick={() => setIsLoggedIn(false)}
      >
      Sign out
      </Button> 
    </Box>
    ) : ( 
    <form onSubmit = {handleSubmit}>
      {error && <ErrorMessage message = {error} />}
      <Text as="h1" fontSize="2xl" fontWeight="bold" align = "center">
        Login
      </Text>
      <Stack spacing={3}>
        <FormControl isRequired>
          <Input
            type="text"
            value={username}
            placeholder="Username"
            aria-label = "Username"
            onChange={event => setUsername(event.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            aria-labbel = "Password"
            onChange={event => setPassword(event.target.value)}
          />
        </FormControl>
        <Button type = 'submit' variant='solid' borderColor = 'black'>
          {isLoading ? (
            <CircularProgress 
              isIndeterminate
              color = 'teal'
            />
          ) : (
            'Sign up!'
          )}
        </Button>
      </Stack>
    </form>
    )}
  </Flex>
  );
};

export default Login;
