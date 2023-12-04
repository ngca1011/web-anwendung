import Navigation from './components/Navbar.tsx'
import Home from './pages/HomePage.tsx'
import Buchsuchen  from './pages/BuchCreatePage.tsx'
import Buchanlegen from './pages/BuchCreatePage.tsx'


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
  }
  return (
    <>
      <Navigation />
      <Component />
    </>
  )
}

export default App
