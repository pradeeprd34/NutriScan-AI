import React from 'react';
import { useApp } from '../../context/AppContext';

export const FibreAnalysisCard: React.FC = () => {
  const { currentNutrients } = useApp();

  if (!currentNutrients) return null;

  const targetPct = Math.round((currentNutrients.fibre / 28) * 100);

  return (
    <div className="nutrient-card">
      <div className="nutrient-card-header">
        <div className="nutrient-title">
          <span>🌾</span>
          <span>Fibre</span>
        </div>
        <span className={`nutrient-rating-badge ${currentNutrients.fibreRatingClass}`}>
          {currentNutrients.fibreRating}
        </span>
      </div>

      <div className="nutrient-number-row">
        <span className="nutrient-number">{currentNutrients.fibre} g</span>
        <span className="badge badge-estimate">Estimated</span>
      </div>

      <div className="nutrient-breakdown-list">
        <div className="breakdown-row">
          <span>Classification standard</span>
          <span className="breakdown-val">RDI Baseline (28g/day)</span>
        </div>
        <div className="breakdown-row">
          <span>Daily target fulfilled</span>
          <span className="breakdown-val">~{targetPct}%</span>
        </div>
      </div>

      <div className="nutrient-insight-box">
        <strong>Why it matters:</strong> Fibre supports digestive health, moderates glycemic impact, and contributes to sustained feelings of fullness.
      </div>
    </div>
  );
};
