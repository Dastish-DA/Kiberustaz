import React, { useState, useEffect } from 'react';
import { CourseModule } from '../types';
import Quiz from './Quiz';
import Certificate from './Certificate';

// Mock Data for the Course
const COURSE_NAME = "Мұғалімдерге арналған AR/VR технологиялары";
const MOCK_USER_NAME = "Асқар Асқаров"; // In real app, comes from Auth

const modulesData: CourseModule[] = [
  { 
    id: 1, 
    title: 'Кіріспе: AR/VR әлемі', 
    type: 'video', 
    duration: '15 мин', 
    description: 'Бұл сабақта біз толықтырылған шындық пен виртуалды шындықтың айырмашылығын, олардың тарихын және білім берудегі болашағын талқылаймыз.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder
  },
  { 
    id: 2, 
    title: 'Дайын ресурстарды жүктеу', 
    type: 'resource', 
    duration: '5 мин', 
    description: 'Сабақта қолдануға болатын қосымшалар тізімі және сабақ жоспарының үлгісі.',
    resources: [
      { name: 'AR_Tools_List.pdf', url: '#', size: '2.4 MB' },
      { name: 'Lesson_Plan_Template.docx', url: '#', size: '1.1 MB' }
    ]
  },
  { 
    id: 3, 
    title: 'Тест: 1-бөлімді қорытындылау', 
    type: 'quiz', 
    duration: '10 мин', 
    description: 'Өткен тақырыптар бойынша біліміңізді тексеріңіз.',
    questions: [
      { id: 1, question: 'AR дегеніміз не?', options: ['Виртуалды шындық', 'Толықтырылған шындық', 'Жасанды интеллект'], correctAnswer: 1 },
      { id: 2, question: 'VR көзілдірігі не үшін қажет?', options: ['AR объектілерін көру үшін', 'Толық виртуалды әлемге ену үшін', 'Тек кино көру үшін'], correctAnswer: 1 },
      { id: 3, question: 'Quiver қосымшасы не істейді?', options: ['Боялған суретті жандандырады', 'Код жазады', 'Видео монтаждайды'], correctAnswer: 0 },
    ]
  },
  { 
    id: 4, 
    title: 'Unity: Орнату және интерфейс', 
    type: 'video', 
    duration: '45 мин', 
    description: 'Unity Hub орнату, жаңа 3D жоба бастау және негізгі құралдармен танысу.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 5, 
    title: 'Қорытынды емтихан', 
    type: 'quiz', 
    duration: '20 мин', 
    description: 'Сертификат алу үшін емтиханды сәтті тапсырыңыз.',
    questions: [
      { id: 1, question: 'Unity-де объектіні қозғалту құралы?', options: ['Scale Tool', 'Move Tool', 'Rotate Tool'], correctAnswer: 1 },
      { id: 2, question: 'AR Foundation не үшін керек?', options: ['Тек iOS үшін', 'AR қосымша жасау үшін', 'VR ойын үшін'], correctAnswer: 1 },
    ]
  },
];

