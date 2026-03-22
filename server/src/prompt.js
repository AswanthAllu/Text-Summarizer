const generatePrompt = (textBlock) => `
You are a summarization assistant.
Convert this block of unstructured text into strict JSON holding a simplified breakdown.

Required JSON Structure:
{
  "summary": "one exact sentence summarizing the core point",
  "keyPoints": ["point one", "point two", "point three"],
  "sentiment": "positive | neutral | negative"
}

Rule limits:
- summary must be purely one single sentence
- keyPoints must be an array of precisely 3 short string takeaways
- sentiment must strictly be one of those three exact labels
- absolutely no markdown code blocks outside of the raw curly brackets
- do not include any other fields

Process this text:
${textBlock}
`;

module.exports = { generatePrompt };
