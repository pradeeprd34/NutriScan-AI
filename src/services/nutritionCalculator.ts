import { FoodItem, NutrientCalculation, PortionUnit } from '../types';

/**
 * Calculates estimated nutritional values and environmental metrics
 * based on the food item, portion quantity, and unit.
 */
export function calculateNutrition(
  foodItem: FoodItem,
  quantity: number,
  unit: PortionUnit
): NutrientCalculation | null {
  if (!foodItem || !foodItem.per100g) return null;

  // Convert unit to grams
  const unitWeight = (foodItem.portionUnits && foodItem.portionUnits[unit])
    ? foodItem.portionUnits[unit]!
    : 1;
  const totalGrams = Math.round(quantity * unitWeight);
  const factor = totalGrams / 100;

  const nutrients: NutrientCalculation = {
    grams: totalGrams,
    quantity: quantity,
    unit: unit,
    calories: Math.round(foodItem.per100g.calories * factor),
    protein: +(foodItem.per100g.protein * factor).toFixed(1),
    carbs: +(foodItem.per100g.carbs * factor).toFixed(1),
    fat: +(foodItem.per100g.fat * factor).toFixed(1),
    fibre: +(foodItem.per100g.fibre * factor).toFixed(1),
    totalSugar: +(foodItem.per100g.totalSugar * factor).toFixed(1),
    addedSugar: foodItem.per100g.addedSugar !== null ? +(foodItem.per100g.addedSugar * factor).toFixed(1) : null,
    naturalSugar: foodItem.per100g.naturalSugar !== null ? +(foodItem.per100g.naturalSugar * factor).toFixed(1) : null,
    sodium: Math.round(foodItem.per100g.sodium * factor),
    saturatedFat: +(foodItem.per100g.saturatedFat * factor).toFixed(1),
    cholesterol: Math.round(foodItem.per100g.cholesterol * factor),
    potassium: Math.round(foodItem.per100g.potassium * factor),
    
    // Environmental
    co2Kg: +(foodItem.environmental.co2PerKg * (totalGrams / 1000)).toFixed(2),
    impactLevel: foodItem.environmental.impactLevel,
    mainDrivers: foodItem.environmental.mainDrivers,
    sustainableTip: foodItem.environmental.sustainableTip,
    drivingKmEquivalent: +((foodItem.environmental.co2PerKg * (totalGrams / 1000)) * 4.1).toFixed(1),
    
    macroSplit: { proteinPct: 0, carbsPct: 0, fatPct: 0 },
    fibreRating: "Low",
    fibreRatingClass: "rating-low"
  };

  // Macro Energy Distribution
  const proteinKcal = nutrients.protein * 4;
  const carbsKcal = nutrients.carbs * 4;
  const fatKcal = nutrients.fat * 9;
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal || 1;

  nutrients.macroSplit = {
    proteinPct: Math.round((proteinKcal / totalMacroKcal) * 100),
    carbsPct: Math.round((carbsKcal / totalMacroKcal) * 100),
    fatPct: Math.round((fatKcal / totalMacroKcal) * 100)
  };

  // Fibre classification based on standard Reference Daily Intake
  if (nutrients.fibre >= 6) {
    nutrients.fibreRating = "Good source";
    nutrients.fibreRatingClass = "rating-good";
  } else if (nutrients.fibre >= 3) {
    nutrients.fibreRating = "Moderate";
    nutrients.fibreRatingClass = "rating-moderate";
  } else {
    nutrients.fibreRating = "Low";
    nutrients.fibreRatingClass = "rating-low";
  }

  return nutrients;
}
