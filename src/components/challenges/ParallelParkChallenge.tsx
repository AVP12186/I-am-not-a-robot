import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/sound';

interface ParallelParkChallengeProps {
  onSuccessState: (isParked: boolean) => void;
}

export const ParallelParkChallenge: React.FC<ParallelParkChallengeProps> = ({
  onSuccessState,
}) => {
  // Car position in percentage: x (0 to 100), y (0 to 100), rot (-45 to 45)
  // Starts high up on the street, requiring realistic reverse parallel maneuvering
  const [posX, setPosX] = useState(15);
  const [posY, setPosY] = useState(25);
  const [rot, setRot] = useState(0);

  // Strict parking criteria: vehicle must be squarely inside the parking spot (X: 42..58, Y: 60..74, rot: -10..10)
  const isParked =
    posX >= 42 && posX <= 58 && posY >= 60 && posY <= 74 && Math.abs(rot) <= 10;

  useEffect(() => {
    onSuccessState(isParked);
    if (isParked) {
      sound.playSuccess();
    }
  }, [isParked, onSuccessState]);

  const move = (dx: number, dy: number) => {
    sound.playClick();
    setPosX((prev) => Math.max(5, Math.min(85, prev + dx)));
    setPosY((prev) => Math.max(10, Math.min(80, prev + dy)));
  };

  const rotate = (drot: number) => {
    sound.playClick();
    setRot((prev) => Math.max(-45, Math.min(45, prev + drot)));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-1 select-none">
      {/* Street Canvas */}
      <div className="relative w-full h-[220px] bg-[#374151] rounded-[3px] border-2 border-gray-600 overflow-hidden shadow-inner">
        {/* Road Curb */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#9ca3af] border-t-2 border-dashed border-white/60" />

        {/* Parked Car 1 (Left Car) */}
        <div className="absolute left-[6%] bottom-5 w-16 h-8 bg-red-600 rounded flex items-center justify-center text-[10px] text-white font-bold shadow-md">
          🚗 Car
        </div>

        {/* Strict Parking Bay in the middle */}
        <div
          className={`absolute left-[41%] bottom-5 w-18 h-8 border-2 border-dashed rounded flex flex-col items-center justify-center transition-all ${
            isParked
              ? 'border-emerald-400 bg-emerald-500/30 ring-2 ring-emerald-400'
              : 'border-yellow-400/80 bg-yellow-400/10'
          }`}
        >
          <span className="text-[9px] font-bold text-yellow-300 tracking-wider uppercase">
            PARKING BAY
          </span>
        </div>

        {/* Parked Car 2 (Right Car) */}
        <div className="absolute right-[6%] bottom-5 w-16 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-bold shadow-md">
          🚙 Car
        </div>

        {/* Player Waymo Autonomous Vehicle */}
        <div
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
            transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          }}
          className="absolute w-16 h-8 bg-white border-2 border-[#1a73e8] rounded shadow-xl flex items-center justify-between px-1.5 transition-all duration-75"
        >
          <div className="w-2 h-2 bg-[#1a73e8] rounded-full animate-ping" />
          <span className="text-[8.5px] font-black text-[#1a73e8] tracking-tighter">
            WAYMO
          </span>
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
        </div>
      </div>

      {/* Manual Steering & Drive Controls only */}
      <div className="mt-3 flex flex-col items-center gap-1.5 w-full">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(0, -7)}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded text-xs font-bold text-gray-700 shadow-sm"
          >
            ▲ Forward
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => move(-7, 0)}
            className="px-3.5 py-1.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded text-xs font-bold text-gray-700 shadow-sm"
          >
            ◀ Left
          </button>
          <button
            type="button"
            onClick={() => move(0, 7)}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded text-xs font-bold text-gray-700 shadow-sm"
          >
            ▼ Reverse
          </button>
          <button
            type="button"
            onClick={() => move(7, 0)}
            className="px-3.5 py-1.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded text-xs font-bold text-gray-700 shadow-sm"
          >
            Right ▶
          </button>
        </div>

        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={() => rotate(-12)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-medium text-gray-700 border border-gray-300"
          >
            ↶ Steer Left
          </button>
          <button
            type="button"
            onClick={() => rotate(12)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-medium text-gray-700 border border-gray-300"
          >
            Steer Right ↷
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs font-semibold">
        {isParked ? (
          <span className="text-emerald-600 font-bold">
            Vehicle Parked Squarely! Click VERIFY.
          </span>
        ) : (
          <span className="text-gray-500">
            Maneuver vehicle between the two cars and align straight
          </span>
        )}
      </div>
    </div>
  );
};
