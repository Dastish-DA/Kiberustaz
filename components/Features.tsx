import React from 'react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'Модуль 1: AR/VR Негіздері',
    description: 'Технологияның тарихы, түрлері және білім берудегі рөлі. Смартфон мен VR көзілдіріктердің айырмашылығы.',
    icon: (
      <span className="text-2xl font-bold text-brand-accent">01</span>
    )
  },
  {
    title: 'Модуль 2: Дайын ресурстар',
    description: 'Сабақта қолдануға болатын тегін қосымшаларға шолу: Google Arts & Culture, Arloopa, QuiverEdu.',
    icon: (
       <span className="text-2xl font-bold text-brand-primary">02</span>
    )
  },
  {
    title: 'Модуль 3: Content Creation',
    description: 'Unity және Canva арқылы өзіңіздің алғашқы AR оқу құралыңызды жасауды үйренесіз. Код жазуды қажет етпейді.',
    icon: (
       <span className="text-2xl font-bold text-brand-secondary">03</span>
    )
  },
  {
    title: 'Модуль 4: Әдістеме',
    description: 'AR/VR сабағының жоспарын құру. Геймификация әдістері және оқушы нәтижесін бағалау.',
    icon: (
       <span className="text-2xl font-bold text-yellow-400">04</span>
    )
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-brand-dark relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Курс <span className="text-brand-accent">Бағдарламасы</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            4 апталық интенсивт курс теория мен практиканы қамтиды. Әр модуль соңында тапсырма орындап, кері байланыс аласыз.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 rounded-2xl bg-[#1e293b]/50 border border-white/5 hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-dark rounded-xl flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;