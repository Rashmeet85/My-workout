/* ═══════════════════════════════════════════════════
   12-Week Gym Plan — Static Data
   ═══════════════════════════════════════════════════ */

"use strict";

const PHASES = [
  null,
  "Learn form. Start light. Aim top of rep range with perfect technique.",
  "Learn form. Start light. Aim top of rep range with perfect technique.",
  "+2.5–5% load on compounds if all reps hit last week.",
  "+2.5–5% load on compounds if all reps hit last week.",
  "Add 1 set to first compound OR +2.5% load.",
  "Add 1 set to first compound OR +2.5% load.",
  "Progress again +2.5–5%. Keep rest strict.",
  "Progress again +2.5–5%. Keep rest strict.",
  "Heavier focus: lower rep range on compounds.",
  "Heavier focus: lower rep range on compounds.",
  "Optional deload: -20% volume if fatigued.",
  "Test week: best clean reps/loads.",
];

const PHASE_NAMES = [
  "",
  "Foundation",
  "Foundation",
  "Build",
  "Build",
  "Accumulate",
  "Accumulate",
  "Intensify",
  "Intensify",
  "Peak",
  "Peak",
  "Deload",
  "Test",
];
const PHASE_CLS = [
  "",
  "phase-foundation",
  "phase-foundation",
  "phase-build",
  "phase-build",
  "phase-accumulate",
  "phase-accumulate",
  "phase-intensify",
  "phase-intensify",
  "phase-peak",
  "phase-peak",
  "phase-deload",
  "phase-test",
];
// DAY_ICONS order: Mon, Tue, Wed, Thu, Fri, Sat, Sun (week starts Monday)
const DAY_ICONS = ["💪", "🏋️", "🦵", "🚶", "🏔️", "💪", "🍑"];

const DAYS = [
  {
    day: "Monday",
    focus: "Chest + Triceps + Cardio",
    exercises: [
      { name: "Flat Press (BB/Machine)", sets: "4×6–8", numSets: 4, alt: "Push-ups / DB Press" },
      { name: "Incline DB Press", sets: "3×8–10", numSets: 3, alt: "Incline Machine Press" },
      { name: "Cable/DB Flyes", sets: "3×12–15", numSets: 3, alt: "Pec Deck" },
      { name: "Close-Grip Press / Assisted Dips", sets: "3×8–10", numSets: 3, alt: "Bench Dips (assisted)" },
      { name: "Rope Triceps Pushdown", sets: "3×12–15", numSets: 3, alt: "Overhead DB Extension" },
      { name: "Cardio: Incline Walk", sets: "15–20 min", numSets: 0, cardio: true, alt: "Elliptical steady 15–20 min" },
    ],
  },
  {
    day: "Tuesday",
    focus: "Back + Biceps + Cardio",
    exercises: [
      { name: "Lat Pulldown / Assisted Pull-ups", sets: "4×6–8", numSets: 4, alt: "Neutral-grip Pulldown" },
      { name: "Seated Cable Row", sets: "3×8–10", numSets: 3, alt: "Chest-Supported DB Row" },
      { name: "One-arm DB Row", sets: "3×10/side", numSets: 3, alt: "Machine Row (single-arm)" },
      { name: "EZ-Bar/DB Curl", sets: "3×10–12", numSets: 3, alt: "Cable Curl" },
      { name: "Hammer Curl", sets: "3×10–12", numSets: 3, alt: "Rope Hammer Curl" },
      { name: "Cardio: Bike Intervals", sets: "16–20 min", numSets: 0, cardio: true, alt: "Rowing intervals 12–16 min" },
    ],
  },
  {
    day: "Wednesday",
    focus: "Legs (Quads) + Core + Cardio",
    exercises: [
      { name: "Squat OR Leg Press", sets: "4×6–8", numSets: 4, alt: "Goblet Squat" },
      { name: "Bulgarian Split Squat", sets: "3×8–10/leg", numSets: 3, alt: "Reverse Lunges / Step-ups" },
      { name: "Leg Extension", sets: "3×12–15", numSets: 3, alt: "Spanish Squat (band)" },
      { name: "Walking Lunges", sets: "2×12/leg", numSets: 2, alt: "Split Squats" },
      { name: "Standing Calf Raises", sets: "4×12–15", numSets: 4, alt: "Seated Calf Raises" },
      { name: "Plank", sets: "3×30–45s", numSets: 3, alt: "Dead Bug 3×10/side" },
      { name: "Cardio: Brisk Walk", sets: "15–20 min", numSets: 0, cardio: true, alt: "Elliptical steady 15–20 min" },
    ],
  },
  {
    day: "Thursday",
    focus: "Active Recovery",
    exercises: [
      { name: "Brisk Walk / Cycling", sets: "30–40 min", numSets: 0, cardio: true, alt: "Swimming (easy)" },
      { name: "Mobility & Stretching", sets: "10–15 min", numSets: 0, cardio: true, alt: "Yoga flow (easy)" },
    ],
  },
  {
    day: "Friday",
    focus: "Shoulders + Chest (Light) + Cardio",
    exercises: [
      { name: "Overhead Press", sets: "4×6–8", numSets: 4, alt: "Machine Shoulder Press" },
      { name: "Lateral Raises", sets: "3×12–15", numSets: 3, alt: "Cable Lateral Raises" },
      { name: "Rear Delt Fly / Face Pulls", sets: "3×12–15", numSets: 3, alt: "Reverse Pec Deck" },
      { name: "Incline DB Press (light)", sets: "2×10–12", numSets: 2, alt: "Push-ups (incline)" },
      { name: "Cardio: Intervals 30s/90s", sets: "16–20 min", numSets: 0, cardio: true, alt: "Stair intervals 12–16 min" },
    ],
  },
  {
    day: "Saturday",
    focus: "Back (Light) + Arms + Cardio",
    exercises: [
      { name: "Chest-Supported Row", sets: "3×8–10", numSets: 3, alt: "Machine Row" },
      { name: "Lat Pulldown (light)", sets: "3×10–12", numSets: 3, alt: "Straight-arm Pulldown" },
      { name: "Superset: DB Curl + Rope Pushdown", sets: "3×10–12", numSets: 3, alt: "Cable Curl + OH Triceps Ext" },
      { name: "Cable Curls", sets: "2×12", numSets: 2, alt: "Preacher Curl (machine)" },
      { name: "Overhead Triceps Extension", sets: "2×12", numSets: 2, alt: "Skullcrushers (EZ-bar)" },
      { name: "Cardio: Elliptical", sets: "15–20 min", numSets: 0, cardio: true, alt: "Incline walk 15–20 min" },
    ],
  },
  {
    day: "Sunday",
    focus: "Legs (Glutes/Hamstrings) + Core + Cardio",
    exercises: [
      { name: "Hip Thrust", sets: "4×8–10", numSets: 4, alt: "Glute Bridge" },
      { name: "Romanian Deadlift", sets: "3×8–10", numSets: 3, alt: "Cable Pull-through" },
      { name: "Hamstring Curl", sets: "3×10–12", numSets: 3, alt: "Stability Ball Curl" },
      { name: "Goblet Squat", sets: "2×12", numSets: 2, alt: "Leg Press (light)" },
      { name: "Seated Calf Raises", sets: "3×12–15", numSets: 3, alt: "Standing Calf Raises" },
      { name: "Core Circuit", sets: "3 rounds", numSets: 3, alt: "Pallof Press + Dead Bug" },
      { name: "Cardio: Stairs/Incline Walk", sets: "15–20 min", numSets: 0, cardio: true, alt: "Bike steady 15–20 min" },
    ],
  },
];

