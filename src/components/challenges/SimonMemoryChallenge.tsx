import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/sound';

interface SimonMemoryChallengeProps {
  onSuccessState: (passed: boolean) => void;
}

export const SimonMemoryChallenge: React.FC<SimonMemoryChallengeProps> = ({
  onSuccessState,
}) => {
  // Target sequence: Red (0), Yellow (1), Blue (2), Green (3)
  const targetSeq = [0, 1, 2, 3];
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [activeFlash, setActiveFlash] = useState<number | null>(null);
  const [isDemoing, setIsDemoing] = useState(false);

  const colors = [
    { id: 0, name: 'Red', bg: 'bg-red-500', activeBg: 'bg-red-300' },
    { id: 1, name: 'Yellow', bg: 'bg-amber-400', activeBg: 'bg-amber-200' },
    { id: 2, name: 'Blue', bg: 'bg-blue-600', activeBg: 'bg-blue-300' },
    { id: 3, name: 'Green', bg: 'bg-emerald-500', activeBg: 'bg-emerald-200' },
  ];

  // Play demo sequence on mount
  useEffect(() => {
    setIsDemoing(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < targetSeq.length) {
        const colorId = targetSeq[step];
        setActiveFlash(colorId);
        sound.playSelect();
        setTimeout(() => setActiveFlash(null), 300);
        step++;
      } else {
        clearInterval(interval);
        setIsDemoing(false);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const handlePadClick = (id: number) => {
    if (isDemoing) return;
    sound.playClick();
    setActiveFlash(id);
    setTimeout(() => setActiveFlash(null), 200);

    const nextExpected = targetSeq[playerSeq.length];
    if (id === nextExpected) {
      const next = [...playerSeq, id];
      setPlayerSeq(next);
      if (next.length === targetSeq.length) {
        sound.playSuccess();
        onSuccessState(true);
      }
    } else {
      sound.playError();
      setPlayerSeq([]);
      onSuccessState(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
        {isDemoing ? (
          <span className="text-amber-600 animate-pulse">Memorize the pattern...</span>
        ) : playerSeq.length === targetSeq.length ? (
          <span className="text-emerald-600">Sequence Verified! Click VERIFY.</span>
        ) : (
          `Repeat Sequence: ${playerSeq.length} / 4`
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 w-[220px] aspect-square p-2 bg-gray-900 rounded-full shadow-lg border-4 border-gray-800">
        {colors.map((c) => {
          const isLit = activeFlash === c.id;

          return (
            <button
              key={c.id}
              type="button"
              disabled={isDemoing}
              onClick={() => handlePadClick(c.id)}
              className={`aspect-square rounded-2xl transition-all duration-100 outline-none ${
                isLit ? c.activeBg + ' scale-95 brightness-125' : c.bg + ' opacity-90'
              } hover:opacity-100 active:scale-95`}
            />
          );
        })}
      </div>

      <div className="mt-3 text-xs text-gray-500 font-medium">
        Target order: Red → Yellow → Blue → Green
      </div>
    </div>
  );
};
