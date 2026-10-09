import React, { useEffect, useRef } from 'react';
import { Award, RotateCcw, Share2, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface CertificateViewProps {
  onRestart: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    sound.playSuccess();

    // Canvas Confetti Burst
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#1a73e8', '#ea4335', '#fbbc05', '#34a853', '#9333ea', '#e11d48'];
    const particles = Array.from({ length: 90 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.alpha -= 0.008;
        p.rotation += p.rotSpeed;

        if (p.alpha > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (particles.some((p) => p.alpha > 0)) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleShare = () => {
    sound.playClick();
    const text = "I just beat all 20 levels of Neal.fun's CAPTCHA game without skipping and proved I am 100% biological human!";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative w-full max-w-[420px] bg-white border-8 border-double border-amber-600/70 rounded-lg p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full z-10"
      />

      {/* Certificate Header */}
      <div className="relative z-20">
        <div className="inline-flex p-3 bg-amber-50 rounded-full border border-amber-300 text-amber-600 mb-3 shadow-sm">
          <Award className="w-10 h-10" />
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-black text-gray-900 tracking-wider uppercase mb-1">
          Certificate of Humanity
        </h2>
        <p className="text-xs font-serif tracking-widest text-amber-700 uppercase mb-4">
          Official Biological Entity Attestation
        </p>

        <div className="w-24 h-0.5 bg-amber-600/40 mx-auto mb-4" />

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-serif italic mb-5">
          This document certifies that the operator has triumphed over{' '}
          <strong className="text-gray-900 font-sans font-bold">100 rigorous levels</strong> of botanical fruits disguised as vegetables,
          pastry-canine ambiguity, Minecraft metallurgy, and analog motor calibration with{' '}
          <strong className="text-gray-900 font-sans font-bold">ZERO level skipping</strong>.
        </p>

        <div className="bg-amber-50/60 border border-amber-200/80 rounded p-3 mb-5 inline-block w-full">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4" />
            Rank Achieved: Transcendent Human
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            Issued on: {currentDate} · 100/100 Levels Conquered
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded border border-gray-300 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
