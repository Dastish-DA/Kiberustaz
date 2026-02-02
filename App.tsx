import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import LoginModal from './components/LoginModal';
import LMSDashboard from './components/LMSDashboard';

const App: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-primary selection:text-white">
      <Navbar 
        onLoginClick={() => setLoginModalOpen(true)} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main>
        {isLoggedIn ? (
          <LMSDashboard />
        ) : (
          <>
            <Hero />
            <Features />
            <Pricing />
            <Contact />
          </>
        )}
      </main>
      
      <Footer />
      <AIAssistant />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;