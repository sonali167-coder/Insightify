import React from 'react';
import VoiceRecorder from '../components/VoiceRecorder.jsx';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Welcome to Insightify</h1>
      <VoiceRecorder />
    </div>
  );
};

export default Home;
