import React, { useState, useEffect, useCallback, useRef } from 'react';
import { sound } from '../../utils/sound';

interface ParallelParkChallengeProps {
  onSuccessState: (isParked: boolean) => void;
}

export const ParallelParkChallenge: React.FC<ParallelParkChallengeProps> = ({
  onSuccessState,
}) => {
  // Vehicle coordinates (in percentage 0..100)
  // Waymo vehicle starts pulled up alongside the front car in the driving lane (standard parallel parking starting stance)
  const START_X = 72;
  const START_Y = 35;
  const START_ROT = 0;

  const [posX, setPosX] = useState(START_X);
  const [posY, setPosY] = useState(START_Y);
  const [rot, setRot] = useState(START_ROT);
  const [steerAngle, setSteerAngle] = useState(0); // -35 to +35 deg front wheels
  const [collisionWarning, setCollisionWarning] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Parking Bay coordinates:
  // Center is strictly at X: 50%, Y: 76%
  const BAY_X = 50;
  const BAY_Y = 76;

  // Strict parking criteria:
  // Must be strictly centered inside the marked box (NOT above it!), and straightened out!
  const isParked =
    !collisionWarning &&
    !isResetting &&
    Math.abs(posX - BAY_X) <= 3.8 &&
    Math.abs(posY - BAY_Y) <= 3.8 &&
    Math.abs(rot) <= 6;

  // Distance to bay center
  const distToBay = Math.sqrt(
    Math.pow(posX - BAY_X, 2) + Math.pow(posY - BAY_Y, 2)
  );

  const prevParkedRef = useRef(false);

  useEffect(() => {
    onSuccessState(isParked);
    if (isParked && !prevParkedRef.current) {
      sound.playSuccess();
    }
    prevParkedRef.current = isParked;
  }, [isParked, onSuccessState]);

  // Trigger collision response
  const triggerCollision = useCallback((reason: string) => {
    sound.playCollision();
    setCollisionWarning(reason);
    setIsResetting(true);
    setTimeout(() => {
      setPosX(START_X);
      setPosY(START_Y);
      setRot(START_ROT);
      setSteerAngle(0);
      setCollisionWarning(null);
      setIsResetting(false);
    }, 900);
  }, []);

  // Check collision with obstacles:
  // Rear Car: center at (18%, 76%), size ~ 20% x 16%
  // Front Car: center at (82%, 76%), size ~ 20% x 16%
  // Bottom Curb: Y > 85%
  // Top Lane limit: Y < 18%
  const checkCollisions = useCallback(
    (newX: number, newY: number) => {
      // Curb collision
      if (newY > 85.5) {
        triggerCollision('💥 CURB STRIKE! Tire contacted sidewalk');
        return true;
      }
      // Top wall collision
      if (newY < 18) {
        triggerCollision('💥 OFF-ROAD! Vehicle crossed yellow safety barrier');
        return true;
      }
      // Road boundaries left/right
      if (newX < 6 || newX > 94) {
        triggerCollision('💥 BOUNDARY! Left roadway perimeter');
        return true;
      }
      // Rear car collision (Obstacle 1 at X: 18, Y: 76)
      if (newX < 31 && newY > 61) {
        triggerCollision('💥 IMPACT! Struck red sedan behind parking bay');
        return true;
      }
      // Front car collision (Obstacle 2 at X: 82, Y: 76)
      if (newX > 69 && newY > 61) {
        triggerCollision('💥 IMPACT! Struck blue SUV in front of parking bay');
        return true;
      }
      return false;
    },
    [triggerCollision]
  );

  // Vehicle motion mechanics (authentic kinematic model)
  const drive = useCallback(
    (direction: 'forward' | 'reverse') => {
      if (isResetting) return;
      sound.playClick();

      const speed = direction === 'forward' ? 3.5 : -3.5;
      const rad = (rot * Math.PI) / 180;

      // Kinematic displacement based on heading
      const dx = Math.cos(rad) * speed;
      const dy = Math.sin(rad) * speed;

      // Turning based on front wheel steering angle
      const rotDelta = (steerAngle / 35) * (direction === 'forward' ? 3.8 : -3.8);

      const nextX = Math.max(4, Math.min(96, posX + dx));
      const nextY = Math.max(12, Math.min(88, posY + dy));
      let nextRot = rot + rotDelta;
      if (nextRot > 180) nextRot -= 360;
      if (nextRot < -180) nextRot += 360;

      if (!checkCollisions(nextX, nextY)) {
        setPosX(nextX);
        setPosY(nextY);
        setRot(nextRot);
        if (Math.abs(nextY - BAY_Y) < 12) {
          sound.playSensorBeep(1.2);
        }
      }
    },
    [isResetting, posX, posY, rot, steerAngle, checkCollisions]
  );

  // Steer adjustment
  const adjustSteer = useCallback(
    (delta: number) => {
      if (isResetting) return;
      sound.playClick();
      setSteerAngle((prev) => Math.max(-35, Math.min(35, prev + delta)));
    },
    [isResetting]
  );

  // Center wheel steer
  const centerSteer = useCallback(() => {
    sound.playClick();
    setSteerAngle(0);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        drive('forward');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        drive('reverse');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        adjustSteer(-12);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        adjustSteer(12);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setPosX(START_X);
        setPosY(START_Y);
        setRot(START_ROT);
        setSteerAngle(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drive, adjustSteer]);

  // Ultrasonic sensor distance calculations (mock telemetry)
  const rearDist = Math.max(0.2, (posX - 28) / 10).toFixed(1);
  const frontDist = Math.max(0.2, (72 - posX) / 10).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[360px] mx-auto py-1 select-none">
      {/* Waymo LIDAR HUD Status Bar */}
      <div className="w-full flex items-center justify-between px-2 py-1 bg-gray-900 border border-gray-700 text-[10px] text-gray-300 rounded-t font-mono mb-0.5">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          WAYMO LIDAR: ACTIVE
        </span>
        <span>
          STEER: <strong className="text-amber-400">{steerAngle}°</strong>
        </span>
        <span>
          BAY DIST: <strong className="text-cyan-300">{distToBay.toFixed(1)}m</strong>
        </span>
      </div>

      {/* Street Canvas */}
      <div className="relative w-full h-[230px] bg-[#2d3748] border-2 border-gray-700 overflow-hidden shadow-inner">
        {/* Yellow Top Lane Divider */}
        <div className="absolute top-[18%] left-0 right-0 h-1 bg-yellow-500/80 border-b border-yellow-600" />
        
        {/* Center Road Dashes */}
        <div className="absolute top-[52%] left-0 right-0 flex justify-around pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-6 h-0.5 bg-white/40" />
          ))}
        </div>

        {/* Sidewalk Curb with stone texture and safety markings */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#64748b] border-t-2 border-amber-400">
          <div className="w-full h-full opacity-30 flex items-center justify-around">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-full border-r border-black/40 -skew-x-12" />
            ))}
          </div>
        </div>

        {/* Obstacle 1: Parked Red Sedan (Rear) */}
        <div
          style={{
            left: '18%',
            top: '76%',
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-[68px] h-[34px] bg-red-700 rounded-md border-2 border-red-950 flex flex-col justify-between p-0.5 shadow-lg pointer-events-none"
        >
          <div className="flex justify-between px-1">
            <div className="w-2 h-1 bg-amber-400 rounded-xs" />
            <div className="w-2 h-1 bg-amber-400 rounded-xs" />
          </div>
          <div className="text-[8px] font-black text-white text-center tracking-tighter opacity-90">
            PARKED CAR
          </div>
          <div className="flex justify-between px-1">
            <div className="w-2.5 h-1 bg-red-400 rounded-xs" />
            <div className="w-2.5 h-1 bg-red-400 rounded-xs" />
          </div>
        </div>

        {/* Strict Designated Parking Bay in the middle */}
        {/* Center strictly at X: 50%, Y: 76% */}
        <div
          style={{
            left: `${BAY_X}%`,
            top: `${BAY_Y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          className={`absolute w-[76px] h-[38px] border-2 border-dashed rounded flex flex-col items-center justify-center transition-all ${
            isParked
              ? 'border-emerald-400 bg-emerald-500/40 ring-4 ring-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.8)]'
              : 'border-yellow-400/90 bg-yellow-400/10'
          }`}
        >
          <span
            className={`text-[8.5px] font-black tracking-wider uppercase ${
              isParked ? 'text-white' : 'text-yellow-300'
            }`}
          >
            {isParked ? '✓ PERFECT FIT' : 'PARKING BAY'}
          </span>
          <span className="text-[7.5px] font-mono text-white/70">
            {isParked ? '0.0m DEVIATION' : 'SPOT #404'}
          </span>
        </div>

        {/* Obstacle 2: Parked Blue SUV (Front) */}
        <div
          style={{
            left: '82%',
            top: '76%',
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-[68px] h-[34px] bg-blue-700 rounded-md border-2 border-blue-950 flex flex-col justify-between p-0.5 shadow-lg pointer-events-none"
        >
          <div className="flex justify-between px-1">
            <div className="w-2 h-1 bg-amber-400 rounded-xs" />
            <div className="w-2 h-1 bg-amber-400 rounded-xs" />
          </div>
          <div className="text-[8px] font-black text-white text-center tracking-tighter opacity-90">
            PARKED SUV
          </div>
          <div className="flex justify-between px-1">
            <div className="w-2.5 h-1 bg-red-400 rounded-xs" />
            <div className="w-2.5 h-1 bg-red-400 rounded-xs" />
          </div>
        </div>

        {/* Waymo Autonomous Vehicle (Player) */}
        <div
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
            transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          }}
          className={`absolute w-[68px] h-[34px] bg-white border-2 rounded-md shadow-2xl flex items-center justify-between px-1 transition-transform duration-75 ${
            isParked
              ? 'border-emerald-500 ring-2 ring-emerald-400'
              : collisionWarning
              ? 'border-red-600 bg-red-100 ring-4 ring-red-500'
              : 'border-[#1a73e8]'
          }`}
        >
          {/* Rear Taillights */}
          <div className="flex flex-col justify-between h-full py-1">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-xs shadow-xs" />
            <div className="w-1.5 h-1.5 bg-red-600 rounded-xs shadow-xs" />
          </div>

          {/* Roof Mounted Waymo LIDAR Sensor Dome */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-4 h-4 bg-cyan-600 rounded-full border border-cyan-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <div className="absolute -top-1 w-2.5 h-2.5 rounded-full border border-cyan-300/60 animate-spin" />
            </div>
            <span className="text-[7px] font-black text-[#1a73e8] tracking-tighter mt-0.5">
              WAYMO
            </span>
          </div>

          {/* Front Headlights & Steered Wheels */}
          <div className="flex flex-col justify-between h-full py-1">
            <div
              style={{ transform: `rotate(${steerAngle}deg)` }}
              className="w-1.5 h-2 bg-amber-400 rounded-xs transition-transform"
            />
            <div
              style={{ transform: `rotate(${steerAngle}deg)` }}
              className="w-1.5 h-2 bg-amber-400 rounded-xs transition-transform"
            />
          </div>
        </div>

        {/* Collision Alert Banner Overlay */}
        {collisionWarning && (
          <div className="absolute inset-x-2 top-2 bg-red-600 text-white text-[11px] font-black py-1.5 px-2 rounded shadow-2xl flex items-center justify-center text-center animate-bounce z-30">
            {collisionWarning}
          </div>
        )}
      </div>

      {/* Autonomous Navigation Controls */}
      <div className="mt-2.5 flex flex-col items-center gap-1.5 w-full bg-gray-50 border border-gray-300 rounded p-2 shadow-xs">
        {/* Drive & Reverse Buttons */}
        <div className="flex gap-3 w-full justify-center">
          <button
            type="button"
            onClick={() => drive('forward')}
            disabled={isResetting}
            className="flex-1 max-w-[130px] py-2 bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#0d47a1] text-white rounded font-bold text-xs shadow-sm flex items-center justify-center gap-1 transition-all disabled:opacity-50"
          >
            <span>▲ Drive</span>
            <span className="text-[9px] opacity-75">(W / ↑)</span>
          </button>
          <button
            type="button"
            onClick={() => drive('reverse')}
            disabled={isResetting}
            className="flex-1 max-w-[130px] py-2 bg-gray-800 hover:bg-gray-900 active:bg-black text-white rounded font-bold text-xs shadow-sm flex items-center justify-center gap-1 transition-all disabled:opacity-50"
          >
            <span>▼ Reverse</span>
            <span className="text-[9px] opacity-75">(S / ↓)</span>
          </button>
        </div>

        {/* Steering Controls */}
        <div className="flex gap-2 items-center w-full justify-center mt-1">
          <button
            type="button"
            onClick={() => adjustSteer(-12)}
            disabled={isResetting}
            className="flex-1 max-w-[100px] py-1.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded text-xs font-semibold text-gray-800 border border-gray-300 disabled:opacity-50"
          >
            ◀ Turn Left
          </button>
          <button
            type="button"
            onClick={centerSteer}
            disabled={isResetting}
            className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-[11px] font-mono text-gray-600 border border-gray-300"
            title="Center Wheels (0°)"
          >
            Center (0°)
          </button>
          <button
            type="button"
            onClick={() => adjustSteer(12)}
            disabled={isResetting}
            className="flex-1 max-w-[100px] py-1.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded text-xs font-semibold text-gray-800 border border-gray-300 disabled:opacity-50"
          >
            Turn Right ▶
          </button>
        </div>

        {/* Helpful instructions */}
        <div className="text-[11px] font-medium text-center mt-0.5">
          {isParked ? (
            <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
              ✓ Waymo Squarely Parked Inside Bay! Click VERIFY.
            </span>
          ) : (
            <span className="text-gray-600">
              Reverse into the bay between the cars. Avoid colliding with bumpers or curb!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
