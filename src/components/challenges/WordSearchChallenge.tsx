import React, { useState } from 'react';
import { sound } from '../../utils/sound';

interface WordSearchChallengeProps {
  onSuccessState: (passed: boolean) => void;
}

export const WordSearchChallenge: React.FC<WordSearchChallengeProps> = ({
  onSuccessState,
}) => {
  // 5x5 grid with "HUMAN" placed horizontally or vertically
  // H U M A N on row 2
  const grid = [
    ['T', 'R', 'F', 'O', 'P'],
    ['B', 'Q', 'X', 'Z', 'L'],
    ['H', 'U', 'M', 'A', 'N'],
    ['K', 'D', 'W', 'Y', 'C'],
    ['S', 'V', 'J', 'G', 'E'],
  ];

  const targetSequence = ['H', 'U', 'M', 'A', 'N'];
  const [selectedCoords, setSelectedCoords] = useState<{ r: number; c: number }[]>([]);

  const handleCellClick = (r: number, c: number) => {
    sound.playClick();
    const letter = grid[r][c];
    const nextExpected = targetSequence[selectedCoords.length];

    if (letter === nextExpected) {
      const next = [...selectedCoords, { r, c }];
      setSelectedCoords(next);
      if (next.length === targetSequence.length) {
        sound.playSuccess();
        onSuccessState(true);
      }
    } else {
      sound.playError();
      setSelectedCoords([]);
      onSuccessState(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      <div className="flex items-center gap-1.5 mb-3">
        {targetSequence.map((char, i) => {
          const isFound = i < selectedCoords.length;
          return (
            <span
              key={i}
              className={`w-7 h-7 flex items-center justify-center font-bold text-sm rounded ${
                isFound
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-400 border border-gray-300'
              }`}
            >
              {char}
            </span>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-1.5 bg-[#f0f3f6] p-2 rounded-[3px] border border-gray-300">
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const isSelected = selectedCoords.some((coord) => coord.r === r && coord.c === c);

            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => handleCellClick(r, c)}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded font-mono font-bold text-base transition-all ${
                  isSelected
                    ? 'bg-[#1a73e8] text-white scale-95 shadow-sm'
                    : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      <div className="mt-3 text-xs font-semibold text-center">
        {selectedCoords.length === targetSequence.length ? (
          <span className="text-emerald-600">
            Word Parsed Successfully! Click VERIFY.
          </span>
        ) : (
          <span className="text-gray-500">
            Click letters in consecutive order to spell HUMAN
          </span>
        )}
      </div>
    </div>
  );
};
