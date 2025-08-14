import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import Dashboard from './pages/site/Dashboard';
import HomePage from './pages/site/HomePage';
import About from './pages/site/About';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
