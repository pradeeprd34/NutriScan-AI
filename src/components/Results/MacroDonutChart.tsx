import React from 'react';
import { useApp } from '../../context/AppContext';

export const MacroDonutChart: React.FC = () => {
  const { currentNutrients } = useApp();

  if (!currentNutrients) return null;

  const { proteinPct, carbsPct, fatPct } = currentNutrients.macroSplit;
  const circumference = 219.91; // 2 * PI * 35

  const pDash = (proteinPct / 100) * circumference;
  const cDash = (carbsPct / 100) * circumference;
  const fDash = (fatPct / 100) * circumference;

  return (
    <div className="macro-chart-section">
      <div className="chart-visual-wrap">
        <svg className="donut-chart-svg" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="35" fill="none" stroke="var(--bg-tertiary)" strokeWidth="12" />
          <circle
            cx="45"
            cy="45"
            r="35"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="12"
            strokeDasharray={`${pDash} ${circumference - pDash}`}
            strokeDashoffset="0"
          />
          <circle
            cx="45"
            cy="45"
            r="35"
            fill="none"
            stroke="#10b981"
            strokeWidth="12"
            strokeDasharray={`${cDash} ${circumference - cDash}`}
            strokeDashoffset={`-${pDash}`}
          />
          <circle
            cx="45"
            cy="45"
            r="35"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="12"
            strokeDasharray={`${fDash} ${circumference - fDash}`}
            strokeDashoffset={`-${pDash + cDash}`}
          />
        </svg>

        <div className="donut-chart-center">
          <div className="donut-center-title">Energy</div>
          <div className="donut-center-kcal">{currentNutrients.calories} kcal</div>
        </div>
      </div>

      <div className="chart-legend-wrap">
        <div className="chart-legend-title">Macronutrient Distribution</div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
          Caloric contribution from each primary macronutrient for this meal portion.
        </p>

        <div className="legend-item">
          <div className="legend-label-group">
            <span className="legend-color-dot dot-protein"></span>
            <span>Protein</span>
          </div>
          <div className="legend-val-group">
            <span className="legend-pct">{proteinPct}%</span>
            <span className="legend-g">(4 kcal/g)</span>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-label-group">
            <span className="legend-color-dot dot-carbs"></span>
            <span>Carbohydrates</span>
          </div>
          <div className="legend-val-group">
            <span className="legend-pct">{carbsPct}%</span>
            <span className="legend-g">(4 kcal/g)</span>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-label-group">
            <span className="legend-color-dot dot-fat"></span>
            <span>Fat</span>
          </div>
          <div className="legend-val-group">
            <span className="legend-pct">{fatPct}%</span>
            <span className="legend-g">(9 kcal/g)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
