import React from 'react'
import LoginPage from './pages/user/loginPage'
import SignupPage from './pages/user/SignupPage'
import Dashboard from './pages/site/Dashboard'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default App