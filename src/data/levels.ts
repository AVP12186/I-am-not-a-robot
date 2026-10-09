import { LevelConfig, GridItem } from '../types/game';
import { getPhotoUrl } from './photos';

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
    hint: 'Look for standard red octagonal street signage.',
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
    hint: 'Look for 3-lens traffic signal fixtures.',
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
    hint: 'Look for municipal cast-iron hydrant nozzles.',
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
    hint: 'Look for painted zebra pedestrian markings.',
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
    hint: 'Look for alert pointed ears and canine snouts.',
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
    hint: 'Look for crispy fried drumstick coatings.',
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
      'March 21',
      'July 14',
      'October 31',
      'December 25',
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
    hint: 'Look for golden flaky butter pastry crust.',
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
    hint: 'Click squares that show street objects without traffic lights.',
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
    hint: 'Look for the 4 sourdough bread loaves.',
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
    hint: 'Look for furry puppy folds and dark muzzle.',
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
  },  // 18:
  {
    id: 18,
    type: 'catch_apples',
    title: 'Biological Harvest:',
    target: 'CATCH 3 ORGANIC APPLES',
    subtitle: 'Steer the basket to catch fruit; avoid silicon microchips',
    hint: 'Collect 3 real red apples in the basket.',
    targetApples: 3,
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
    hint: 'Look for baked muffin crust and blue berries.',
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
    hint: 'Look for furry sloths clinging to tree branches.',
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
    hint: 'Look for the 5 golden curled puppies.',
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
  },  // 27:
  {
    id: 27,
    type: 'reaction_speed',
    title: 'Biological Reflex Test:',
    target: 'TEST SYNAPTIC REACTION SPEED',
    subtitle: 'Wait for emerald green and click instantly (140ms - 550ms human range)',
    hint: 'Wait for green and click instantly.',
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
    quizOptions: ['XII', 'XIV', 'XVI', 'IX'],
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
      '100 kg of bricks',
      '100 kg of feathers',
      'They weigh the exact same',
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
      'Dolphin',
      'Bat',
      'Platypus',
      'Penguin',
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
    quizOptions: ['8', '6', '4', '22'],
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
      'Pull the lever to switch tracks',
      'Execute multi-track drift to derail trolley',
      'Attempt to reason with the trolley',
    ],
    correctQuizIndex: 1,
    allowedQuizIndices: [0, 1],
  },
  // 41: Passenger Trains
  {
    id: 41,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'TRAINS',
    subtitle: 'Heavy rail transit locomotives',
    hint: 'Look for passenger trains and locomotives on rail tracks.',
    items: makePhotoGrid('train', 'Passenger Train', [
      { key: 'bus', label: 'City Bus' },
      { key: 'car', label: 'Car' },
      { key: 'truck', label: 'Truck' },
    ], [1, 2, 5, 7]),
  },
  // 42: Suspension Bridges
  {
    id: 42,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'BRIDGES',
    subtitle: 'Overpass and suspension bridge structures',
    hint: 'Look for suspension cables and concrete pillars over water.',
    items: makePhotoGrid('bridge', 'Suspension Bridge', [
      { key: 'tunnel', label: 'Highway Tunnel' },
      { key: 'building', label: 'Office Building' },
      { key: 'wall', label: 'Brick Wall' },
    ], [0, 3, 5, 6]),
  },
  // 43: Morning Stimulant Registration (Linked Question 3)
  {
    id: 43,
    type: 'existential_quiz',
    title: 'Biometric Chemical Archive:',
    target: 'DECLARE MORNING STIMULANT',
    subtitle: 'Record biological morning chemical dependency',
    quizPrompt: 'Which chemical stimulant does your biological vessel require each morning to achieve consciousness?',
    quizOptions: [
      'Freshly brewed dark roast espresso',
      'Iced matcha green tea latte',
      'Ice-cold carbonated energy drink',
      'Tap water and unbridled morning panic',
    ],
    hint: 'Select the primary chemical stimulant you depend on in the morning.',
    memoryKey: 'morningDrink',
  },
  // 44: Sailboats and Watercraft
  {
    id: 44,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'BOATS',
    subtitle: 'Marine vessels and watercraft',
    hint: 'Look for sailboats and boat hulls on open water.',
    items: makePhotoGrid('boat', 'Sailboat', [
      { key: 'car', label: 'Sedan Car' },
      { key: 'bus', label: 'City Bus' },
      { key: 'bicycle', label: 'Bicycle' },
    ], [1, 3, 6, 7]),
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
  // 46: Commercial Airplanes
  {
    id: 46,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'AIRPLANES',
    subtitle: 'Fixed-wing passenger aircraft',
    hint: 'Look for commercial jet fuselages and wings.',
    items: makePhotoGrid('airplane', 'Commercial Jet', [
      { key: 'bird', label: 'Soaring Bird' },
      { key: 'helicopter', label: 'Helicopter' },
      { key: 'train', label: 'Train' },
    ], [0, 2, 4, 7]),
  },  // 47:
  {
    id: 47,
    type: 'wire_cut',
    title: 'Circuit Disconnect Protocol:',
    target: 'CUT THE BIOLOGICAL RED WIRE',
    subtitle: 'Snip the wire carrying organic hemoglobin current',
    hint: 'Cut the red wire matching biological blood.',
    targetWireColor: 'red',
    wireInstruction: 'Cut the wire matching biological human hemoglobin (Red)',
  },
  // 48: Parking Meters
  {
    id: 48,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'PARKING METERS',
    subtitle: 'Curbside electronic payment kiosks',
    hint: 'Look for sidewalk poles with electronic parking meters.',
    items: makePhotoGrid('meter', 'Parking Meter', [
      { key: 'hydrant', label: 'Fire Hydrant' },
      { key: 'lamp', label: 'Lamppost' },
      { key: 'mailbox', label: 'Mailbox' },
    ], [1, 2, 4, 8]),
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
  // 50: Rooftop Chimneys
  {
    id: 50,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'CHIMNEYS',
    subtitle: 'Roof exhaust flues and brick stacks',
    hint: 'Look for red brick chimneys projecting from rooftops.',
    items: makePhotoGrid('chimney', 'Rooftop Chimney', [
      { key: 'antenna', label: 'Rooftop Antenna' },
      { key: 'window', label: 'Window' },
      { key: 'wall', label: 'Wall' },
    ], [0, 3, 5, 7]),
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
  // 54: Checkpoint Security Audit: Birthday (Linked Question 1 Audit)
  {
    id: 54,
    type: 'existential_quiz',
    title: 'Checkpoint Security Audit:',
    target: 'RE-CONFIRM BIOLOGICAL BIRTHDAY',
    subtitle: 'Anti-bot chronological memory audit',
    quizPrompt: 'In Security Checkpoint 10, which biological human birthday season did you declare?',
    quizOptions: [
      'March 21',
      'July 14',
      'October 31',
      'December 25',
    ],
    hint: 'Select the exact biological birthday option you chose back in Level 10.',
    memoryKey: 'birthday',
    isMemoryAudit: true,
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
      '0 (Zero)',
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
  },  // 63:
  {
    id: 63,
    type: 'maze_runner',
    title: 'Organic Tremor Analysis:',
    target: 'NAVIGATE THE S-CURVE CORRIDOR',
    subtitle: 'Move from START to GOAL without touching walls (machines interpolate straight lines)',
    hint: 'Click START and guide your cursor along the track.',
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
  // 68: Security Memory Audit: First Companion (Linked Question 2 Audit)
  {
    id: 68,
    type: 'existential_quiz',
    title: 'Security Memory Audit:',
    target: 'CONFIRM CHILDHOOD COMPANION',
    subtitle: 'Cross-reference declared emotional memories',
    quizPrompt: 'In Checkpoint 32, which companion did you register as protecting your biological childhood residence?',
    quizOptions: [
      'Golden Retriever named Buster',
      'Orange Tabby Cat named Marmalade',
      'Blue Parakeet named Kiwi',
      'A resilient houseplant named Fern',
    ],
    hint: 'Select the exact childhood companion you registered back in Level 32.',
    memoryKey: 'firstPet',
    isMemoryAudit: true,
  },
  // 69: Commuter Bicycles
  {
    id: 69,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'BICYCLES',
    subtitle: 'Human-powered commuter bicycles (no engine blocks)',
    hint: 'Look for pedal bicycles parked on sidewalk racks.',
    items: makePhotoGrid('bicycle', 'Commuter Bicycle', [
      { key: 'motorcycle', label: 'Motorcycle' },
      { key: 'car', label: 'Car' },
      { key: 'bench', label: 'Bench' },
    ], [0, 2, 4, 6]),
  },  // 70:
  {
    id: 70,
    type: 'pattern_memory',
    title: 'Visual Spatial Matrix:',
    target: 'RECALL 3 FLASHING TILES',
    subtitle: 'Test working short-term memory (human hippocampus benchmark)',
    hint: 'Remember which 3 tiles light up gold.',
  },
  // 71-80: Sensory & System Calibration  // 71:
  {
    id: 71,
    type: 'reaction_speed',
    title: 'Neural Velocity Gauge:',
    target: 'VERIFY NERVE CONDUCTION SPEED',
    subtitle: 'Wait for green. Prove your biological synapses are firing.',
    hint: 'Click as soon as the screen flashes green.',
  },
  {
    id: 72,
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'CITY BUSES',
    subtitle: 'Municipal passenger transit buses',
    hint: 'Look for large transit buses at curbs.',
    items: makePhotoGrid('bus', 'Transit Bus', [
      { key: 'car', label: 'Car' },
      { key: 'bicycle', label: 'Bicycle' },
      { key: 'truck', label: 'Truck' },
    ], [1, 3, 5, 7]),
  },
  {
    id: 73,
    type: 'existential_quiz',
    title: 'Periodic Table Knowledge:',
    target: 'CHEMICAL SYMBOL FOR GOLD',
    subtitle: 'Elemental reality confirmation query',
    quizPrompt: "What is the official chemical symbol for elemental gold on the periodic table?",
    quizOptions: ['Ag', 'Au', 'Fe', 'Gd'],
    correctQuizIndex: 1,
  },  // 74:
  {
    id: 74,
    type: 'wire_cut',
    title: 'Power Distribution Cut:',
    target: 'CUT THE GREEN GROUND WIRE',
    subtitle: 'Interrupt chassis ground to disable automated bot transceivers',
    hint: 'Snip the green ground wire.',
    targetWireColor: 'green',
    wireInstruction: 'Cut the green chassis ground wire to disable bot telemetry',
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
    type: 'photo_grid_items',
    title: 'Select all squares with',
    target: 'RAIL TRAINS',
    subtitle: 'Heavy railway passenger trains',
    hint: 'Look for passenger trains on rail tracks (tiles 1, 2, 5, 7).',
    items: makePhotoGrid('train', 'Passenger Train', [
      { key: 'bus', label: 'Transit Bus' },
      { key: 'truck', label: 'Delivery Truck' },
      { key: 'car', label: 'Car' },
    ], [1, 2, 5, 7]),
  },  // 77:
  {
    id: 77,
    type: 'catch_apples',
    title: 'Botanical Calibration:',
    target: 'CATCH 3 FALLING APPLES',
    subtitle: 'Distinguish gravity-bound biological produce from falling microchips',
    hint: 'Catch 3 apples in the basket.',
    targetApples: 3,
  },  // 78:
  {
    id: 78,
    type: 'maze_runner',
    title: 'Analog Motor Pathing:',
    target: 'TRACE THE CURVED HUMAN PATH',
    subtitle: 'Navigate the organic curve from START to GOAL',
    hint: 'Guide the cursor through the path without hitting edges.',
  },  // 79:
  {
    id: 79,
    type: 'pattern_memory',
    title: 'Neural Matrix Recall:',
    target: 'RECALL THE 3 ACTIVE TILES',
    subtitle: 'Biological memory retention challenge',
    hint: 'Observe the 3 gold tiles and select them.',
  },  // 80:
  {
    id: 80,
    type: 'stroop_color',
    title: 'Cognitive Interference:',
    target: 'CLICK THE WORD IN GREEN INK',
    subtitle: 'Inhibit automatic reading response',
    stroopWords: [
      { text: 'GREEN', color: '#dc2626', isTarget: false },
      { text: 'BLUE', color: '#16a34a', isTarget: true },
      { text: 'YELLOW', color: '#2563eb', isTarget: false },
      { text: 'RED', color: '#ca8a04', isTarget: false },
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
  // 88: Morning Stimulant Audit (Linked Question 3 Audit)
  {
    id: 88,
    type: 'existential_quiz',
    title: 'Biological Consistency Audit:',
    target: 'CONFIRM MORNING STIMULANT',
    subtitle: 'Verify biochemical habit continuity',
    quizPrompt: 'In Checkpoint 43, what morning stimulant did you register your vessel as requiring?',
    quizOptions: [
      'Freshly brewed dark roast espresso',
      'Iced matcha green tea latte',
      'Ice-cold carbonated energy drink',
      'Tap water and unbridled morning panic',
    ],
    hint: 'Select the exact morning beverage you declared in Level 43.',
    memoryKey: 'morningDrink',
    isMemoryAudit: true,
  },  // 89:
  {
    id: 89,
    type: 'wire_cut',
    title: 'Emergency Breaker:',
    target: 'CUT THE BLUE AC WIRE',
    subtitle: 'Interrupt the high-frequency alternating current line',
    hint: 'Snip the blue wire.',
    targetWireColor: 'blue',
    wireInstruction: 'Cut the blue alternating current wire to prevent bot override',
  },
  {
    id: 90,
    type: 'photo_grid_items',
    title: 'Reverse Challenge:',
    target: 'NOT A STOP SIGN',
    subtitle: 'Select squares with NO stop sign',
    hint: 'Select squares containing lampposts, benches, or walls without the red stop sign.',
    items: makePhotoGrid('lamp', 'Lamppost', [
      { key: 'stop sign', label: 'Stop Sign' },
    ], [1, 3, 4, 6, 8]),
  },
  // 91-100: The Transcendental Gauntlet  // 91:
  {
    id: 91,
    type: 'reaction_speed',
    title: 'Final Synaptic Reflex Test:',
    target: 'REFLEX VELOCITY BENCHMARK',
    subtitle: 'Level 91: Biological reflexes must clock between 140ms and 550ms',
    hint: 'Wait for green and click instantly.',
  },  // 92:
  {
    id: 92,
    type: 'catch_apples',
    title: 'Gravity & Optics Trial:',
    target: 'HARVEST 5 ORCHARD APPLES',
    subtitle: 'Catch the falling fruit in your basket',
    hint: 'Catch 3 apples.',
    targetApples: 3,
  },
  {
    id: 93,
    type: 'road_rotate',
    title: 'Topological Geometry:',
    target: 'ALIGN ROAD INTERSECTION',
    subtitle: 'Rotate tiles into a closed loop circuit',
  },  // 94:
  {
    id: 94,
    type: 'pattern_memory',
    title: 'Pattern Recognition Gauntlet:',
    target: 'MEMORY RECALL: GOLDEN MATRIX',
    subtitle: 'Prove your short-term organic memory buffer',
    hint: 'Remember the 3 golden squares.',
  },  // 95:
  {
    id: 95,
    type: 'maze_runner',
    title: 'Sub-Millimeter Motor Trace:',
    target: 'COMPLETE THE BIOLOGICAL PATH',
    subtitle: 'Level 95 penultimate dexterity trial',
    hint: 'Guide the marker smoothly from START to GOAL.',
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
