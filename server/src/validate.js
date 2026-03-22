const checkPayload = (inputText) => {
  if (!inputText || typeof inputText !== 'string' || !inputText.trim()) {
    return { valid: false, error: 'Seems like the text body was empty.' };
  }
  return { valid: true };
};

module.exports = { checkPayload };
 