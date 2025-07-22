const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { generateQuestions } = require('./gammaController');

const openaiRoutes = require('./routes/openAi');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/openai', openaiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
