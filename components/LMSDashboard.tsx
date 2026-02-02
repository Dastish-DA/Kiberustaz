import React, { useState, useEffect } from 'react';
import { CourseModule, LMSView, StudentRank } from '../types';
import Quiz from './Quiz';
import Certificate from './Certificate';

// --- MOCK DATA ---
const COURSE_NAME = "Мұғалімдерге арналған AR/VR технологиялары";

const modulesData: CourseModule[] = [
  { 
    id: 1, 
    title: 'Кіріспе: AR/VR әлемі', 
    type: 'video', 
    duration: '15 мин', 
    xp: 50,
    description: 'Бұл сабақта біз толықтырылған шындық пен виртуалды шындықтың айырмашылығын, олардың тарихын және білім берудегі болашағын талқылаймыз.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
  },
  { 
    id: 2, 
    title: 'Дайын ресурстарды жүктеу', 
    type: 'resource', 
    duration: '5 мин', 
    xp: 30,
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
    xp: 100,
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
    xp: 80,
    description: 'Unity Hub орнату, жаңа 3D жоба бастау және негізгі құралдармен танысу.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 5, 
    title: 'Қорытынды емтихан', 
    type: 'quiz', 
    duration: '20 мин', 
    xp: 200,
    description: 'Сертификат алу үшін емтиханды сәтті тапсырыңыз.',
    questions: [
      { id: 1, question: 'Unity-де объектіні қозғалту құралы?', options: ['Scale Tool', 'Move Tool', 'Rotate Tool'], correctAnswer: 1 },
      { id: 2, question: 'AR Foundation не үшін керек?', options: ['Тек iOS үшін', 'AR қосымша жасау үшін', 'VR ойын үшін'], correctAnswer: 1 },
    ]
  },
];

const mockLeaderboard: StudentRank[] = [
  { id: 1, name: 'Айгүл Сәдуақасова', school: '№56 Мектеп-лицей', xp: 1250, avatar: '👩‍🏫' },
  { id: 2, name: 'Ержан Құрманов', school: 'BINOM School', xp: 1100, avatar: '👨‍🏫' },
  { id: 3, name: 'Сәуле Ким', school: 'NIS FMN', xp: 950, avatar: '👩‍💻' },
  { id: 4, name: 'Қайрат Нұрпейісов', school: '№9 Гимназия', xp: 800, avatar: '👨‍💻' },
];

