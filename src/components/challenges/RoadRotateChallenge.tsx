import React from 'react';
import { sound } from '../../utils/sound';
import { RotateCcw } from 'lucide-react';

interface RoadRotateChallengeProps {
  rotations: number[]; // Array of 4 angles (in degrees, multiples of 90)
  onRotateTile: (index: number) => void;
}

export const RoadRotateChallenge: React.FC<RoadRotateChallengeProps> = ({
  rotations,
  onRotateTile,
}) => {
  const isAligned =
    rotations[0] % 360 === 0 &&
    rotations[1] % 360 === 90 &&
    rotations[2] % 360 === 270 &&
    rotations[3] % 360 === 180;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-3">
      <div className="grid grid-cols-2 gap-2 bg-[#2c3e50] p-3 rounded-[4px] shadow-inner mb-3">
        {rotations.map((deg, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              sound.playClick();
              onRotateTile(idx);
            }}
            style={{ transform: `rotate(${deg}deg)` }}
            className="w-24 h-24 sm:w-28 sm:h-28 bg-[#34495e] border border-gray-600 rounded-[3px] flex items-center justify-center cursor-pointer transition-transform duration-200 outline-none hover:brightness-110 active:scale-95 shadow-md relative group"
            title="Click to rotate 90°"
          >
            {/* SVG quadrant curved road with dashed line */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-1">
              <path
                d="M 100,50 A 50,50 0 0 0 50,100 L 50,100 A 70,70 0 0 1 100,30 Z"
                fill="#e67e22"
              />
              <path
                d="M 100,40 A 60,60 0 0 0 40,100"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="6 6"
                fill="none"
              />
            </svg>
            <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white/70 bg-black/40 px-1 rounded flex items-center gap-0.5">
              <RotateCcw className="w-2.5 h-2.5" /> 90°
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs font-semibold text-center">
        {isAligned ? (
          <span className="text-emerald-600 font-bold">
            Road Network Aligned! Click VERIFY.
          </span>
        ) : (
          <span className="text-gray-500">
            Rotate road tiles into a seamless closed-loop circuit
          </span>
        )}
      </div>
    </div>
  );
};
