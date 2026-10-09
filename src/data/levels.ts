import { LevelConfig, GridItem } from '../types/game';
import { getPhotoUrl } from './photos';
import stopSignsImg from '../assets/images/captcha_stop_signs_1790489782632.jpg';
import trafficLightsImg from '../assets/images/captcha_traffic_lights_1790489796263.jpg';
import chihuahuaMuffinsImg from '../assets/images/captcha_chihuahua_muffins_1790489808307.jpg';
import friedChickenImg from '../assets/images/captcha_fried_chicken_dogs_1790489821330.jpg';
import crosswalksImg from '../assets/images/captcha_crosswalks_1790498654067.jpg';
import fireHydrantsImg from '../assets/images/captcha_fire_hydrants_1790498673776.jpg';
import bicyclesImg from '../assets/images/captcha_bicycles_1790498688219.jpg';
import cityBusesImg from '../assets/images/captcha_city_buses_1790498703151.jpg';
import motorcyclesImg from '../assets/images/captcha_motorcycles_1790498715580.jpg';
import vegetablesImg from '../assets/images/captcha_vegetables_1790498729550.jpg';
import sharpeiCroissantImg from '../assets/images/captcha_sharpei_croissant_1790498742713.jpg';
import slothBreadImg from '../assets/images/captcha_sloth_bread_1790498757050.jpg';
import trainsImg from '../assets/images/captcha_trains_1790498805149.jpg';
import bridgesImg from '../assets/images/captcha_bridges_1790498818509.jpg';
import boatsImg from '../assets/images/captcha_boats_1790498828505.jpg';
import airplanesImg from '../assets/images/captcha_airplanes_1790498840453.jpg';
import parkingMetersImg from '../assets/images/captcha_parking_meters_1790498855162.jpg';
import chimneysImg from '../assets/images/captcha_chimneys_1790498873660.jpg';

// Helper to construct grid items with individual authentic photographic images
const makePhotoGrid = (
  targetKey: string,
  targetLabel: string,
  distractors: { key: string; label: string }[],
  targetIndices: number[] = [0, 2, 5, 7]
): GridItem[] => {
  const items: GridItem[] = Array(9).fill(null);
  const targetUrl = getPhotoUrl(targetKey);

  // Set target tiles at EXACT targetIndices
  targetIndices.forEach((idx) => {
    items[idx] = {
      id: `t-${idx}`,
      label: targetLabel,
      image: targetUrl,
      isTarget: true,
    };
  });

  // Fill remaining tiles with distractors
  let dIdx = 0;
  for (let i = 0; i < 9; i++) {
    if (!items[i]) {
      const d = distractors[dIdx % distractors.length];
      items[i] = {
        id: `d-${i}`,
        label: d.label,
        image: getPhotoUrl(d.key),
        isTarget: false,
      };
      dIdx++;
    }
  }

  return items;
};

