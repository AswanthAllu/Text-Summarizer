const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { checkPayload } = require('./validate');
const { getSummary } = require('./llm');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/summarize', async (req, res) => {
  const text = req.body?.text;
  
  const isValid = checkPayload(text);
  if (!isValid.valid) {
    return res.status(400).json({ error: isValid.error });
  }

  try {
    const data = await getSummary(text);
    return res.json(data);
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Failed to process the text.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
