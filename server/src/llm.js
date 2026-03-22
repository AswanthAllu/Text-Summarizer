const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generatePrompt } = require('./prompt');

let aiInstance = null;

function setupAi() {
  if (aiInstance) return aiInstance;

  const key = process.env.GEMINI_API_KEY; 
  if (!key) {
    console.error("Missing GEMINI_API_KEY environment variable. Terminating.");
    process.exit(1);
  }
  
  const client = new GoogleGenerativeAI(key);
  aiInstance = client.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });

  return aiInstance;
}

const getSummary = async (rawText) => {
  const model = setupAi();
  const instruction = generatePrompt(rawText);
  
  const geminiRes = await model.generateContent(instruction);
  const rawJsonString = geminiRes.response.text();

  try {
    return JSON.parse(rawJsonString);
  } catch (err) {
    console.error('Failed to parse model output:', err);
    throw new Error('LLM did not return proper JSON format.');
  }
};

module.exports = { getSummary };
