import React from 'react'
import LoginPage from './pages/user/loginPage'
import SignupPage from './pages/user/SignupPage'
import Dashboard from './pages/site/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default App