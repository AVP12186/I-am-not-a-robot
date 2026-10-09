import React from 'react';

interface TextExactChallengeProps {
  value: string;
  expectedText: string;
  onChange: (val: string) => void;
}

export const TextExactChallenge: React.FC<TextExactChallengeProps> = ({
  value,
  expectedText,
  onChange,
}) => {
  const isMatch = value.trim().toUpperCase() === expectedText.toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-6">
      <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
        Type Required Sequence:
      </div>

      <div className="text-base font-black font-mono tracking-widest text-[#1a73e8] bg-blue-50/80 px-4 py-2 rounded border border-blue-200 mb-4 select-none">
        {expectedText}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="TYPE EXACT STRING"
        className={`w-full max-w-[280px] px-3 py-2.5 text-center text-sm font-mono font-bold tracking-widest uppercase border-2 rounded-[3px] outline-none shadow-sm transition-all ${
          isMatch
            ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800'
            : 'border-gray-300 focus:border-[#1a73e8]'
        }`}
        autoFocus
      />

      <div className="mt-3 text-xs font-semibold">
        {isMatch ? (
          <span className="text-emerald-600">String Verified! Click VERIFY.</span>
        ) : (
          <span className="text-gray-400">Biological keyboard transcription</span>
        )}
      </div>
    </div>
  );
};
