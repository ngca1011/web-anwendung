import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { ChakraProvider } from '@chakra-ui/react'

const rootElement = document.querySelector('#root')
if (rootElement !== undefined && rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  )
} else console.log('No root element')
