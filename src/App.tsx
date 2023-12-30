import Navigation from './components/Navbar.tsx'
import Home from './pages/HomePage.tsx'
import Buchsuchen from './pages/BuchSuchenPage.tsx'
import Buchanlegen from './pages/BuchCreatePage.tsx'
import Login from './pages/LoginPage.tsx'
import { AuthProvider } from './components/Auth.tsx'
import BuchZeigen from './pages/BuchZeigen.tsx'
import React from 'react'

function App() {
  let Component: React.ComponentType = Home

  switch (window.location.pathname) {
    case '/':
      Component = Home
      break
    case '/buchsuchen':
      Component = Buchsuchen
      break
    case '/buchzeigen':
      Component = BuchZeigen
      break
    case '/buchanlegen':
      Component = Buchanlegen
      break
    case '/anmelden':
      Component = Login
  }
  return (
    <AuthProvider>
      <div
        style={{
          backgroundImage: 'url("../public/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Navigation />
        <Component />
      </div>
    </AuthProvider>
  )
}

export default App
