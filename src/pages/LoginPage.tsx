import { useState } from "react";
import axios from 'axios';
import {Stack, Button, Input, FormControl, Flex, Text} from '@chakra-ui/react'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username,
            password,
        });

        const token = response.data.token;

        localStorage.setItem('token', token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.ErrorRest) {
            alert("Failed login: " + err.ErrorRest);
        }
    }
  }

  return (
   <Flex align = "center" justify="center">
    <form action = 'submit'>
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            aria-labbel = "Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button onClick={login} type = 'submit' variant='solid' borderColor = 'black'>
         Sign up!
        </Button>
      </Stack>
    </form>
  </Flex>
  );
};

export default Login;
