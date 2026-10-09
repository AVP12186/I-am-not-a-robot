import React, { useState } from 'react';
import { sound } from '../../utils/sound';

interface MovingBtnChallengeProps {
  onCaptured: (isCaptured: boolean) => void;
}

export const MovingBtnChallenge: React.FC<MovingBtnChallengeProps> = ({ onCaptured }) => {
  const [pos, setPos] = useState({ top: 40, left: 40 });
  const [captured, setCaptured] = useState(false);

  const flee = () => {
    if (captured) return;
    const newTop = Math.floor(Math.random() * 60 + 15);
    const newLeft = Math.floor(Math.random() * 60 + 15);
    setPos({ top: newTop, left: newLeft });
  };

  const handleCapture = () => {
    sound.playSuccess();
    setCaptured(true);
    onCaptured(true);
  };

  return (
    <div className="relative w-full h-[260px] bg-slate-100 rounded-[3px] border border-gray-300 overflow-hidden select-none">
      <button
        type="button"
        onMouseEnter={flee}
        onTouchStart={flee}
        onClick={handleCapture}
        style={{
          top: `${pos.top}%`,
          left: `${pos.left}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className={`absolute px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-150 outline-none shadow-md ${
          captured
            ? 'bg-emerald-600 text-white ring-4 ring-emerald-300'
            : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-90'
        }`}
      >
        {captured ? 'Captured! ✓' : 'Catch Me!'}
      </button>

      <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-gray-500 font-medium">
        {captured ? (
          <span className="text-emerald-600 font-bold">Rogue target trapped! Click VERIFY.</span>
        ) : (
          'Anticipate the evade trajectory to corner the fleeing bot'
        )}
      </div>
    </div>
  );
};
