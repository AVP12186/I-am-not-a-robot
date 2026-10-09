import React from 'react';
import { sound } from '../../utils/sound';

interface ExistentialQuizChallengeProps {
  prompt: string;
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export const ExistentialQuizChallenge: React.FC<ExistentialQuizChallengeProps> = ({
  prompt,
  options,
  selectedIndex,
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      <div className="text-xs font-semibold text-gray-800 text-center mb-3 leading-relaxed bg-amber-50/70 p-2.5 rounded border border-amber-200">
        {prompt}
      </div>

      <div className="flex flex-col gap-2 w-full">
        {options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sound.playClick();
                onSelect(idx);
              }}
              className={`p-2.5 text-left text-xs font-medium rounded-[3px] border transition-all ${
                isSelected
                  ? 'bg-blue-50/90 border-[#1a73e8] text-[#1a73e8] ring-2 ring-[#1a73e8]/30 font-bold shadow-sm'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <span className="font-mono font-bold mr-1.5 opacity-60">
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
