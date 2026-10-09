export type ChallengeType =
  | 'checkbox'
  | 'photo_grid_sliced'
  | 'photo_grid_items'
  | 'wiggles'
  | 'craftcha'
  | 'perfect_circle'
  | 'parallel_park'
  | 'whack_a_bot'
  | 'slider_precision'
  | 'tic_tac_toe'
  | 'word_search'
  | 'stroop_color'
  | 'chronometry'
  | 'road_rotate'
  | 'simon_memory'
  | 'existential_quiz'
  | 'moving_btn'
  | 'click_spam'
  | 'text_exact'
  | 'reaction_speed'
  | 'wire_cut'
  | 'maze_runner'
  | 'catch_apples'
  | 'pattern_memory'
  | 'certificate';

export interface GridItem {
  id: string;
  label: string;
  image?: string;
  icon?: string;
  isTarget: boolean;
  failHint?: string;
}

export interface LevelConfig {
  id: number;
  type: ChallengeType;
  title: string;       // e.g. "Select all squares with"
  target: string;      // e.g. "STOP SIGNS"
  subtitle: string;    // e.g. "Click verify once none are left"
  hint?: string;
  
  // For photo_grid_sliced
  slicedImage?: string;
  correctSlicedIndices?: number[]; // [0..8]
  
  // For photo_grid_items
  items?: GridItem[];
  
  // For wiggles / distortion
  distortionCode?: string;
  
  // For slider
  targetSliderValue?: number;
  
  // For craftcha
  targetCraftRecipe?: 'diamond_pickaxe' | 'wooden_sword' | 'wooden_pickaxe' | 'torch' | 'wooden_axe' | 'wooden_shovel';
  
  // For chronometry
  targetHoldSeconds?: number;
  
  // For click spam
  targetClickCount?: number;
  
  // For text exact
  expectedText?: string;
  
  // For perfect circle
  minCircleScore?: number;
  
  // For stroop
  stroopWords?: { text: string; color: string; isTarget: boolean }[];
  
  // For quiz
  quizPrompt?: string;
  quizOptions?: string[];
  correctQuizIndex?: number;
  allowedQuizIndices?: number[];
  memoryKey?: 'birthday' | 'firstPet' | 'morningDrink';
  isMemoryAudit?: boolean;

  // For wire cut
  targetWireColor?: string;
  wireInstruction?: string;

  // For catch apples
  targetApples?: number;
}
