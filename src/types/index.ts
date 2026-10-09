/**
 * NutriScan AI - Core TypeScript Definitions
 */

export type PortionUnit = 'grams' | 'serving' | 'bowl' | 'plate' | 'cup' | 'piece';

export interface FoodComponent {
  name: string;
  confidence: number;
}

export interface Per100gNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  totalSugar: number;
  addedSugar: number | null;
  naturalSugar: number | null;
  sodium: number; // mg
  saturatedFat: number; // g
  cholesterol: number; // mg
  potassium: number; // mg
}

export interface EnvironmentalData {
  co2PerKg: number; // kg CO2e per kg of food
  impactLevel: 'Low' | 'Medium' | 'High';
  mainDrivers: string;
  drivingEquivalentKmPerKg: number;
  sustainableTip: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  image: string;
  confidence: number;
  defaultPortion: number;
  defaultUnit: PortionUnit;
  components: FoodComponent[];
  per100g: Per100gNutrients;
  portionUnits: Partial<Record<PortionUnit, number>>;
  environmental: EnvironmentalData;
  healthInsight: string;
}

export interface MacroSplit {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

export interface NutrientCalculation {
  grams: number;
  quantity: number;
  unit: PortionUnit;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  totalSugar: number;
  addedSugar: number | null;
  naturalSugar: number | null;
  sodium: number;
  saturatedFat: number;
  cholesterol: number;
  potassium: number;
  co2Kg: number;
  impactLevel: 'Low' | 'Medium' | 'High';
  mainDrivers: string;
  sustainableTip: string;
  drivingKmEquivalent: number;
  macroSplit: MacroSplit;
  fibreRating: string;
  fibreRatingClass: string;
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  water: number;
  sugarLimit: number;
  sodiumLimit: number;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface LoggedMeal {
  id: string;
  foodId: string;
  name: string;
  image: string;
  portionText: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  co2Kg: number;
  mealType: MealType;
  timestamp: string;
}

export type ThemeMode = 'dark' | 'light';
