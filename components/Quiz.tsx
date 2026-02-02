import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onPass: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onPass }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: optionIdx });
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);

    // Pass if score is > 50%
    if (correctCount >= Math.ceil(questions.length / 2)) {
      onPass();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    const isPassed = score >= Math.ceil(questions.length / 2);
    return (
      <div className="bg-[#0f172a] p-8 rounded-xl text-center border border-white/10">
        <div className="mb-6">
          {isPassed ? (
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{isPassed ? 'Құттықтаймыз!' : 'Қайта тапсыру қажет'}</h3>
          <p className="text-gray-400">
            Сіз {questions.length} сұрақтың {score}-не дұрыс жауап бердіңіз.
          </p>
        </div>
        
        {isPassed ? (
           <p className="text-green-400 font-bold mb-6">Сабақ аяқталды!</p>
        ) : (
          <button 
            onClick={resetQuiz}
            className="px-6 py-2 bg-brand-primary rounded-lg text-white hover:bg-brand-primary/80 transition-colors"
          >
            Қайта тапсыру
          </button>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
        <span>Сұрақ {currentQuestionIdx + 1} / {questions.length}</span>
        <span>{Math.round(((currentQuestionIdx) / questions.length) * 100)}% аяқталды</span>
      </div>

      <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-6 text-white">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedAnswers[currentQuestionIdx] === idx
                  ? 'border-brand-primary bg-brand-primary/20 text-white'
                  : 'border-white/10 hover:bg-white/5 text-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestionIdx] === undefined}
          className="px-8 py-3 bg-brand-primary rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/80 transition-colors"
        >
          {currentQuestionIdx === questions.length - 1 ? 'Аяқтау' : 'Келесі'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;