const LMSDashboard: React.FC = () => {
  // --- STATE ---
  const [currentView, setCurrentView] = useState<LMSView>('dashboard');
  const [userName, setUserName] = useState(() => localStorage.getItem('kiberUstazUser') || "Асқар Асқаров");
  
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('kiberUstazProgress');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeModule, setActiveModule] = useState<CourseModule>(() => {
    const savedId = modulesData.find(m => !completedModules.includes(m.id))?.id || modulesData[0].id;
    return modulesData.find(m => m.id === savedId) || modulesData[0];
  });

  const [showCertificate, setShowCertificate] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem('kiberUstazProgress', JSON.stringify(completedModules));
    localStorage.setItem('kiberUstazUser', userName);
  }, [completedModules, userName]);

  // --- LOGIC ---
  const calculateTotalXP = () => {
    return completedModules.reduce((acc, id) => {
      const module = modulesData.find(m => m.id === id);
      return acc + (module?.xp || 0);
    }, 0);
  };

  const handleMarkAsComplete = () => {
    if (!completedModules.includes(activeModule.id)) {
      setCompletedModules(prev => [...prev, activeModule.id]);
    }
    
    // Auto-advance
    const nextModuleIdx = modulesData.findIndex(m => m.id === activeModule.id) + 1;
    if (nextModuleIdx < modulesData.length) {
      setActiveModule(modulesData[nextModuleIdx]);
    } else {
      setShowCertificate(true);
    }
  };

  const isModuleLocked = (moduleId: number) => {
    if (moduleId === 1) return false;
    const prevModuleId = moduleId - 1;
    return !completedModules.includes(prevModuleId);
  };

  const calculateProgress = () => {
    return Math.round((completedModules.length / modulesData.length) * 100);
  };

  // --- RENDER HELPERS ---
  const renderSidebar = () => (
    <div className="w-20 lg:w-64 bg-[#1e293b] border-r border-white/10 flex flex-col justify-between fixed h-full z-20 transition-all duration-300">
      <div>
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-secondary font-sans hidden lg:block">
            KIBER<span className="text-brand-accent">USTAZ</span>
          </span>
          <span className="lg:hidden text-2xl font-bold text-brand-primary">KU</span>
        </div>

        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${currentView === 'dashboard' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="hidden lg:block font-medium">Курс</span>
          </button>

          <button 
             onClick={() => setCurrentView('leaderboard')}
             className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${currentView === 'leaderboard' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="hidden lg:block font-medium">Рейтинг</span>
          </button>

          <button 
             onClick={() => setCurrentView('profile')}
             className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${currentView === 'profile' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden lg:block font-medium">Профиль</span>
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
          <div className="w-10 h-10 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent font-bold">
            {userName.charAt(0)}
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{userName}</p>
            <p className="text-xs text-brand-accent">{calculateTotalXP()} XP</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    if (showCertificate) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-float">
            <h2 className="text-3xl font-bold mb-6 text-brand-accent">Курс сәтті аяқталды!</h2>
            <Certificate 
              studentName={userName}
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

    // Module Content Renderer
    let content;
    switch (activeModule.type) {
        case 'video':
            content = (
                <>
                <div className="aspect-video bg-black relative w-full rounded-xl overflow-hidden mb-8 shadow-2xl border border-white/10">
                    {activeModule.videoUrl ? (
                    <iframe 
                        width="100%" height="100%" src={activeModule.videoUrl} title={activeModule.title} 
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                    ></iframe>
                    ) : <div className="absolute inset-0 flex items-center justify-center"><p className="text-gray-500">Видео</p></div>}
                </div>
                <div className="flex justify-end">
                    <button 
                    onClick={handleMarkAsComplete}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${completedModules.includes(activeModule.id) ? 'bg-green-600/20 text-green-400 border border-green-600/50 cursor-default' : 'bg-brand-primary text-white hover:bg-brand-primary/80'}`}
                    disabled={completedModules.includes(activeModule.id)}
                    >
                    {completedModules.includes(activeModule.id) ? 'Сабақ аяқталды' : 'Сабақты аяқтау (+50 XP)'}
                    </button>
                </div>
                </>
            );
            break;
        case 'resource':
            content = (
                <div className="bg-[#1e293b] p-8 rounded-xl border border-white/10 mb-8">
                    <h3 className="text-xl font-bold mb-4">Материалдарды жүктеу</h3>
                    <div className="space-y-3 mb-8">
                    {activeModule.resources?.map((res, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-brand-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 font-bold text-xs">DOC</div>
                                <div><p className="font-medium text-white">{res.name}</p><p className="text-xs text-gray-500">{res.size}</p></div>
                            </div>
                            <button className="text-brand-accent hover:text-white transition-colors">Жүктеу</button>
                        </div>
                    ))}
                    </div>
                    <div className="flex justify-end">
                    <button onClick={handleMarkAsComplete} className="px-6 py-3 bg-brand-primary rounded-lg text-white font-bold hover:bg-brand-primary/80 transition-colors">Келесі сабаққа өту (+30 XP)</button>
                    </div>
                </div>
            );
            break;
        case 'quiz':
            content = (
                <div className="mb-8">
                {completedModules.includes(activeModule.id) ? (
                    <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl text-center mb-6">
                        <h3 className="text-green-400 font-bold text-xl mb-2">Тест сәтті тапсырылды!</h3>
                        <p className="text-gray-400 mb-4">Сіз бұл модульді аяқтадыңыз. +{activeModule.xp} XP жинадыңыз.</p>
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
                    <Quiz questions={activeModule.questions || []} onPass={handleMarkAsComplete} />
                )}
                </div>
            );
            break;
    }

    return (
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Module List */}
        <div className="lg:w-1/3 flex-shrink-0">
            <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-white/10 bg-brand-primary/10">
                    <h2 className="text-xl font-bold text-white mb-1">Курс мазмұны</h2>
                    <div className="flex justify-between text-xs text-gray-400 mb-1 mt-4">
                        <span>Прогресс</span><span>{calculateProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-primary to-brand-accent h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${calculateProgress()}%` }}></div>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-350px)]">
                    {modulesData.map((module) => {
                        const locked = isModuleLocked(module.id);
                        const completed = completedModules.includes(module.id);
                        const isActive = activeModule.id === module.id;
                        return (
                            <button
                                key={module.id}
                                onClick={() => { if (!locked) { setActiveModule(module); setShowCertificate(false); }}}
                                className={`w-full p-4 flex items-center gap-3 border-b border-white/5 transition-all text-left ${isActive ? 'bg-brand-primary/20 border-l-4 border-l-brand-primary' : 'hover:bg-white/5 border-l-4 border-l-transparent'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="flex-shrink-0">
                                    {completed ? <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div> 
                                    : locked ? <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center"><svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>
                                    : <div className="w-6 h-6 border-2 border-brand-primary rounded-full flex items-center justify-center text-[10px] font-bold text-brand-primary">{module.id}</div>}
                                </div>
                                <div className="flex-grow">
                                    <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{module.title}</h4>
                                    <span className="text-[10px] text-brand-accent">+{module.xp} XP</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
        {/* Active Content */}
        <div className="lg:w-2/3 flex-grow">
            <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden min-h-[500px] flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block ${activeModule.type === 'quiz' ? 'bg-yellow-500 text-black' : 'bg-brand-primary text-white'}`}>
                        {activeModule.type === 'quiz' ? 'Тест' : activeModule.type === 'resource' ? 'Материал' : 'Сабақ'}
                    </span>
                    <h1 className="text-3xl font-bold text-white">{activeModule.title}</h1>
                    <p className="text-gray-400 mt-2">{activeModule.description}</p>
                </div>
                <div className="p-8 flex-grow">{content}</div>
            </div>
        </div>
      </div>
    );
  };

  const renderLeaderboard = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Үздік Мұғалімдер</h2>
        <p className="text-gray-400">Ең көп ұпай жинаған қатысушылар тізімі</p>
      </div>

      <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden">
        {/* Your Rank */}
        <div className="bg-brand-primary/20 p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-xl">👤</div>
             <div>
               <h3 className="font-bold text-white text-lg">{userName} (Сіз)</h3>
               <p className="text-sm text-gray-400">Деңгей: {Math.floor(calculateTotalXP() / 100) + 1}</p>
             </div>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-brand-accent">{calculateTotalXP()} XP</span>
            <span className="text-sm text-gray-500">Сіздің ұпайыңыз</span>
          </div>
        </div>

        {/* Global Ranks */}
        <div className="divide-y divide-white/5">
          {mockLeaderboard.map((student, idx) => (
            <div key={student.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-6">
                <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${idx === 0 ? 'bg-yellow-500 text-black' : idx === 1 ? 'bg-gray-400 text-black' : idx === 2 ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>
                  {idx + 1}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{student.avatar}</div>
                  <div>
                    <h4 className="font-bold text-white">{student.name}</h4>
                    <p className="text-sm text-gray-500">{student.school}</p>
                  </div>
                </div>
              </div>
              <div className="font-bold text-brand-secondary">{student.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto">
       <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">Жеке кабинет</h2>
          
          <div className="mb-8 flex flex-col items-center">
             <div className="w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg shadow-brand-primary/30">
               {userName.charAt(0)}
             </div>
             <p className="text-gray-400">Оқушы</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Аты-жөні</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5 text-center">
                <span className="block text-2xl font-bold text-brand-primary">{completedModules.length}</span>
                <span className="text-xs text-gray-500">Аяқталған модуль</span>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5 text-center">
                <span className="block text-2xl font-bold text-brand-accent">{calculateTotalXP()}</span>
                <span className="text-xs text-gray-500">Жалпы XP</span>
              </div>
            </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex">
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content Area */}
      <div className="flex-grow lg:ml-64 p-6 lg:p-10 pt-24 lg:pt-10">
        {/* Mobile Header Placeholder (since sidebar is hidden on mobile often, but here fixed width) */}
        
        {currentView === 'dashboard' && renderDashboardContent()}
        {currentView === 'leaderboard' && renderLeaderboard()}
        {currentView === 'profile' && renderProfile()}
      </div>
    </div>
  );
};

export default LMSDashboard;