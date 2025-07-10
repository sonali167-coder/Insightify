import React from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const VoiceRecorder = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Insightify Recorder</h1>
      <h2 className="text-lg font-semibold mb-6">Record Your Answer</h2>

      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p className="mb-4 text-gray-600">Status: {status}</p>

            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={startRecording}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                🎙️ Start
              </button>
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white px-4 py-2 rounded"
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
        )}
      />
    </div>
  );
};

export default VoiceRecorder;
