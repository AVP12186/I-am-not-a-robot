import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../../utils/sound';
import { RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';

interface MazeRunnerChallengeProps {
  onSuccessState: (passed: boolean) => void;
}

interface Point {
  x: number;
  y: number;
}

export const MazeRunnerChallenge: React.FC<MazeRunnerChallengeProps> = ({
  onSuccessState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [userStroke, setUserStroke] = useState<Point[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [hasReachedGoal, setHasReachedGoal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Canvas dimensions
  const W = 330;
  const H = 210;

  // The guide path defined by bezier control points
  // Start at (35, 35) -> Curve through (130, 40), (130, 165), (200, 165) -> Goal at (290, 60)
  const START_PT: Point = { x: 35, y: 35 };
  const GOAL_PT: Point = { x: 290, y: 60 };

  // Generate reference points along the target curve for distance checking
  const referencePoints = useRef<Point[]>([]);

  useEffect(() => {
    // Sample points along the cubic bezier curve
    const pts: Point[] = [];
    for (let t = 0; t <= 1; t += 0.02) {
      // First curve: (35,35) to (195, 165)
      // Second curve: (195, 165) to (290, 60)
      let px: number, py: number;
      if (t <= 0.5) {
        const u = t * 2;
        // Bezier from (35,35) with controls (110, 35) and (110, 165) to (195, 165)
        const mt = 1 - u;
        px = mt * mt * mt * 35 + 3 * mt * mt * u * 110 + 3 * mt * u * u * 110 + u * u * u * 195;
        py = mt * mt * mt * 35 + 3 * mt * mt * u * 35 + 3 * mt * u * u * 165 + u * u * u * 165;
      } else {
        const u = (t - 0.5) * 2;
        // Bezier from (195, 165) with controls (255, 165) and (255, 60) to (290, 60)
        const mt = 1 - u;
        px = mt * mt * mt * 195 + 3 * mt * mt * u * 255 + 3 * mt * u * u * 255 + u * u * u * 290;
        py = mt * mt * mt * 165 + 3 * mt * mt * u * 165 + 3 * mt * u * u * 60 + u * u * u * 60;
      }
      pts.push({ x: px, y: py });
    }
    referencePoints.current = pts;
  }, []);

  // Render the canvas
  const renderCanvas = useCallback(
    (stroke: Point[], isFinished: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, W, H);

      // 1. Sleek blueprint dark background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, W, H);

      // Subtle grid texture
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // 2. Visible Guide Ribbon (Wide track to draw inside)
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 38;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)'; // light cyan guide band
      ctx.beginPath();
      ctx.moveTo(35, 35);
      ctx.bezierCurveTo(110, 35, 110, 165, 195, 165);
      ctx.bezierCurveTo(255, 165, 255, 60, 290, 60);
      ctx.stroke();

      // Ribbon borders
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(35, 35);
      ctx.bezierCurveTo(110, 35, 110, 165, 195, 165);
      ctx.bezierCurveTo(255, 165, 255, 60, 290, 60);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. START Zone (Emerald Target)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(START_PT.x, START_PT.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('START', START_PT.x, START_PT.y);

      // 4. GOAL Zone (Blue Target)
      ctx.fillStyle = isFinished ? '#10b981' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(GOAL_PT.x, GOAL_PT.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(isFinished ? '✓ GOAL' : 'GOAL', GOAL_PT.x, GOAL_PT.y);

      // 5. Draw the user's actual pen stroke in real time!
      if (stroke.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer neon glow
        ctx.shadowColor = isFinished ? '#10b981' : '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 6;
        ctx.strokeStyle = isFinished ? '#34d399' : '#fbbf24';

        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();

        // Inner bright core
        ctx.shadowBlur = 0;
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();

        ctx.restore();

        // Active pen tip circle
        const lastPt = stroke[stroke.length - 1];
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(lastPt.x, lastPt.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [START_PT.x, START_PT.y, GOAL_PT.x, GOAL_PT.y]
  );

  // Initial render
  useEffect(() => {
    renderCanvas([], false);
  }, [renderCanvas]);

  const getCanvasCoords = (clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Evaluate accuracy of drawn stroke against reference points
  const evaluateStroke = (stroke: Point[]) => {
    if (stroke.length < 10) return 0;
    const refs = referencePoints.current;
    if (refs.length === 0) return 0;

    // Check how many reference points have a user stroke point nearby (< 26px)
    let matchedRefs = 0;
    for (const ref of refs) {
      const hasClosePoint = stroke.some(
        (p) => Math.hypot(p.x - ref.x, p.y - ref.y) <= 26
      );
      if (hasClosePoint) matchedRefs++;
    }

    return Math.round((matchedRefs / refs.length) * 100);
  };

  const startDraw = (clientX: number, clientY: number) => {
    const pt = getCanvasCoords(clientX, clientY);
    const distToStart = Math.hypot(pt.x - START_PT.x, pt.y - START_PT.y);

    if (distToStart <= 28) {
      sound.playClick();
      setIsDrawing(true);
      setUserStroke([pt]);
      setHasReachedGoal(false);
      setFeedback(null);
      renderCanvas([pt], false);
    } else {
      setFeedback('Press your mouse or finger on the green START circle to begin drawing.');
      sound.playError();
    }
  };

  const moveDraw = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const pt = getCanvasCoords(clientX, clientY);

    const nextStroke = [...userStroke, pt];
    setUserStroke(nextStroke);

    // Check live accuracy
    const score = evaluateStroke(nextStroke);
    setAccuracy(score);

    // Check if reached GOAL
    const distToGoal = Math.hypot(pt.x - GOAL_PT.x, pt.y - GOAL_PT.y);
    if (distToGoal <= 24) {
      setIsDrawing(false);
      if (score >= 65) {
        setHasReachedGoal(true);
        sound.playSuccess();
        onSuccessState(true);
        setFeedback(`✓ Path Traced Beautifully (${score}% match)! Click VERIFY.`);
        renderCanvas(nextStroke, true);
      } else {
        sound.playError();
        onSuccessState(false);
        setFeedback(`Reached goal, but path was cut too short (${score}%). Follow the cyan track!`);
        renderCanvas(nextStroke, false);
      }
      return;
    }

    renderCanvas(nextStroke, false);
  };

  const endDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (!hasReachedGoal) {
        sound.playError();
        setFeedback('Line ended before reaching the GOAL circle! Click Redraw to try again.');
        onSuccessState(false);
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setUserStroke([]);
    setAccuracy(0);
    setHasReachedGoal(false);
    setFeedback(null);
    onSuccessState(false);
    renderCanvas([], false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[350px] mx-auto py-1 select-none">
      {/* HUD Info */}
      <div className="flex items-center justify-between w-full px-1 mb-1.5 text-xs font-mono">
        <span className="flex items-center gap-1 text-gray-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Draw accuracy: <strong>{accuracy}%</strong></span>
        </span>
        {userStroke.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-blue-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Redraw</span>
          </button>
        )}
      </div>

      {/* Canvas Drawing Surface */}
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl touch-none">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseDown={(e) => startDraw(e.clientX, e.clientY)}
          onMouseMove={(e) => moveDraw(e.clientX, e.clientY)}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              startDraw(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              moveDraw(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={endDraw}
          className="cursor-crosshair block w-full h-[210px]"
        />
      </div>

      {/* Feedback Message */}
      {feedback ? (
        <div
          className={`mt-2 text-xs font-semibold text-center px-2 py-1 rounded w-full ${
            hasReachedGoal
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-amber-700 bg-amber-50 border border-amber-200'
          }`}
        >
          {feedback}
        </div>
      ) : (
        <div className="mt-2 text-xs text-gray-500 text-center font-medium">
          Click & drag to <strong>draw a pen line</strong> from START along the blue track to GOAL.
        </div>
      )}
    </div>
  );
};
