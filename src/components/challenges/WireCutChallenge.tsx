import React, { useState } from 'react';
import { sound } from '../../utils/sound';

interface WireCutChallengeProps {
  targetWireColor?: string; // default 'red'
  instructionText?: string;
  onSuccessState: (passed: boolean) => void;
}

export const WireCutChallenge: React.FC<WireCutChallengeProps> = ({
  targetWireColor = 'red',
  instructionText = 'Cut the wire matching biological human hemoglobin (Red)',
  onSuccessState,
}) => {
  const [cutWire, setCutWire] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const wires = [
    { id: 'blue', label: 'Blue (Alternating Current)', color: '#2563eb', stroke: '#1d4ed8' },
    { id: 'red', label: 'Red (Hemoglobin Line)', color: '#dc2626', stroke: '#b91c1c' },
    { id: 'yellow', label: 'Yellow (High Voltage Bus)', color: '#eab308', stroke: '#ca8a04' },
    { id: 'green', label: 'Green (Chassis Ground)', color: '#16a34a', stroke: '#15803d' },
  ];

  const handleCut = (id: string) => {
    if (cutWire) return;
    sound.playClick();
    setCutWire(id);

    if (id === targetWireColor) {
      sound.playSuccess();
      setFailed(false);
      onSuccessState(true);
    } else {
      sound.playError();
      setFailed(true);
      onSuccessState(false);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCutWire(null);
    setFailed(false);
    onSuccessState(false);
  };

  const isSuccess = cutWire === targetWireColor;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-1 select-none">
      <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-3 w-full shadow-inner">
        <div className="text-[11px] font-mono font-bold text-amber-400 mb-2 flex items-center justify-between border-b border-gray-800 pb-1.5">
          <span>⚡ CIRCUIT INTERRUPT</span>
          <span>SECURITY LEVEL: 4</span>
        </div>

        <div className="text-xs text-gray-200 font-medium mb-3 text-center bg-gray-800/80 p-2 rounded border border-gray-700">
          {instructionText}
        </div>

        {/* Wires container */}
        <div className="flex flex-col gap-3 py-2 px-1">
          {wires.map((wire) => {
            const isCut = cutWire === wire.id;
            return (
              <div
                key={wire.id}
                onClick={() => handleCut(wire.id)}
                className={`relative flex items-center justify-between px-3 py-2 rounded cursor-pointer border transition-all ${
                  isCut
                    ? wire.id === targetWireColor
                      ? 'bg-emerald-950/80 border-emerald-500'
                      : 'bg-rose-950/80 border-rose-600'
                    : 'bg-gray-800/60 border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: wire.color }} />
                  <span className="text-xs font-mono font-semibold text-gray-200">
                    {wire.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isCut ? (
                    <span className="text-xs font-bold font-mono text-red-400">
                      ✂️ CUT!
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-400 group-hover:text-white font-mono">
                      [SNIP]
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {failed && (
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow-sm"
        >
          💥 Wrong Wire! Reset Circuit
        </button>
      )}

      <div className="mt-2 text-xs font-semibold text-center">
        {isSuccess ? (
          <span className="text-emerald-600">✓ Correct Circuit Disconnected! Click VERIFY.</span>
        ) : (
          <span className="text-gray-500">Click the designated wire to snip with wirecutters.</span>
        )}
      </div>
    </div>
  );
};
