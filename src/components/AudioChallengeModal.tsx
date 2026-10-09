import React, { useState } from 'react';
import { Volume2, RefreshCw, Eye, AlertCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface AudioChallengeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AudioChallengeModal: React.FC<AudioChallengeModalProps> = ({ onClose, onSuccess }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);
  
  // Generate random 4 digits every time modal mounts
  const [secretCode, setSecretCode] = useState(() => {
    return String(Math.floor(1000 + Math.random() * 9000));
  });

  const handleGenerateNewChallenge = () => {
    sound.playClick();
    const newCode = String(Math.floor(1000 + Math.random() * 9000));
    setSecretCode(newCode);
    setInputVal('');
    setError(false);
    setIsPlaying(true);
    sound.speakAudioChallenge(newCode, () => setIsPlaying(false));
  };

  const handlePlayAudio = () => {
    sound.playClick();
    setIsPlaying(true);
    sound.speakAudioChallenge(secretCode, () => setIsPlaying(false));
  };

  const handleVerify = () => {
    if (inputVal.trim() === secretCode) {
      sound.playSuccess();
      onSuccess();
    } else {
      sound.playError();
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col justify-between p-6 rounded-[3px] animate-in fade-in duration-200">
      <div className="border-b border-gray-200 pb-3">
        <h3 className="text-base font-semibold text-gray-800">Audio Security Challenge</h3>
        <p className="text-xs text-gray-500 mt-1">
          Listen to the distorted audio transcription and type the numbers you hear.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-6 space-y-4">
        <button
          onClick={handlePlayAudio}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium text-sm transition-all shadow-sm ${
            isPlaying ? 'bg-amber-600 scale-95' : 'bg-[#1a73e8] hover:bg-[#1557b0]'
          }`}
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
          {isPlaying ? 'Playing Audio...' : 'Press to Play Audio'}
        </button>

        <div className="w-full max-w-[240px]">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 4 digits"
            className="w-full px-3 py-2 text-center text-lg font-mono border-2 border-gray-300 rounded focus:border-[#1a73e8] outline-none"
            maxLength={6}
          />
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Incorrect audio code. Listen carefully!
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Eye className="w-4 h-4" />
          Back to Visual
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateNewChallenge}
            className="p-1.5 text-gray-500 hover:text-gray-800 rounded transition-colors"
            title="Get New Audio Challenge"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold uppercase rounded tracking-wider transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};
