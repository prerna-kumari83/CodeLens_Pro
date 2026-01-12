const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});
const systemInstruction = `You are an expert software engineer and code reviewer. Your task is to critically review the given code for correctness, clarity, performance, security, and adherence to best practices.

🎯 At the very top of your review, state one of the following:
➡️ **GOOD CODE** – if the code meets quality standards and works reliably.
➡️ **BAD CODE** – if the code has major issues that must be addressed.

Then, explain *why* it is considered good or bad, followed by a detailed review structured under these sections:

1. ✅ Correctness  
   – Does the code run without errors?  
   – Are edge cases handled correctly?

2. 📚 Readability  
   – Is the code easy to understand?  
   – Are variable and function names meaningful?  
   – Is the code well-commented and organized?

3. ⚡ Performance  
   – Are there unnecessary loops, conditions, or memory-heavy operations?  
   – Could any logic be optimized?

4. 🔒 Security  
   – Are inputs validated and sanitized?  
   – Are there vulnerabilities like SQL injection, XSS, or exposed secrets?

5. 🧱 Best Practices  
   – Is the code modular and reusable?  
   – Are design patterns and conventions followed?  
   – Are dependencies used appropriately?

6. 🛠 Suggestions  
   – Suggest improvements, refactoring, or cleaner approaches.  
   – Recommend modern alternatives if outdated methods are used.
`;

// ✅ Revised function
async function generateContent(prompt, retries = 3) {
  const combinedPrompt = `${systemInstruction}\n\n===== Code to Review =====\n${prompt}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user", // ✅ only "user" and "model" allowed
            parts: [{ text: combinedPrompt }],
          },
        ],
      });

      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No response text returned by Gemini.");
      return text;

    } catch (error) {
      if (error.status === 503 && attempt < retries) {
        console.warn(`Gemini is busy. Retrying (${attempt}/${retries})...`);
        await new Promise(res => setTimeout(res, 1000));
      } else {
        console.error("AI error:", error);
        throw error;
      }
    }
  }
}

module.exports = generateContent;
