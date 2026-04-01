import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Login from './Components/LoginForm.jsx'
import Hero from './Components/Hero.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Hero />
    <Footer/>
  </StrictMode>,
)
