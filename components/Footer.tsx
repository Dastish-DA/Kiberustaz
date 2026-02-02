import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050914] border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
             <a href="#" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white tracking-wide">
                KIBER<span className="text-brand-accent">USTAZ</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm mt-2">© 2024 KiberUstaz. Барлық құқықтар қорғалған.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;