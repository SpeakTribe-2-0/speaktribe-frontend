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
import YorubaAlphabet from './components/alphabets/YorubaAlphabet';
import HausaAlphabet from './components/alphabets/HausaAlphabet';
import IgboAlphabet from './components/alphabets/IgboAlphabet';
import YorubaWords from './components/words/YorubaWords';
import HausaWords from './components/words/HausaWords';
import IgboWords from './components/words/IgboWords';
import YorubaSentence from './components/sentences/YorubaSentence';
import HausaSentence from './components/sentences/HausaSentence';
import IgboSentence from './components/sentences/IgboSentence';
import  QrCode  from '../src/pages/site/QrCode';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar unless on /getStarted */}
      {!['/', '/login', '/signup'].includes(location.pathname) && <Navbar />}

      <Routes>
        {/* home */}
        <Route path='/' element={<GetStarted />} />

        {/* auth */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        {/* site pages */}
        <Route path='/home' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/about' element={<About />} />

        {/* alphabets */}
        <Route path='/yoruba-alphabet' element={<YorubaAlphabet />} />
        <Route path='/hausa-alphabet' element={<HausaAlphabet />} />
        <Route path='/igbo-alphabet' element={<IgboAlphabet />} />

        {/* words */}
        <Route path='/yoruba-word' element={<YorubaWords />} />
        <Route path='/hausa-word' element={<HausaWords />} />
        <Route path='/igbo-word' element={<IgboWords />} />

        {/* sentences */}
        <Route path='/yoruba-sentence' element={<YorubaSentence />} />
        <Route path='/hausa-sentence' element={<HausaSentence />} />
        <Route path='/igbo-sentence' element={<IgboSentence />} />



        <Route path='/qrcode' element={<QrCode />} />
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