const MUSCLE_MAP = {
  // Sunday - Chest + Triceps
  "Flat Press (BB/Machine)": "Chest",
  "Incline DB Press": "Chest",
  "Cable/DB Flyes": "Chest",
  "Close-Grip Press / Assisted Dips": "Triceps",
  "Rope Triceps Pushdown": "Triceps",
  // Monday - Back + Biceps
  "Lat Pulldown / Assisted Pull-ups": "Back",
  "Seated Cable Row": "Back",
  "One-arm DB Row": "Back",
  "EZ-Bar/DB Curl": "Biceps",
  "Hammer Curl": "Biceps",
  // Tuesday - Legs/Quads + Core
  "Squat OR Leg Press": "Legs",
  "Bulgarian Split Squat": "Legs",
  "Leg Extension": "Legs",
  "Walking Lunges": "Legs",
  "Standing Calf Raises": "Calves",
  "Plank": "Core",
  // Thursday - Shoulders + Chest
  "Overhead Press": "Shoulders",
  "Lateral Raises": "Shoulders",
  "Rear Delt Fly / Face Pulls": "Shoulders",
  "Incline DB Press (light)": "Chest",
  // Friday - Back + Arms
  "Chest-Supported Row": "Back",
  "Lat Pulldown (light)": "Back",
  "Superset: DB Curl + Rope Pushdown": "Biceps/Triceps",
  "Cable Curls": "Biceps",
  "Overhead Triceps Extension": "Triceps",
  // Saturday - Glutes/Hamstrings + Core
  "Hip Thrust": "Glutes",
  "Romanian Deadlift": "Hamstrings",
  "Hamstring Curl": "Hamstrings",
  "Goblet Squat": "Legs",
  "Seated Calf Raises": "Calves",
  "Core Circuit": "Core",
};

const PR_LIFTS = [
  "Back Squat",
  "Bench Press",
  "Deadlift",
  "Pull-ups / Weighted",
  "Overhead Press",
  "Hip Thrust",
];

const TOTAL_PER_WEEK = DAYS.reduce((s, d) => s + d.exercises.length, 0);
const TOTAL_ALL = TOTAL_PER_WEEK * 12;

/* ── 7-DAY NUTRITION PLAN ── */
/* Index 0 = Monday, 1 = Tuesday, ..., 6 = Sunday (week starts Monday) */
const MEAL_PLAN = {
  0: {
    label: "Monday",
    preGym: {
      name: "Black Coffee / Fruit",
      cal: 40,
      protein: 1,
      carbs: 8,
      fat: 0,
    },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Sabzi + Curd", cal: 120, protein: 7, carbs: 12, fat: 4 },
    ],
    snack: [
      { name: "Nuts", cal: 160, protein: 5, carbs: 6, fat: 14 },
      { name: "Green Tea", cal: 5, protein: 0, carbs: 1, fat: 0 },
    ],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Light Dal + Veggies", cal: 130, protein: 9, carbs: 18, fat: 2 },
    ],
  },
  1: {
    label: "Tuesday",
    preGym: {
      name: "Banana (1 medium)",
      cal: 90,
      protein: 1,
      carbs: 23,
      fat: 0,
    },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Paneer Bhurji", cal: 180, protein: 14, carbs: 5, fat: 12 },
    ],
    snack: [
      { name: "Roasted Makhana", cal: 100, protein: 4, carbs: 16, fat: 2 },
    ],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Dal + Veggies", cal: 130, protein: 9, carbs: 18, fat: 2 },
    ],
  },
  2: {
    label: "Wednesday",
    preGym: { name: "Chia Water", cal: 30, protein: 1, carbs: 3, fat: 2 },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Tofu Bhurji + Curd", cal: 200, protein: 16, carbs: 8, fat: 11 },
    ],
    snack: [
      { name: "Apple", cal: 80, protein: 0, carbs: 21, fat: 0 },
      { name: "Peanuts (small handful)", cal: 90, protein: 4, carbs: 3, fat: 7 },
    ],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Veg Soup + Paneer", cal: 170, protein: 12, carbs: 10, fat: 8 },
    ],
  },
  3: {
    label: "Thursday",
    preGym: { name: "Black Coffee", cal: 5, protein: 0, carbs: 0, fat: 0 },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Mixed Veg + Curd", cal: 130, protein: 6, carbs: 14, fat: 4 },
    ],
    snack: [
      { name: "Apple", cal: 80, protein: 0, carbs: 21, fat: 0 },
      { name: "Peanuts", cal: 90, protein: 4, carbs: 3, fat: 7 },
    ],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Dal Palak + Salad", cal: 150, protein: 10, carbs: 20, fat: 3 },
    ],
  },
  4: {
    label: "Friday",
    preGym: { name: "Papaya (1 cup)", cal: 60, protein: 1, carbs: 15, fat: 0 },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Besan Chilla", cal: 160, protein: 10, carbs: 20, fat: 4 },
    ],
    snack: [
      { name: "Coconut Water", cal: 45, protein: 0, carbs: 11, fat: 0 },
      { name: "Chana (boiled)", cal: 80, protein: 5, carbs: 13, fat: 1 },
    ],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Dal Palak + Salad", cal: 150, protein: 10, carbs: 20, fat: 3 },
    ],
  },
  5: {
    label: "Saturday",
    preGym: {
      name: "Banana (1 medium)",
      cal: 90,
      protein: 1,
      carbs: 23,
      fat: 0,
    },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Mixed Veg + Curd", cal: 130, protein: 6, carbs: 14, fat: 4 },
    ],
    snack: [{ name: "Fruit Chaat", cal: 100, protein: 1, carbs: 24, fat: 0 }],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Veg Khichdi + Curd", cal: 200, protein: 8, carbs: 32, fat: 4 },
    ],
  },
  6: {
    label: "Sunday",
    preGym: { name: "Chia Water", cal: 30, protein: 1, carbs: 3, fat: 2 },
    breakfast: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Paneer Tikka", cal: 200, protein: 16, carbs: 6, fat: 12 },
    ],
    snack: [{ name: "Fruit Chaat", cal: 100, protein: 1, carbs: 24, fat: 0 }],
    dinner: [
      { name: "1 Roti", cal: 80, protein: 3, carbs: 15, fat: 1 },
      { name: "Soup + Grilled Paneer", cal: 190, protein: 14, carbs: 10, fat: 10 },
    ],
  },
};

