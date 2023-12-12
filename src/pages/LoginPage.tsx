/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from 'axios';
import { Center, Box, Heading, Button, Input, useToast } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      const token = response.data.token;

      toast({
        title: 'Erfolgreich',
        description: 'Login erfolgreich',
        status: 'success',
      });

      // Fügen Sie hier Logik hinzu, um mit dem Token umzugehen, z. B. das Speichern im lokalen Speicher.
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Login fehlgeschlagen',
        status: 'error',
      });
    }
  };

  return (
    <div>
      <Center>
        <Box w="400px" h="auto" textAlign="center">
          <Heading marginBottom="2">Login</Heading>

          <Input
            type="text"
            value={username}
            variant='outline'
            placeholder='Username'
            width='auto'
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            value={password}
            variant='outline'
            placeholder='Password'
            width='auto'
            marginBottom="2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <Button onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Center>
    </div>
  );
};

export default Login;
