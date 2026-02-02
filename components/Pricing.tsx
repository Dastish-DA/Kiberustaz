import React from 'react';
import { ServicePackage } from '../types';

const packages: ServicePackage[] = [
  {
    title: 'Базалық',
    price: '₸25,000',
    features: ['Барлық видеосабақтарға қолжетімділік', 'Үй тапсырмасы', 'Тест тапсыру'],
    isPopular: false
  },
  {
    title: 'Кәсіби',
    price: '₸45,000',
    features: ['Куратордың қолдауы', 'Жеке кері байланыс', 'Zoom кездесулер (Q&A)', 'Ресми сертификат'],
    isPopular: true
  },
  {
    title: 'Мектеп үшін',
    price: 'Жеке есептеледі',
    features: ['10+ мұғалімге доступ', 'Офлайн мастер-класс', 'VR жабдықтарымен қамтамасыз ету', 'Мектеп әкімшілігіне есеп'],
    isPopular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative bg-[#0b1121]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Оқу <span className="text-brand-primary">Тарифтері</span></h2>
          <p className="text-gray-400">Өзіңізге ыңғайлы форматты таңдаңыз</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <div 
              key={idx}
              className={`relative rounded-2xl p-8 border ${pkg.isPopular ? 'border-brand-primary bg-brand-primary/5' : 'border-white/10 bg-brand-dark/50'} flex flex-col`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Хит сатылым
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
              <div className="text-3xl font-bold text-brand-accent mb-6">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-bold transition-all ${pkg.isPopular ? 'bg-brand-primary hover:bg-brand-primary/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                Сатып алу
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;