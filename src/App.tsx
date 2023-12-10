import Navigation from './components/Navbar.tsx'
import Home from './pages/HomePage.tsx'
import Buchsuchen  from './pages/BuchSuchenPage.tsx'
import Buchanlegen from './pages/BuchCreatePage.tsx'
import Login from './pages/LoginPage.tsx'


function App() {
  let Component: React.ComponentType = Home;

  switch (window.location.pathname) {
    case "/" :
      Component = Home
      break
    case "/buchsuchen":
      Component = Buchsuchen
      break 
    case "/buchanlegen":
      Component = Buchanlegen
      break
    case "/anmelden":
      Component = Login
  }
  return (
    <>
      <Navigation />
      <Component />
    </>
  )
}

export default App
