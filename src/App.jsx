import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Catalog } from './pages/Catalog'
import { About } from './pages/About'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/nosotras" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
