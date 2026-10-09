import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/sound';

interface PatternMemoryChallengeProps {
  onSuccessState: (passed: boolean) => void;
}

export const PatternMemoryChallenge: React.FC<PatternMemoryChallengeProps> = ({
  onSuccessState,
}) => {
  const [targetIndices, setTargetIndices] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isMemorizing, setIsMemorizing] = useState(true);
  const [failed, setFailed] = useState(false);
  const passedRef = useRef(false);

  const startNewRound = () => {
    setSelectedIndices([]);
    setFailed(false);
    setIsMemorizing(true);
    onSuccessState(false);
    passedRef.current = false;

    // Pick 3 unique random tiles out of 9
    const indices: number[] = [];
    while (indices.length < 3) {
      const rand = Math.floor(Math.random() * 9);
      if (!indices.includes(rand)) indices.push(rand);
    }
    setTargetIndices(indices);

    // Memorize for 1.4 seconds
    setTimeout(() => {
      setIsMemorizing(false);
    }, 1400);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleTileClick = (index: number) => {
    if (isMemorizing || failed || passedRef.current) return;
    sound.playClick();

    if (selectedIndices.includes(index)) return;

    if (!targetIndices.includes(index)) {
      // Wrong tile!
      sound.playError();
      setFailed(true);
      onSuccessState(false);
      return;
    }

    const nextSelected = [...selectedIndices, index];
    setSelectedIndices(nextSelected);

    if (nextSelected.length === targetIndices.length) {
      sound.playSuccess();
      passedRef.current = true;
      onSuccessState(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-1 select-none">
      <div className="text-xs font-mono font-bold text-gray-700 mb-2">
        {isMemorizing ? (
          <span className="text-amber-600 animate-pulse">MEMORIZE THE 3 TILES...</span>
        ) : (
          <span className="text-gray-600">RECALL AND CLICK THE 3 TILES: ({selectedIndices.length}/3)</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-3 rounded-lg border border-gray-300">
        {[...Array(9)].map((_, i) => {
          const isTarget = targetIndices.includes(i);
          const isSelected = selectedIndices.includes(i);
          const showGold = (isMemorizing && isTarget) || isSelected;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleTileClick(i)}
              disabled={isMemorizing}
              className={`w-16 h-16 rounded-md font-mono text-lg font-bold transition-all shadow-sm ${
                showGold
                  ? 'bg-amber-400 border-2 border-amber-600 text-amber-950 scale-95 shadow-md'
                  : 'bg-white hover:bg-gray-100 border border-gray-300 text-gray-400'
              }`}
            >
              {showGold ? '★' : ''}
            </button>
          );
        })}
      </div>

      {failed && (
        <button
          type="button"
          onClick={startNewRound}
          className="mt-2.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow-sm"
        >
          ❌ Memory Glitch! Try Again
        </button>
      )}

      <div className="mt-2 text-xs font-semibold text-center">
        {passedRef.current ? (
          <span className="text-emerald-600 font-bold">✓ Short-Term Working Memory Verified! Click VERIFY.</span>
        ) : (
          <span className="text-gray-500">
            Biological human hippocampal pattern recall test.
          </span>
        )}
      </div>
    </div>
  );
};
