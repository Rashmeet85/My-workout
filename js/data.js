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

/* ═══════════════════════════════════════════════════
   EXERCISE LIBRARY — categorised by muscle group
   Each exercise has the same tip structure as EX_FORM_TIPS
   so the detail modal can display instructions for any swap.
   ═══════════════════════════════════════════════════ */
const EXERCISE_LIBRARY = {

  /* ── CHEST ──────────────────────────────────────── */
  'Chest': [
    {
      name: 'Flat Barbell Bench Press',
      tips: {
        muscles: 'Chest · Triceps · Front Delts',
        cues: ['Retract and depress scapulae — create a stable shelf on the bench', 'Lower bar to lower chest with a slight arc, not straight down', 'Drive feet into the floor and press the bar up and slightly back', 'Elbows at 45–60° from torso — not flared, not tucked tight'],
        common: 'Bouncing bar off chest · Butt lifting off bench · Elbows flaring wide',
        breathe: 'Inhale on the way down. Exhale hard on the press.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Flat DB Bench Press',
      tips: {
        muscles: 'Chest · Triceps · Front Delts',
        cues: ['Greater range of motion than barbell — use it', 'DBs allow a natural arc — press up and slightly in at the top', 'Touch DBs at the top, feel the stretch at the bottom', 'Keep wrists stacked over elbows throughout'],
        common: 'Going too heavy and losing range · Wrists bent back under DBs',
        breathe: 'Inhale lowering. Exhale pressing.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Incline DB Press',
      tips: EX_FORM_TIPS['Incline DB Press'],
    },
    {
      name: 'Incline Barbell Press',
      tips: {
        muscles: 'Upper Chest · Triceps · Front Delts',
        cues: ['Set bench to 30–45° — higher becomes a shoulder press', 'Grip just outside shoulder width, unrack with straight arms', 'Lower bar to upper chest — clavicle line', 'Drive the bar straight up from that point'],
        common: 'Bench angle too steep · Bar drifting toward neck',
        breathe: 'Inhale lowering. Exhale pressing up.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Cable/DB Flyes',
      tips: EX_FORM_TIPS['Cable/DB Flyes'],
    },
    {
      name: 'Pec Deck / Machine Fly',
      tips: {
        muscles: 'Chest (mid & inner focus)',
        cues: ['Sit with chest against pad if available, or elbows on arm pads', 'Focus on squeezing the chest — not just moving your arms', 'Pause and hold the peak contraction for 1 second', 'Control the return — don\'t let the weight slam back'],
        common: 'Using shoulders instead of chest · Partial reps · Too heavy',
        breathe: 'Exhale squeezing together. Inhale on the return.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Push-ups',
      tips: {
        muscles: 'Chest · Triceps · Core',
        cues: ['Hands slightly wider than shoulder width, fingers forward', 'Body in a straight line from head to heel — squeeze glutes and abs', 'Lower chest to floor — full range of motion', 'Push the floor away, think about squeezing your chest at the top'],
        common: 'Hips sagging or piking · Partial reps · Elbows flaring 90°',
        breathe: 'Inhale lowering. Exhale pushing up.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Dips (Chest-focused)',
      tips: {
        muscles: 'Lower Chest · Triceps · Front Delts',
        cues: ['Lean forward 20–30° to shift emphasis onto chest vs triceps', 'Flare elbows slightly out — this opens the chest movement pattern', 'Lower until upper arms are parallel to floor — feel the stretch', 'Drive through palms to press back up'],
        common: 'Too upright — becomes a tricep exercise · Not hitting full depth',
        breathe: 'Inhale lowering. Exhale pressing up.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Low Cable Fly',
      tips: {
        muscles: 'Upper Chest · Front Delts',
        cues: ['Set cables at the lowest pulley position', 'Arc hands upward and together — meeting above chest level', 'Slight elbow bend throughout — it\'s not a press', 'Squeeze at the top as if you\'re trying to touch your elbows together'],
        common: 'Turning into a press · Cables too high for upper chest bias',
        breathe: 'Exhale sweeping up. Inhale on the return.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Svend Press',
      tips: {
        muscles: 'Inner Chest · Front Delts',
        cues: ['Press two plates together between your palms throughout', 'The inward squeezing force activates the inner chest fibers', 'Press away from chest and hold for 1 second at extension', 'Light weight — this is a technique/isolation movement'],
        common: 'Plates slipping because not enough pressing force · Going too heavy',
        breathe: 'Exhale pressing out. Inhale returning.',
        tempoSuggestion: '2-2-2',
      },
    },
  ],

  /* ── BACK ───────────────────────────────────────── */
  'Back': [
    {
      name: 'Lat Pulldown',
      tips: EX_FORM_TIPS['Lat Pulldown / Assisted Pull-ups'],
    },
    {
      name: 'Assisted Pull-ups',
      tips: {
        muscles: 'Lats · Biceps · Rear Delts',
        cues: ['Use the machine to remove just enough weight to get full range', 'Initiate every rep by depressing your scapulae first', 'Lead with elbows driving toward your hips — not just pulling with arms', 'Lower fully to a dead hang each rep'],
        common: 'Kipping or swinging · Half reps · Not depressing scapulae',
        breathe: 'Exhale pulling up. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Seated Cable Row',
      tips: EX_FORM_TIPS['Seated Cable Row'],
    },
    {
      name: 'One-arm DB Row',
      tips: EX_FORM_TIPS['One-arm DB Row'],
    },
    {
      name: 'Chest-Supported Row',
      tips: EX_FORM_TIPS['Chest-Supported Row'],
    },
    {
      name: 'Barbell Row',
      tips: {
        muscles: 'Mid Back · Lats · Biceps · Lower Back',
        cues: ['Hinge until torso is 45° or more to floor — not upright', 'Row bar to lower chest / belly button — not to chest', 'Keep lower back neutral — brace hard', 'Squeeze shoulder blades at peak contraction'],
        common: 'Using too much lower back momentum · Standing too upright · Partial reps',
        breathe: 'Exhale rowing up. Inhale on the way down.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'T-Bar Row',
      tips: {
        muscles: 'Mid Back · Lats · Biceps',
        cues: ['Chest on the pad — support your body weight', 'Use a neutral grip handle for most lat activation', 'Row to chest, squeeze blades together at top', 'Full stretch at the bottom — let arms extend fully'],
        common: 'Using momentum · Not getting full stretch · Shrugging at the top',
        breathe: 'Exhale rowing. Inhale lowering.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Straight-arm Pulldown',
      tips: {
        muscles: 'Lats (isolation) · Teres Major',
        cues: ['Arms stay straight throughout — this is a lat isolation, not a row', 'Hinge slightly at the hip, pull the bar down toward your thighs', 'Feel the lat stretch at the top — really extend fully', 'Control back up — don\'t let the cable just yank your arms up'],
        common: 'Bending elbows (turns into a pulldown) · Not getting a full lat stretch',
        breathe: 'Exhale pulling down. Inhale on the return.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Face Pulls',
      tips: {
        muscles: 'Rear Delts · Rotator Cuff · Mid Traps',
        cues: ['Set cable at forehead height or higher', 'Pull the rope toward your face, separating hands at the end', 'External rotate: hands finish beside your ears, not below', 'Elbows high and wide — don\'t let them drop down'],
        common: 'Pulling too low — becomes a row · Not externally rotating at the end',
        breathe: 'Exhale pulling. Inhale on return.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Deadlift',
      tips: {
        muscles: 'Full Back · Glutes · Hamstrings · Quads',
        cues: ['Bar over mid-foot, hip-width stance, grip just outside legs', 'Lat tension before you pull — "protect your armpits"', 'Drive the floor away — don\'t think pull, think push', 'Hips and shoulders rise at the same rate off the floor'],
        common: 'Bar drifting forward · Hips shooting up first · Lower back rounding · Jerking off the floor',
        breathe: 'Deep breath and brace at the bottom. Exhale at lockout.',
        tempoSuggestion: '1-1-2',
      },
    },
    {
      name: 'Rack Pull',
      tips: {
        muscles: 'Upper Back · Traps · Lats · Glutes',
        cues: ['Bar starts at knee level or slightly below on the rack', 'Overloads the lockout portion — great for upper back and trap strength', 'Drive hips forward hard at the top, squeeze glutes', 'Full lat tension throughout — don\'t let the bar drift forward'],
        common: 'Bar drifting away from body · Not achieving full lockout · Shrugging excessively',
        breathe: 'Brace and exhale at lockout.',
        tempoSuggestion: '1-1-2',
      },
    },
    {
      name: 'Shrugs',
      tips: {
        muscles: 'Upper Traps',
        cues: ['Lift straight up — don\'t roll the shoulders (risks injury)', 'Hold the peak contraction 1–2 seconds and really squeeze traps', 'Slow the descent — don\'t drop the weight', 'Heavy DBs or barbell, controlled tempo'],
        common: 'Rolling shoulders forward · Partial range · Using momentum',
        breathe: 'Exhale shrugging up. Inhale lowering.',
        tempoSuggestion: '1-2-2',
      },
    },
  ],

  /* ── SHOULDERS ──────────────────────────────────── */
  'Shoulders': [
    {
      name: 'Overhead Press (Barbell)',
      tips: EX_FORM_TIPS['Overhead Press'],
    },
    {
      name: 'DB Shoulder Press',
      tips: {
        muscles: 'Deltoids (all heads) · Triceps',
        cues: ['Start with DBs at ear level, elbows slightly in front', 'Press directly overhead — don\'t let DBs drift behind head', 'Fully extend but don\'t crash DBs together at the top', 'Controlled descent — elbows back to ear height'],
        common: 'Pressing behind head · Lower back arching excessively · Asymmetric pressing',
        breathe: 'Inhale lowering. Exhale pressing up.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Lateral Raises',
      tips: EX_FORM_TIPS['Lateral Raises'],
    },
    {
      name: 'Cable Lateral Raises',
      tips: {
        muscles: 'Medial Delts (constant tension)',
        cues: ['Cable keeps tension at the bottom unlike DBs — use this advantage', 'Cross the cable in front of body for a better line of pull', 'Lead with elbow — not hand — raise to shoulder height', 'Slow and controlled — no swinging at all'],
        common: 'Swinging · Using too much momentum · Raising too high (becomes trap)',
        breathe: 'Exhale raising. Inhale lowering.',
        tempoSuggestion: '2-0-3',
      },
    },
    {
      name: 'Rear Delt Fly',
      tips: EX_FORM_TIPS['Rear Delt Fly / Face Pulls'],
    },
    {
      name: 'Arnold Press',
      tips: {
        muscles: 'Deltoids (all 3 heads) · Triceps',
        cues: ['Start with palms facing you at shoulder height', 'Rotate palms forward as you press up — full pronation by overhead position', 'Reverse on the way down — rotate palms back toward you', 'This rotation hits all three heads in one movement'],
        common: 'Rushing through the rotation · Going too heavy so rotation gets lost',
        breathe: 'Inhale lowering. Exhale pressing.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Upright Row',
      tips: {
        muscles: 'Lateral Delts · Upper Traps · Biceps',
        cues: ['Use a wider grip (shoulder width) to reduce impingement risk', 'Lead with elbows — they should rise higher than your hands', 'Pull only to chest height — not to chin', 'Control the descent — don\'t drop it'],
        common: 'Grip too narrow → shoulder impingement · Pulling too high',
        breathe: 'Exhale pulling up. Inhale lowering.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Band Pull-Apart',
      tips: {
        muscles: 'Rear Delts · Mid Traps · Rotator Cuff',
        cues: ['Hold band at shoulder height with straight arms', 'Pull band apart until it touches your chest, squeezing shoulder blades', 'Keep arms straight throughout — this is not a row', 'Great as a warmup or high-rep accessory'],
        common: 'Bending elbows · Not squeezing at full extension',
        breathe: 'Exhale pulling apart. Inhale returning.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Pike Push-up',
      tips: {
        muscles: 'Front Delts · Triceps · Upper Chest',
        cues: ['Start in a downward dog position — hips high', 'Lower your head toward the floor between your hands', 'Press back up to the starting position', 'The more vertical your body, the more shoulder-dominant it becomes'],
        common: 'Body too flat — becomes a push-up · Not getting full range of head to floor',
        breathe: 'Inhale lowering. Exhale pressing.',
        tempoSuggestion: '2-1-2',
      },
    },
  ],

  /* ── BICEPS ─────────────────────────────────────── */
  'Biceps': [
    {
      name: 'Barbell Curl',
      tips: {
        muscles: 'Biceps (long & short head)',
        cues: ['Grip shoulder width or just inside — experiment for your elbows', 'Elbows pinned at your sides throughout — they do not move', 'Curl all the way up — squeeze at peak', 'Slow the negative — 3 seconds down'],
        common: 'Swinging lower back · Elbows drifting forward · Partial reps',
        breathe: 'Exhale curling. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'EZ-Bar Curl',
      tips: EX_FORM_TIPS['EZ-Bar/DB Curl'],
    },
    {
      name: 'DB Curl',
      tips: {
        muscles: 'Biceps (long & short head)',
        cues: ['Supinate (rotate palm up) as you curl — maximizes bicep contraction', 'Can do both arms simultaneously or alternating', 'Full stretch at the bottom — don\'t shorten the range', 'Keep elbows at your sides — only forearms move'],
        common: 'Not supinating fully at top · Swinging · Elbows drifting',
        breathe: 'Exhale curling. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Hammer Curl',
      tips: EX_FORM_TIPS['Hammer Curl'],
    },
    {
      name: 'Incline DB Curl',
      tips: {
        muscles: 'Biceps Long Head (peak)',
        cues: ['Set bench to 60°. Arms hang straight down behind you', 'This stretches the long head at the start — massive growth stimulus', 'Curl up slowly without moving the upper arm', 'Don\'t sit forward — stay back against the bench'],
        common: 'Sitting forward and removing the stretch advantage',
        breathe: 'Exhale curling up. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Cable Curl',
      tips: EX_FORM_TIPS['Cable Curls'],
    },
    {
      name: 'Concentration Curl',
      tips: {
        muscles: 'Biceps (isolation — peak)',
        cues: ['Elbow braced against inner thigh — zero cheating possible', 'Curl all the way up and really squeeze at the top', 'Lower slowly — full extension at the bottom', 'Great finisher for a huge pump and mind-muscle connection'],
        common: 'Elbow not braced against leg · Partial range of motion',
        breathe: 'Exhale curling. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Preacher Curl',
      tips: {
        muscles: 'Biceps Short Head (lower portion)',
        cues: ['Upper arms flat on the preacher pad — don\'t lift off at the top', 'Lower all the way to near full extension — feel the stretch', 'Don\'t let the weight drop — control the negative strictly', 'This movement removes all momentum — pure bicep work'],
        common: 'Lifting elbows off pad at top · Partial reps · Dropping the weight',
        breathe: 'Exhale curling. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Reverse Curl',
      tips: {
        muscles: 'Brachialis · Brachioradialis · Forearms',
        cues: ['Overhand (pronated) grip on the bar', 'Same movement as a regular curl — elbows pinned, full range', 'Works brachialis and forearms heavily — great for arm thickness', 'Start lighter than a regular curl — wrists will be the weak link'],
        common: 'Wrists breaking back under load · Elbows drifting · Short range',
        breathe: 'Exhale curling. Inhale lowering.',
        tempoSuggestion: '2-1-2',
      },
    },
  ],

  /* ── TRICEPS ─────────────────────────────────────── */
  'Triceps': [
    {
      name: 'Rope Triceps Pushdown',
      tips: EX_FORM_TIPS['Rope Triceps Pushdown'],
    },
    {
      name: 'Bar Triceps Pushdown',
      tips: {
        muscles: 'Triceps (lateral & medial head)',
        cues: ['Elbows pinned to sides — they do not travel forward or back', 'Full extension at the bottom — squeeze hard', 'Neutral wrist — don\'t break wrist on the straight bar', 'Control the return — don\'t let the bar fly up'],
        common: 'Elbows drifting forward · Wrists breaking · Partial extension',
        breathe: 'Exhale pressing down. Inhale returning.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Overhead Triceps Extension',
      tips: EX_FORM_TIPS['Overhead Triceps Extension'],
    },
    {
      name: 'Skullcrushers (EZ-Bar)',
      tips: {
        muscles: 'Triceps (long head emphasis)',
        cues: ['Lie flat, arms extended over chest — not over face', 'Lower bar toward forehead by bending ONLY at the elbow', 'Upper arms stay vertical and stationary throughout', 'Press back up to full extension — squeeze at the top'],
        common: 'Upper arms drifting back (becomes a pullover) · Bar going too far back · Elbows flaring',
        breathe: 'Inhale lowering. Exhale pressing up.',
        tempoSuggestion: '3-0-2',
      },
    },
    {
      name: 'Close-Grip Bench Press',
      tips: EX_FORM_TIPS['Close-Grip Press / Assisted Dips'],
    },
    {
      name: 'Dips (Triceps-focused)',
      tips: {
        muscles: 'Triceps · Lower Chest',
        cues: ['Stay upright — leaning forward shifts emphasis to chest', 'Elbows close to your sides throughout', 'Lower until upper arms are parallel, full lockout at top', 'Can add weight via dip belt for overload'],
        common: 'Leaning forward too much · Partial reps at the top · Elbows flaring',
        breathe: 'Inhale lowering. Exhale pressing up.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Tricep Kickback',
      tips: {
        muscles: 'Triceps (lateral head)',
        cues: ['Hinge forward so torso is near parallel to floor', 'Upper arm pinned to torso and stays completely still', 'Extend forearm back to full lockout — squeeze hard', 'No swing — this is a strict isolation movement'],
        common: 'Swinging arm · Torso too upright reducing range · Not locking out',
        breathe: 'Exhale extending. Inhale returning.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Diamond Push-ups',
      tips: {
        muscles: 'Triceps · Inner Chest',
        cues: ['Hands form a diamond shape directly under your chest', 'Keep elbows tucked close to your sides as you lower', 'Lower chest toward hands — full range', 'Press back up to full extension, squeeze triceps'],
        common: 'Elbows flaring out (becomes regular push-up) · Hips sagging',
        breathe: 'Inhale lowering. Exhale pressing.',
        tempoSuggestion: '2-1-2',
      },
    },
  ],

  /* ── LEGS (QUADS) ───────────────────────────────── */
  'Legs': [
    {
      name: 'Back Squat',
      tips: {
        muscles: 'Quads · Glutes · Hamstrings · Core',
        cues: ['Bar on upper traps (high bar) or rear delts (low bar)', 'Brace core hard before unracking — create full intra-abdominal pressure', 'Knees track over 2nd/3rd toe — push them out actively', 'Hip crease at or below knee before driving up'],
        common: 'Knees caving inward · Butt wink at depth · Forward torso collapse · Heels rising',
        breathe: 'Inhale and brace at the top. Exhale forcefully on the drive up.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Goblet Squat',
      tips: EX_FORM_TIPS['Goblet Squat'],
    },
    {
      name: 'Leg Press',
      tips: {
        muscles: 'Quads · Glutes · Hamstrings',
        cues: ['Feet hip-width, mid-height on the platform', 'Lower until knees reach 90° — don\'t let lower back peel off the pad', 'Press through the full foot — don\'t rise on toes', 'Don\'t lock knees out completely at the top — keep tension on quads'],
        common: 'Lower back lifting off pad · Feet too high (becomes glute) · Knees caving',
        breathe: 'Inhale lowering. Exhale pressing.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Bulgarian Split Squat',
      tips: EX_FORM_TIPS['Bulgarian Split Squat'],
    },
    {
      name: 'Leg Extension',
      tips: EX_FORM_TIPS['Leg Extension'],
    },
    {
      name: 'Walking Lunges',
      tips: EX_FORM_TIPS['Walking Lunges'],
    },
    {
      name: 'Reverse Lunges',
      tips: {
        muscles: 'Quads · Glutes · Balance',
        cues: ['Step back instead of forward — more knee-friendly than forward lunges', 'Front knee stays over ankle — don\'t let it drift forward', 'Keep torso upright throughout the movement', 'Drive through front heel to return to standing'],
        common: 'Front knee shooting forward · Torso leaning forward · Steps too short',
        breathe: 'Inhale stepping back. Exhale driving up.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Hack Squat',
      tips: {
        muscles: 'Quads (primary) · Glutes',
        cues: ['Feet lower on the platform for more quad emphasis', 'Keep your back flat against the pad at all times', 'Lower until thighs are at least parallel', 'Press through the full foot evenly'],
        common: 'Knees caving · Heels rising · Lower back pulling away from pad',
        breathe: 'Inhale lowering. Exhale pressing.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Step-ups',
      tips: {
        muscles: 'Quads · Glutes · Balance',
        cues: ['Step onto a box or bench — full foot on the platform', 'Drive through the heel of the elevated foot — not the back foot', 'Squeeze glute of the working leg at the top', 'Lower slowly — control the descent'],
        common: 'Pushing off the floor foot · Not achieving full extension at top · Rushing',
        breathe: 'Exhale stepping up. Inhale stepping down.',
        tempoSuggestion: '1-1-2',
      },
    },
    {
      name: 'Sissy Squat',
      tips: {
        muscles: 'Quads (rectus femoris isolation)',
        cues: ['Hold something for balance — this is a balance-heavy movement', 'Lean back as you lower, coming up on your toes', 'Knees travel far forward — that\'s the whole point of this exercise', 'A great quad stretch is the goal — not just moving the body'],
        common: 'Not getting on toes · Not leaning back enough · Holding too tight (removes balance challenge)',
        breathe: 'Inhale lowering. Exhale raising.',
        tempoSuggestion: '3-1-2',
      },
    },
  ],

  /* ── HAMSTRINGS ─────────────────────────────────── */
  'Hamstrings': [
    {
      name: 'Romanian Deadlift',
      tips: EX_FORM_TIPS['Romanian Deadlift'],
    },
    {
      name: 'Hamstring Curl (Lying)',
      tips: EX_FORM_TIPS['Hamstring Curl'],
    },
    {
      name: 'Hamstring Curl (Seated)',
      tips: {
        muscles: 'Hamstrings (isolation)',
        cues: ['Seated version stretches hamstrings more than lying — deeper range', 'Curl all the way down, pause at peak contraction', 'Control the return — 3 seconds back to start', 'Adjust pad so it sits just above the ankle'],
        common: 'Partial range · Rushing the concentric · Hips lifting off seat',
        breathe: 'Exhale curling. Inhale returning.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Nordic Curl',
      tips: {
        muscles: 'Hamstrings (eccentric strength)',
        cues: ['Anchor feet under something solid', 'Lower your body to the floor as slowly as possible', 'Use your hands to catch yourself at the bottom', 'Push with hands to get back to starting position', 'One of the most effective hamstring exercises in existence'],
        common: 'Going too fast · Not anchoring feet properly · Giving up at first sign of difficulty',
        breathe: 'Inhale lowering. Exhale if doing the concentric.',
        tempoSuggestion: '4-0-1 (eccentric focus)',
      },
    },
    {
      name: 'Stiff-Leg Deadlift',
      tips: {
        muscles: 'Hamstrings · Lower Back · Glutes',
        cues: ['Similar to RDL but legs stay straighter throughout', 'Feel a massive hamstring stretch as you hinge down', 'Keep bar close to your legs, spine neutral', 'Don\'t round lower back — hinge is from the hip, not the spine'],
        common: 'Rounding lower back · Bending knees too much (becomes RDL) · Bar drifting forward',
        breathe: 'Inhale hinging down. Exhale driving up.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Good Morning',
      tips: {
        muscles: 'Hamstrings · Lower Back · Glutes',
        cues: ['Bar on upper traps — same as squat position', 'Hinge forward at the hip — NOT bending the spine', 'Slight knee bend is fine, but this isn\'t a squat', 'Feel the hamstring stretch at the bottom — that\'s your cue for depth'],
        common: 'Rounding lower back · Too much knee bend turning it into squat · Going too heavy',
        breathe: 'Inhale hinging forward. Exhale driving back up.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Cable Pull-Through',
      tips: {
        muscles: 'Hamstrings · Glutes · Lower Back',
        cues: ['Cable between your legs, facing away from the machine', 'Hinge at the hip — not a squat — driving the cable back through', 'Feel the glute and hamstring stretch at the hinge', 'Drive hips forward powerfully to stand back up'],
        common: 'Squatting instead of hinging · Cable not between legs (loses the line of pull)',
        breathe: 'Inhale hinging. Exhale driving hips forward.',
        tempoSuggestion: '3-1-2',
      },
    },
  ],

  /* ── GLUTES ─────────────────────────────────────── */
  'Glutes': [
    {
      name: 'Hip Thrust',
      tips: EX_FORM_TIPS['Hip Thrust'],
    },
    {
      name: 'Glute Bridge',
      tips: {
        muscles: 'Glutes (primary) · Hamstrings',
        cues: ['Lie on your back, feet flat, knees bent at 90°', 'Drive hips up through your heels — toes can lift slightly', 'Squeeze glutes hard at the top — posterior pelvic tilt', 'Lower slowly — don\'t just drop hips to the floor'],
        common: 'Lower back arching instead of glute driving · Feet too far or too close · Knees falling out',
        breathe: 'Exhale driving up. Inhale lowering.',
        tempoSuggestion: '2-2-2',
      },
    },
    {
      name: 'Cable Kickback',
      tips: {
        muscles: 'Glutes (isolation)',
        cues: ['Ankle attachment on the low cable', 'Hinge slightly at hip, hold something for balance', 'Drive the leg back and up — squeeze glute hard at the top', 'Return with control — don\'t swing'],
        common: 'Using lower back to lift instead of glute · Too much knee bend · Swinging',
        breathe: 'Exhale kicking back. Inhale returning.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Sumo Squat',
      tips: {
        muscles: 'Glutes · Inner Thighs · Quads',
        cues: ['Wide stance — toes pointed out 45°', 'Knees track over toes in the direction they\'re pointed', 'Keep chest up and upright torso', 'Pause at the bottom and squeeze glutes at the top'],
        common: 'Knees caving in · Heels rising · Torso collapsing forward',
        breathe: 'Inhale lowering. Exhale driving up.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Donkey Kick',
      tips: {
        muscles: 'Glutes',
        cues: ['On hands and knees — spine neutral throughout', 'Drive one heel toward the ceiling, knee bent at 90°', 'Squeeze hard at the top — full glute contraction', 'Don\'t arch lower back — move the leg, not the spine'],
        common: 'Arching lower back · Not getting full glute contraction · Rushing reps',
        breathe: 'Exhale kicking up. Inhale returning.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Clamshell',
      tips: {
        muscles: 'Glute Med · Hip External Rotators',
        cues: ['Lie on side, hips and knees bent at 45°, feet together', 'Rotate top knee open like a clamshell — keep feet together', 'Squeeze glute med at the top — the burn is real', 'Add a band above the knees for more challenge'],
        common: 'Hips rolling back instead of rotating the knee · Feet separating · Too small a range',
        breathe: 'Exhale opening. Inhale closing.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Bulgarian Split Squat (Glute-bias)',
      tips: {
        muscles: 'Glutes (primary) · Quads',
        cues: ['Lean your torso slightly forward to shift emphasis from quad to glute', 'Front foot further away than knee-dominant version', 'Drive through heel of front foot', 'Squeeze glute at the top of each rep'],
        common: 'Too upright (shifts to quads) · Front foot too close · Rushing',
        breathe: 'Inhale lowering. Exhale driving through heel.',
        tempoSuggestion: '3-1-2',
      },
    },
  ],

  /* ── CALVES ─────────────────────────────────────── */
  'Calves': [
    {
      name: 'Standing Calf Raises',
      tips: EX_FORM_TIPS['Standing Calf Raises'],
    },
    {
      name: 'Seated Calf Raises',
      tips: EX_FORM_TIPS['Seated Calf Raises'],
    },
    {
      name: 'Single-leg Calf Raise',
      tips: {
        muscles: 'Gastrocnemius · Soleus (double load)',
        cues: ['Stand on one foot on an elevated surface', 'Full range: deep stretch at bottom, maximum rise at top', 'Pause 1 second at the top — squeeze hard', 'Hold something lightly for balance only — not support'],
        common: 'Partial range · Using support hand to take load · Going too fast',
        breathe: 'Exhale rising. Inhale lowering.',
        tempoSuggestion: '2-2-3',
      },
    },
    {
      name: 'Leg Press Calf Raise',
      tips: {
        muscles: 'Gastrocnemius · Soleus',
        cues: ['On the leg press machine — only the balls of your feet on the platform edge', 'Full stretch at the bottom — let heels drop below platform if possible', 'Push platform away, rising as high as possible', 'Pause at the top and squeeze'],
        common: 'Foot placement too high on platform · Partial range · Going too fast',
        breathe: 'Exhale pressing up. Inhale lowering.',
        tempoSuggestion: '2-2-3',
      },
    },
    {
      name: 'Tibialis Raise',
      tips: {
        muscles: 'Tibialis Anterior (shin)',
        cues: ['Stand with heels on an elevated edge, backs of calves against a wall', 'Raise toes toward your shin as high as possible', 'Slow and controlled — feel the shin muscle working', 'Great for knee health and calf balance'],
        common: 'Not getting full range · Going too fast · Skipping this — it\'s underrated',
        breathe: 'Exhale raising. Inhale lowering.',
        tempoSuggestion: '2-1-2',
      },
    },
  ],

  /* ── CORE ───────────────────────────────────────── */
  'Core': [
    {
      name: 'Plank',
      tips: EX_FORM_TIPS['Plank'],
    },
    {
      name: 'Dead Bug',
      tips: {
        muscles: 'Deep Core · Transverse Abs · Anti-extension',
        cues: ['Lower back pressed FLAT to the floor throughout — this is non-negotiable', 'Opposite arm and leg lower simultaneously', 'Lower only as far as you can keep the lower back flat', 'Breathe steadily — don\'t hold your breath'],
        common: 'Lower back lifting off floor · Moving arm and leg on same side · Holding breath',
        breathe: 'Exhale lowering arm/leg. Inhale returning.',
        tempoSuggestion: '3-1-2',
      },
    },
    {
      name: 'Hanging Leg Raise',
      tips: {
        muscles: 'Lower Abs · Hip Flexors · Core',
        cues: ['Hang from a bar with shoulders packed down', 'Initiate with a posterior pelvic tilt — tuck your pelvis before raising legs', 'Raise legs to parallel or higher — slow and controlled', 'Lower with control — don\'t swing or let momentum take over'],
        common: 'Swinging · Hip flexors doing all the work (no pelvic tilt) · Kipping',
        breathe: 'Exhale raising legs. Inhale lowering.',
        tempoSuggestion: '2-1-3',
      },
    },
    {
      name: 'Cable Crunch',
      tips: {
        muscles: 'Abs (upper & mid)',
        cues: ['Kneel facing the cable, rope at the back of your neck', 'Crunch down by flexing the spine — not by bending at the hip', 'Think: bring your sternum toward your pelvis', 'Hold the contraction 1 second at the bottom'],
        common: 'Bending at the hip instead of crunching the spine · Going too heavy · Pulling with arms',
        breathe: 'Exhale crunching down. Inhale returning.',
        tempoSuggestion: '2-1-2',
      },
    },
    {
      name: 'Ab Rollout',
      tips: {
        muscles: 'Core (anti-extension) · Lats · Shoulders',
        cues: ['Start on knees, arms extended holding the wheel', 'Roll forward slowly — resist the urge to let hips drop', 'Go only as far as you can maintain a neutral spine', 'Pull back using abs — not just arms'],
        common: 'Hips dropping (lumbar hyperextension) · Going too far too soon',
        breathe: 'Inhale rolling out. Exhale pulling back.',
        tempoSuggestion: '3-0-2',
      },
    },
    {
      name: 'Russian Twist',
      tips: {
        muscles: 'Obliques · Transverse Abs',
        cues: ['Lean back 45°, feet raised or on floor — both are valid', 'Rotate through the torso — not just swinging arms', 'Touch the floor on each side or bring weight to the ground', 'Slow the movement — faster doesn\'t mean better here'],
        common: 'Swinging arms without rotating torso · Not maintaining the lean-back angle',
        breathe: 'Exhale on each rotation. Steady breathing.',
        tempoSuggestion: 'Controlled rotation',
      },
    },
    {
      name: 'Side Plank',
      tips: {
        muscles: 'Obliques · Glute Med · Core Stability',
        cues: ['Body in a straight line — don\'t let hips drop or spike up', 'Stack feet or stagger (one in front) for an easier version', 'Push the floor away with your forearm — active not passive', 'Can add hip dips for extra oblique work'],
        common: 'Hips dropping · Body not in a straight line · Elbow not under shoulder',
        breathe: 'Breathe steadily throughout the hold.',
        tempoSuggestion: 'Hold + optional hip dips',
      },
    },
    {
      name: 'Bicycle Crunch',
      tips: {
        muscles: 'Obliques · Abs',
        cues: ['Extend opposite leg fully as you rotate — full range', 'Rotate with the TORSO, not just the elbow swinging', 'Slow it down — quality over speed', 'Don\'t pull on your neck — hands lightly behind head'],
        common: 'Elbow swinging without torso rotation · Neck pulling · Going too fast',
        breathe: 'Exhale on each crunch. Steady rhythm.',
        tempoSuggestion: 'Slow controlled tempo',
      },
    },
    {
      name: 'Pallof Press',
      tips: {
        muscles: 'Anti-rotation Core · Obliques',
        cues: ['Stand sideways to the cable machine — it will try to rotate you', 'Press the handle straight out from your chest and resist any twist', 'Hold for 1–2 seconds at full extension', 'The challenge is resisting rotation — that\'s the whole point'],
        common: 'Turning toward the cable (defeats the purpose) · Not fully extending',
        breathe: 'Exhale pressing. Inhale returning.',
        tempoSuggestion: '2-2-2',
      },
    },
    {
      name: 'Mountain Climbers',
      tips: {
        muscles: 'Core · Hip Flexors · Cardio',
        cues: ['Start in push-up position — body in a straight line', 'Drive knees toward chest alternately at a fast pace', 'Keep hips level — don\'t let them rise or drop', 'Shoulders stay over wrists throughout'],
        common: 'Hips piking up · Slow shuffling feet without cardio intent · Wrists aching (try fists)',
        breathe: 'Fast rhythmic breathing — don\'t hold breath.',
        tempoSuggestion: 'Fast and continuous',
      },
    },
  ],

  /* ── FULL BODY / COMPOUND ───────────────────────── */
  'Full Body': [
    {
      name: 'Deadlift',
      tips: {
        muscles: 'Full Back · Glutes · Hamstrings · Quads',
        cues: ['Bar over mid-foot, hip-width stance, grip just outside legs', 'Lat tension before you pull — "protect your armpits"', 'Drive the floor away — don\'t think pull, think push the floor', 'Hips and shoulders rise at the same rate off the floor'],
        common: 'Bar drifting forward · Hips shooting up first · Lower back rounding · Jerking off the floor',
        breathe: 'Deep breath and brace at the bottom. Exhale at lockout.',
        tempoSuggestion: '1-1-2',
      },
    },
    {
      name: 'Power Clean',
      tips: {
        muscles: 'Full Body · Explosive Power',
        cues: ['Start like a deadlift — bar over mid-foot, flat back', 'First pull is slow and controlled — get bar to knee first', 'Second pull: explosive hip extension — think "jump"', 'Catch in a front rack position — elbows high'],
        common: 'Pulling with arms too early · No hip extension — just pulling up · Poor front rack',
        breathe: 'Hold breath through the pull. Breathe out on catch.',
        tempoSuggestion: 'Explosive — speed-dependent',
      },
    },
    {
      name: 'Kettlebell Swing',
      tips: {
        muscles: 'Glutes · Hamstrings · Core · Shoulders',
        cues: ['This is a HIP HINGE, not a squat — push hips back powerfully', 'Drive hips forward explosively — the bell should feel weightless at the top', 'Bell goes to shoulder height or chest height — not overhead for basic swing', 'Absorb the backswing by hiking bell high between legs'],
        common: 'Squatting (knees forward) instead of hinging · Using arms to swing · Lower back rounding',
        breathe: 'Exhale on the upswing. Inhale on the backswing.',
        tempoSuggestion: 'Explosive hip-driven rhythm',
      },
    },
    {
      name: 'Clean and Press',
      tips: {
        muscles: 'Full Body · Explosive + Strength',
        cues: ['Clean to shoulder position first (see Power Clean cues)', 'Then press from the front rack: bar path straight up overhead', 'Reset between reps for quality', 'Great full-body power + strength builder'],
        common: 'Poor front rack · Pressing from an unsteady catch position',
        breathe: 'Breathe between clean and press phases.',
        tempoSuggestion: '1-1-2 on press portion',
      },
    },
    {
      name: 'Burpees',
      tips: {
        muscles: 'Full Body · Cardio · Power',
        cues: ['Jump feet back into a plank — land soft', 'Chest to floor on the push-up phase', 'Jump feet back up, then explode upward with arms overhead', 'Move as fast as possible while maintaining form'],
        common: 'Skipping the push-up · Half-jumping at the top · Crashing down instead of controlled',
        breathe: 'Don\'t hold breath — breathe continuously.',
        tempoSuggestion: 'Max speed with control',
      },
    },
    {
      name: 'Thruster',
      tips: {
        muscles: 'Quads · Glutes · Shoulders · Triceps',
        cues: ['Front rack position: elbows high, bar on fingertips', 'Squat to depth, then drive up', 'Use the momentum of the squat to drive the press overhead', 'Arms fully extend at the top — full lockout'],
        common: 'Pressing separately from the squat (no momentum use) · Poor front rack position · Partial squat',
        breathe: 'Exhale on the combined drive up and press.',
        tempoSuggestion: 'Explosive and fluid',
      },
    },
  ],

  /* ── CARDIO ─────────────────────────────────────── */
  'Cardio': [
    {
      name: 'Incline Walk',
      tips: {
        muscles: 'Glutes · Calves · Cardiovascular',
        cues: ['Set treadmill to 8–12% incline, 4–5 km/h', 'Do NOT hold the rails — it defeats the entire purpose', 'Swing arms naturally, stay upright', 'Zone 2 target — you should be able to hold a conversation but feel slightly breathless'],
        common: 'Holding the handrails (removes the challenge) · Incline too low',
        breathe: 'Breathe at a steady conversational pace.',
        tempoSuggestion: 'Zone 2 — 20 min',
      },
    },
    {
      name: 'Stationary Bike Intervals',
      tips: {
        muscles: 'Quads · Cardiovascular',
        cues: ['30s hard sprint → 60s easy recovery', 'Adjust resistance so sprints are genuinely hard', 'Cadence 80+ RPM during rest periods', 'The rest interval should feel like actual rest'],
        common: 'Not making sprints hard enough · Rest intervals too short',
        breathe: 'Controlled breathing during rest. Push through on sprints.',
        tempoSuggestion: '30s hard / 60s easy × 8–10 rounds',
      },
    },
    {
      name: 'Rowing Machine',
      tips: {
        muscles: 'Full Body · Back · Legs · Cardio',
        cues: ['Sequence: legs → hips → arms on the drive; reverse on recovery', 'Legs do 70% of the work — use them first and hardest', 'At the finish: slight lean back, elbows past body', 'Damper setting 3–5 for most people — higher isn\'t always better'],
        common: 'Pulling with arms first (backwards sequence) · Hunching back · Dragging the seat',
        breathe: 'Exhale on the drive. Inhale on recovery.',
        tempoSuggestion: 'Steady state or 20-on/10-off intervals',
      },
    },
    {
      name: 'Jump Rope',
      tips: {
        muscles: 'Calves · Coordination · Cardio',
        cues: ['Jump on the balls of your feet — heels never touch the floor', 'Land softly — knees slightly bent to absorb impact', 'Keep elbows at your sides — wrists do the turning', 'Start with basic bounce, advance to alternating feet'],
        common: 'Jumping too high · Landing on heels · Elbows swinging wildly',
        breathe: 'Find a rhythm and breathe steadily.',
        tempoSuggestion: '30s on / 15s rest or continuous',
      },
    },
    {
      name: 'Stair Climber',
      tips: {
        muscles: 'Glutes · Quads · Calves · Cardio',
        cues: ['Step fully — don\'t tip-toe on the stairs', 'Don\'t lean heavily on the handrails', 'Slight forward lean at the hip is fine', 'Core tight throughout'],
        common: 'Leaning on rails (removes challenge) · Tip-toeing (reduces glute activation)',
        breathe: 'Breathe at a steady Zone 2–3 pace.',
        tempoSuggestion: '20–30 min Zone 2–3',
      },
    },
    {
      name: 'Elliptical',
      tips: {
        muscles: 'Full Body · Low Impact · Cardio',
        cues: ['Use the arm handles actively — push and pull', 'Set resistance so you feel it but can maintain a steady pace', 'Stay on your toes lightly — don\'t drop into heels', 'Great for joint-friendly cardio on heavy leg days'],
        common: 'Not using arms (halves the workout) · Resistance too low to be effective',
        breathe: 'Steady rhythmic breathing. Zone 2–3.',
        tempoSuggestion: '20–30 min steady state',
      },
    },
    {
      name: 'LISS Walk (Outdoor)',
      tips: {
        muscles: 'Full Body · Recovery · Cardiovascular',
        cues: ['5–6 km/h pace — brisk not slow', 'Arms pumping, chin up, core engaged', 'Ideal for active recovery — moves blood without adding fatigue', 'Adding elevation (hills) increases calorie burn significantly'],
        common: 'Too slow — must be brisk to qualify as LISS · Hunching over a phone',
        breathe: 'Fully conversational pace — Zone 1–2.',
        tempoSuggestion: '30–45 min Zone 1–2',
      },
    },
    {
      name: 'Sprint Intervals',
      tips: {
        muscles: 'Full Body · Explosive · Cardio',
        cues: ['30s all-out effort → 90s walking rest', 'The sprint must be at 100% — not comfortable', 'Can be on treadmill, track, or any machine', 'Give yourself full rest to make sprints quality'],
        common: 'Not going hard enough on sprints · Rest intervals too short',
        breathe: 'Recover fully during rest. Push on sprints.',
        tempoSuggestion: '30s sprint / 90s walk × 6–10 rounds',
      },
    },
  ],
};

/* ── HELPER: look up tips from library by exercise name ── */
function getLibraryTips(name) {
  for (const cat of Object.values(EXERCISE_LIBRARY)) {
    for (const ex of cat) {
      if (ex.name === name) return ex.tips;
    }
  }
  return null;
}
