import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/sound';

interface TicTacToeChallengeProps {
  onGameOutcome: (passed: boolean) => void;
}

export const TicTacToeChallenge: React.FC<TicTacToeChallengeProps> = ({
  onGameOutcome,
}) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [status, setStatus] = useState<string>('Your Turn (X)');

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((sq) => sq !== null)) return 'tie';
    return null;
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || checkWinner(board)) return;

    sound.playClick();
    const newBoard = [...board];
    newBoard[idx] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      sound.playSuccess();
      setStatus('Human Victory! Click VERIFY.');
      onGameOutcome(true);
      return;
    } else if (winner === 'tie') {
      sound.playSuccess();
      setStatus('Strategic Stalemate (Tie)! Click VERIFY.');
      onGameOutcome(true);
      return;
    }

    // AI Turn (O)
    setStatus('Bot thinking...');
    setTimeout(() => {
      // Find empty squares
      const emptyIndices = newBoard
        .map((val, i) => (val === null ? i : null))
        .filter((val) => val !== null) as number[];

      if (emptyIndices.length > 0) {
        // Simple defensive AI or random
        let chosen = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        // Try center if open
        if (newBoard[4] === null) chosen = 4;

        newBoard[chosen] = 'O';
        sound.playSelect();
        setBoard([...newBoard]);

        const nextWinner = checkWinner(newBoard);
        if (nextWinner === 'O') {
          sound.playError();
          setStatus('Bot Won! Resetting...');
          setTimeout(() => {
            setBoard(Array(9).fill(null));
            setStatus('Your Turn (X)');
            onGameOutcome(false);
          }, 1500);
        } else if (nextWinner === 'tie') {
          sound.playSuccess();
          setStatus('Strategic Stalemate (Tie)! Click VERIFY.');
          onGameOutcome(true);
        } else {
          setStatus('Your Turn (X)');
        }
      }
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
        {status}
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] aspect-square bg-gray-200 p-2 rounded-[3px] border border-gray-300">
        {board.map((cell, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleCellClick(idx)}
            className={`aspect-square bg-white rounded flex items-center justify-center text-3xl font-black transition-all ${
              cell === 'X'
                ? 'text-[#1a73e8]'
                : cell === 'O'
                ? 'text-red-500'
                : 'hover:bg-gray-50'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};
