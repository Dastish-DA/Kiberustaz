import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const navItems: NavItem[] = [
  { label: 'Курс туралы', href: '#hero' },
  { label: 'Бағдарлама', href: '#features' },
  { label: 'Бағасы', href: '#pricing' },
  { label: 'Кеңес алу', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-brand-dark/90 backdrop-blur-md border-brand-secondary/30 py-3 shadow-lg shadow-brand-primary/10' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => { if(isLoggedIn) return; }}>
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-accent rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-secondary font-sans tracking-wide">
            KIBER<span className="text-brand-accent">USTAZ</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!isLoggedIn ? (
            <>
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
              <button 
                onClick={onLoginClick}
                className="px-6 py-2 border border-brand-primary text-brand-primary rounded-full font-bold text-sm hover:bg-brand-primary hover:text-white transition-all"
              >
                Кіру
              </button>
              <a 
                href="#pricing" 
                className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                Курсты сатып алу
              </a>
            </>
          ) : (
             <div className="flex items-center gap-4">
                <span className="text-gray-300">Сәлем, Ұстаз!</span>
                <button 
                  onClick={onLogout}
                  className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-full font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  Шығу
                </button>
             </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark/95 border-b border-brand-secondary/30 backdrop-blur-xl p-6 flex flex-col gap-4">
           {!isLoggedIn ? navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-white text-lg font-medium block p-2 hover:bg-white/10 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          )) : (
            <button onClick={onLogout} className="text-left text-red-400 text-lg font-medium block p-2">Шығу</button>
          )}
          {!isLoggedIn && (
             <button 
                onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                className="text-left text-brand-primary text-lg font-medium block p-2"
              >
                Кіру
              </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;