const MACRO_GOALS = { protein: 100, carbs: 200, fat: 60 };

/* ── WARMUP DATA ── */
const WARMUP_DATA = {
  Chest: {
    icon: '💪',
    color: '#60a5fa',
    exercises: [
      { name: 'Arm Circles', sets: '2 × 20 reps each direction', tip: 'Keep arms straight, full range of motion' },
      { name: 'Chest Opener Stretch', sets: '3 × 20s hold', tip: 'Clasp hands behind back, open chest forward' },
      { name: 'Wall Push-up', sets: '2 × 15 reps', tip: 'Slow and controlled — feel the pec stretch' },
      { name: 'Band Pull-Apart', sets: '2 × 15 reps', tip: 'Pull to chest height, squeeze shoulder blades' },
      { name: 'Light DB Fly (no weight)', sets: '2 × 12 reps', tip: 'Focus on full stretch at bottom' },
      { name: 'Doorway Stretch', sets: '2 × 30s each side', tip: 'Elbows at 90°, lean gently forward' },
    ],
  },
  Back: {
    icon: '🏋️',
    color: '#a78bfa',
    exercises: [
      { name: 'Cat-Cow', sets: '2 × 10 slow reps', tip: 'Breathe in on arch, out on round' },
      { name: 'Band Face Pull', sets: '2 × 15 reps', tip: 'Pull to forehead, external rotate at top' },
      { name: 'Dead Hang', sets: '3 × 20–30s', tip: 'Relax shoulders fully, decompress spine' },
      { name: 'Scapular Pull-ups', sets: '2 × 10 reps', tip: 'Depress scapula without bending elbows' },
      { name: 'Single-arm Cable Row (light)', sets: '2 × 12 reps', tip: 'Feel the lat engage at full stretch' },
      { name: 'Child\'s Pose', sets: '2 × 30s', tip: 'Arms extended, feel thoracic stretch' },
    ],
  },
  Shoulders: {
    icon: '🏔️',
    color: '#fbbf24',
    exercises: [
      { name: 'Neck Rolls', sets: '2 × 10 reps each side', tip: 'Slow and gentle, never force range' },
      { name: 'Shoulder Rolls', sets: '2 × 15 reps', tip: 'Big circles, forward and backward' },
      { name: 'Cross-body Stretch', sets: '3 × 20s each side', tip: 'Pull arm across, keep shoulder down' },
      { name: 'Lateral Raise (no weight)', sets: '2 × 15 reps', tip: 'Slow 3s up, 3s down tempo' },
      { name: 'Face Pull (band/cable, light)', sets: '2 × 15 reps', tip: 'Targets rear delts and rotator cuff' },
      { name: 'YTW Raises (prone)', sets: '2 × 8 reps each letter', tip: 'No weight, focus on scapula movement' },
    ],
  },
  Legs: {
    icon: '🦵',
    color: '#c8ff00',
    exercises: [
      { name: 'Leg Swings (forward/back)', sets: '2 × 15 reps each leg', tip: 'Hold wall for balance, full hip range' },
      { name: 'Leg Swings (side to side)', sets: '2 × 15 reps each leg', tip: 'Open hip rotators gently' },
      { name: 'Bodyweight Squat', sets: '2 × 15 reps', tip: 'Slow descent, knees track over toes' },
      { name: 'Hip Circles', sets: '2 × 10 reps each direction', tip: 'Hands on hips, big circular motion' },
      { name: 'Walking Lunge', sets: '2 × 10 reps each leg', tip: 'Upright torso, full knee flexion' },
      { name: 'Couch Stretch', sets: '2 × 30s each side', tip: 'Quad + hip flexor stretch' },
    ],
  },
  Hamstrings: {
    icon: '🍑',
    color: '#fb923c',
    exercises: [
      { name: 'Standing Hamstring Stretch', sets: '3 × 30s each leg', tip: 'Hinge at hip, keep back flat' },
      { name: 'Lying Hamstring Stretch', sets: '2 × 30s each leg', tip: 'Use band or towel for assistance' },
      { name: 'Good Morning (empty bar/BW)', sets: '2 × 12 reps', tip: 'Hinge not squat — feel the stretch' },
      { name: 'Nordic Curl Negative', sets: '2 × 5 reps', tip: 'Slow 4s descent only, use hands to return' },
      { name: 'Inchworm', sets: '2 × 8 reps', tip: 'Walk hands out to plank, walk feet back' },
    ],
  },
  Glutes: {
    icon: '🔥',
    color: '#e879f9',
    exercises: [
      { name: 'Glute Bridge', sets: '2 × 15 reps', tip: 'Drive hips up, squeeze hard at top' },
      { name: 'Clamshell (band)', sets: '2 × 15 reps each side', tip: 'Keep hips stacked, small controlled movement' },
      { name: 'Hip Circle (quadruped)', sets: '2 × 10 reps each leg', tip: 'On hands and knees, big hip circles' },
      { name: 'Donkey Kick', sets: '2 × 12 reps each side', tip: 'Flex glute at top, avoid lower back arch' },
      { name: 'Pigeon Pose', sets: '2 × 30s each side', tip: 'Deep hip external rotation stretch' },
    ],
  },
  Arms: {
    icon: '💪',
    color: '#34d399',
    exercises: [
      { name: 'Wrist Circles', sets: '2 × 15 reps each direction', tip: 'Important for pressing movements' },
      { name: 'Bicep Stretch (wall)', sets: '2 × 20s each arm', tip: 'Palm on wall, rotate away slowly' },
      { name: 'Tricep Overhead Stretch', sets: '2 × 20s each arm', tip: 'Pull elbow behind head gently' },
      { name: 'Light Band Curl', sets: '2 × 15 reps', tip: 'Pump blood into the muscle, no ego' },
      { name: 'Light Band Pushdown', sets: '2 × 15 reps', tip: 'Full extension at bottom, slow return' },
    ],
  },
  Core: {
    icon: '⚡',
    color: '#4ade80',
    exercises: [
      { name: 'Dead Bug', sets: '2 × 8 reps each side', tip: 'Lower back pressed to floor throughout' },
      { name: 'Bird Dog', sets: '2 × 8 reps each side', tip: 'Opposite arm and leg, hold 2s at top' },
      { name: 'Cat-Cow', sets: '2 × 10 slow reps', tip: 'Breathe out on round, in on arch' },
      { name: 'Plank', sets: '2 × 20s', tip: 'Squeeze glutes and abs, neutral spine' },
      { name: 'Side Plank', sets: '1 × 20s each side', tip: 'Stack feet or stagger for easier version' },
      { name: 'Pelvic Tilt', sets: '2 × 15 reps', tip: 'Lying on back, flatten lumbar curve' },
    ],
  },
};

