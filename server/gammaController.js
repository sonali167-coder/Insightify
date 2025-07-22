const { spawn } = require('child_process');

function generateQuestions(role) {
  return new Promise((resolve, reject) => {
    const ollama = spawn('ollama', ['run', 'gemma:7b']);

    let output = '';

    ollama.stdout.on('data', (data) => {
      output += data.toString();
    });

    ollama.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ollama.on('close', (code) => {
      if (code !== 0) {
        return reject(`Ollama exited with code ${code}`);
      }
      resolve(output.trim());
    });

    // Send prompt
    ollama.stdin.write(`Generate 5 interview questions for a ${role}.\n`);
    ollama.stdin.end();
  });
}

module.exports = { generateQuestions };
