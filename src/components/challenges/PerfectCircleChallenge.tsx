import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../../utils/sound';
import { RotateCcw } from 'lucide-react';

interface PerfectCircleChallengeProps {
  onScoreUpdate: (score: number) => void;
}

export const PerfectCircleChallenge: React.FC<PerfectCircleChallengeProps> = ({
  onScoreUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);

  const drawGuide = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 260, 260);
    // Draw guide center dot
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(130, 130, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGuide(ctx);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    pointsRef.current = [];
    const p = getCoordinates(e);
    pointsRef.current.push(p);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGuide(ctx);

    ctx.strokeStyle = '#1a73e8';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const p = getCoordinates(e);
    pointsRef.current.push(p);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const pts = pointsRef.current;
    if (pts.length < 25) {
      setAccuracy(null);
      onScoreUpdate(0);
      return;
    }

    // Centroid calculation
    let cx = 0;
    let cy = 0;
    pts.forEach((p) => {
      cx += p.x;
      cy += p.y;
    });
    cx /= pts.length;
    cy /= pts.length;

    // Radii calculation
    const radii = pts.map((p) => Math.hypot(p.x - cx, p.y - cy));
    const avgRadius = radii.reduce((a, b) => a + b, 0) / radii.length;

    if (avgRadius < 40) {
      setAccuracy(20);
      onScoreUpdate(20);
      return;
    }

    // Variance of radius - strict mathematical deviation
    const variance =
      radii.reduce((sum, r) => sum + Math.pow(r - avgRadius, 2), 0) / radii.length;
    const stdDev = Math.sqrt(variance);

    // Gap between start and end point
    const gap = Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].y - pts[pts.length - 1].y);

    // Hard, authentic circularity scoring (requires smooth hand precision)
    let score = 100 - (stdDev / avgRadius) * 110 - (gap / avgRadius) * 35;
    score = Math.max(0, Math.min(99, Math.round(score)));

    setAccuracy(score);
    onScoreUpdate(score);

    if (score >= 88) {
      sound.playSuccess();
    } else {
      sound.playClick();
    }
  };

  const handleReset = () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGuide(ctx);
    setAccuracy(null);
    onScoreUpdate(0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[340px] mx-auto py-1">
      <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-full w-[260px] h-[260px] cursor-crosshair shadow-inner overflow-hidden flex items-center justify-center select-none touch-none">
        <canvas
          ref={canvasRef}
          width={260}
          height={260}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="w-full h-full block"
        />
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear & Redraw
        </button>
      </div>

      <div className="mt-2 text-center">
        {accuracy !== null ? (
          <div className="text-sm font-bold">
            Circularity Score:{' '}
            <span
              className={
                accuracy >= 88 ? 'text-emerald-600 text-lg font-black' : 'text-red-500 text-lg font-black'
              }
            >
              {accuracy}%
            </span>{' '}
            <span className="text-xs text-gray-500 font-normal">
              {accuracy >= 88 ? '(Passed! ✓)' : '(Target: ≥88%)'}
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-500 font-medium">
            Draw a single continuous circle without lifting (Need ≥88%)
          </div>
        )}
      </div>
    </div>
  );
};
