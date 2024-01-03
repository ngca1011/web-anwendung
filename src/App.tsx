import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navbar.tsx'
import Home from './pages/HomePage.tsx'
import Buchsuchen from './pages/BuchSuchenPage.tsx'
import Buchanlegen from './pages/BuchCreatePage.tsx'
import Login from './pages/LoginPage.tsx'
import { AuthProvider } from './components/Auth.tsx'

function App() {
  return (
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
            <Route path='/buchsuchen' Component={Buchsuchen} />
            <Route path='/buchanlegen' Component={Buchanlegen} />
            <Route path='/anmelden' Component={Login} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
