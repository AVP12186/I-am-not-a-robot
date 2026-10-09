import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/sound';

interface ReactionSpeedChallengeProps {
  onSuccessState: (passed: boolean) => void;
}

export const ReactionSpeedChallenge: React.FC<ReactionSpeedChallengeProps> = ({
  onSuccessState,
}) => {
  // States: 'waiting' (red), 'ready' (green), 'result' (done), 'too_early' (false start)
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'result' | 'too_early'>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [isHumanRange, setIsHumanRange] = useState(false);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);
    setIsHumanRange(false);
    onSuccessState(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    // Random delay between 1.5s and 3.5s
    const delay = 1500 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = performance.now();
    }, delay);
  };

  useEffect(() => {
    startTest();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    sound.playClick();

    if (gameState === 'waiting') {
      // Clicked too early!
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('too_early');
      sound.playError();
      return;
    }

    if (gameState === 'ready') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setGameState('result');

      // Human reaction time: biological nerve conduction takes between 140ms and 550ms
      // Anything below 120ms is flagged as bot anticipation/script
      if (elapsed >= 140 && elapsed <= 550) {
        setIsHumanRange(true);
        sound.playSuccess();
        onSuccessState(true);
      } else if (elapsed < 140) {
        setIsHumanRange(false);
        sound.playError();
        onSuccessState(false);
      } else {
        // Too slow
        setIsHumanRange(false);
        sound.playError();
        onSuccessState(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2 select-none">
      <div
        onClick={handleClick}
        className={`w-full h-[180px] rounded-lg border-2 flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-150 shadow-md ${
          gameState === 'waiting'
            ? 'bg-rose-600 border-rose-800 text-white'
            : gameState === 'ready'
            ? 'bg-emerald-500 border-emerald-600 text-white animate-pulse'
            : gameState === 'too_early'
            ? 'bg-amber-600 border-amber-800 text-white'
            : isHumanRange
            ? 'bg-blue-600 border-blue-800 text-white'
            : 'bg-rose-700 border-rose-950 text-white'
        }`}
      >
        {gameState === 'waiting' && (
          <>
            <span className="text-3xl mb-1">⏳</span>
            <span className="text-base font-black tracking-wider uppercase">WAIT FOR GREEN...</span>
            <span className="text-[11px] opacity-80 mt-1">Do not click yet!</span>
          </>
        )}

        {gameState === 'ready' && (
          <>
            <span className="text-3xl mb-1 animate-bounce">⚡</span>
            <span className="text-xl font-black tracking-widest uppercase">CLICK NOW!</span>
            <span className="text-[11px] opacity-90 mt-1">Measuring synaptic velocity...</span>
          </>
        )}

        {gameState === 'too_early' && (
          <>
            <span className="text-3xl mb-1">⚠️</span>
            <span className="text-sm font-bold uppercase">TOO EARLY!</span>
            <span className="text-[11px] opacity-90 mt-1 text-center">
              Anticipation detected. Real humans wait for visual photons.
            </span>
          </>
        )}

        {gameState === 'result' && (
          <>
            <span className="text-3xl mb-1">{isHumanRange ? '🧬' : '🤖'}</span>
            <span className="text-xl font-black">
              {reactionTime} ms
            </span>
            <span className="text-[11px] font-semibold mt-1 text-center">
              {isHumanRange
                ? '✓ Biological synaptic reflex verified (140-550ms)!'
                : reactionTime! < 140
                ? '❌ <140ms: Suspiciously inhuman microsecond latency!'
                : '❌ >550ms: Biological neurons too slow! Try again.'}
            </span>
          </>
        )}
      </div>

      {(gameState === 'too_early' || (gameState === 'result' && !isHumanRange)) && (
        <button
          type="button"
          onClick={startTest}
          className="mt-2.5 px-4 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold rounded shadow-sm"
        >
          🔄 Retry Reflex Test
        </button>
      )}

      <div className="mt-2 text-[11px] text-gray-500 font-medium text-center">
        {isHumanRange ? (
          <span className="text-emerald-600 font-bold">Reflex Verified! Click VERIFY below.</span>
        ) : (
          <span>Click the box the instant it turns emerald green.</span>
        )}
      </div>
    </div>
  );
};
