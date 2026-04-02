import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Login from './Components/LoginForm.jsx'
// import Hero from './Components/Hero.jsx'
// import Header from './Components/Header.jsx'
// import Footer from './Components/Footer.jsx'
// import Login from './Components/LoginForm.jsx'
import Signup from './Components/signup.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Signup/>
  </StrictMode>,
)
