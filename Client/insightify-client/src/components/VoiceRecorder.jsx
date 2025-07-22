import React, { useEffect, useRef, useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const VoiceRecorder = () => {
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(90); 
  const [isRecording, setIsRecording] = useState(false); 
  const [showToast, setShowToast] = useState(false);

  const start = (startRecording) => {
    setIsRecording(true);
    setTimeLeft(90);
    startRecording();

    // ⏱️ Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = (stopRecording) => {
    clearInterval(timerRef.current);
    setIsRecording(false);
    setTimeLeft(90);
    stopRecording();
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Insightify Recorder</h1>
      <h2 className="text-lg font-semibold mb-6">Record Your Answer</h2>

      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
          useEffect(() => {
            if (timeLeft === 0 && isRecording) {
              stop(stopRecording);
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000)
            }
          }, [timeLeft, isRecording]);

          {showToast && (
            <div className="fixed top-5 right-5 bg-yellow-200 text-yellow-800 px-4 py-2 rounded shadow-lg z-50">
              ⏹️ Auto-stopped after 90 seconds
            </div>
          )}

          return (
            <div>
              <p className="mb-2 text-gray-600">Status: {status}</p>

              {isRecording && (
                    <p
                      className={`font-semibold mb-4 ${
                        timeLeft <= 30
                          ? 'text-red-600 animate-pulse'
                          : 'text-gray-700'
                      }`}
                    >
                      ⏱️ Time left: {timeLeft}s
                    </p>
              )}


              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => start(startRecording)}
                  disabled={isRecording}
                  className={`px-4 py-2 rounded text-white ${
                    isRecording ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  🎙️ Start
                </button>
                <button
                  onClick={() => stop(stopRecording)}
                  disabled={!isRecording}
                  className={`px-4 py-2 rounded text-white ${
                    !isRecording ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  ⏹️ Stop
                </button>
              </div>

              {mediaBlobUrl && (
                <div>
                  <audio src={mediaBlobUrl} controls />
                  <a
                    href={mediaBlobUrl}
                    download="recording.webm"
                    className="block mt-2 text-blue-600 underline"
                  >
                    🔽 Download
                  </a>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default VoiceRecorder;
