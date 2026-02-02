import React from 'react';

interface CertificateProps {
  studentName: string;
  courseName: string;
  date: string;
}

const Certificate: React.FC<CertificateProps> = ({ studentName, courseName, date }) => {
  const handleDownload = () => {
    alert("Сертификат PDF форматында жүктелуде...");
  };

  return (
    <div className="bg-white text-black p-1 text-center relative overflow-hidden rounded-xl shadow-2xl max-w-4xl mx-auto border-8 border-brand-primary/30">
      <div className="border-4 border-black p-10 h-full relative z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        {/* Header */}
        <div className="mb-8">
            <span className="text-4xl font-serif font-bold uppercase tracking-widest text-brand-primary block mb-2">Сертификат</span>
            <span className="text-sm uppercase tracking-wide text-gray-600">Курсты сәтті аяқтағаны үшін беріледі</span>
        </div>

        {/* Body */}
        <div className="my-12">
            <p className="text-lg italic text-gray-600 mb-4">Осы сертификат растайды:</p>
            <h2 className="text-5xl font-bold text-[#0f172a] mb-6 font-serif underline decoration-brand-accent/30 decoration-4 underline-offset-8">
                {studentName}
            </h2>
            <p className="text-lg text-gray-600 mb-4">Төмендегі курсты толықтай өтіп шықты:</p>
            <h3 className="text-3xl font-bold text-brand-primary mb-2">"{courseName}"</h3>
            <p className="text-gray-500">Көлемі: 72 академиялық сағат</p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-16 px-12">
            <div className="text-left">
                <div className="w-32 border-b border-black mb-2"></div>
                <p className="font-bold">KiberUstaz CEO</p>
            </div>
            <div className="w-24 h-24 relative">
                 {/* Mock Seal */}
                 <div className="absolute inset-0 border-4 border-brand-primary rounded-full flex items-center justify-center opacity-80 rotate-[-15deg]">
                    <span className="text-xs font-bold text-brand-primary uppercase text-center">Kiber<br/>Ustaz<br/>Approved</span>
                 </div>
            </div>
            <div className="text-right">
                 <p className="font-bold mb-1">{date}</p>
                 <div className="w-32 border-b border-black mb-2"></div>
                 <p className="font-bold">Берілген күні</p>
            </div>
        </div>
      </div>
      
      {/* Download Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <button 
            onClick={handleDownload}
            className="bg-white text-black px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Жүктеп алу
          </button>
      </div>
    </div>
  );
};

export default Certificate;