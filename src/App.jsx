import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import Dashboard from './pages/site/Dashboard';
import HomePage from './pages/site/HomePage';
import About from './pages/site/About';
import GetStarted from './pages/site/GetStarted';
import AlphabetBlock from './components/AlphabetBlock';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar unless on /getStarted */}
      {location.pathname !== '/getStarted' && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/all" element={<AlphabetBlock />} />
      </Routes>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
