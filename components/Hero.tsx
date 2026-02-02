import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/30 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="inline-block px-4 py-1 border border-brand-accent/50 rounded-full bg-brand-accent/10 mb-6 backdrop-blur-sm">
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Біліктілікті арттыру</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Мұғалімдерге арналған <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">AR/VR Курсы</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Сабақтарыңызды заманауи технологиялармен байытыңыз. 4 апта ішінде виртуалды зертханаларды қолдануды және өз AR қосымшаларыңызды жасауды үйреніңіз.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2"
            >
              Курсқа жазылу
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 border border-gray-600 hover:border-white hover:bg-white/5 text-white font-semibold rounded-lg transition-all flex items-center justify-center"
            >
              Бағдарламаны көру
            </a>
          </div>
        </div>

        {/* Hero Visual - Course Preview */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <div className="relative w-full max-w-lg mx-auto animate-float">
                {/* Simulated 3D Card/Object */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-brand-primary/50 border border-white/10 group">
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                        alt="Online Course" 
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="text-xl font-bold">1-сабақ: AR технологиясына кіріспе</h3>
                        <p className="text-sm text-gray-300">Ұзақтығы: 15 минут</p>
                    </div>
                </div>
                
                {/* Decorative BG Elements behind image */}
                <div className="absolute -top-10 -right-10 w-24 h-24 border-2 border-brand-accent/30 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-40 h-40 border border-brand-primary/30 rounded-full border-dashed"></div>
            </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-0 w-full bg-black/30 backdrop-blur-sm border-t border-white/10 py-6 hidden md:block">
        <div className="container mx-auto px-6 flex justify-around">
            <div className="text-center">
                <span className="block text-3xl font-bold text-brand-accent">1,200+</span>
                <span className="text-sm text-gray-400">Оқытылған мұғалім</span>
            </div>
            <div className="text-center">
                <span className="block text-3xl font-bold text-brand-primary">50+</span>
                <span className="text-sm text-gray-400">Мектеп қосылды</span>
            </div>
            <div className="text-center">
                <span className="block text-3xl font-bold text-brand-secondary">Сертификат</span>
                <span className="text-sm text-gray-400">Мемлекеттік үлгіде</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;