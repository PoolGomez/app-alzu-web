
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Companies, Dashboard, Home, Login, Register } from './pages'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={ <Register />} />

        <Route path="/dashboard" element={ <Dashboard />} />
        

        <Route path="/companies" element={ <Companies />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