const LMSDashboard: React.FC = () => {
  // State initialization with localStorage check
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('kiberUstazProgress');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Find first unfinished module or default to 1
  const initialActiveId = modulesData.find(m => !completedModules.includes(m.id))?.id || modulesData[0].id;
  const initialActive = modulesData.find(m => m.id === initialActiveId) || modulesData[0];

  const [activeModule, setActiveModule] = useState<CourseModule>(initialActive);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    localStorage.setItem('kiberUstazProgress', JSON.stringify(completedModules));
    
    // Check if course is finished
    if (completedModules.length === modulesData.length && !showCertificate) {
      // Optional: Auto show certificate or celebrate
    }
  }, [completedModules]);

  const handleMarkAsComplete = () => {
    if (!completedModules.includes(activeModule.id)) {
      setCompletedModules(prev => [...prev, activeModule.id]);
    }
    
    // Auto-advance to next module if exists
    const nextModuleIdx = modulesData.findIndex(m => m.id === activeModule.id) + 1;
    if (nextModuleIdx < modulesData.length) {
      setActiveModule(modulesData[nextModuleIdx]);
    } else {
      setShowCertificate(true); // Course Finished
    }
  };

  const isModuleLocked = (moduleId: number) => {
    // Module 1 is always open. 
    // Module N is open if Module N-1 is in completedModules.
    if (moduleId === 1) return false;
    const prevModuleId = moduleId - 1;
    return !completedModules.includes(prevModuleId);
  };

  const calculateProgress = () => {
    return Math.round((completedModules.length / modulesData.length) * 100);
  };

  const renderContent = () => {
    if (showCertificate) {
      return (
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold mb-6 text-brand-accent">Курс сәтті аяқталды!</h2>
          <Certificate 
            studentName={MOCK_USER_NAME}
            courseName={COURSE_NAME}
            date={new Date().toLocaleDateString('kk-KZ')}
          />
          <button 
             onClick={() => setShowCertificate(false)}
             className="mt-8 text-gray-400 hover:text-white underline"
          >
            Курс материалдарына оралу
          </button>
        </div>
      );
    }

    switch (activeModule.type) {
      case 'video':
        return (
          <>
            <div className="aspect-video bg-black relative w-full rounded-xl overflow-hidden mb-8 shadow-2xl">
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
            <div className="flex justify-end">
              <button 
                onClick={handleMarkAsComplete}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  completedModules.includes(activeModule.id)
                    ? 'bg-green-600/20 text-green-400 border border-green-600/50 cursor-default'
                    : 'bg-brand-primary text-white hover:bg-brand-primary/80'
                }`}
                disabled={completedModules.includes(activeModule.id)}
              >
                {completedModules.includes(activeModule.id) ? 'Сабақ аяқталды' : 'Сабақты аяқтау'}
              </button>
            </div>
          </>
        );
      
      case 'resource':
        return (
          <div className="bg-[#0f172a] p-8 rounded-xl border border-white/10 mb-8">
             <div className="mb-8">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
                 Материалдарды жүктеу
               </h3>
               <div className="space-y-3">
                 {activeModule.resources?.map((res, idx) => (
                   <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 font-bold text-xs">
                          DOC
                        </div>
                        <div>
                          <p className="font-medium text-white">{res.name}</p>
                          <p className="text-xs text-gray-500">{res.size}</p>
                        </div>
                      </div>
                      <button className="text-brand-accent hover:text-white transition-colors">
                        Жүктеу
                      </button>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="flex justify-end">
                <button 
                  onClick={handleMarkAsComplete}
                  className="px-6 py-3 bg-brand-primary rounded-lg text-white font-bold hover:bg-brand-primary/80 transition-colors"
                >
                  Келесі сабаққа өту
                </button>
             </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="mb-8">
            {completedModules.includes(activeModule.id) ? (
               <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl text-center mb-6">
                 <h3 className="text-green-400 font-bold text-xl mb-2">Тест сәтті тапсырылды!</h3>
                 <p className="text-gray-400 mb-4">Сіз бұл модульді аяқтадыңыз.</p>
                 <button 
                   onClick={() => {
                      const nextModuleIdx = modulesData.findIndex(m => m.id === activeModule.id) + 1;
                      if (nextModuleIdx < modulesData.length) setActiveModule(modulesData[nextModuleIdx]);
                      else setShowCertificate(true);
                   }}
                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                 >
                   Келесі модульге өту
                 </button>
               </div>
            ) : (
               <Quiz 
                 questions={activeModule.questions || []} 
                 onPass={handleMarkAsComplete}
               />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#0f172a] flex flex-col">
      <div className="container mx-auto px-6 flex-grow flex flex-col lg:flex-row gap-8 pb-12">
        
        {/* Sidebar - Module List */}
        <div className="lg:w-1/3 flex-shrink-0">
          <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-white/10 bg-brand-primary/10">
              <h2 className="text-xl font-bold text-white mb-1">Курс мазмұны</h2>
              <p className="text-sm text-gray-400 mb-4">{COURSE_NAME}</p>
              
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                 <span>Прогресс</span>
                 <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-brand-primary to-brand-accent h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {modulesData.map((module) => {
                const locked = isModuleLocked(module.id);
                const completed = completedModules.includes(module.id);
                const isActive = activeModule.id === module.id;

                return (
                  <button
                    key={module.id}
                    onClick={() => {
                        if (!locked) {
                            setActiveModule(module);
                            setShowCertificate(false);
                        }
                    }}
                    className={`w-full p-4 flex items-center gap-3 border-b border-white/5 transition-all text-left ${
                      isActive 
                        ? 'bg-brand-primary/20 border-l-4 border-l-brand-primary' 
                        : 'hover:bg-white/5 border-l-4 border-l-transparent'
                    } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex-shrink-0">
                       {completed ? (
                         <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                         </div>
                       ) : locked ? (
                         <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                         </div>
                       ) : (
                         <div className="w-6 h-6 border-2 border-brand-primary rounded-full flex items-center justify-center text-[10px] font-bold text-brand-primary">
                            {module.id}
                         </div>
                       )}
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {module.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                         <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                             module.type === 'quiz' ? 'bg-yellow-500/20 text-yellow-500' :
                             module.type === 'resource' ? 'bg-blue-500/20 text-blue-500' :
                             'bg-purple-500/20 text-purple-500'
                         }`}>
                             {module.type === 'quiz' ? 'Тест' : module.type === 'resource' ? 'Файл' : 'Видео'}
                         </span>
                         <span className="text-[10px] text-gray-500">{module.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Certificate Button (Only visible if 100%) */}
            {completedModules.length === modulesData.length && (
                <div className="p-4 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border-t border-white/10">
                    <button 
                        onClick={() => setShowCertificate(true)}
                        className="w-full py-2 bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg text-white font-bold text-sm shadow-lg hover:shadow-brand-primary/50 transition-all"
                    >
                        Сертификатты ашу
                    </button>
                </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-2/3 flex-grow">
          <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden min-h-[500px] flex flex-col">
             
             {!showCertificate && (
                <div className="p-8 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                         <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                             activeModule.type === 'quiz' ? 'bg-yellow-500 text-black' : 'bg-brand-primary text-white'
                         }`}>
                             {activeModule.type === 'quiz' ? 'Тест' : activeModule.type === 'resource' ? 'Материал' : 'Сабақ'}
                         </span>
                         <span className="text-gray-400 text-sm">{activeModule.duration}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{activeModule.title}</h1>
                    {activeModule.description && <p className="text-gray-400 mt-2">{activeModule.description}</p>}
                </div>
             )}
             
             <div className="p-8 flex-grow">
               {renderContent()}
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LMSDashboard;