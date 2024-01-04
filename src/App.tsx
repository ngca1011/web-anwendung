import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigation } from './components/navbar.tsx'
import { Home } from './pages/home-page.tsx'
import { Buchsuchen } from './pages/buch-suchen-page.tsx'
import { Buchanlegen } from './pages/buch-create-page.tsx'
import { Login } from './pages/login-page.tsx'
import { AuthProvider } from './components/auth.tsx'
import type { ReactElement } from 'react'

const App = (): ReactElement => (
  <AuthProvider>
    <BrowserRouter>
      <div
        style={{
          backgroundImage: 'url("../public/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buchsuchen' element={<Buchsuchen />} />
          <Route path='/buchanlegen' element={<Buchanlegen />} />
          <Route path='/anmelden' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
)

export { App }
