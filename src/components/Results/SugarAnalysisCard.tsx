import React from 'react';
import { useApp } from '../../context/AppContext';

export const SugarAnalysisCard: React.FC = () => {
  const { currentNutrients } = useApp();

  if (!currentNutrients) return null;

  return (
    <div className="nutrient-card">
      <div className="nutrient-card-header">
        <div className="nutrient-title">
          <span>🍯</span>
          <span>Sugar</span>
        </div>
        <span className="badge badge-estimate">AI Estimate</span>
      </div>

      <div className="nutrient-number-row">
        <span className="nutrient-number">{currentNutrients.totalSugar} g</span>
        <span className="badge badge-estimate">Estimated</span>
      </div>

      <div className="nutrient-breakdown-list">
        <div className="breakdown-row">
          <span>Total sugar</span>
          <span className="breakdown-val">{currentNutrients.totalSugar} g</span>
        </div>
        <div className="breakdown-row">
          <span>Added sugar</span>
          <span className="breakdown-val" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            {currentNutrients.addedSugar !== null
              ? `${currentNutrients.addedSugar} g`
              : "Not reliably available from image analysis."}
          </span>
        </div>
        <div className="breakdown-row">
          <span>Naturally occurring</span>
          <span className="breakdown-val">
            {currentNutrients.naturalSugar !== null
              ? `~${currentNutrients.naturalSugar} g`
              : "Estimated from whole ingredients"}
          </span>
        </div>
      </div>

      <div className="nutrient-insight-box" style={{ borderLeftColor: 'var(--amber-400)' }}>
        <strong>Honest transparency:</strong> Natural sugars in whole produce digest slower than added refined sugars. Added syrups cannot be reliably determined by visual pixels alone.
      </div>
    </div>
  );
};
