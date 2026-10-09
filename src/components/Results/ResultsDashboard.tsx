import React from 'react';
import { useApp } from '../../context/AppContext';
import { FoodIdentityCard } from './FoodIdentityCard';
import { NutritionOverview } from './NutritionOverview';
import { MacroDonutChart } from './MacroDonutChart';
import { FibreAnalysisCard } from './FibreAnalysisCard';
import { SugarAnalysisCard } from './SugarAnalysisCard';
import { MicronutrientsGrid } from './MicronutrientsGrid';
import { CarbonImpactCard } from './CarbonImpactCard';

export const ResultsDashboard: React.FC = () => {
  const { currentFood } = useApp();

  if (!currentFood) return null;

  return (
    <div className="results-container container section" style={{ display: 'block' }}>
      {/* Prominent Medical / Estimation Disclaimer Banner */}
      <div className="disclaimer-banner" role="alert">
        <span className="disclaimer-icon">⚠️</span>
        <div>
          <strong>AI Estimate Only:</strong> Nutritional calculations are estimates based on optical food recognition and portion modeling. Actual nutrition may vary depending on exact cooking oils, ingredients, recipe, and portion size. This is not a medical diagnosis.
        </div>
      </div>

      {/* Top Results Grid: Food Identity & Nutrition Overview */}
      <div className="results-grid-top" id="nutrition-dashboard">
        <FoodIdentityCard />
        <NutritionOverview />
      </div>

      {/* Macronutrient Distribution Chart */}
      <MacroDonutChart />

      {/* Fibre & Sugar Deep-Dive Grid */}
      <div className="nutritional-deep-dive-grid">
        <FibreAnalysisCard />
        <SugarAnalysisCard />
      </div>

      {/* Micronutrients Summary Grid */}
      <MicronutrientsGrid />

      {/* Environmental & Carbon Impact Section */}
      <CarbonImpactCard />
    </div>
  );
};
