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
const DAY_ICONS = ["🏋️", "🦵", "🚶", "🏔️", "💪", "🍑", "💪"];

const DAYS = [
  {
    day: "Monday",
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
    day: "Tuesday",
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
    day: "Wednesday",
    focus: "Active Recovery",
    exercises: [
      { name: "Brisk Walk / Cycling", sets: "30–40 min", numSets: 0, cardio: true, alt: "Swimming (easy)" },
      { name: "Mobility & Stretching", sets: "10–15 min", numSets: 0, cardio: true, alt: "Yoga flow (easy)" },
    ],
  },
  {
    day: "Thursday",
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
    day: "Friday",
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
    day: "Saturday",
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
  {
    day: "Sunday",
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
  1: {
    label: "Tuesday",
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
  2: {
    label: "Wednesday",
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
  3: {
    label: "Thursday",
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
  4: {
    label: "Friday",
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
  5: {
    label: "Saturday",
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
  6: {
    label: "Sunday",
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
