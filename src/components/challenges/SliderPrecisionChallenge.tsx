import React from 'react';
import { sound } from '../../utils/sound';

interface SliderPrecisionChallengeProps {
  value: number;
  targetValue: number;
  onChange: (val: number) => void;
}

export const SliderPrecisionChallenge: React.FC<SliderPrecisionChallengeProps> = ({
  value,
  targetValue,
  onChange,
}) => {
  const isMatch = value === targetValue;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-8 select-none">
      <div className="text-5xl font-black font-mono tracking-tight mb-2">
        <span className={isMatch ? 'text-emerald-600' : 'text-[#1a73e8]'}>
          {value}%
        </span>
      </div>

      <div className="text-xs text-gray-500 font-medium mb-6">
        Calibrate Slider to: <span className="font-extrabold text-gray-900 text-sm">{targetValue}%</span>
      </div>

      <div className="w-full px-6 mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            sound.playClick();
            onChange(v);
          }}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
        />
      </div>

      <div className="flex justify-between w-full px-7 text-[11px] text-gray-400 font-mono mb-4">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      <div className="text-xs font-semibold text-center mt-2">
        {isMatch ? (
          <span className="text-emerald-600 font-bold">
            Calibrated at {targetValue}%! Click VERIFY.
          </span>
        ) : (
          <span className="text-gray-500">
            Slide with analog precision to exactly {targetValue}%
          </span>
        )}
      </div>
    </div>
  );
};
