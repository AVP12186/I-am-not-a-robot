import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../../utils/sound';

interface ChronometryChallengeProps {
  targetSeconds: number;
  onHoldDuration: (duration: number) => void;
}

export const ChronometryChallenge: React.FC<ChronometryChallengeProps> = ({
  targetSeconds,
  onHoldDuration,
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [liveElapsed, setLiveElapsed] = useState(0);
  const [recordedDuration, setRecordedDuration] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHolding) {
      const update = () => {
        if (startTimeRef.current) {
          const el = (Date.now() - startTimeRef.current) / 1000;
          setLiveElapsed(el);
          animFrameRef.current = requestAnimationFrame(update);
        }
      };
      animFrameRef.current = requestAnimationFrame(update);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHolding]);

  const startHold = () => {
    sound.playClick();
    startTimeRef.current = Date.now();
    setIsHolding(true);
    setLiveElapsed(0);
    setRecordedDuration(null);
  };

  const endHold = () => {
    if (!startTimeRef.current || !isHolding) return;
    const dur = (Date.now() - startTimeRef.current) / 1000;
    startTimeRef.current = null;
    setIsHolding(false);
    setRecordedDuration(dur);
    onHoldDuration(dur);

    if (Math.abs(dur - targetSeconds) <= 0.35) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const isSuccess =
    recordedDuration !== null && Math.abs(recordedDuration - targetSeconds) <= 0.35;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-3 select-none">
      <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
        Goal: Release at exactly{' '}
        <span className="text-gray-900 font-bold">{targetSeconds.toFixed(1)}s</span> (±0.35s)
      </div>

      <div className="relative flex items-center justify-center">
        {/* Holding pulse ring */}
        {isHolding && (
          <div className="absolute inset-0 rounded-full border-4 border-amber-400 animate-ping opacity-40 pointer-events-none" />
        )}

        <button
          type="button"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onTouchStart={(e) => {
            e.preventDefault();
            startHold();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            endHold();
          }}
          className={`w-32 h-32 rounded-full border-4 font-bold text-sm tracking-wider uppercase transition-all shadow-md select-none touch-none flex flex-col items-center justify-center cursor-pointer ${
            isHolding
              ? 'bg-amber-500 border-amber-600 text-white scale-95 shadow-inner'
              : isSuccess
              ? 'bg-emerald-600 border-emerald-700 text-white'
              : 'bg-[#1a73e8] border-[#1557b0] hover:bg-[#1557b0] text-white'
          }`}
        >
          <span>{isHolding ? `${liveElapsed.toFixed(2)}s` : 'HOLD DOWN'}</span>
          <span className="text-[10px] font-normal opacity-85 mt-0.5">
            {isHolding ? `Release near ${targetSeconds.toFixed(1)}s` : 'Press & Hold'}
          </span>
        </button>
      </div>

      <div className="mt-4 text-center">
        {recordedDuration !== null ? (
          <div className="text-sm font-bold">
            Recorded Time:{' '}
            <span
              className={
                isSuccess
                  ? 'text-emerald-600 font-mono text-base font-extrabold'
                  : 'text-red-500 font-mono text-base font-extrabold'
              }
            >
              {recordedDuration.toFixed(2)}s
            </span>{' '}
            <span className="text-xs text-gray-500 font-normal">
              {isSuccess ? '(Passed! ✓ Click VERIFY)' : '(Try again)'}
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-500 font-medium">
            Timer displays live seconds while holding
          </div>
        )}
      </div>
    </div>
  );
};