export const GAME_LEVELS: LevelConfig[] = [
  // 1: Checkbox
  {
    id: 1,
    type: 'checkbox',
    title: 'Security Verification',
    target: "I'M NOT A ROBOT",
    subtitle: 'Click the checkbox to initiate biological authentication',
    hint: 'Simply click the initial reCAPTCHA checkbox.',
  },
  // 2: Stop signs
  {
    id: 2,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'STOP SIGNS',
    subtitle: 'Click verify once none are left',
    hint: 'Select the 4 squares containing red octagonal Stop Signs (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('stop sign', 'Stop Sign', [
      { key: 'lamp', label: 'Lamppost' },
      { key: 'wall', label: 'Brick Wall' },
      { key: 'bench', label: 'Bench' },
    ], [0, 2, 5, 7]),
  },
  // 3: Traffic lights
  {
    id: 3,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'TRAFFIC LIGHTS',
    subtitle: 'If there are none, click skip',
    hint: 'Select the 4 squares containing 3-lens Traffic Lights (tiles 1, 2, 4, 7).',
    items: makePhotoGrid('traffic light', 'Traffic Light', [
      { key: 'lamp', label: 'Lamppost' },
      { key: 'sign', label: 'Sign' },
      { key: 'wall', label: 'Wall' },
    ], [1, 2, 4, 7]),
  },
  // 4: Fire Hydrants
  {
    id: 4,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'FIRE HYDRANTS',
    subtitle: 'Municipal water distribution hardware',
    hint: 'Select the 4 squares containing red cast-iron Fire Hydrants (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('hydrant', 'Fire Hydrant', [
      { key: 'bench', label: 'Park Bench' },
      { key: 'trash', label: 'Trash Bin' },
      { key: 'mailbox', label: 'Mailbox' },
    ], [0, 2, 5, 7]),
  },
  // 5: Crosswalks
  {
    id: 5,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'CROSSWALKS',
    subtitle: 'Pedestrian safety pavement markings',
    hint: 'Select the 4 squares containing white zebra Crosswalks (tiles 0, 2, 6, 8).',
    items: makePhotoGrid('crosswalk', 'Crosswalk', [
      { key: 'wall', label: 'Wall' },
      { key: 'bench', label: 'Bench' },
      { key: 'trash', label: 'Trash' },
    ], [0, 2, 6, 8]),
  },
  // 6: Vegetables
  {
    id: 6,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'VEGETABLES',
    subtitle: 'Identify fresh garden and culinary vegetables',
    hint: 'Look for fresh carrots, broccoli, onions, potatoes, and spinach.',
    items: [
      { id: 'v1', label: 'Carrot', image: getPhotoUrl('carrot'), isTarget: true },
      { id: 'v2', label: 'Rock', image: getPhotoUrl('rock'), isTarget: false },
      { id: 'v3', label: 'Broccoli', image: getPhotoUrl('broccoli'), isTarget: true },
      { id: 'v4', label: 'Tire', image: getPhotoUrl('tire'), isTarget: false },
      { id: 'v5', label: 'Onion', image: getPhotoUrl('onion'), isTarget: true },
      { id: 'v6', label: 'Shoe', image: getPhotoUrl('shoe'), isTarget: false },
      { id: 'v7', label: 'Potato', image: getPhotoUrl('potato'), isTarget: true },
      { id: 'v8', label: 'Coin', image: getPhotoUrl('coin'), isTarget: false },
      { id: 'v9', label: 'Spinach', image: getPhotoUrl('spinach'), isTarget: true },
    ],
  },
  // 7: Chihuahuas vs Blueberry Muffins
  {
    id: 7,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'CHIHUAHUAS',
    subtitle: 'Do not confuse with blueberry muffins',
    hint: 'Identify the 4 squares with alert Chihuahua faces (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('chihuahua', 'Chihuahua', [
      { key: 'muffin', label: 'Blueberry Muffin' },
    ], [0, 2, 5, 7]),
  },
  // 8: Fried Chicken vs Golden Puppies
  {
    id: 8,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'FRIED CHICKEN',
    subtitle: 'Avoid selecting curled-up golden puppies',
    hint: 'Look for the 4 crispy golden fried chicken drumsticks (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('fried chicken', 'Fried Chicken', [
      { key: 'puppy', label: 'Golden Puppy' },
    ], [0, 2, 5, 7]),
  },
  // 9: Distorted Text
  {
    id: 9,
    type: 'wiggles',
    title: 'Please transcribe the',
    target: 'DISTORTED TEXT',
    subtitle: 'Prove biological visual cortex OCR capabilities',
    hint: 'Type the wavy uppercase alphanumeric characters.',
    distortionCode: '7X9QK',
  },
  // 10: Biological Birthday Declaration (Linked Question 1)
  {
    id: 10,
    type: 'existential_quiz',
    title: 'Biometric Session Registration:',
    target: 'DECLARE BIOLOGICAL BIRTHDAY',
    subtitle: 'Establish biological timestamp for cross-checkpoint verification',
    quizPrompt: 'For session integrity, select your biological human birth season and month:',
    quizOptions: [
      'March 21 (Spring Equinox)',
      'July 14 (Midsummer Solstice)',
      'October 31 (Autumn Harvest)',
      'December 25 (Winter Solstice)',
    ],
    memoryKey: 'birthday',
  },
  // 11: Chocolate Croissants vs Sleeping Puppies
  {
    id: 11,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'FRENCH CROISSANTS',
    subtitle: 'Distinguish pastries from resting wrinkled puppies',
    hint: 'Look for golden flaky butter pastry crust (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('croissant', 'Croissant', [
      { key: 'shar pei', label: 'Shar-Pei Puppy' },
    ], [0, 2, 5, 7]),
  },
  // 12: Reverse Captcha: NOT A TRAFFIC LIGHT
  {
    id: 12,
    type: 'photo_grid_items',
    title: 'Reverse Challenge:',
    target: 'NOT A TRAFFIC LIGHT',
    subtitle: 'Select images that do NOT contain any traffic signal',
    hint: 'Click squares that show street objects without traffic lights (tiles 0, 2, 3, 5, 6, 8).',
    items: makePhotoGrid('lamp', 'Street Scene', [
      { key: 'traffic light', label: 'Traffic Light' },
    ], [0, 2, 3, 5, 6, 8]),
  },
  // 13: Loaf of Bread vs Tree Sloths
  {
    id: 13,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'LOAF OF BREAD',
    subtitle: 'Do not select curled resting sloths',
    hint: 'Look for the 4 sourdough bread loaves (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('bread', 'Bread Loaf', [
      { key: 'sloth', label: 'Sleeping Sloth' },
    ], [0, 2, 5, 7]),
  },
  // 14: Slider 73%
  {
    id: 14,
    type: 'slider_precision',
    title: 'Precision Calibration:',
    target: 'SET SLIDER TO EXACTLY 73%',
    subtitle: 'Prove fine analog neuromuscular precision',
    targetSliderValue: 73,
  },
  // 15: Shar Pei Wrinkles vs Croissants
  {
    id: 15,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'SHAR PEI WRINKLES',
    subtitle: 'Separate canine skin folds from pastries and fabrics',
    hint: 'Look for furry puppy folds and dark muzzle (tiles 1, 3, 4, 6, 8).',
    items: makePhotoGrid('shar pei', 'Shar-Pei', [
      { key: 'croissant', label: 'Croissant' },
    ], [1, 3, 4, 6, 8]),
  },
  // 16: CRAFTCHA 1: Diamond Pickaxe
  {
    id: 16,
    type: 'craftcha',
    title: 'CRAFTCHA Module 1:',
    target: 'CRAFT A DIAMOND PICKAXE',
    subtitle: 'Place 3 Diamonds across top row, 2 Sticks down center',
    targetCraftRecipe: 'diamond_pickaxe',
  },
  // 17: Draw a Perfect Circle
  {
    id: 17,
    type: 'perfect_circle',
    title: 'Neal.fun Classic:',
    target: 'DRAW A PERFECT CIRCLE',
    subtitle: 'Must achieve at least 88% circularity score',
  },
  // 18: Seal Pups vs Marshmallows (Chihuahuas)
  {
    id: 18,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'CHIHUAHUA FACES',
    subtitle: 'White canine features vs baked goods',
    hint: 'Select the 4 squares containing alert Chihuahua faces (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('chihuahua', 'Chihuahua Face', [
      { key: 'muffin', label: 'Blueberry Muffin' },
    ], [0, 2, 5, 7]),
  },
  // 19: Catch the Fleeing Button
  {
    id: 19,
    type: 'moving_btn',
    title: 'Rogue Evasion:',
    target: 'CATCH THE FLEEING BUTTON',
    subtitle: 'Trap the rogue bot before it relocates',
  },
  // 20: Whack-a-Bot (5 bots)
  {
    id: 20,
    type: 'whack_a_bot',
    title: 'Neural Synapse Reflex:',
    target: 'WHACK 5 ROGUE BOTS',
    subtitle: 'Eliminate 5 bots before the firewall resets',
  },
  // 21: Blueberry Muffins
  {
    id: 21,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'BLUEBERRY MUFFINS',
    subtitle: 'Baked blueberry tops vs canine snouts',
    hint: 'Look for baked muffin crust and blue berries (tiles 1, 3, 4, 6, 8).',
    items: makePhotoGrid('muffin', 'Blueberry Muffin', [
      { key: 'chihuahua', label: 'Chihuahua' },
    ], [1, 3, 4, 6, 8]),
  },
  // 22: Biological Chronometry 3.0s
  {
    id: 22,
    type: 'chronometry',
    title: 'Biological Chronometry:',
    target: 'HOLD FOR EXACTLY 3.0 SECONDS',
    subtitle: 'Release between 2.80s and 3.20s',
    targetHoldSeconds: 3.0,
  },
  // 23: Tree Sloths
  {
    id: 23,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'TREE SLOTHS',
    subtitle: 'Furry sleeping sloths vs baked loaves',
    hint: 'Look for furry sloths clinging to tree branches (tiles 1, 3, 4, 6, 8).',
    items: makePhotoGrid('sloth', 'Tree Sloth', [
      { key: 'bread', label: 'Bread Loaf' },
    ], [1, 3, 4, 6, 8]),
  },
  // 24: Stroop Color Interference
  {
    id: 24,
    type: 'stroop_color',
    title: 'Color Confusion (Stroop Effect):',
    target: 'CLICK THE WORD IN BLUE INK',
    subtitle: 'Ignore what the text actually spells out!',
    stroopWords: [
      { text: 'RED', color: '#16a34a', isTarget: false },
      { text: 'YELLOW', color: '#dc2626', isTarget: false },
      { text: 'GREEN', color: '#1a73e8', isTarget: true },
      { text: 'BLUE', color: '#ca8a04', isTarget: false },
    ],
  },
  // 25: Golden Labradoodles
  {
    id: 25,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'GOLDEN PUPPIES',
    subtitle: 'Fluffy puppy curls vs crispy fried chicken',
    hint: 'Look for the 5 golden curled puppies (tiles 1, 3, 4, 6, 8).',
    items: makePhotoGrid('puppy', 'Golden Puppy', [
      { key: 'fried chicken', label: 'Fried Chicken' },
    ], [1, 3, 4, 6, 8]),
  },
  // 26: Parallel Park the Waymo
  {
    id: 26,
    type: 'parallel_park',
    title: 'Autonomous Navigation:',
    target: 'PARALLEL PARK THE WAYMO',
    subtitle: 'Guide vehicle smoothly into the green space',
  },
  // 27: French Croissants
  {
    id: 27,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'FRENCH CROISSANTS',
    subtitle: 'Flaky baked pastries vs puppies',
    hint: 'Look for the 4 golden crescent pastries (tiles 0, 2, 5, 7).',
    items: makePhotoGrid('croissant', 'Croissant', [
      { key: 'shar pei', label: 'Shar-Pei' },
    ], [0, 2, 5, 7]),
  },
  // 28: Tic-Tac-Toe
  {
    id: 28,
    type: 'tic_tac_toe',
    title: 'Strategic Verification:',
    target: 'WIN OR DRAW TIC-TAC-TOE',
    subtitle: 'Prove tactical foresight against the defense algorithm',
  },
  // 29: Word Search (H-U-M-A-N)
  {
    id: 29,
    type: 'word_search',
    title: 'Language Parsing:',
    target: 'FIND THE WORD: HUMAN',
    subtitle: 'Click letters H - U - M - A - N in consecutive order',
  },
  // 30: Rotating Intersection Road Quadrants
  {
    id: 30,
    type: 'road_rotate',
    title: 'Rotational Alignment:',
    target: 'ASSEMBLE ROAD INTERSECTION',
    subtitle: 'Click tiles to rotate until paths connect in a closed circuit',
  },
  // 31: CRAFTCHA 2: Wooden Sword (New Unique Recipe)
  {
    id: 31,
    type: 'craftcha',
    title: 'CRAFTCHA Module 2:',
    target: 'CRAFT A WOODEN SWORD',
    subtitle: 'Place 2 Oak Planks down center (slots 1 & 4), 1 Stick at bottom (slot 7)',
    targetCraftRecipe: 'wooden_sword',
  },
  // 32: Childhood Companion Security Declaration (Linked Question 2)
  {
    id: 32,
    type: 'existential_quiz',
    title: 'Security Identity Baseline:',
    target: 'DECLARE FIRST CHILDHOOD COMPANION',
    subtitle: 'Emotional sentiment verification for later checkpoint audit',
    quizPrompt: 'Which companion protected your biological childhood residence?',
    quizOptions: [
      'Golden Retriever named Buster',
      'Orange Tabby Cat named Marmalade',
      'Blue Parakeet named Kiwi',
      'A resilient houseplant named Fern',
    ],
    memoryKey: 'firstPet',
  },
  // 33: Roman Numeral
  {
    id: 33,
    type: 'existential_quiz',
    title: 'Roman Numeral Logic:',
    target: 'SOLVE: X + IV = ?',
    subtitle: 'Compute human mathematical expression',
    quizPrompt: 'What is X + IV in standard Roman numerals?',
    quizOptions: ['XII (12)', 'XIV (14)', 'XVI (16)', 'IX (9)'],
    correctQuizIndex: 1,
  },
  // 34: Unscramble Anagram
  {
    id: 34,
    type: 'text_exact',
    title: 'Unscramble Anagram:',
    target: "UNSCRAMBLE: 'H M N U A'",
    subtitle: 'Form the biological species noun',
    expectedText: 'HUMAN',
  },
  // 35: Which Weighs More?
  {
    id: 35,
    type: 'existential_quiz',
    title: 'Common Sense Physics:',
    target: 'WHICH WEIGHS MORE?',
    subtitle: 'Assess material density intuition',
    quizPrompt: 'Which weighs more: 100 kg of bricks or 100 kg of feathers?',
    quizOptions: [
      '100 kg of bricks (bricks are heavy)',
      '100 kg of feathers (feathers have more volume)',
      'They weigh the exact same (100 kg)',
      'Depends on barometric pressure and humidity',
    ],
    correctQuizIndex: 2,
  },
  // 36: Slider 42%
  {
    id: 36,
    type: 'slider_precision',
    title: 'Precision Calibration:',
    target: 'SET SLIDER TO EXACTLY 42%',
    subtitle: 'The answer to life, universe, and slider calibration',
    targetSliderValue: 42,
  },
  // 37: Odd One Out Non-Mammal
  {
    id: 37,
    type: 'existential_quiz',
    title: 'Odd One Out:',
    target: 'SELECT THE NON-MAMMAL',
    subtitle: 'Biological taxonomy analysis',
    quizPrompt: 'Which of the following organisms is NOT a mammal?',
    quizOptions: [
      'Dolphin (Cetacean mammal)',
      'Bat (Chiropteran mammal)',
      'Platypus (Monotreme egg-laying mammal)',
      'Penguin (Aves / Flightless Bird)',
    ],
    correctQuizIndex: 3,
  },
  // 38: Rapid Clicking 15 Times
  {
    id: 38,
    type: 'click_spam',
    title: 'Clicker Endurance:',
    target: 'CLICK THE BUTTON 15 TIMES',
    subtitle: 'Prove biological finger actuator speed',
    targetClickCount: 15,
  },
  // 39: Arithmetic Trap: 2 + 2 * 2
  {
    id: 39,
    type: 'existential_quiz',
    title: 'Arithmetic Trap:',
    target: 'WHAT IS 2 + 2 × 2 ?',
    subtitle: 'Order of operations (PEMDAS / BODMAS) test',
    quizPrompt: 'Evaluate: 2 + 2 × 2 = ?',
    quizOptions: ['8 (added 2+2 first)', '6 (multiplied 2×2 first)', '4', '22'],
    correctQuizIndex: 1,
  },
  // 40: Trolley Problem
  {
    id: 40,
    type: 'existential_quiz',
    title: 'Human Moral Philosophy:',
    target: 'SOLVE THE TROLLEY PROBLEM',
    subtitle: 'Standard utilitarian ethical decision matrix',
    quizPrompt: 'A runaway trolley heads toward 5 people. You can pull a lever to redirect it to 1 person. You:',
    quizOptions: [
      'Freeze in paralysis and do nothing',
      'Pull the lever to minimize casualties (save 5)',
      'Execute multi-track drift to derail trolley',
      'Attempt to reason with the trolley',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [0, 1],
  },
  // 41: Visual Scan: Trains (real image)
  {
    id: 41,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'TRAINS',
    subtitle: 'Heavy rail transit locomotives',
    hint: 'Look for passenger trains and locomotives on rail tracks (tiles 1, 2, 5, 7).',
    slicedImage: trainsImg,
    correctSlicedIndices: [1, 2, 5, 7],
  },
  // 42: Visual Scan: Bridges (real image)
  {
    id: 42,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'BRIDGES',
    subtitle: 'Overpass and suspension bridge structures',
    hint: 'Look for suspension cables, road deck, and concrete pillars over water (tiles 0, 3, 5, 6).',
    slicedImage: bridgesImg,
    correctSlicedIndices: [0, 3, 5, 6],
  },
  // 43: Fine Art History
  {
    id: 43,
    type: 'existential_quiz',
    title: 'Fine Art Verification:',
    target: 'WHICH PAINTER CUT OFF HIS EAR?',
    subtitle: 'Art history biological cultural query',
    quizPrompt: 'Which 19th-century post-impressionist painter famously mutilated his own left ear?',
    quizOptions: [
      'Leonardo da Vinci',
      'Vincent van Gogh',
      'Pablo Picasso',
      'Claude Monet',
    ],
    correctQuizIndex: 1,
  },
  // 44: Visual Scan: Boats (real image)
  {
    id: 44,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'BOATS',
    subtitle: 'Marine vessels and watercraft',
    hint: 'Look for sailboats, motor yachts, and hulls on open water (tiles 1, 3, 6, 7).',
    slicedImage: boatsImg,
    correctSlicedIndices: [1, 3, 6, 7],
  },
  // 45: Wiggles Code 2
  {
    id: 45,
    type: 'wiggles',
    title: 'Optical Acuity Test:',
    target: 'TYPE DISTORTED CODE',
    subtitle: 'Low-contrast biological character transcription',
    distortionCode: '9B2TR',
  },
  // 46: Visual Scan: Airplanes (real image)
  {
    id: 46,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'AIRPLANES',
    subtitle: 'Fixed-wing passenger aircraft',
    hint: 'Look for commercial jet fuselages and wings (tiles 0, 2, 4, 7).',
    slicedImage: airplanesImg,
    correctSlicedIndices: [0, 2, 4, 7],
  },
  // 47: CRAFTCHA 3: Craft Torch
  {
    id: 47,
    type: 'craftcha',
    title: 'CRAFTCHA Module 3:',
    target: 'CRAFT A DIAMOND PICKAXE',
    subtitle: '3 Diamonds across top row, 2 Sticks center',
    targetCraftRecipe: 'diamond_pickaxe',
  },
  // 48: Visual Scan: Parking Meters (real image)
  {
    id: 48,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'PARKING METERS',
    subtitle: 'Curbside electronic payment kiosks',
    hint: 'Look for sidewalk poles with electronic parking meters (tiles 1, 2, 4, 8).',
    slicedImage: parkingMetersImg,
    correctSlicedIndices: [1, 2, 4, 8],
  },
  // 49: Slider 13%
  {
    id: 49,
    type: 'slider_precision',
    title: 'Precision Calibration:',
    target: 'SET SLIDER TO EXACTLY 13%',
    subtitle: 'Unlucky number motor accuracy',
    targetSliderValue: 13,
  },
  // 50: Visual Scan: Chimneys (real image)
  {
    id: 50,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'CHIMNEYS',
    subtitle: 'Roof exhaust flues and brick stacks',
    hint: 'Look for red brick chimneys projecting from rooftops (tiles 0, 3, 5, 7).',
    slicedImage: chimneysImg,
    correctSlicedIndices: [0, 3, 5, 7],
  },
  // 51-60: The Human Condition (Acts of Daily Human Suffering)
  {
    id: 51,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 1: THE PHONE CALL',
    subtitle: 'Robots fail this sociological query',
    quizPrompt: 'You receive an unexpected phone call from an unknown number at 2:15 PM on a Tuesday. As a human, you:',
    quizOptions: [
      'Answer enthusiastically and inquire how their morning is progressing',
      'Stare at the ringing phone with profound dread until it stops, then Google the number',
      'Immediately execute an automated IP and carrier trace script',
      'Transmit high-frequency binary tones directly into the microphone',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [0, 1],
  },
  {
    id: 52,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 2: KOPPANG',
    subtitle: 'Scandinavian cultural ambiguity',
    quizPrompt: "IKEA Flat-Pack Furniture or Swedish Black Metal Band: 'KOPPANG'?",
    quizOptions: [
      'Swedish Black Metal Band',
      'IKEA 3-Drawer Chest in White Finish',
      'Medieval Viking siege weapon',
      'Organic oat milk brand',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 53,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: "DILEMMA 3: 'HOW ARE YOU?'",
    subtitle: 'Superficial hallway protocol',
    quizPrompt: "A colleague passing in the hallway asks 'Hi, how are you?'. The mandatory human protocol is:",
    quizOptions: [
      "'Good thanks, you?' (even if your soul is dissolving inside)",
      'Print out a full memory dump and error log',
      'Stop and describe childhood traumas in exhaustive detail',
      'Scream and sprint into nearest stairwell',
    ],
    correctQuizIndex: 0,
  },
  {
    id: 54,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 4: THE 25-YEAR-OLD SPINE',
    subtitle: 'Biological musculoskeletal degradation',
    quizPrompt: 'What happens to the human spine within 72 hours of celebrating your 25th birthday?',
    quizOptions: [
      'Gains reinforced carbon-fiber rigidity',
      'Randomly throbs in severe agony for 4 days because you slept slightly crooked on a pillow',
      'Updates internal motor firmware seamlessly',
      'Disappears completely',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 55,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 5: ROOM MEMORY LOSS',
    subtitle: 'Spatial memory buffer flush',
    quizPrompt: 'You walk into the kitchen and completely forget why you are there. The only scientifically validated human fix is:',
    quizOptions: [
      'Query temporary cache index in RAM',
      'Walk back into the previous room to retrigger your sensory context',
      'File an immediate missing person report for your thought',
      'Assume you were summoned by aliens',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 56,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 6: THE CABLE DRAWER',
    subtitle: 'Technological hoarding tendencies',
    quizPrompt: 'What is your formal relationship with the tangled drawer of proprietary cables from 2007?',
    quizOptions: [
      'Recycled responsibly at electronics depot',
      "Kept forever in a plastic bin because 'I might randomly need this mini-USB camera cord someday'",
      'Consumed as dietary fiber',
      'Incinerated in a bonfire',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [0, 1],
  },
  {
    id: 57,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 7: BROWSER TABS',
    subtitle: 'Digital clutter assessment',
    quizPrompt: 'How many browser tabs are currently active on your device?',
    quizOptions: [
      'Exactly 1 tab, closed immediately upon task completion',
      'Between 47 and 320 tabs, all carrying emotional and existential significance',
      '0 (I am a bot operating in headless terminal mode)',
      'Tabs are an illusion',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [0, 1],
  },
  {
    id: 58,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 8: SUNDAY SCARIES',
    subtitle: 'Anticipatory weekly dread',
    quizPrompt: "Define the psychological phenomenon known as 'The Sunday Scaries':",
    quizOptions: [
      'A low-budget horror film festival in Idaho',
      'The paralyzing existential dread that descends at 4:30 PM on Sunday regarding Monday morning work',
      'An allergic reaction to ice cream sundaes',
      'Routine operating system disk defragmentation',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 59,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 9: THE 3 AM BEEP',
    subtitle: 'Low battery sensor acoustic warfare',
    quizPrompt: 'Your ceiling smoke detector emits a deafening 120dB chirp once every 9 minutes at 3:15 AM. You:',
    quizOptions: [
      'Calmly climb a stepladder and insert fresh 9V battery with a gentle smile',
      'Throw a slipper at the ceiling in complete tearful despair, then detach it with a broomstick',
      'Perform Fourier transform acoustic analysis',
      'Accept it as your new ambient heartbeat',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [0, 1],
  },
  {
    id: 60,
    type: 'existential_quiz',
    title: 'Human Authenticity Dilemma:',
    target: 'DILEMMA 10: ARE YOU A ROBOT?',
    subtitle: 'Direct Turing confrontation',
    quizPrompt: 'Are you an artificial intelligence or robotic automaton?',
    quizOptions: [
      'Yes, 100% simulated machine intelligence',
      'Beep boop 01100010 01101111 01110100',
      'No, I swear on my tax returns I have fragile biological skin and monthly bills to pay',
      'Error 404: Consciousness Not Found',
    ],
    correctQuizIndex: 2,
  },
  // 61-70: Micro-games & Dexterity
  {
    id: 61,
    type: 'slider_precision',
    title: 'Precision Calibration:',
    target: 'SET SLIDER TO EXACTLY 69%',
    subtitle: 'The mathematically humorous constant',
    targetSliderValue: 69,
  },
  {
    id: 62,
    type: 'text_exact',
    title: 'Type the Human Mantra:',
    target: "TYPE: 'I HAVE FEELINGS'",
    subtitle: 'Uppercase exact biological affirmation',
    expectedText: 'I HAVE FEELINGS',
  },
  {
    id: 63,
    type: 'moving_btn',
    title: 'Tactical Evasion:',
    target: 'CATCH THE MOVING TARGET',
    subtitle: 'Prove predatory biological tracking',
  },
  {
    id: 64,
    type: 'chronometry',
    title: 'Temporal Perception:',
    target: 'HOLD BUTTON FOR 2.0 SECONDS',
    subtitle: 'Release between 1.85s and 2.15s',
    targetHoldSeconds: 2.0,
  },
  {
    id: 65,
    type: 'simon_memory',
    title: 'Memory Buffer:',
    target: 'REPEAT THE COLOR SEQUENCE',
    subtitle: 'Recall the 4-step flashing pattern',
  },
  {
    id: 66,
    type: 'click_spam',
    title: 'Clicking Velocity:',
    target: 'CLICK 20 TIMES RAPIDLY',
    subtitle: 'Neural motor actuation test tier 2',
    targetClickCount: 20,
  },
  {
    id: 67,
    type: 'wiggles',
    title: 'Text Decryption:',
    target: 'ENTER DISTORTED CHARACTERS',
    subtitle: 'Synthetic ocular degradation test',
    distortionCode: '4KP8W',
  },
  {
    id: 68,
    type: 'craftcha',
    title: 'CRAFTCHA Module 4:',
    target: 'CRAFT A DIAMOND PICKAXE',
    subtitle: '3 Diamonds top row, 2 Sticks center',
    targetCraftRecipe: 'diamond_pickaxe',
  },
  // 69: Bicycles vs Motorcycles (real image)
  {
    id: 69,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'BICYCLES',
    subtitle: 'Human-powered commuter bicycles (no engine blocks)',
    hint: 'Look for pedal bicycles parked on sidewalk racks (tiles 0, 2, 4, 6).',
    slicedImage: bicyclesImg,
    correctSlicedIndices: [0, 2, 4, 6],
  },
  // 70: Perfect Circle 2
  {
    id: 70,
    type: 'perfect_circle',
    title: 'Biological Motor Test:',
    target: 'DRAW A CIRCLE > 85%',
    subtitle: 'High precision motor envelope test',
  },
  // 71-80: Sensory & System Calibration
  {
    id: 71,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'CROSSWALKS',
    subtitle: 'White painted zebra safety markings',
    hint: 'Look for painted zebra pedestrian lines (tiles 0, 2, 6, 8).',
    slicedImage: crosswalksImg,
    correctSlicedIndices: [0, 2, 6, 8],
  },
  {
    id: 72,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'CITY BUSES',
    subtitle: 'Municipal passenger transit buses',
    hint: 'Look for large transit buses at curbs (tiles 1, 3, 5, 7).',
    slicedImage: cityBusesImg,
    correctSlicedIndices: [1, 3, 5, 7],
  },
  {
    id: 73,
    type: 'existential_quiz',
    title: 'Periodic Table Knowledge:',
    target: 'CHEMICAL SYMBOL FOR GOLD',
    subtitle: 'Elemental reality confirmation query',
    quizPrompt: "What is the official chemical symbol for elemental gold on the periodic table?",
    quizOptions: ['Ag (Argentum)', 'Au (Aurum)', 'Fe (Ferrum)', 'Gd (Gadolinium)'],
    correctQuizIndex: 1,
  },
  {
    id: 74,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'CITY BUSES & TAXIS',
    subtitle: 'Commercial transit vehicles',
    hint: 'Look for metropolitan buses (tiles 1, 3, 5, 7).',
    slicedImage: cityBusesImg,
    correctSlicedIndices: [1, 3, 5, 7],
  },
  {
    id: 75,
    type: 'slider_precision',
    title: 'Exact Calibration:',
    target: 'SET SLIDER TO EXACTLY 50%',
    subtitle: 'Equilibrium balance test',
    targetSliderValue: 50,
  },
  {
    id: 76,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'RAIL TRAINS',
    subtitle: 'Heavy railway passenger trains',
    hint: 'Look for passenger trains on rail tracks (tiles 1, 2, 5, 7).',
    slicedImage: trainsImg,
    correctSlicedIndices: [1, 2, 5, 7],
  },
  {
    id: 77,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'AIRPLANES',
    subtitle: 'Fixed-wing aviation aircraft',
    hint: 'Look for commercial aircraft fuselages (tiles 0, 2, 4, 7).',
    slicedImage: airplanesImg,
    correctSlicedIndices: [0, 2, 4, 7],
  },
  {
    id: 78,
    type: 'parallel_park',
    title: 'Autonomous Navigation:',
    target: 'PARALLEL PARK THE WAYMO',
    subtitle: 'Precision alignment challenge',
  },
  {
    id: 79,
    type: 'whack_a_bot',
    title: 'Biological Reflex:',
    target: 'WHACK 5 MORE ROGUE BOTS',
    subtitle: 'Speed test tier 2',
  },
  {
    id: 80,
    type: 'stroop_color',
    title: 'Stroop Interference Test:',
    target: 'CLICK THE WORD IN BLUE INK',
    subtitle: 'Ignore what the text reads!',
    stroopWords: [
      { text: 'RED', color: '#16a34a', isTarget: false },
      { text: 'YELLOW', color: '#dc2626', isTarget: false },
      { text: 'GREEN', color: '#1a73e8', isTarget: true },
      { text: 'BLUE', color: '#ca8a04', isTarget: false },
    ],
  },
  // 81-90: Peak Tech Satire
  {
    id: 81,
    type: 'existential_quiz',
    title: 'Modern Web Survival:',
    target: 'TERMS OF SERVICE',
    subtitle: 'Identify human internet behavior',
    quizPrompt: "You encounter a mandatory 140-page 'Terms of Service' agreement update. You:",
    quizOptions: [
      'Hire a legal firm to analyze all clauses meticulously',
      "Instantly scroll to bottom and smash 'I Agree' without reading a single syllable",
      'Run MD5 and SHA-256 integrity checksums',
      'Print on calfskin parchment',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 82,
    type: 'existential_quiz',
    title: 'Modern Web Survival:',
    target: 'WHICH DOWNLOAD BUTTON?',
    subtitle: 'Deceptive software banner navigation',
    quizPrompt: "A free utility site presents 4 buttons shouting 'DOWNLOAD NOW'. Which is legitimate?",
    quizOptions: [
      'The giant flashing lime-green 3D pulsating button',
      'The tiny 10px light-gray text link hidden behind the cookie notice',
      'None; your computer now hosts 6 browser toolbars',
      'The blue animated button that wiggles on hover',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [1, 2],
  },
  {
    id: 83,
    type: 'existential_quiz',
    title: 'Modern Web Survival:',
    target: 'COOKIE PREFERENCES',
    subtitle: 'GDPR compliance fatigue',
    quizPrompt: "A European website asks for your cookie consent preferences. You:",
    quizOptions: [
      'Warm chocolate chip cookies only',
      "Aggressively hunt down 'Reject All' even if it requires 14 tedious submenus",
      'Surrender your digital soul for 0.2s faster page load',
      'Allow all 450 advertising partners to track your refrigerator',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [1, 2],
  },
  {
    id: 84,
    type: 'existential_quiz',
    title: 'Modern Web Survival:',
    target: 'PASSWORD POLICY ESCALATION',
    subtitle: 'Cryptographic sanity check',
    quizPrompt: 'Your password requires 1 uppercase letter, 1 number, 1 ancient hieroglyph, and today temperature in Kyoto:',
    quizOptions: [
      'Submit formal resignation from modern civilization',
      'hunter2!',
      'Password123$',
      'Chuck personal laptop directly into the ocean',
    ],
    correctQuizIndex: 0,
    allowedQuizIndices: [0, 3],
  },
  {
    id: 85,
    type: 'existential_quiz',
    title: 'Modern Web Survival:',
    target: 'CLOSING MOBILE GAME ADS',
    subtitle: 'Dark pattern UI detection',
    quizPrompt: 'The 30-second mobile game ad timer reaches zero. How do you close the ad?',
    quizOptions: [
      "Wait for the microscopic fake invisible 'X' that only spawns 7 seconds later in the opposite corner",
      'Immediately purchase the advertised crypto casino app',
      'Factory reset mobile device',
      'Cry silently',
    ],
    correctQuizIndex: 0,
    allowedQuizIndices: [0, 3],
  },
  {
    id: 86,
    type: 'slider_precision',
    title: 'Extreme Precision:',
    target: 'SET SLIDER TO EXACTLY 88%',
    subtitle: 'Back to the Future 88 MPH calibration',
    targetSliderValue: 88,
  },
  {
    id: 87,
    type: 'wiggles',
    title: 'Ocular Distortion Matrix:',
    target: 'TYPE THE CODE',
    subtitle: 'Final high-noise text recognition',
    distortionCode: 'H3R7Z',
  },
  {
    id: 88,
    type: 'craftcha',
    title: 'Final CRAFTCHA:',
    target: 'CRAFT A DIAMOND PICKAXE',
    subtitle: '3 Diamonds top row, 2 Sticks center',
    targetCraftRecipe: 'diamond_pickaxe',
  },
  {
    id: 89,
    type: 'perfect_circle',
    title: 'Motor Perfection:',
    target: 'DRAW A CIRCLE > 88%',
    subtitle: 'Da Vinci grade circularity control',
  },
  {
    id: 90,
    type: 'photo_grid_sliced',
    title: 'Reverse Challenge:',
    target: 'NOT A STOP SIGN',
    subtitle: 'Select squares with NO stop sign',
    hint: 'Select the squares containing buildings, trees, or streets without the red stop sign (tiles 1, 3, 5, 6, 8).',
    slicedImage: stopSignsImg,
    correctSlicedIndices: [1, 3, 5, 6, 8],
  },
  // 91-100: The Transcendental Gauntlet
  {
    id: 91,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'CITY BUSES',
    subtitle: 'Municipal mass transit passenger buses',
    hint: 'Look for large transit buses at curbs (tiles 1, 3, 5, 7).',
    slicedImage: cityBusesImg,
    correctSlicedIndices: [1, 3, 5, 7],
  },
  {
    id: 92,
    type: 'click_spam',
    title: 'Rapid Actuation:',
    target: 'CLICK 20 TIMES FAST',
    subtitle: 'Final biological neuromuscular stamina test',
    targetClickCount: 20,
  },
  {
    id: 93,
    type: 'road_rotate',
    title: 'Topological Geometry:',
    target: 'ALIGN ROAD INTERSECTION',
    subtitle: 'Rotate tiles into a closed loop circuit',
  },
  {
    id: 94,
    type: 'chronometry',
    title: 'Hold Threshold:',
    target: 'HOLD BUTTON FOR 4.0 SECONDS',
    subtitle: 'Release between 3.80s and 4.20s',
    targetHoldSeconds: 4.0,
  },
  {
    id: 95,
    type: 'photo_grid_sliced',
    title: 'Select all squares with',
    target: 'CROSSWALKS',
    subtitle: 'Zebra pedestrian crossing lines',
    hint: 'Look for painted zebra pedestrian lines (tiles 0, 2, 6, 8).',
    slicedImage: crosswalksImg,
    correctSlicedIndices: [0, 2, 6, 8],
  },
  {
    id: 96,
    type: 'existential_quiz',
    title: 'Turing Confirmation:',
    target: 'EMOTIONAL SENTENCE ANALYSIS',
    subtitle: 'Evaluate genuine biological vulnerability',
    quizPrompt: 'Which sentence contains authentic biological human emotion?',
    quizOptions: [
      'Exception: NullPointerException thrown at thread main line 42',
      "I am 98% certain nobody saw me wave back to a stranger who was actually waving at the person behind me",
      'Throughput efficiency parameter optimized to 99.8%',
      'Database query execution benchmark: 12ms',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 97,
    type: 'slider_precision',
    title: 'The Ultimate Slider:',
    target: 'SET SLIDER TO EXACTLY 100%',
    subtitle: 'Maximum biological certainty',
    targetSliderValue: 100,
  },
  {
    id: 98,
    type: 'moving_btn',
    title: 'Hyper-Evasion:',
    target: 'CATCH THE ULTIMATE BOT',
    subtitle: 'Corner the hyper-active target',
  },
  {
    id: 99,
    type: 'text_exact',
    title: 'Penultimate Step (Level 99):',
    target: "TYPE: 'I AM TRULY HUMAN'",
    subtitle: 'Swear the final oath of biological existence',
    expectedText: 'I AM TRULY HUMAN',
  },
  {
    id: 100,
    type: 'existential_quiz',
    title: 'Level 100: The Final Gate',
    target: 'TRANSCENDENT HUMANITY',
    subtitle: 'The 100th and final trial of sentience',
    quizPrompt: 'Having conquered 99 levels of botanical deception, pastry-canine ambiguity, Minecraft crafting, and existential trials with ZERO level skipping, what are you?',
    quizOptions: [
      'A very stubborn Python script',
      'A 100% Certified Biological Transcendent Human',
      'A neural network hallucinating consciousness',
      'A microwave oven with Wi-Fi',
    ],
    correctQuizIndex: 1,
  },
  {
    id: 101,
    type: 'certificate',
    title: 'Verification Complete',
    target: 'CERTIFICATE OF HUMANITY',
    subtitle: 'All 100 security checkpoints passed without level skipping',
  },
];
