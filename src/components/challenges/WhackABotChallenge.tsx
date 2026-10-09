import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/sound';

interface WhackABotChallengeProps {
  score: number;
  onScoreIncrement: () => void;
}

export const WhackABotChallenge: React.FC<WhackABotChallengeProps> = ({
  score,
  onScoreIncrement,
}) => {
  const [activeMole, setActiveMole] = useState<number | null>(null);

  useEffect(() => {
    if (score >= 5) {
      setActiveMole(null);
      return;
    }

    // Fast, twitch reflex interval: 700ms dwell time
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 9);
      setActiveMole(rand);
    }, 700);

    return () => clearInterval(interval);
  }, [score]);

  const handleWhack = (idx: number) => {
    if (idx === activeMole && score < 5) {
      sound.playWhack();
      setActiveMole(null);
      onScoreIncrement();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
        Bots Eliminated:{' '}
        <span className={score >= 5 ? 'text-emerald-600 font-black' : 'text-[#1a73e8] font-black'}>
          {score} / 5
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-[280px] aspect-square bg-[#f0f3f6] p-2.5 rounded-[4px] border border-gray-300 mb-3">
        {Array.from({ length: 9 }).map((_, idx) => {
          const isMole = idx === activeMole;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleWhack(idx)}
              className="relative aspect-square bg-white rounded border border-gray-300 shadow-sm flex items-center justify-center text-3xl overflow-hidden hover:bg-gray-50 active:scale-95 transition-all outline-none"
            >
              {isMole && (
                <span className="animate-in zoom-in-75 duration-75 select-none">
                  🤖
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 font-medium text-center">
        {score >= 5 ? (
          <span className="text-emerald-600 font-bold">
            Reflexes Verified! Click VERIFY to proceed.
          </span>
        ) : (
          'Test biological reflex: strike fast before the bot evades'
        )}
      </div>
    </div>
  );
};
