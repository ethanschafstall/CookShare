// Per-100g nutrition data, keyed by ingredient name.
// Mimics fetching nutrition data from an external API (e.g. OpenFoodFacts).

export interface NutritionData {
  caloriesPer100: number;
  proteinPer100: number;
  fatPer100: number;
  fatSaturatedPer100: number;
  carbsPer100: number;
  carbsSugarsPer100: number;
  sodiumPer100: number; // mg
  fiberPer100: number;
}

const DATA: Record<string, NutritionData> = {
  flour: {
    caloriesPer100: 364,
    proteinPer100: 10.3,
    fatPer100: 1,
    fatSaturatedPer100: 0.2,
    carbsPer100: 76.3,
    carbsSugarsPer100: 0.3,
    sodiumPer100: 2,
    fiberPer100: 2.7,
  },
  sugar: {
    caloriesPer100: 387,
    proteinPer100: 0,
    fatPer100: 0,
    fatSaturatedPer100: 0,
    carbsPer100: 100,
    carbsSugarsPer100: 100,
    sodiumPer100: 1,
    fiberPer100: 0,
  },
  butter: {
    caloriesPer100: 717,
    proteinPer100: 0.85,
    fatPer100: 81.1,
    fatSaturatedPer100: 51.4,
    carbsPer100: 0.06,
    carbsSugarsPer100: 0.06,
    sodiumPer100: 11,
    fiberPer100: 0,
  },
  egg: {
    caloriesPer100: 155,
    proteinPer100: 13,
    fatPer100: 11,
    fatSaturatedPer100: 3.3,
    carbsPer100: 1.1,
    carbsSugarsPer100: 1.1,
    sodiumPer100: 124,
    fiberPer100: 0,
  },
  milk: {
    caloriesPer100: 61,
    proteinPer100: 3.2,
    fatPer100: 3.3,
    fatSaturatedPer100: 1.9,
    carbsPer100: 4.8,
    carbsSugarsPer100: 5.1,
    sodiumPer100: 43,
    fiberPer100: 0,
  },
  salt: {
    caloriesPer100: 0,
    proteinPer100: 0,
    fatPer100: 0,
    fatSaturatedPer100: 0,
    carbsPer100: 0,
    carbsSugarsPer100: 0,
    sodiumPer100: 38758,
    fiberPer100: 0,
  },
  tomato: {
    caloriesPer100: 18,
    proteinPer100: 0.9,
    fatPer100: 0.2,
    fatSaturatedPer100: 0.03,
    carbsPer100: 3.9,
    carbsSugarsPer100: 2.6,
    sodiumPer100: 5,
    fiberPer100: 1.2,
  },
  onion: {
    caloriesPer100: 40,
    proteinPer100: 1.1,
    fatPer100: 0.1,
    fatSaturatedPer100: 0.04,
    carbsPer100: 9.3,
    carbsSugarsPer100: 4.2,
    sodiumPer100: 4,
    fiberPer100: 1.7,
  },
};

// Deterministic hash of a string -> a number in [0, 1).
// Same ingredient name always yields the same value, so reloading the
// recipe page never changes the generated numbers.
function seed(name: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Return a small PRNG so we can pull several stable values per ingredient.
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Builds plausible, internally consistent per-100g data for an unknown
// ingredient. Macros are generated then scaled so calories roughly match
// the 4/4/9 kcal rule, so nothing looks obviously fake.
function generate(name: string): NutritionData {
  const rand = seed(name);
  const between = (min: number, max: number) =>
    +(min + rand() * (max - min)).toFixed(2);

  const protein = between(0, 25);
  const fat = between(0, 30);
  const carbs = between(0, 60);
  const sugars = +(carbs * between(0, 0.6)).toFixed(2);
  const saturated = +(fat * between(0.1, 0.5)).toFixed(2);
  const fiber = between(0, 8);
  const sodium = between(0, 600);
  const calories = Math.round(protein * 4 + carbs * 4 + fat * 9);

  return {
    caloriesPer100: calories,
    proteinPer100: protein,
    fatPer100: fat,
    fatSaturatedPer100: saturated,
    carbsPer100: carbs,
    carbsSugarsPer100: sugars,
    sodiumPer100: sodium,
    fiberPer100: fiber,
  };
}

// Fetches nutrition data for an ingredient by name.
// Known ingredients return real data; unknown ones get deterministic
// plausible data so the demo never produces a blank table.
export async function fetchNutritionData(name: string): Promise<NutritionData> {
  await new Promise((r) => setTimeout(r, 800)); // fake network latency

  const q = name.trim().toLowerCase();

  for (const [key, value] of Object.entries(DATA)) {
    if (q.includes(key) || key.includes(q)) {
      return value; // value is NutritionData, no undefined
    }
  }

  return generate(q);
}
