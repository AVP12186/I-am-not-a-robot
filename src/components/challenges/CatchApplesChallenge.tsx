import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sound } from '../../utils/sound';

interface CatchApplesChallengeProps {
  targetApples?: number;
  onSuccessState: (passed: boolean) => void;
}

export const CatchApplesChallenge: React.FC<CatchApplesChallengeProps> = ({
  targetApples = 3,
  onSuccessState,
}) => {
  const [basketX, setBasketX] = useState(50); // percentage 10..90
  const [caughtCount, setCaughtCount] = useState(0);
  const [failed, setFailed] = useState<string | null>(null);
  const [items, setItems] = useState<{ id: number; x: number; y: number; type: 'apple' | 'chip'; icon: string }[]>([]);
  const nextIdRef = useRef(1);
  const passedRef = useRef(false);

  // Spawn falling objects
  useEffect(() => {
    if (caughtCount >= targetApples || failed) return;

    const interval = setInterval(() => {
      const isApple = Math.random() > 0.35;
      const newItem = {
        id: nextIdRef.current++,
        x: 15 + Math.random() * 70,
        y: 0,
        type: isApple ? ('apple' as const) : ('chip' as const),
        icon: isApple ? '🍎' : '💾',
      };
      setItems((prev) => [...prev, newItem]);
    }, 1200);

    return () => clearInterval(interval);
  }, [caughtCount, failed, targetApples]);

  // Game loop: advance falling objects
  useEffect(() => {
    if (caughtCount >= targetApples || failed) return;

    const loop = setInterval(() => {
      setItems((prev) => {
        const next: typeof prev = [];
        for (const item of prev) {
          const nextY = item.y + 4;

          // Check if item reached basket level (around Y = 80%)
          if (nextY >= 78 && nextY <= 88) {
            // Check horizontal collision with basket (basket width ~ 20%)
            if (Math.abs(item.x - basketX) <= 12) {
              if (item.type === 'apple') {
                sound.playWhack();
                const newCaught = caughtCount + 1;
                setCaughtCount(newCaught);
                if (newCaught >= targetApples && !passedRef.current) {
                  passedRef.current = true;
                  sound.playSuccess();
                  onSuccessState(true);
                }
              } else {
                // Caught a silicon microchip!
                sound.playCollision();
                setFailed('Caught a non-biological silicon microchip!');
                onSuccessState(false);
              }
              continue; // remove collected item
            }
          }

          if (nextY <= 100) {
            next.push({ ...item, y: nextY });
          }
        }
        return next;
      });
    }, 50);

    return () => clearInterval(loop);
  }, [basketX, caughtCount, failed, targetApples, onSuccessState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(12, Math.min(88, pct)));
  };

  const handleReset = () => {
    sound.playClick();
    setCaughtCount(0);
    setFailed(null);
    setItems([]);
    passedRef.current = false;
    onSuccessState(false);
  };

  const isPassed = caughtCount >= targetApples;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-1 select-none">
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full h-[210px] bg-sky-900 border-2 border-gray-700 rounded-lg overflow-hidden cursor-ew-resize shadow-inner"
      >
        {/* HUD */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center bg-black/40 px-2 py-1 rounded text-[11px] font-mono text-white z-10">
          <span>
            ORGANIC APPLES: <strong>{caughtCount} / {targetApples}</strong>
          </span>
          <span className="text-amber-300">AVOID SILICON 💾</span>
        </div>

        {/* Falling items */}
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute text-xl pointer-events-none drop-shadow"
          >
            {item.icon}
          </div>
        ))}

        {/* Player Basket */}
        <div
          style={{
            left: `${basketX}%`,
            top: '84%',
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-16 h-8 bg-amber-800 border-2 border-amber-600 rounded-b-lg flex flex-col items-center justify-center shadow-lg transition-all"
        >
          <div className="w-full h-1 bg-amber-600 border-b border-amber-900 -mt-1" />
          <span className="text-xs">🧺</span>
        </div>

        {/* Failure message overlay */}
        {failed && (
          <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center p-4 text-center z-20">
            <span className="text-2xl mb-1">🤖</span>
            <span className="text-xs font-bold text-white mb-2">{failed}</span>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1 bg-white text-gray-900 font-bold text-xs rounded shadow"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-2 text-xs font-semibold text-center">
        {isPassed ? (
          <span className="text-emerald-600 font-bold">✓ 3 Organic Apples Harvested! Click VERIFY.</span>
        ) : (
          <span className="text-gray-500">
            Slide mouse left/right to catch 3 organic red apples. Dodge the chips!
          </span>
        )}
      </div>
    </div>
  );
};
