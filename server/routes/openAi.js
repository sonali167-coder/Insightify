const express = require('express');
const router = express.Router();
const { generateQuestions } = require('../gammaController');

router.post('/generate', async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    const response = await generateQuestions(role);
    res.json({ questions: response });
  } catch (error) {
    console.error('Gemma Error:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

module.exports = router;
