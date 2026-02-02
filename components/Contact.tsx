import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Рахмет! Біз жақын арада сізбен хабарласамыз.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Bg Gradient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Цифрлық трансформацияға <br/>дайынсыз ба?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Өтінім қалдырыңыз, біз сіздің оқу орныңызда немесе кеңсеңізде VR/AR өнімдеріміздің тегін демонстрациясын өткіземіз.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Мекенжай</h4>
                  <p className="text-gray-400">Астана қ., Инновация көшесі, 42</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                   <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <p className="text-gray-400">info@kiberustaz.kz</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Сіздің атыңыз</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Асқар Асқаров"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="askar@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Хабарлама</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-brand-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                  placeholder="Тапсырмаларыңыз туралы айтып беріңіз..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary py-4 rounded-lg font-bold text-white shadow-lg hover:shadow-brand-primary/50 transition-all transform hover:-translate-y-1"
              >
                Жіберу
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;