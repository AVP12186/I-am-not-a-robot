import React, { useState } from 'react';
import { sound } from '../../utils/sound';

interface ClickSpamChallengeProps {
  targetCount: number;
  onSuccess: (isDone: boolean) => void;
}

export const ClickSpamChallenge: React.FC<ClickSpamChallengeProps> = ({
  targetCount,
  onSuccess,
}) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    sound.playClick();
    const next = clicks + 1;
    setClicks(next);
    if (next >= targetCount) {
      sound.playSuccess();
      onSuccess(true);
    }
  };

  const isComplete = clicks >= targetCount;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-6">
      <div className="text-3xl font-black font-mono tracking-tight mb-2">
        <span className={isComplete ? 'text-emerald-600' : 'text-[#1a73e8]'}>
          {clicks} / {targetCount}
        </span>
      </div>

      <div className="text-xs text-gray-500 font-medium mb-5">
        Neural impulse motor actuation test
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={isComplete}
        className={`w-36 h-36 rounded-full font-extrabold text-sm uppercase tracking-wider transition-all select-none shadow-lg flex flex-col items-center justify-center active:scale-90 ${
          isComplete
            ? 'bg-emerald-600 text-white cursor-default'
            : 'bg-[#1a73e8] hover:bg-[#1557b0] text-white cursor-pointer'
        }`}
      >
        <span>{isComplete ? 'Target Reached! ✓' : 'TAP RAPIDLY!'}</span>
        <span className="text-[10px] font-normal opacity-80 mt-1">
          {isComplete ? 'Click Verify' : `${targetCount - clicks} remaining`}
        </span>
      </button>
    </div>
  );
};
