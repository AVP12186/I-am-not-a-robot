import React, { useEffect, useRef } from 'react';

interface WigglesChallengeProps {
  code: string;
  value: string;
  onChange: (val: string) => void;
}

export const WigglesChallenge: React.FC<WigglesChallengeProps> = ({
  code,
  value,
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background with soft noisy texture
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 320, 100);

    // Draw wavy lines
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(
        Math.random() * 100 + 50
      )}, ${Math.floor(Math.random() * 160 + 80)}, 0.45)`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * 100);
      ctx.bezierCurveTo(
        Math.random() * 150,
        Math.random() * 100,
        Math.random() * 250,
        Math.random() * 100,
        320,
        Math.random() * 100
      );
      ctx.stroke();
    }

    // Draw random noise dots
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.25)`;
      ctx.fillRect(Math.random() * 320, Math.random() * 100, 2, 2);
    }

    // Draw distorted letters
    ctx.font = 'bold 38px "Courier New", monospace';
    const charSpacing = 320 / (code.length + 1);

    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const x = (i + 1) * charSpacing;
      const y = 60 + (Math.random() - 0.5) * 16;
      ctx.translate(x, y);
      ctx.rotate(((Math.random() - 0.5) * 35 * Math.PI) / 180);
      ctx.fillStyle = '#1a73e8';
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 4;
      ctx.fillText(code[i], -12, 0);
      ctx.restore();
    }
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-2">
      <div className="border border-gray-300 rounded-[3px] overflow-hidden shadow-inner bg-white mb-4">
        <canvas ref={canvasRef} width={320} height={100} className="w-full h-auto block" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="Type characters here"
        maxLength={code.length + 2}
        className="w-full max-w-[240px] px-3 py-2 text-center text-lg font-mono font-bold tracking-widest uppercase border-2 border-gray-300 rounded-[3px] focus:border-[#1a73e8] outline-none shadow-sm"
        autoFocus
      />
    </div>
  );
};
