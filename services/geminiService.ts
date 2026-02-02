import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!ai) {
    return "AI жүйесі реттелмеген. Әкімшімен хабарласыңыз.";
  }

  try {
    const modelId = 'gemini-3-flash-preview';
    
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: `Сен — KiberUstaz онлайн мектебінің виртуалды кураторысың. 
        Біздің өнім: "Мұғалімдерге арналған AR/VR технологиялары" курсы.
        
        Курс бағдарламасы:
        1. AR/VR негіздері.
        2. Виртуалды зертханаларды қолдану.
        3. Өз AR сабағыңды жасау (Unity/Spark AR).
        4. Сабаққа геймификация енгізу.
        
        Сенің мақсатың:
        - Қолданушыларды курс сатып алуға ынталандыру.
        - Курсқа қатысты сұрақтарға жауап беру (бағасы, ұзақтығы - 4 апта, сертификат беріледі).
        - Егер оқушы LMS жүйесі туралы сұраса, техникалық көмек көрсету.
        
        Тон: Ынталандырушы, кәсіби, көмекші.
        Тіл: Қазақ тілі.`,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return response.text || "Кешіріңіз, сұранысыңызды өңдей алмадым.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Нейрожелімен байланыс орнатуда қате шықты.";
  }
};