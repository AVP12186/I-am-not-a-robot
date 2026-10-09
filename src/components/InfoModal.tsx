import React, { useState, useMemo } from 'react';
import { X, ShieldCheck, ExternalLink, HelpCircle, KeyRound, ArrowRight, LayoutGrid, Search, Check } from 'lucide-react';
import { sound } from '../utils/sound';
import { GAME_LEVELS } from '../data/levels';
import { LevelConfig } from '../types/game';

interface InfoModalProps {
  hint?: string;
  onClose: () => void;
  onJumpToLevel?: (level: number) => void;
}

// Convert long challenge targets into clean, punchy grid labels
// E.g. "Waymo Parallel Parking Quest" becomes "Waymo Park"
export function getShortLevelName(lvl: LevelConfig): string {
  if (lvl.type === 'parallel_park' || lvl.target.includes('WAYMO') || lvl.title.toLowerCase().includes('waymo')) {
    return 'Waymo Park';
  }
  if (lvl.type === 'word_search') return 'Word Search';
  if (lvl.type === 'maze_runner') return 'Trace Path';
  if (lvl.type === 'catch_apples') return 'Catch Apples';
  if (lvl.type === 'pattern_memory') return 'Memory Matrix';
  if (lvl.type === 'reaction_speed') return 'Reflex Test';
  if (lvl.type === 'wire_cut') {
    const col = lvl.targetWireColor ? lvl.targetWireColor.toUpperCase() : 'LINE';
    return `Wire Cut (${col})`;
  }
  if (lvl.type === 'craftcha') {
    if (lvl.targetCraftRecipe === 'diamond_pickaxe') return 'Diamond Pickaxe';
    if (lvl.targetCraftRecipe === 'wooden_sword') return 'Wooden Sword';
    return 'Craft Recipe';
  }
  if (lvl.type === 'perfect_circle') return 'Draw Circle';
  if (lvl.type === 'whack_a_bot') return 'Whack-A-Bot';
  if (lvl.type === 'tic_tac_toe') return 'Tic-Tac-Toe';
  if (lvl.type === 'slider_precision') return `Slider ${lvl.targetSliderValue || 50}%`;
  if (lvl.type === 'chronometry') return `Hold ${lvl.targetHoldSeconds || 3}s`;
  if (lvl.type === 'road_rotate') return 'Rotate Road';
  if (lvl.type === 'simon_memory') return 'Simon Memory';
  if (lvl.type === 'moving_btn') return 'Catch Button';
  if (lvl.type === 'click_spam') return `Click ${lvl.targetClickCount || 15}x`;
  if (lvl.type === 'wiggles') return 'Wavy Code';
  if (lvl.type === 'certificate') return 'Certificate';
  if (lvl.type === 'checkbox') return "I'm Not A Robot";

  const target = lvl.target
    .replace('SELECT ALL ', '')
    .replace('ALL SQUARES WITH ', '')
    .replace('FIND THE WORD: ', '')
    .replace('TYPE: ', '')
    .trim();

  const cleanMap: Record<string, string> = {
    'STOP SIGNS': 'Stop Signs',
    'TRAFFIC LIGHTS': 'Traffic Lights',
    'FIRE HYDRANTS': 'Fire Hydrants',
    'CROSSWALKS': 'Crosswalks',
    'VEGETABLES': 'Vegetables',
    'CHIHUAHUAS': 'Chihuahuas',
    'CHIHUAHUA FACES': 'Chihuahuas',
    'FRIED CHICKEN': 'Fried Chicken',
    'FRENCH CROISSANTS': 'Croissants',
    'NOT A TRAFFIC LIGHT': 'No Traffic Lights',
    'LOAF OF BREAD': 'Bread Loaf',
    'SHAR PEI WRINKLES': 'Shar Pei',
    'BLUEBERRY MUFFINS': 'Muffins',
    'TREE SLOTHS': 'Tree Sloths',
    'GOLDEN PUPPIES': 'Golden Puppies',
    'TRAINS': 'Trains',
    'RAIL TRAINS': 'Trains',
    'BRIDGES': 'Bridges',
    'BOATS': 'Boats',
    'AIRPLANES': 'Airplanes',
    'PARKING METERS': 'Parking Meters',
    'CHIMNEYS': 'Brick Chimneys',
    'BICYCLES': 'Bicycles',
    'CITY BUSES': 'City Buses',
    'CITY BUSES & TAXIS': 'Buses & Taxis',
    'NOT A STOP SIGN': 'Street Decor',
    'DECLARE BIOLOGICAL BIRTHDAY': 'Birthday',
    'RE-CONFIRM BIOLOGICAL BIRTHDAY': 'Birthday Audit',
    'DECLARE FIRST CHILDHOOD COMPANION': 'Childhood Pet',
    'CONFIRM CHILDHOOD COMPANION': 'Pet Audit',
    'DECLARE MORNING STIMULANT': 'Morning Drink',
    'CONFIRM MORNING STIMULANT': 'Drink Audit',
    'SOLVE: X + IV = ?': 'Roman Numeral',
    'WHICH WEIGHS MORE?': 'Physics Weight',
    'SELECT THE NON-MAMMAL': 'Non-Mammal',
    'WHAT IS 2 + 2 × 2 ?': '2 + 2 × 2',
    'SOLVE THE TROLLEY PROBLEM': 'Trolley Dilemma',
    'CHEMICAL SYMBOL FOR GOLD': 'Gold Symbol',
    'TERMS OF SERVICE': 'TOS Dilemma',
    'WHICH DOWNLOAD BUTTON?': 'Download Button',
    'COOKIE PREFERENCES': 'Cookie Dilemma',
    'PASSWORD POLICY ESCALATION': 'Password Policy',
    'CLOSING MOBILE GAME ADS': 'Mobile Ads',
    'EMOTIONAL SENTENCE ANALYSIS': 'Emotional Test',
    'TRANSCENDENT HUMANITY': 'Final Gate',
    'CERTIFICATE OF HUMANITY': 'Certificate',
  };

  if (cleanMap[target]) return cleanMap[target];

  return target
    .toLowerCase()
    .split(' ')
    .slice(0, 3)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const InfoModal: React.FC<InfoModalProps> = ({
  hint,
  onClose,
  onJumpToLevel,
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '#';

  // Code Panel State
  const [accessCode, setAccessCode] = useState('');
  const [targetLevel, setTargetLevel] = useState('');
  const [panelError, setPanelError] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Search filtered levels
  const filteredLevels = useMemo(() => {
    if (!searchQuery.trim()) return GAME_LEVELS;
    const q = searchQuery.toLowerCase().trim();
    return GAME_LEVELS.filter((lvl) => {
      const shortName = getShortLevelName(lvl).toLowerCase();
      const target = lvl.target.toLowerCase();
      const idStr = String(lvl.id);
      return shortName.includes(q) || target.includes(q) || idStr.includes(q);
    });
  }, [searchQuery]);

  const handleApplyOverride = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.playClick();
    setPanelError(null);

    // Code must be 6741
    if (accessCode.trim() !== '6741') {
      sound.playError();
      setPanelError('Incorrect access code.');
      return;
    }

    const lvl = parseInt(targetLevel, 10);
    if (isNaN(lvl) || lvl < 1 || lvl > 101) {
      sound.playError();
      setPanelError('Please enter or select a level between 1 and 101');
      return;
    }

    if (onJumpToLevel) {
      sound.playSuccess();
      onJumpToLevel(lvl);
    }
  };

  const handleSelectGridLevel = (lvlId: number) => {
    sound.playClick();
    setTargetLevel(String(lvlId));
    setPanelError(null);

    // If code is already entered, jump immediately!
    if (accessCode.trim() === '6741') {
      if (onJumpToLevel) {
        sound.playSuccess();
        onJumpToLevel(lvlId);
      }
    } else {
      setPanelError(`Enter access code to warp to Level ${lvlId} (${getShortLevelName(GAME_LEVELS[lvlId - 1] || GAME_LEVELS[0])})`);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className={`bg-white rounded-md shadow-2xl w-full p-4 sm:p-5 text-gray-800 relative border border-gray-200 max-h-[92vh] overflow-y-auto transition-all ${
        showGrid ? 'max-w-[480px]' : 'max-w-[390px]'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 rounded transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#1a73e8] mb-2.5">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <h4 className="font-bold text-sm tracking-tight">reCAPTCHA Guidance & Controls</h4>
        </div>

        {/* OPEN IN NEW TAB BUTTON */}
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-[3px] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm mb-3 group"
        >
          <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Open Game in New Tab
        </a>

        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          This system verifies biological entities. Machines and bots stumble on common-sense visual reasoning, analog motor control, and self-awareness.
        </p>

        {hint && (
          <div className="bg-blue-50 border border-blue-200 rounded p-2.5 text-xs text-blue-900 font-medium mb-3">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-[#1a73e8]">
              <HelpCircle className="w-3.5 h-3.5" />
              Challenge Guidance
            </div>
            <div className="leading-normal">{hint}</div>
          </div>
        )}

        {/* OVERRIDE CODE & LEVEL SELECT PANEL */}
        <div className="bg-gray-900 border border-gray-700 rounded-md p-3 mb-3 text-gray-200">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-800">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
              <KeyRound className="w-3.5 h-3.5" />
              <span>SKIP TO LEVEL</span>
            </div>

            {/* BUTTON TO TOGGLE LEVELS GRID */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowGrid((prev) => !prev);
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all border ${
                showGrid
                  ? 'bg-amber-400 text-gray-950 border-amber-300'
                  : 'bg-gray-800 text-amber-300 border-gray-700 hover:bg-gray-750'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>{showGrid ? 'Hide Grid' : 'See Levels in a Grid'}</span>
            </button>
          </div>

          {/* Access Code Input Bar */}
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <label className="block text-[10px] font-mono text-gray-400 mb-0.5">
                Access Code:
              </label>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (e.target.value.trim() === '6741') {
                    setPanelError(null);
                  }
                }}
                placeholder="Enter code"
                className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="w-[105px]">
              <label className="block text-[10px] font-mono text-gray-400 mb-0.5">
                Target Level:
              </label>
              <input
                type="number"
                min="1"
                max="101"
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                placeholder="1 - 101"
                className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* LEVELS IN A GRID VIEW */}
          {showGrid && (
            <div className="mt-2.5 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-gray-400">
                  Select any level to warp:
                </span>
                <div className="relative flex-1 max-w-[150px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search grid..."
                    className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-[10px] font-mono text-white placeholder-gray-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-1 top-0.5 text-gray-400 hover:text-white text-[10px]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Responsive Levels Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[220px] overflow-y-auto p-1 bg-gray-950 rounded border border-gray-800">
                {filteredLevels.map((lvl) => {
                  const shortName = getShortLevelName(lvl);
                  const isSelected = targetLevel === String(lvl.id);

                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => handleSelectGridLevel(lvl.id)}
                      className={`flex flex-col items-start p-1.5 rounded text-left transition-all border ${
                        isSelected
                          ? 'bg-amber-400 text-gray-950 border-amber-300 ring-2 ring-amber-300/60 font-bold'
                          : 'bg-gray-800/80 hover:bg-gray-700/90 text-gray-200 border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full text-[9px] font-mono opacity-75">
                        <span>L{lvl.id}</span>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span className="text-[11px] font-medium leading-tight truncate w-full mt-0.5">
                        {shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {panelError && (
            <div className="mt-2 text-[11px] font-medium text-rose-400 bg-rose-950/60 border border-rose-800 rounded px-2 py-1">
              {panelError}
            </div>
          )}

          <button
            type="button"
            onClick={() => handleApplyOverride()}
            className={`mt-2.5 w-full py-2 rounded text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              accessCode.trim() === '6741'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            <span>{targetLevel ? `WARP TO LEVEL ${targetLevel}` : 'WARP TO LEVEL'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded border border-gray-300 uppercase tracking-wider transition-colors"
        >
          Close Dialog
        </button>
      </div>
    </div>
  );
};
