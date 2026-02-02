import React, { useState } from 'react';
import { CourseModule } from '../types';

const modules: CourseModule[] = [
  { id: 1, title: 'Кіріспе: AR/VR әлемі', duration: '15 мин', isLocked: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Бұл сабақта біз толықтырылған шындық пен виртуалды шындықтың айырмашылығын, олардың тарихын және білім берудегі болашағын талқылаймыз.' },
  { id: 2, title: 'Дайын ресурстарға шолу', duration: '20 мин', isLocked: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Quiver және Arloopa қосымшаларын орнату және оларды биология сабағында қолдану нұсқаулығы.' },
  { id: 3, title: 'Unity орнату және баптау', duration: '45 мин', isLocked: true },
  { id: 4, title: 'Алғашқы AR жоба', duration: '60 мин', isLocked: true },
  { id: 5, title: 'Сабақты жоспарлау', duration: '30 мин', isLocked: true },
];

const LMSDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<CourseModule>(modules[0]);

  return (
    <div className="pt-24 min-h-screen bg-[#0f172a] flex flex-col">
      <div className="container mx-auto px-6 flex-grow flex flex-col lg:flex-row gap-8 pb-12">
        
        {/* Sidebar - Module List */}
        <div className="lg:w-1/3 bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden h-fit">
          <div className="p-6 border-b border-white/10 bg-brand-primary/10">
            <h2 className="text-xl font-bold text-white">Курс бағдарламасы</h2>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Прогресс: 40%</p>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => !module.isLocked && setActiveModule(module)}
                className={`w-full p-4 flex items-center justify-between border-b border-white/5 transition-colors ${
                  activeModule.id === module.id 
                    ? 'bg-brand-primary/20 border-l-4 border-l-brand-primary' 
                    : 'hover:bg-white/5'
                } ${module.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-left">
                  <h4 className={`font-medium ${activeModule.id === module.id ? 'text-brand-accent' : 'text-gray-200'}`}>
                    {module.id}. {module.title}
                  </h4>
                  <p className="text-xs text-gray-500">{module.duration}</p>
                </div>
                <div>
                  {module.isLocked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Video Player */}
        <div className="lg:w-2/3">
          <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden">
             {/* Video Placeholder */}
             <div className="aspect-video bg-black relative w-full">
                {activeModule.videoUrl ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={activeModule.videoUrl} 
                    title={activeModule.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Видео жүктелуде...</p>
                  </div>
                )}
             </div>
             
             <div className="p-8">
               <h1 className="text-3xl font-bold mb-4">{activeModule.title}</h1>
               <div className="prose prose-invert max-w-none">
                 <p className="text-gray-300 leading-relaxed">
                   {activeModule.content}
                 </p>
                 <h3 className="text-xl font-bold mt-6 mb-2 text-white">Сабақ мақсаты:</h3>
                 <ul className="list-disc list-inside text-gray-300 space-y-2">
                   <li>AR және VR технологияларын ажырату.</li>
                   <li>Білім берудегі қолдану мысалдарын көру.</li>
                   <li>Келесі сабаққа дайындық.</li>
                 </ul>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
                 <button className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-white/5 transition-colors">
                   Алдыңғы сабақ
                 </button>
                 <button className="px-6 py-3 bg-brand-primary rounded-lg text-white font-bold hover:bg-brand-primary/80 transition-colors">
                   Келесі сабақ
                 </button>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LMSDashboard;