/* ── HIIT PROGRAMS ── */
const HIIT_PROGRAMS = [
  {
    id: 'fat-loss',
    name: 'Fat Loss',
    icon: '🔥',
    color: '#ff7043',
    tagline: 'Burn calories, torch fat',
    description: 'High-intensity intervals maximising calorie burn and EPOC (afterburn effect). Keep rest short to stay in the fat-burning zone.',
    workSecs: 40,
    restSecs: 20,
    rounds: 8,
    exercises: [
      { name: 'Jump Squats', tip: 'Land soft, full depth each rep' },
      { name: 'Burpees', tip: 'Chest to floor, explosive jump' },
      { name: 'Mountain Climbers', tip: 'Fast feet, hips level' },
      { name: 'High Knees', tip: 'Pump arms, drive knees to chest' },
      { name: 'Jumping Lunges', tip: 'Switch legs mid-air, land controlled' },
      { name: 'Skater Hops', tip: 'Side to side, touch the floor' },
      { name: 'Push-up to T-Rotation', tip: 'Full push-up then rotate to side plank' },
      { name: 'Sprint in Place', tip: 'Fastest feet you can, full 40 seconds' },
    ],
  },
  {
    id: 'muscle-conditioning',
    name: 'Muscle Conditioning',
    icon: '💪',
    color: '#a78bfa',
    tagline: 'Build strength endurance',
    description: 'Compound moves under time pressure. Builds muscular endurance and metabolic conditioning simultaneously.',
    workSecs: 45,
    restSecs: 15,
    rounds: 6,
    exercises: [
      { name: 'Push-ups', tip: 'Full range — chest to floor, lockout top' },
      { name: 'Squat to Press (DB)', tip: 'Squat deep, press overhead at top' },
      { name: 'Renegade Row (DB)', tip: 'Plank position, row each arm alternating' },
      { name: 'Reverse Lunge + Knee Drive', tip: 'Lunge back, drive knee up on return' },
      { name: 'Dip (chair/bench)', tip: 'Lower until upper arm parallel, full lockout' },
      { name: 'Plank Shoulder Taps', tip: 'Hips still, tap shoulder with opposite hand' },
    ],
  },
  {
    id: 'cardio-endurance',
    name: 'Cardio Endurance',
    icon: '🏃',
    color: '#60a5fa',
    tagline: 'Build your aerobic engine',
    description: 'Longer work intervals with moderate rest. Builds VO2 max and cardiovascular capacity over time.',
    workSecs: 60,
    restSecs: 30,
    rounds: 5,
    exercises: [
      { name: 'Jogging in Place', tip: 'Moderate pace, breathe rhythmically' },
      { name: 'Step-ups (alternate legs)', tip: 'Use a sturdy chair or bench' },
      { name: 'Jumping Jacks', tip: 'Full range, maintain steady pace' },
      { name: 'Low-impact Box Step', tip: 'Step up-up-down-down pattern' },
      { name: 'Standing Bicycle', tip: 'Elbow to opposite knee, controlled pace' },
    ],
  },
  {
    id: 'beginner',
    name: 'Beginner Friendly',
    icon: '🌱',
    color: '#34d399',
    tagline: 'Start your HIIT journey',
    description: 'Longer rest, lower intensity. Perfect for building the habit and learning proper form before increasing intensity.',
    workSecs: 30,
    restSecs: 30,
    rounds: 5,
    exercises: [
      { name: 'March in Place', tip: 'Lift knees to hip height, pump arms' },
      { name: 'Wall Push-up', tip: 'Hands on wall, controlled push' },
      { name: 'Bodyweight Squat', tip: 'Slow down, pause at bottom' },
      { name: 'Seated Leg Raise', tip: 'Sit on edge of chair, raise both legs' },
      { name: 'Standing Side Crunch', tip: 'Hands behind head, elbow to hip' },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: '⚡',
    color: '#fbbf24',
    tagline: 'Maximum intensity protocol',
    description: 'Tabata-inspired extreme effort. 20 seconds all-out, minimal rest. Only for well-conditioned athletes.',
    workSecs: 20,
    restSecs: 10,
    rounds: 12,
    exercises: [
      { name: 'Burpee Box Jump', tip: 'Burpee then explode onto box' },
      { name: 'Tuck Jumps', tip: 'Knees to chest, land soft' },
      { name: 'Clap Push-ups', tip: 'Explosive push — hands leave floor' },
      { name: 'Pistol Squat (each side)', tip: 'One-leg squat, arms forward for balance' },
      { name: 'Plyo Lunge (fast switch)', tip: 'Alternate lunges, no rest between' },
      { name: 'Hollow Body Rock', tip: 'Arms and legs 6" off floor, rock on spine' },
      { name: 'V-ups', tip: 'Hands and feet meet in middle, full range' },
      { name: 'Sprawls', tip: 'Like a burpee but no push-up, focus on speed' },
    ],
  },
];

/* ── EXERCISE IMAGE MAP ──
   Using ExerciseDB / wger animated GIFs via exercisedb.dev CDN.
   Each key is an exercise name; value is a GIF URL.
   onerror on <img> hides the image gracefully if offline.
── */
const EX_IMAGES = {
  // Sunday - Chest + Triceps
  'Flat Press (BB/Machine)':            'https://v2.exercisedb.io/image/cFjmkRMtHHD0ON',
  'Incline DB Press':                   'https://v2.exercisedb.io/image/A7McZBxSm0S1LF',
  'Cable/DB Flyes':                     'https://v2.exercisedb.io/image/S4DY-ySKcbmTPT',
  'Close-Grip Press / Assisted Dips':   'https://v2.exercisedb.io/image/yMfMCC9pqGevLQ',
  'Rope Triceps Pushdown':              'https://v2.exercisedb.io/image/5Nn0NFZaTSDc5p',
  // Monday - Back + Biceps
  'Lat Pulldown / Assisted Pull-ups':   'https://v2.exercisedb.io/image/GMLMKsIX2KmVMH',
  'Seated Cable Row':                   'https://v2.exercisedb.io/image/yO7OyJLlVRzWrY',
  'One-arm DB Row':                     'https://v2.exercisedb.io/image/6Rx3RTPdYFNuAr',
  'EZ-Bar/DB Curl':                     'https://v2.exercisedb.io/image/iVvbFpcMmxhBpS',
  'Hammer Curl':                        'https://v2.exercisedb.io/image/WZgmXGJvbT5MWs',
  // Tuesday - Legs/Quads + Core
  'Squat OR Leg Press':                 'https://v2.exercisedb.io/image/yYpyO7MpnQdxYN',
  'Bulgarian Split Squat':             'https://v2.exercisedb.io/image/9QgODzDwPJl5qK',
  'Leg Extension':                     'https://v2.exercisedb.io/image/JKJ5bOfE7oFOKd',
  'Walking Lunges':                    'https://v2.exercisedb.io/image/y2LRMB2dpBTgH0',
  'Standing Calf Raises':              'https://v2.exercisedb.io/image/gp9PZNQpVPLBKL',
  'Plank':                             'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  // Thursday - Shoulders + Chest
  'Overhead Press':                    'https://v2.exercisedb.io/image/ypEPFvhAe-mDKb',
  'Lateral Raises':                    'https://v2.exercisedb.io/image/7yRbQd5Ud8ULDL',
  'Rear Delt Fly / Face Pulls':        'https://v2.exercisedb.io/image/4a16oT4VZWQ7zQ',
  'Incline DB Press (light)':          'https://v2.exercisedb.io/image/A7McZBxSm0S1LF',
  // Friday - Back + Arms
  'Chest-Supported Row':               'https://v2.exercisedb.io/image/PLt7KxZmJNmGKR',
  'Lat Pulldown (light)':              'https://v2.exercisedb.io/image/GMLMKsIX2KmVMH',
  'Superset: DB Curl + Rope Pushdown': 'https://v2.exercisedb.io/image/iVvbFpcMmxhBpS',
  'Cable Curls':                       'https://v2.exercisedb.io/image/iVvbFpcMmxhBpS',
  'Overhead Triceps Extension':        'https://v2.exercisedb.io/image/5Nn0NFZaTSDc5p',
  // Saturday - Glutes/Hamstrings + Core
  'Hip Thrust':                        'https://v2.exercisedb.io/image/QHdH-k5qVsBLrX',
  'Romanian Deadlift':                 'https://v2.exercisedb.io/image/kCO3g3OcnuV0n1',
  'Hamstring Curl':                    'https://v2.exercisedb.io/image/L1ETSBt17Gs4l2',
  'Goblet Squat':                      'https://v2.exercisedb.io/image/4VKZiGpDaThivZ',
  'Seated Calf Raises':                'https://v2.exercisedb.io/image/gp9PZNQpVPLBKL',
  'Core Circuit':                      'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  // Cardio
  'Cardio: Incline Walk':              'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Cardio: Bike Intervals':            'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Cardio: Brisk Walk':                'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Brisk Walk / Cycling':              'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Mobility & Stretching':             'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  'Cardio: Intervals 30s/90s':         'https://v2.exercisedb.io/image/bQqVJfCLBB-Jqd',
  'Cardio: Elliptical':                'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Cardio: Stairs/Incline Walk':       'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  // HIIT exercises
  'Jump Squats':                       'https://v2.exercisedb.io/image/yYpyO7MpnQdxYN',
  'Burpees':                           'https://v2.exercisedb.io/image/bQqVJfCLBB-Jqd',
  'Mountain Climbers':                 'https://v2.exercisedb.io/image/0M4gXCCgXk-Dpb',
  'High Knees':                        'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Jumping Lunges':                    'https://v2.exercisedb.io/image/y2LRMB2dpBTgH0',
  'Skater Hops':                       'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Push-up to T-Rotation':             'https://v2.exercisedb.io/image/XqQ3dWOHi0rKpC',
  'Sprint in Place':                   'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Push-ups':                          'https://v2.exercisedb.io/image/XqQ3dWOHi0rKpC',
  'Squat to Press (DB)':               'https://v2.exercisedb.io/image/ypEPFvhAe-mDKb',
  'Renegade Row (DB)':                 'https://v2.exercisedb.io/image/6Rx3RTPdYFNuAr',
  'Reverse Lunge + Knee Drive':        'https://v2.exercisedb.io/image/y2LRMB2dpBTgH0',
  'Dip (chair/bench)':                 'https://v2.exercisedb.io/image/yMfMCC9pqGevLQ',
  'Plank Shoulder Taps':               'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  'Jogging in Place':                  'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Step-ups (alternate legs)':         'https://v2.exercisedb.io/image/y2LRMB2dpBTgH0',
  'Jumping Jacks':                     'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Low-impact Box Step':               'https://v2.exercisedb.io/image/y2LRMB2dpBTgH0',
  'Standing Bicycle':                  'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  'March in Place':                    'https://v2.exercisedb.io/image/7vZRlCRpZuHfYb',
  'Wall Push-up':                      'https://v2.exercisedb.io/image/XqQ3dWOHi0rKpC',
  'Bodyweight Squat':                  'https://v2.exercisedb.io/image/yYpyO7MpnQdxYN',
  'Seated Leg Raise':                  'https://v2.exercisedb.io/image/JKJ5bOfE7oFOKd',
  'Standing Side Crunch':              'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  'Burpee Box Jump':                   'https://v2.exercisedb.io/image/bQqVJfCLBB-Jqd',
  'Tuck Jumps':                        'https://v2.exercisedb.io/image/yYpyO7MpnQdxYN',
  'Clap Push-ups':                     'https://v2.exercisedb.io/image/XqQ3dWOHi0rKpC',
  'Pistol Squat (each side)':          'https://v2.exercisedb.io/image/yYpyO7MpnQdxYN',
  'Plyo Lunge (fast switch)':          'https://v2.exercisedb.io/image/y2LRMB2dpBTgH0',
  'Hollow Body Rock':                  'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  'V-ups':                             'https://v2.exercisedb.io/image/fvwHnBBPf7BDW1',
  'Sprawls':                           'https://v2.exercisedb.io/image/bQqVJfCLBB-Jqd',
};

const MUSCLE_COLORS = {
  Legs: "#c8ff00",
  Chest: "#60a5fa",
  Back: "#a78bfa",
  Shoulders: "#fbbf24",
  Biceps: "#34d399",
  Triceps: "#f87171",
  Hamstrings: "#fb923c",
  Glutes: "#e879f9",
  Calves: "#67e8f9",
  Core: "#4ade80",
  "Biceps/Triceps": "#f472b6",
  Other: "#94a3b8",
};

/* ── EXERCISE FORM TIPS & COACHING ── */
const EX_FORM_TIPS = {
  // Chest
  'Flat Press (BB/Machine)': {
    muscles: 'Chest · Triceps · Front Delts',
    cues: ['Retract and depress scapulae — create a stable shelf', 'Bar path slightly arced — lower to lower chest, not neck', 'Drive feet into floor, press the bar up and slightly back', 'Elbows ~45–60° from torso — not flared, not tucked'],
    common: 'Bouncing bar off chest · Butt lifting off bench · Elbows flaring wide',
    breathe: 'Inhale on the way down. Exhale hard on the press up.',
    tempoSuggestion: '2-1-2',
  },
  'Incline DB Press': {
    muscles: 'Upper Chest · Triceps · Front Delts',
    cues: ['Set bench 30–45°. Any higher and it becomes a shoulder press', 'Start DBs at shoulder width with palms facing forward', 'Lower with control until DBs are at chest level', 'Press up and slightly together — squeeze chest at top'],
    common: 'Bench angle too steep · Not getting full stretch at bottom',
    breathe: 'Inhale lowering. Exhale pressing.',
    tempoSuggestion: '3-1-2',
  },
  'Cable/DB Flyes': {
    muscles: 'Chest (mid & stretch focus)',
    cues: ['Keep a slight elbow bend — never fully locked or too bent', 'Think "hugging a barrel" — arc motion not a press', 'Prioritize the stretch at the bottom — that\'s the growth zone', 'Control the return, don\'t let cables yank you back'],
    common: 'Turning it into a press · Going too heavy → loses fly motion',
    breathe: 'Inhale on the stretch. Exhale on the squeeze.',
    tempoSuggestion: '3-0-2',
  },
  'Close-Grip Press / Assisted Dips': {
    muscles: 'Triceps · Lower Chest',
    cues: ['Grip shoulder-width or slightly narrower — no need to go ultra-close', 'Keep elbows tucked close to body on the way down', 'For dips: lean slightly forward to hit chest; upright to hit triceps', 'Full lockout at top to max out tricep contraction'],
    common: 'Elbows flaring · Partial reps at the top · Too wide a grip',
    breathe: 'Inhale down. Exhale on press/push up.',
    tempoSuggestion: '2-1-2',
  },
  'Rope Triceps Pushdown': {
    muscles: 'Triceps (lateral head focus)',
    cues: ['Pin your elbows to your sides — they must not move', 'At the bottom, spread the rope apart and fully extend', 'Slow the return — don\'t let the rope drag your elbows up', 'Stand tall, slight forward lean is fine'],
    common: 'Elbows drifting forward · No full extension at bottom · Too heavy',
    breathe: 'Exhale on the pushdown. Inhale on return.',
    tempoSuggestion: '2-1-2',
  },
  // Back
  'Lat Pulldown / Assisted Pull-ups': {
    muscles: 'Lats · Biceps · Rear Delts',
    cues: ['Lean back ~10–15° — creates a better lat line of pull', 'Lead with your elbows, not your hands — think elbow to hip pocket', 'Squeeze at the bottom when bar touches upper chest', 'Control the negative — don\'t let the weight yank arms up'],
    common: 'Using momentum · Pulling with arms not lats · Bar going behind neck',
    breathe: 'Exhale pulling down. Inhale on the way up.',
    tempoSuggestion: '2-1-3',
  },
  'Seated Cable Row': {
    muscles: 'Mid Back · Lats · Biceps',
    cues: ['Sit tall, slight natural arch — don\'t round at the lower back', 'Row to belly button, not to chest — keeps lats engaged', 'Squeeze shoulder blades at the end — hold 1 second', 'Allow a full stretch at the start with shoulder rounding intentionally'],
    common: 'Swinging with momentum · Not getting full stretch at start',
    breathe: 'Exhale rowing back. Inhale on extension.',
    tempoSuggestion: '2-1-3',
  },
  'One-arm DB Row': {
    muscles: 'Lats · Mid Back · Biceps',
    cues: ['Brace free hand on bench — keep spine neutral and parallel to floor', 'Row DB towards your hip, not your shoulder', 'Full range of motion — let shoulder drop at the bottom for stretch', 'Think: elbow going straight back toward the ceiling'],
    common: 'Rotating torso to lift heavier · Not getting full stretch',
    breathe: 'Exhale rowing up. Inhale lowering.',
    tempoSuggestion: '2-1-3',
  },
  'EZ-Bar/DB Curl': {
    muscles: 'Biceps (long & short head)',
    cues: ['Pin elbows at your sides — they are the pivot point, not a swing', 'Supinate your wrist at the top if using DBs (pinky up)', 'Don\'t let shoulders roll forward at the top', 'Slow the descent — the negative builds as much as the positive'],
    common: 'Swinging with lower back · Elbows drifting forward · Partial reps',
    breathe: 'Exhale curling up. Inhale lowering.',
    tempoSuggestion: '2-1-3',
  },
  'Hammer Curl': {
    muscles: 'Brachialis · Brachioradialis · Biceps',
    cues: ['Neutral grip (thumbs up) throughout the entire movement', 'Elbows stay pinned — curl straight up', 'Can be done alternating for more focus per arm', 'Goes heavier than regular curls — brachialis is strong'],
    common: 'Swinging · Elbows drifting · Wrist rotating (ruins the hammer grip)',
    breathe: 'Exhale curling. Inhale lowering.',
    tempoSuggestion: '2-1-2',
  },
  // Legs
  'Squat OR Leg Press': {
    muscles: 'Quads · Glutes · Hamstrings',
    cues: ['Squat: brace core like you\'re about to take a punch', 'Knees track over your 2nd and 3rd toe — push them out', 'Descend until hip crease is at or below knee', 'Leg Press: don\'t let lower back peel off the pad at bottom'],
    common: 'Knees caving in · Butt wink at depth · Forward lean on squat',
    breathe: 'Inhale and brace at top. Exhale on the drive up.',
    tempoSuggestion: '3-1-2',
  },
  'Bulgarian Split Squat': {
    muscles: 'Quads · Glutes · Hip Flexors',
    cues: ['Back foot elevated on bench — just the top of the foot', 'Front foot far enough forward that knee doesn\'t go way past toe', 'Keep torso upright — slight forward lean is ok for glute bias', 'Lower straight down, not forward'],
    common: 'Front foot too close · Torso collapsing forward · Rushing reps',
    breathe: 'Inhale lowering. Exhale driving up through front heel.',
    tempoSuggestion: '3-1-2',
  },
  'Leg Extension': {
    muscles: 'Quads (isolation)',
    cues: ['Sit fully back in the seat — pad should hit mid-shin not ankle', 'Flex quad hard at full extension — hold 1 second', 'Control the descent — 3 count down minimum', 'Point toes slightly inward to bias VMO (inner quad)'],
    common: 'Jerking the weight · Not achieving full extension · Pad at ankle',
    breathe: 'Exhale extending. Inhale lowering.',
    tempoSuggestion: '2-1-3',
  },
  'Walking Lunges': {
    muscles: 'Quads · Glutes · Balance',
    cues: ['Take a long stride — knee should NOT shoot over toe', 'Keep torso completely upright', 'Drive through the front heel to step forward', 'Back knee lightly touches or just hovers above floor'],
    common: 'Steps too short · Leaning torso forward · Knee caving on step',
    breathe: 'Inhale stepping down. Exhale driving up.',
    tempoSuggestion: 'Controlled step cadence',
  },
  'Standing Calf Raises': {
    muscles: 'Gastrocnemius (upper calf)',
    cues: ['Full range of motion — deep stretch at bottom, full rise at top', 'Pause at the top for 1 second and really squeeze', 'Slow the descent — don\'t drop back down', 'Try single leg for extra difficulty'],
    common: 'Partial reps · Going too fast · Not getting full stretch',
    breathe: 'Exhale rising. Inhale lowering.',
    tempoSuggestion: '2-1-3',
  },
  'Plank': {
    muscles: 'Core · Transverse Abs · Stabilizers',
    cues: ['Forearms parallel, elbows under shoulders', 'Squeeze glutes and quads — full body tension', 'Neutral spine — don\'t let hips drop or pike up', 'Push floor away with forearms for extra core activation'],
    common: 'Hips sagging · Holding breath · Neck cranking upward',
    breathe: 'Breathe steadily — don\'t hold breath during the hold.',
    tempoSuggestion: 'Hold steady',
  },
  // Shoulders
  'Overhead Press': {
    muscles: 'Deltoids (all heads) · Triceps · Upper Traps',
    cues: ['Grip just outside shoulder width — elbows slightly in front of bar', 'Press bar in a straight vertical line — head moves back, then forward', 'At the top, shrug traps up to lock out and protect shoulder', 'Core braced — don\'t hyperextend lower back'],
    common: 'Lower back arching excessively · Pressing forward not up · Bar path drifting',
    breathe: 'Inhale and brace at bottom. Exhale hard on the press.',
    tempoSuggestion: '2-1-2',
  },
  'Lateral Raises': {
    muscles: 'Medial Delts (side delts)',
    cues: ['Lead with elbows, not hands — imagine pouring a jug of water', 'Raise to shoulder height only — not higher', 'Slight forward lean allows greater medial delt stretch', 'Control the descent — the negative is just as important'],
    common: 'Using momentum · Raising too high · Shrugging traps instead of delts',
    breathe: 'Exhale raising. Inhale lowering.',
    tempoSuggestion: '2-0-3',
  },
  'Rear Delt Fly / Face Pulls': {
    muscles: 'Rear Delts · Rotator Cuff · Mid Traps',
    cues: ['Face pulls: rope to forehead, externally rotate at end position', 'Rear delt fly: slight bend in elbow, lead with elbows back', 'Think: trying to touch elbows together behind your back', 'Light weight, high control — rear delts are small and need precision'],
    common: 'Too heavy → becomes a trap exercise · Not externally rotating at top',
    breathe: 'Exhale pulling/flying back. Inhale on return.',
    tempoSuggestion: '2-1-2',
  },
  // Glutes & Hamstrings
  'Hip Thrust': {
    muscles: 'Glutes (primary) · Hamstrings · Core',
    cues: ['Upper back on bench, shoulders at edge — not neck or mid-back', 'Drive through heels — toes can be slightly raised', 'At the top: hips fully extended, glutes squeezed, chin tucked', 'Posterior pelvic tilt at the top to maximize glute contraction'],
    common: 'Hyperextending lower back at top · Feet too close or too far · No pelvic tilt',
    breathe: 'Inhale at bottom. Exhale and squeeze hard at top.',
    tempoSuggestion: '2-1-2',
  },
  'Romanian Deadlift': {
    muscles: 'Hamstrings · Glutes · Lower Back',
    cues: ['Push hips back first — NOT bending at the knee first', 'Keep bar dragging up your legs — shins to thighs', 'Feel the stretch in the hamstrings — that\'s your depth indicator', 'Spine stays neutral throughout — no rounding'],
    common: 'Bending knees too much (becomes a squat) · Lower back rounding · Bar drifting forward',
    breathe: 'Inhale hinging down. Exhale driving hips forward.',
    tempoSuggestion: '3-1-2',
  },
  'Hamstring Curl': {
    muscles: 'Hamstrings (isolation)',
    cues: ['Hips pinned down on the pad — no lifting at all', 'Curl all the way until heels touch or near glutes', 'Hold the peak contraction 1 second', 'Slow the return — don\'t let the weight fall back'],
    common: 'Hips lifting off pad · Partial range of motion · Jerking the weight',
    breathe: 'Exhale curling. Inhale releasing.',
    tempoSuggestion: '2-1-3',
  },
  'Goblet Squat': {
    muscles: 'Quads · Glutes · Core',
    cues: ['Hold weight at chest — helps keep torso upright naturally', 'Elbows push knees apart at the bottom for depth', 'Sit into the squat — don\'t just bend forward', 'Great for warming up hips and practicing squat pattern'],
    common: 'Torso collapsing forward · Knees caving · Not hitting depth',
    breathe: 'Inhale down. Exhale up.',
    tempoSuggestion: '3-1-2',
  },
  'Seated Calf Raises': {
    muscles: 'Soleus (lower/deeper calf)',
    cues: ['Pad on lower thigh, close to knees', 'Full stretch at bottom — don\'t shortchange the range', 'Squeeze hard at the top for 2 seconds', 'Soleus responds well to higher reps and longer time under tension'],
    common: 'Partial range of motion · Going too fast',
    breathe: 'Exhale rising. Inhale lowering.',
    tempoSuggestion: '2-2-3',
  },
  'Core Circuit': {
    muscles: 'Full Core · Obliques · Transverse Abs',
    cues: ['Dead Bug: lower back glued to floor. Arm + opposite leg lower together', 'Plank: squeeze everything — quads, glutes, abs simultaneously', 'Bicycle crunches: extend fully, twist with torso not just elbow', 'Rest just enough between exercises to maintain quality'],
    common: 'Lower back lifting on dead bug · Rushing through reps · Holding breath',
    breathe: 'Breathe steadily — engage core without breath-holding.',
    tempoSuggestion: 'Controlled, deliberate',
  },
  // Arms
  'Chest-Supported Row': {
    muscles: 'Mid Back · Lats · Rear Delts',
    cues: ['Chest supported removes lower back from the equation — pure back work', 'Row to lower chest / belly — not to shoulders', 'Squeeze hard at the top — really try to touch shoulder blades together', 'Full stretch at bottom — let shoulders protract'],
    common: 'Using momentum · Shrugging instead of rowing · Partial reps',
    breathe: 'Exhale rowing. Inhale lowering.',
    tempoSuggestion: '2-1-3',
  },
  'Lat Pulldown (light)': {
    muscles: 'Lats · Biceps',
    cues: ['Lighter weight = more lat isolation focus', 'Really focus on initiating with your lats, not biceps', 'Pause at the bottom and squeeze lats', 'Great opportunity to perfect your form'],
    common: 'Pulling with arms · Not feeling it in lats',
    breathe: 'Exhale pulling down. Inhale releasing.',
    tempoSuggestion: '2-1-3',
  },
  'Superset: DB Curl + Rope Pushdown': {
    muscles: 'Biceps + Triceps (superset)',
    cues: ['Do all curl reps then immediately do pushdowns — no rest between', 'Antagonist superset: one muscle rests while the other works', 'Keep strict form even when fatigued — reduce weight if needed', 'Great for arm pump and time efficiency'],
    common: 'Form breakdown when tired · Rest between exercises defeats the purpose',
    breathe: 'Exhale on each concentric (curling up, pushing down).',
    tempoSuggestion: '2-1-2 each',
  },
  'Cable Curls': {
    muscles: 'Biceps (peak contraction focus)',
    cues: ['Cable keeps constant tension throughout — better than free weights at top', 'Use a straight bar or EZ bar attachment', 'Fully extend at bottom to get the full stretch under load', 'Slow and controlled — no swinging'],
    common: 'Swinging · Short-changing the bottom stretch',
    breathe: 'Exhale curling up. Inhale releasing.',
    tempoSuggestion: '2-1-3',
  },
  'Overhead Triceps Extension': {
    muscles: 'Triceps (long head emphasis)',
    cues: ['Arms overhead fully stretches the long head — prioritized here', 'Keep elbows pointing straight forward — don\'t let them flare', 'Only your forearms move — upper arms locked to the sides of your head', 'This is where you build the "horseshoe" look'],
    common: 'Elbows flaring wide · Upper arms moving · Partial reps at top',
    breathe: 'Inhale lowering. Exhale extending.',
    tempoSuggestion: '3-1-2',
  },
  'Incline DB Press (light)': {
    muscles: 'Upper Chest · Front Delts',
    cues: ['Light means focus on muscle-mind connection, not weight moved', 'Slow it down — 4 seconds down, squeeze at top', 'Upper chest is notoriously hard to feel — use lighter weight and feel the stretch', 'Drive elbows together at the top, not just hands'],
    common: 'Going too heavy and losing upper chest focus',
    breathe: 'Inhale lowering. Exhale pressing.',
    tempoSuggestion: '4-1-2',
  },
};

// Cardio form tips
const CARDIO_TIPS = {
  'Cardio: Incline Walk': {
    icon: '🚶',
    muscles: 'Glutes · Calves · Cardiovascular',
    tip: 'Set treadmill to 8–12% incline, 4–5 km/h. Don\'t hold the rails — it defeats the purpose. Swing arms naturally. Great low-impact fat burn.',
    zones: 'Target: Zone 2 (can hold a conversation, slight breathlessness)',
  },
  'Cardio: Bike Intervals': {
    icon: '🚴',
    muscles: 'Quads · Cardiovascular',
    tip: 'Alternate 30s hard sprint → 60s easy pedal. Adjust resistance so sprints feel truly hard. Keep cadence high on rest periods (80+ RPM).',
    zones: 'Sprint: Zone 4-5. Rest: Zone 1-2',
  },
  'Cardio: Brisk Walk': {
    icon: '🚶',
    muscles: 'Full body · Cardiovascular',
    tip: 'Brisk walk = 5–6 km/h on flat or slight incline. Arms pumping, chin up, core engaged. Ideal for recovery days — increases blood flow without adding fatigue.',
    zones: 'Target: Zone 1-2 (easy, fully conversational)',
  },
  'Brisk Walk / Cycling': {
    icon: '🚶',
    muscles: 'Active Recovery',
    tip: 'This is active recovery — the goal is to move, not to train. Keep intensity LOW. This helps flush lactic acid and aids muscle repair.',
    zones: 'Zone 1 — very easy',
  },
  'Cardio: Intervals 30s/90s': {
    icon: '⚡',
    muscles: 'Full body · Cardiovascular',
    tip: '30s all-out effort → 90s easy. Can be done on any machine or as running. The 30s must be at maximum effort — not comfortable.',
    zones: 'Work: Zone 5. Rest: Zone 1-2',
  },
  'Cardio: Elliptical': {
    icon: '🔄',
    muscles: 'Full body · Low Impact',
    tip: 'Set resistance so you feel it but can maintain steady pace. Use arms actively. Great for joint-friendly cardio — especially good on heavy leg days.',
    zones: 'Target: Zone 2-3 (moderate effort)',
  },
  'Cardio: Stairs/Incline Walk': {
    icon: '🏔️',
    muscles: 'Glutes · Quads · Calves',
    tip: 'Stair climbing hits glutes hard. Step fully — don\'t tip-toe. If using incline walk, go 10–15% incline at 4 km/h. Core tight throughout.',
    zones: 'Target: Zone 3 (moderately hard)',
  },
  'Mobility & Stretching': {
    icon: '🧘',
    muscles: 'Flexibility · Recovery',
    tip: 'Hold each stretch 30–45s. No bouncing. Breathe into each stretch — exhale to deepen. Focus on areas that feel tight from yesterday\'s session.',
    zones: 'Zone 0 — recovery only',
  },
};

// Feedback messages based on weight logged
function getSetFeedback(week, dayIdx, exIdx, setNum, weight) {
  const prevWk = week > 1 ? parseFloat(getExWeight(week - 1, dayIdx, exIdx, setNum)) : null;
  const ex = DAYS[dayIdx]?.exercises[exIdx];
  if (!ex || isNaN(weight) || weight <= 0) return null;

  // Check all-time PR
  let allTimePR = 0;
  for (let w = 1; w <= 12; w++) {
    const v = parseFloat(getExWeight(w, dayIdx, exIdx, setNum));
    if (!isNaN(v) && v > allTimePR) allTimePR = v;
  }
  const isNewPR = weight >= allTimePR;

  if (isNewPR && allTimePR > 0 && weight > allTimePR) {
    return { icon: '🔥', text: `New all-time PR on Set ${setNum+1}! +${(weight - allTimePR).toFixed(1)}kg above previous best!`, cls: 'pr' };
  }
  if (prevWk && !isNaN(prevWk) && prevWk > 0) {
    const diff = +(weight - prevWk).toFixed(1);
    if (diff > 0) return { icon: '📈', text: `Up ${diff}kg from last week on this set. Keep progressing!`, cls: 'up' };
    if (diff < 0) return { icon: '📉', text: `Down ${Math.abs(diff)}kg from last week. Deload? Or push a bit more next session.`, cls: 'down' };
    return { icon: '➡️', text: `Same as last week. Next session, aim for +2.5kg on this set.`, cls: 'same' };
  }
  if (weight > 0) return { icon: '✅', text: `Set ${setNum+1} logged: ${weight}kg. Keep it up!`, cls: 'new' };
  return null;
}
