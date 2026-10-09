import React from 'react';
import { sound } from '../../utils/sound';

interface StroopColorChallengeProps {
  words: { text: string; color: string; isTarget: boolean }[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export const StroopColorChallenge: React.FC<StroopColorChallengeProps> = ({
  words,
  selectedIndex,
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-4">
      <div className="grid grid-cols-2 gap-3 w-full">
        {words.map((item, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sound.playClick();
                onSelect(idx);
              }}
              style={{ color: item.color }}
              className={`py-4 px-2 bg-white rounded-[3px] border-2 font-black text-xl tracking-wider transition-all outline-none ${
                isSelected
                  ? 'border-[#1a73e8] ring-4 ring-[#1a73e8]/30 scale-95 shadow-md'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 font-medium text-center">
        Reminder: Select the box where the literal text ink color is{' '}
        <span className="text-[#1a73e8] font-bold">BLUE</span>.
      </div>
    </div>
  );
};
