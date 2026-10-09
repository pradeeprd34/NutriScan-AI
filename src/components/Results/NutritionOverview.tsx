import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MealType } from '../../types';

export const NutritionOverview: React.FC = () => {
  const { currentNutrients, goals, logMeal } = useApp();
  const [selectedMealType, setSelectedMealType] = useState<MealType>('Lunch');

  if (!currentNutrients) return null;

  const calPct = Math.round((currentNutrients.calories / goals.calories) * 100);
  const proteinPct = Math.min(100, Math.round((currentNutrients.protein / goals.protein) * 100));
  const carbsPct = Math.min(100, Math.round((currentNutrients.carbs / goals.carbs) * 100));
  const fatPct = Math.min(100, Math.round((currentNutrients.fat / goals.fat) * 100));

  return (
    <div className="nutrition-overview-card">
      {/* Calories Hero */}
      <div className="calories-hero-banner">
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Energy Content
          </div>
          <div className="calorie-val-group">
            <span className="calorie-number">{currentNutrients.calories}</span>
            <span className="calorie-unit">kcal</span>
            <span className="badge badge-estimate">Estimated</span>
          </div>
        </div>

        <div className="calorie-target-percent">
          <div className="target-pct-badge">{calPct}% of daily target</div>
          <div className="target-pct-sub">Target: {goals.calories} kcal</div>
        </div>
      </div>

      {/* Macronutrient Cards */}
      <div className="macro-cards-row">
        {/* Protein */}
        <div className="macro-card macro-protein">
          <div className="macro-header-row">
            <span className="macro-name">Protein</span>
            <span className="badge badge-estimate">Estimated</span>
          </div>
          <div className="macro-val-display">
            <span className="macro-val-num">{currentNutrients.protein}</span>
            <span className="macro-val-unit">g</span>
          </div>
          <div className="macro-bar-track">
            <div className="macro-bar-fill" style={{ width: `${proteinPct}%` }}></div>
          </div>
          <div className="macro-sub-stat">
            <span>Muscle Recovery</span>
            <span>4 kcal/g</span>
          </div>
        </div>

        {/* Carbs */}
        <div className="macro-card macro-carbs">
          <div className="macro-header-row">
            <span className="macro-name">Carbohydrates</span>
            <span className="badge badge-estimate">Estimated</span>
          </div>
          <div className="macro-val-display">
            <span className="macro-val-num">{currentNutrients.carbs}</span>
            <span className="macro-val-unit">g</span>
          </div>
          <div className="macro-bar-track">
            <div className="macro-bar-fill" style={{ width: `${carbsPct}%` }}></div>
          </div>
          <div className="macro-sub-stat">
            <span>Energy Source</span>
            <span>4 kcal/g</span>
          </div>
        </div>

        {/* Fat */}
        <div className="macro-card macro-fat">
          <div className="macro-header-row">
            <span className="macro-name">Fat</span>
            <span className="badge badge-estimate">Estimated</span>
          </div>
          <div className="macro-val-display">
            <span className="macro-val-num">{currentNutrients.fat}</span>
            <span className="macro-val-unit">g</span>
          </div>
          <div className="macro-bar-track">
            <div className="macro-bar-fill" style={{ width: `${fatPct}%` }}></div>
          </div>
          <div className="macro-sub-stat">
            <span>Essential Lipids</span>
            <span>9 kcal/g</span>
          </div>
        </div>
      </div>

      {/* Log To Daily Tracker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-glass)' }}>
        <select
          className="portion-unit-select"
          style={{ minWidth: 140 }}
          value={selectedMealType}
          onChange={(e) => setSelectedMealType(e.target.value as MealType)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <button
          className="btn-primary"
          style={{ flex: 1 }}
          onClick={() => logMeal(selectedMealType)}
        >
          <span>➕</span>
          <span>Add to Today's Daily Log</span>
        </button>
      </div>
    </div>
  );
};
