import React, { useState, useCallback } from 'react';
import { RotateCw, Headphones, Info, Check } from 'lucide-react';
import { GAME_LEVELS } from './data/levels';
import { sound } from './utils/sound';
import { getHumanityRank } from './utils/ranks';
import { AudioChallengeModal } from './components/AudioChallengeModal';
import { InfoModal } from './components/InfoModal';
import { CertificateView } from './components/CertificateView';

// Challenge views
import { PhotoGridSliced } from './components/challenges/PhotoGridSliced';
import { PhotoGridItems } from './components/challenges/PhotoGridItems';
import { WigglesChallenge } from './components/challenges/WigglesChallenge';
import { CraftchaChallenge } from './components/challenges/CraftchaChallenge';
import { PerfectCircleChallenge } from './components/challenges/PerfectCircleChallenge';
import { ParallelParkChallenge } from './components/challenges/ParallelParkChallenge';
import { WhackABotChallenge } from './components/challenges/WhackABotChallenge';
import { SliderPrecisionChallenge } from './components/challenges/SliderPrecisionChallenge';
import { TicTacToeChallenge } from './components/challenges/TicTacToeChallenge';
import { WordSearchChallenge } from './components/challenges/WordSearchChallenge';
import { StroopColorChallenge } from './components/challenges/StroopColorChallenge';
import { ChronometryChallenge } from './components/challenges/ChronometryChallenge';
import { RoadRotateChallenge } from './components/challenges/RoadRotateChallenge';
import { SimonMemoryChallenge } from './components/challenges/SimonMemoryChallenge';
import { ExistentialQuizChallenge } from './components/challenges/ExistentialQuizChallenge';
import { MovingBtnChallenge } from './components/challenges/MovingBtnChallenge';
import { ClickSpamChallenge } from './components/challenges/ClickSpamChallenge';
import { TextExactChallenge } from './components/challenges/TextExactChallenge';

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isInitialCheckboxChecked, setIsInitialCheckboxChecked] = useState(false);
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal sub-dialogs
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Error feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  // Per-level state trackers
  const [selectedGridIndices, setSelectedGridIndices] = useState<Set<number>>(new Set());
  const [wigglesInput, setWigglesInput] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [craftGrid, setCraftGrid] = useState<(string | null)[]>(Array(9).fill(null));
  const [circleScore, setCircleScore] = useState(0);
  const [isCarParked, setIsCarParked] = useState(false);
  const [whackScore, setWhackScore] = useState(0);
  const [ticTacToePassed, setTicTacToePassed] = useState(false);
  const [wordSearchPassed, setWordSearchPassed] = useState(false);
  const [stroopSelected, setStroopSelected] = useState<number | null>(null);
  const [holdDuration, setHoldDuration] = useState<number | null>(null);
  const [roadRotations, setRoadRotations] = useState<number[]>([90, 180, 270, 90]);
  const [simonPassed, setSimonPassed] = useState(false);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [movingBtnCaptured, setMovingBtnCaptured] = useState(false);
  const [clickSpamDone, setClickSpamDone] = useState(false);
  const [textExactVal, setTextExactVal] = useState('');
  const [userMemory, setUserMemory] = useState<Record<string, string>>({});

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const isLastLevel = currentLevel.type === 'certificate';
  const humanityBadge = getHumanityRank(currentLevelIndex);

  // Trigger error shake & audio
  const triggerError = useCallback((msg: string) => {
    sound.playError();
    setErrorMessage(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
    setTimeout(() => setErrorMessage(null), 3500);
  }, []);

  // Reset challenge inputs
  const resetLevelState = useCallback(() => {
    setSelectedGridIndices(new Set());
    setWigglesInput('');
    setSliderValue(50);
    setCraftGrid(Array(9).fill(null));
    setCircleScore(0);
    setIsCarParked(false);
    setWhackScore(0);
    setTicTacToePassed(false);
    setWordSearchPassed(false);
    setStroopSelected(null);
    setHoldDuration(null);
    setRoadRotations([90, 180, 270, 90]);
    setSimonPassed(false);
    setQuizSelected(null);
    setMovingBtnCaptured(false);
    setClickSpamDone(false);
    setTextExactVal('');
    setErrorMessage(null);
  }, []);

  // Advance to next level (strictly sequential, NO SKIPPING)
  const advanceLevel = useCallback(() => {
    sound.playSuccess();
    resetLevelState();
    setCurrentLevelIndex((prev) => Math.min(prev + 1, GAME_LEVELS.length - 1));
  }, [resetLevelState]);

  // Initial Checkbox Click
  const handleInitialCheckboxClick = () => {
    if (isInitialCheckboxChecked || isSpinnerActive) return;
    sound.playClick();
    setIsSpinnerActive(true);

    setTimeout(() => {
      setIsSpinnerActive(false);
      setIsInitialCheckboxChecked(true);
      setIsModalOpen(true);
      // Advance to level 2 (first actual challenge)
      setCurrentLevelIndex(1);
    }, 700);
  };

  // Toggle grid square
  const handleToggleGridIndex = (index: number) => {
    setSelectedGridIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Craftcha slot click
  const handleCraftSlotClick = (index: number, selectedTool: string | null) => {
    setCraftGrid((prev) => {
      const next = [...prev];
      next[index] = selectedTool;
      return next;
    });
  };

  // Road rotation tile click
  const handleRotateRoad = (index: number) => {
    setRoadRotations((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 90) % 360;
      return next;
    });
  };

  // Verify Current Challenge
  const handleVerify = () => {
    switch (currentLevel.type) {
      case 'photo_grid_sliced': {
        const correct = currentLevel.correctSlicedIndices || [];
        const isSkip = selectedGridIndices.size === 0;

        // If target requires 0 (meaning none exist), skip is the correct answer
        if (correct.length === 0) {
          if (isSkip) {
            advanceLevel();
          } else {
            triggerError('There are no matching items. Click SKIP.');
          }
          break;
        }

        // Target exists, so skip cannot be used
        if (isSkip) {
          triggerError('Target is present in the image! You cannot skip.');
          break;
        }

        const correctSet = new Set(correct);
        const matchCount = correct.filter((idx) => selectedGridIndices.has(idx)).length;
        const extraWrong = Array.from(selectedGridIndices).filter((idx) => !correctSet.has(idx));

        const isExactMatch =
          correct.length === selectedGridIndices.size &&
          correct.every((idx) => selectedGridIndices.has(idx));

        // Fair human tolerance: selected the major targets (at least 70%) with at most 1 border discrepancy
        const minMatches = Math.max(2, Math.floor(correct.length * 0.7));
        const isPass = isExactMatch || (matchCount >= minMatches && extraWrong.length <= 1);

        if (isPass) {
          advanceLevel();
        } else {
          triggerError('Incorrect selection. Look closely and select all matching squares.');
        }
        break;
      }

      case 'photo_grid_items': {
        const items = currentLevel.items || [];
        const isSkip = selectedGridIndices.size === 0;

        const correctIndices = items
          .map((it, idx) => (it.isTarget ? idx : null))
          .filter((v): v is number => v !== null);

        // If target count is 0, skip is the correct answer
        if (correctIndices.length === 0) {
          if (isSkip) {
            advanceLevel();
          } else {
            triggerError('There are no matching items. Click SKIP.');
          }
          break;
        }

        if (isSkip) {
          triggerError('Target is present in the grid! You cannot skip.');
          break;
        }

        const isExactMatch =
          correctIndices.length === selectedGridIndices.size &&
          correctIndices.every((idx) => selectedGridIndices.has(idx));

        if (isExactMatch) {
          advanceLevel();
        } else {
          triggerError('Selection incomplete or incorrect. Pick all target squares.');
        }
        break;
      }

      case 'wiggles': {
        if (wigglesInput.trim().toUpperCase() === currentLevel.distortionCode?.toUpperCase()) {
          advanceLevel();
        } else {
          triggerError('Transcription incorrect. Please try again.');
        }
        break;
      }

      case 'slider_precision': {
        if (sliderValue === currentLevel.targetSliderValue) {
          advanceLevel();
        } else {
          triggerError(`Slider calibration failed. Must be set precisely to ${currentLevel.targetSliderValue}%.`);
        }
        break;
      }

      case 'craftcha': {
        const g = craftGrid;
        const recipe = currentLevel.targetCraftRecipe || 'diamond_pickaxe';
        let isRecipeValid = false;

        if (recipe === 'diamond_pickaxe') {
          // 3 diamonds top row, sticks in slots 4 and 7
          isRecipeValid =
            g[0] === '💎' && g[1] === '💎' && g[2] === '💎' &&
            g[3] === null && g[4] === '🥢' && g[5] === null &&
            g[6] === null && g[7] === '🥢' && g[8] === null;
        } else if (recipe === 'wooden_sword') {
          // 2 oak planks slots 1 and 4, stick in slot 7
          isRecipeValid =
            g[1] === '🪵' && g[4] === '🪵' && g[7] === '🥢' &&
            g[0] === null && g[2] === null && g[3] === null &&
            g[5] === null && g[6] === null && g[8] === null;
        } else if (recipe === 'torch') {
          // Cobblestone or iron slot 4, stick slot 7
          isRecipeValid =
            (g[4] === '🪨' || g[4] === '🪙') && g[7] === '🥢' &&
            g[0] === null && g[1] === null && g[2] === null &&
            g[3] === null && g[5] === null && g[6] === null && g[8] === null;
        } else {
          // Fallback pickaxe
          isRecipeValid =
            g[0] === '💎' && g[1] === '💎' && g[2] === '💎' &&
            g[4] === '🥢' && g[7] === '🥢';
        }

        if (isRecipeValid) {
          advanceLevel();
        } else {
          triggerError(`Recipe invalid! Arrange materials according to the recipe instructions.`);
        }
        break;
      }

      case 'perfect_circle': {
        const minScore = currentLevel.minCircleScore || 88;
        if (circleScore >= minScore) {
          advanceLevel();
        } else {
          triggerError(`Circularity score of ${circleScore}% is below required ${minScore}% threshold. Draw a more accurate circle!`);
        }
        break;
      }

      case 'parallel_park': {
        if (isCarParked) {
          advanceLevel();
        } else {
          triggerError('Vehicle is not squarely parked within the bay and aligned straight.');
        }
        break;
      }

      case 'whack_a_bot': {
        if (whackScore >= 5) {
          advanceLevel();
        } else {
          triggerError(`Eliminate 5 rogue bots first (${whackScore}/5).`);
        }
        break;
      }

      case 'tic_tac_toe': {
        if (ticTacToePassed) {
          advanceLevel();
        } else {
          triggerError('Complete a winning or tied game of Tic-Tac-Toe.');
        }
        break;
      }

      case 'word_search': {
        if (wordSearchPassed) {
          advanceLevel();
        } else {
          triggerError('Spell the full word H-U-M-A-N in sequential order.');
        }
        break;
      }

      case 'stroop_color': {
        if (stroopSelected === 2) {
          advanceLevel();
        } else {
          triggerError('Look at the literal ink color of the text, not what the word says!');
        }
        break;
      }

      case 'chronometry': {
        if (
          holdDuration !== null &&
          Math.abs(holdDuration - (currentLevel.targetHoldSeconds || 3.0)) <= 0.25
        ) {
          advanceLevel();
        } else {
          triggerError('Hold duration out of biological tolerance range. Try again.');
        }
        break;
      }

      case 'road_rotate': {
        const isAligned =
          roadRotations[0] % 360 === 0 &&
          roadRotations[1] % 360 === 90 &&
          roadRotations[2] % 360 === 270 &&
          roadRotations[3] % 360 === 180;

        if (isAligned) {
          advanceLevel();
        } else {
          triggerError('Road network discontinuous. Rotate tiles into a closed loop.');
        }
        break;
      }

      case 'simon_memory': {
        if (simonPassed) {
          advanceLevel();
        } else {
          triggerError('Memory sequence mismatch. Watch and repeat carefully.');
        }
        break;
      }

      case 'existential_quiz': {
        const memKey = currentLevel.memoryKey;
        const isAudit = currentLevel.isMemoryAudit;

        if (memKey && !isAudit) {
          // Recording user memory declaration (e.g. Birthday, First Pet, Morning Drink)
          if (quizSelected !== null && currentLevel.quizOptions?.[quizSelected]) {
            const chosenValue = currentLevel.quizOptions[quizSelected];
            setUserMemory((prev) => ({ ...prev, [memKey]: chosenValue }));
            advanceLevel();
          } else {
            triggerError('Please select a biological declaration option.');
          }
          break;
        }

        if (memKey && isAudit) {
          // Cross-checkpoint memory audit: check against what user declared earlier
          const previouslyDeclared = userMemory[memKey];
          if (quizSelected !== null && currentLevel.quizOptions?.[quizSelected]) {
            const selectedText = currentLevel.quizOptions[quizSelected];
            if (previouslyDeclared && selectedText === previouslyDeclared) {
              advanceLevel();
            } else if (!previouslyDeclared) {
              advanceLevel();
            } else {
              triggerError(`Memory mismatch! In the earlier security checkpoint you declared: "${previouslyDeclared}". Robotic identity inconsistency detected!`);
            }
          } else {
            triggerError('Select your previously registered answer.');
          }
          break;
        }

        const allowed = currentLevel.allowedQuizIndices ||
          (currentLevel.correctQuizIndex !== undefined ? [currentLevel.correctQuizIndex] : []);
        if (quizSelected !== null && allowed.includes(quizSelected)) {
          advanceLevel();
        } else {
          triggerError('Robotic response detected. Choose the authentic human answer.');
        }
        break;
      }

      case 'moving_btn': {
        if (movingBtnCaptured) {
          advanceLevel();
        } else {
          triggerError('Trap the fleeing button first!');
        }
        break;
      }

      case 'click_spam': {
        if (clickSpamDone) {
          advanceLevel();
        } else {
          triggerError(`Click rapidly until you reach the target count!`);
        }
        break;
      }

      case 'text_exact': {
        if (textExactVal.trim().toUpperCase() === currentLevel.expectedText?.toUpperCase()) {
          advanceLevel();
        } else {
          triggerError('Exact string mismatch. Type precisely as shown.');
        }
        break;
      }

      default:
        advanceLevel();
        break;
    }
  };

  // Reset entire game
  const handleRestart = () => {
    sound.playClick();
    setCurrentLevelIndex(0);
    setIsInitialCheckboxChecked(false);
    setIsSpinnerActive(false);
    setIsModalOpen(false);
    resetLevelState();
  };

  // Determine button text: real reCAPTCHA shows 'SKIP' when 0 tiles selected on grid, 'VERIFY' when 1+
  const isGridType = currentLevel.type === 'photo_grid_sliced' || currentLevel.type === 'photo_grid_items';
  const buttonText = isGridType && selectedGridIndices.size === 0 ? 'SKIP' : 'VERIFY';

  return (
    <div className="min-h-screen bg-[#eceff1] text-[#202124] flex flex-col items-center justify-center p-4">
      {/* Top Header & Humanity Level Badge (Progress bar completely removed per user request) */}
      {isModalOpen && !isLastLevel && (
        <div className="w-full max-w-[400px] mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-800 font-bold">
            <span className="text-gray-500 font-medium">Level</span>
            <span className="font-mono text-sm text-[#1a73e8]">{currentLevelIndex}</span>
            <span className="text-gray-400 font-normal">of 100</span>
          </div>

          {/* Humanity Level Badge */}
          <div
            className={`px-3 py-1 rounded-[4px] border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all ${humanityBadge.bg} ${humanityBadge.color} ${humanityBadge.border}`}
          >
            <span className="text-[10px] font-semibold opacity-70">Humanity:</span>
            <span>{humanityBadge.rank}</span>
          </div>
        </div>
      )}

      {/* 1. INITIAL RECAPTCHA CHECKBOX WIDGET */}
      {!isModalOpen && (
        <div className="w-[302px] h-[78px] bg-white border border-[#d3d3d3] rounded-[3px] shadow-[0_0_4px_1px_rgba(0,0,0,0.08)] flex items-center justify-between px-3 select-none transition-shadow hover:shadow-[0_0_6px_2px_rgba(0,0,0,0.12)]">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleInitialCheckboxClick}
          >
            <div className="w-7 h-7 rounded-[2px] border-2 border-[#c1c1c1] group-hover:border-[#b2b2b2] flex items-center justify-center bg-white transition-colors relative">
              {isSpinnerActive && (
                <div className="w-5 h-5 border-[3px] border-gray-200 border-t-[#1a73e8] rounded-full animate-spin" />
              )}
              {isInitialCheckboxChecked && !isSpinnerActive && (
                <Check className="w-5 h-5 text-[#1e8e3e] stroke-[3]" />
              )}
            </div>
            <span className="text-sm font-normal text-[#282828]">
              I'm not a robot
            </span>
          </div>

          <div className="flex flex-col items-center opacity-80 cursor-default">
            <svg width="32" height="32" viewBox="0 0 48 48" className="fill-none">
              <path
                d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6c7.73 0 14 6.27 14 14s-6.27 14-14 14S10 31.73 10 24s6.27-14 14-14z"
                fill="#4285F4"
              />
              <path d="M30 18l-6 6-6-6z" fill="#1A73E8" />
            </svg>
            <div className="text-[9px] text-[#555] font-sans leading-none text-center mt-0.5">
              reCAPTCHA
            </div>
            <div className="text-[7.5px] text-[#777] font-sans leading-none text-center mt-0.5">
              Privacy - Terms
            </div>
          </div>
        </div>
      )}

      {/* 2. RECAPTCHA ACTIVE MODAL */}
      {isModalOpen && !isLastLevel && (
        <div
          className={`relative w-full max-w-[400px] bg-white border border-[#d2d6dc] rounded-[3px] shadow-[0_12px_36px_rgba(0,0,0,0.18)] overflow-hidden transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {/* Blue reCAPTCHA Header */}
          <div className="bg-[#1a73e8] text-white p-4 select-none relative">
            <div className="text-xs font-normal opacity-90 leading-tight">
              {currentLevel.title}
            </div>
            <div className="text-2xl font-black tracking-tight uppercase mt-0.5 leading-none">
              {currentLevel.target}
            </div>
            <div className="text-xs font-normal opacity-85 mt-1.5 leading-tight">
              {currentLevel.subtitle}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-3 bg-[#ffffff] min-h-[340px] flex items-center justify-center relative">
            {currentLevel.type === 'photo_grid_sliced' && currentLevel.slicedImage && (
              <PhotoGridSliced
                imageSrc={currentLevel.slicedImage}
                selectedIndices={selectedGridIndices}
                onToggleIndex={handleToggleGridIndex}
              />
            )}

            {currentLevel.type === 'photo_grid_items' && currentLevel.items && (
              <PhotoGridItems
                items={currentLevel.items}
                selectedIndices={selectedGridIndices}
                onToggleIndex={handleToggleGridIndex}
              />
            )}

            {currentLevel.type === 'wiggles' && (
              <WigglesChallenge
                code={currentLevel.distortionCode || '7X9QK'}
                value={wigglesInput}
                onChange={setWigglesInput}
              />
            )}

            {currentLevel.type === 'slider_precision' && (
              <SliderPrecisionChallenge
                value={sliderValue}
                targetValue={currentLevel.targetSliderValue || 73}
                onChange={setSliderValue}
              />
            )}

            {currentLevel.type === 'craftcha' && (
              <CraftchaChallenge
                craftGrid={craftGrid}
                onSlotClick={handleCraftSlotClick}
              />
            )}

            {currentLevel.type === 'perfect_circle' && (
              <PerfectCircleChallenge onScoreUpdate={setCircleScore} />
            )}

            {currentLevel.type === 'parallel_park' && (
              <ParallelParkChallenge onSuccessState={setIsCarParked} />
            )}

            {currentLevel.type === 'whack_a_bot' && (
              <WhackABotChallenge
                score={whackScore}
                onScoreIncrement={() => setWhackScore((s) => s + 1)}
              />
            )}

            {currentLevel.type === 'tic_tac_toe' && (
              <TicTacToeChallenge onGameOutcome={setTicTacToePassed} />
            )}

            {currentLevel.type === 'word_search' && (
              <WordSearchChallenge onSuccessState={setWordSearchPassed} />
            )}

            {currentLevel.type === 'stroop_color' && currentLevel.stroopWords && (
              <StroopColorChallenge
                words={currentLevel.stroopWords}
                selectedIndex={stroopSelected}
                onSelect={setStroopSelected}
              />
            )}

            {currentLevel.type === 'chronometry' && (
              <ChronometryChallenge
                targetSeconds={currentLevel.targetHoldSeconds || 3.0}
                onHoldDuration={setHoldDuration}
              />
            )}

            {currentLevel.type === 'road_rotate' && (
              <RoadRotateChallenge
                rotations={roadRotations}
                onRotateTile={handleRotateRoad}
              />
            )}

            {currentLevel.type === 'simon_memory' && (
              <SimonMemoryChallenge onSuccessState={setSimonPassed} />
            )}

            {currentLevel.type === 'existential_quiz' &&
              currentLevel.quizPrompt &&
              currentLevel.quizOptions && (
                <ExistentialQuizChallenge
                  prompt={currentLevel.quizPrompt}
                  options={currentLevel.quizOptions}
                  selectedIndex={quizSelected}
                  onSelect={setQuizSelected}
                />
              )}

            {currentLevel.type === 'moving_btn' && (
              <MovingBtnChallenge onCaptured={setMovingBtnCaptured} />
            )}

            {currentLevel.type === 'click_spam' && (
              <ClickSpamChallenge
                targetCount={currentLevel.targetClickCount || 15}
                onSuccess={setClickSpamDone}
              />
            )}

            {currentLevel.type === 'text_exact' && currentLevel.expectedText && (
              <TextExactChallenge
                value={textExactVal}
                expectedText={currentLevel.expectedText}
                onChange={setTextExactVal}
              />
            )}

            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="absolute bottom-2 left-2 right-2 bg-[#d93025] text-white text-xs font-medium py-2 px-3 rounded shadow-lg flex items-center justify-center text-center animate-in fade-in slide-in-from-bottom-2 duration-150 z-20">
                {errorMessage}
              </div>
            )}

            {/* Sub-modals for Audio Challenge and Info Guidance */}
            {showAudioModal && (
              <AudioChallengeModal
                onClose={() => setShowAudioModal(false)}
                onSuccess={() => {
                  setShowAudioModal(false);
                  advanceLevel();
                }}
              />
            )}

            {showInfoModal && (
              <InfoModal
                hint={currentLevel.hint}
                onClose={() => setShowInfoModal(false)}
              />
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#d2d6dc]">
            <div className="flex items-center gap-3 text-gray-500">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  resetLevelState();
                }}
                className="hover:text-gray-900 transition-colors p-1"
                title="Reload Challenge"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowAudioModal(true);
                }}
                className="hover:text-gray-900 transition-colors p-1"
                title="Audio Challenge"
              >
                <Headphones className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowInfoModal(true);
                }}
                className="hover:text-gray-900 transition-colors p-1"
                title="Challenge Information"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerify}
              className="px-6 py-2 bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#0d47a1] text-white text-sm font-bold tracking-wider uppercase rounded-[2px] transition-colors shadow-sm select-none"
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}

      {/* 3. VICTORY CERTIFICATE OF HUMANITY */}
      {isLastLevel && (
        <CertificateView onRestart={handleRestart} />
      )}
    </div>
  );
}
