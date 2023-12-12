import { useState } from "react";
import axios from 'axios';
import { Center, Box, Heading, Button, Input, useToast, Spacer } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();


  const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username,
            password,
        });

        const token = response.data.token;

        // Korrigierter Teil: localStorage statt local Storage
        localStorage.setItem('token', token);

    // eslint-disable-next-line @typescript-eslint/no-explic  it-any
    } catch (err: any) {
        if (err.ErrorRest) {
            alert("Failed login: " + err.ErrorRest)
        }
    }
  }

  return (
    <div>
      <Center>
      <Box w="400px" h="auto" textAlign="center">
          <Heading marginBottom="2 ">Login</Heading>

     <Input type="text" value={username}  variant='outline' placeholder='Username' width='auto' 
      onChange={(e) => setUsername(e.target.value)}/>

     <Input type="password" value={password} variant='outline' placeholder='Password' width='auto' marginBottom="2"
      onChange={(e) => setPassword(e.target.value)}
      />

    <Spacer />

        <Button 
          onClick={() => {
            const examplePromise = new Promise((resolve) => {
              setTimeout(() => resolve(200), 1000);
            });

            toast.promise(examplePromise, {
              success: { title: 'Erfolgreich', description: 'Login erfolgreich' },
              error: { title: 'Fehler', description: 'Login fehlgeschlagen' },
              loading: { title: 'Bitte warten', description: 'Login wird ausgeführt' },
            });
          }}  
        >
          Login
        </Button>

      </Box>
     </Center>

    </div>
  );
};

export default Login;
