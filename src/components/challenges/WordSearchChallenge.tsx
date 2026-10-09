import React, { useState } from 'react';
import { sound } from '../../utils/sound';

interface WordSearchChallengeProps {
  onSuccessState: (passed: boolean) => void;
}

export const WordSearchChallenge: React.FC<WordSearchChallengeProps> = ({
  onSuccessState,
}) => {
  // 8x8 Grid with tricky letter decoys
  // Target Word 1: 'HUMAN' (Diagonal from row 1, col 6 down-left: [1,6]='H', [2,5]='U', [3,4]='M', [4,3]='A', [5,2]='N')
  // Target Word 2: 'CAPTCHA' (Vertical down col 1, rows 0 to 6: [0,1]='C', [1,1]='A', [2,1]='P', [3,1]='T', [4,1]='C', [5,1]='H', [6,1]='A')
  // Decoys: 'HUMUS', 'CAPTURE', 'BOT', etc.
  const grid = [
    ['Q', 'C', 'R', 'E', 'Z', 'W', 'P', 'X'], // row 0: 'C' at col 1
    ['B', 'A', 'K', 'V', 'T', 'O', 'H', 'L'], // row 1: 'A' at col 1, 'H' at col 6
    ['D', 'P', 'F', 'J', 'S', 'U', 'N', 'Y'], // row 2: 'P' at col 1, 'U' at col 5
    ['M', 'T', 'G', 'I', 'M', 'K', 'L', 'O'], // row 3: 'T' at col 1, 'M' at col 4
    ['U', 'C', 'X', 'A', 'P', 'T', 'U', 'R'], // row 4: 'C' at col 1, 'A' at col 3 (decoy CAPTUR)
    ['E', 'H', 'N', 'V', 'B', 'O', 'T', 'S'], // row 5: 'H' at col 1, 'N' at col 2 (decoy BOTS)
    ['W', 'A', 'Z', 'J', 'Y', 'C', 'Q', 'F'], // row 6: 'A' at col 1
    ['G', 'H', 'U', 'M', 'U', 'S', 'L', 'K'], // row 7: decoy 'HUMUS'
  ];

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<{ r: number; c: number; char: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const targets = ['CAPTCHA', 'HUMAN'];

  // Check adjacency (distance in row <= 1 and distance in col <= 1)
  const isAdjacent = (r1: number, c1: number, r2: number, c2: number) => {
    return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1 && (r1 !== r2 || c1 !== c2);
  };

  const handleCellClick = (r: number, c: number) => {
    sound.playClick();
    setErrorMessage(null);

    // If cell is already selected in the current path, deselect up to that cell or reset
    const existingIndex = currentSelection.findIndex((s) => s.r === r && s.c === c);
    if (existingIndex !== -1) {
      setCurrentSelection((prev) => prev.slice(0, existingIndex));
      return;
    }

    // Must be adjacent to last selected cell
    if (currentSelection.length > 0) {
      const last = currentSelection[currentSelection.length - 1];
      if (!isAdjacent(last.r, last.c, r, c)) {
        sound.playError();
        setErrorMessage('Must select adjacent consecutive letters (horizontal, vertical, diagonal)');
        return;
      }
    }

    const nextSelection = [...currentSelection, { r, c, char: grid[r][c] }];
    setCurrentSelection(nextSelection);

    // Check if formed word matches any target
    const formedWord = nextSelection.map((s) => s.char).join('');

    if (targets.includes(formedWord) && !foundWords.includes(formedWord)) {
      sound.playSuccess();
      const updatedFound = [...foundWords, formedWord];
      setFoundWords(updatedFound);
      setCurrentSelection([]);

      if (updatedFound.length === targets.length) {
        onSuccessState(true);
      }
    }
  };

  const handleClearCurrent = () => {
    sound.playClick();
    setCurrentSelection([]);
    setErrorMessage(null);
  };

  const allFound = foundWords.length === targets.length;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[350px] mx-auto py-1 select-none">
      {/* Target Word Badges */}
      <div className="flex items-center justify-center gap-3 mb-2 w-full">
        {targets.map((word) => {
          const isDone = foundWords.includes(word);
          return (
            <div
              key={word}
              className={`px-3 py-1 rounded border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                isDone
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
            >
              <span>{isDone ? '✓' : '○'}</span>
              <span>{word}</span>
            </div>
          );
        })}
      </div>

      {/* Selected word live preview */}
      <div className="flex items-center justify-between w-full px-1 mb-1.5 text-xs font-mono">
        <span className="text-gray-500">
          Current:{' '}
          <strong className="text-blue-700">
            {currentSelection.map((s) => s.char).join('') || '—'}
          </strong>
        </span>
        {currentSelection.length > 0 && (
          <button
            type="button"
            onClick={handleClearCurrent}
            className="text-[10px] text-gray-500 hover:text-red-600 underline"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* 8x8 Grid */}
      <div className="grid grid-cols-8 gap-1 bg-[#1e293b] p-2 rounded-md border border-gray-600 shadow-md">
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const isSelected = currentSelection.some((s) => s.r === r && s.c === c);

            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => handleCellClick(r, c)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded font-mono font-black text-xs sm:text-sm transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-gray-950 scale-95 shadow-md ring-2 ring-white'
                    : 'bg-[#334155] hover:bg-[#475569] text-gray-100'
                }`}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      {errorMessage && (
        <div className="mt-1 text-[10px] font-semibold text-rose-600 text-center">
          {errorMessage}
        </div>
      )}

      <div className="mt-2 text-xs font-semibold text-center">
        {allFound ? (
          <span className="text-emerald-600 font-bold">
            ✓ Both Security Words Located! Click VERIFY.
          </span>
        ) : (
          <span className="text-gray-600 text-[11px]">
            Find <strong>CAPTCHA</strong> (vertical) & <strong>HUMAN</strong> (diagonal). Click letters consecutively.
          </span>
        )}
      </div>
    </div>
  );
};
