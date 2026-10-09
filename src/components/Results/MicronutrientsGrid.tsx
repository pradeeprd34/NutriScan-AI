import React from 'react';
import { useApp } from '../../context/AppContext';

export const MicronutrientsGrid: React.FC = () => {
  const { currentNutrients } = useApp();

  if (!currentNutrients) return null;

  return (
    <div className="micronutrients-summary-row">
      <div className="micro-pill-card">
        <span className="micro-pill-name">Sodium</span>
        <span className="micro-pill-val">{currentNutrients.sodium} mg</span>
        <span className="badge badge-estimate" style={{ width: 'fit-content' }}>Estimated</span>
      </div>
      <div className="micro-pill-card">
        <span className="micro-pill-name">Saturated Fat</span>
        <span className="micro-pill-val">{currentNutrients.saturatedFat} g</span>
        <span className="badge badge-estimate" style={{ width: 'fit-content' }}>Estimated</span>
      </div>
      <div className="micro-pill-card">
        <span className="micro-pill-name">Cholesterol</span>
        <span className="micro-pill-val">{currentNutrients.cholesterol} mg</span>
        <span className="badge badge-estimate" style={{ width: 'fit-content' }}>Estimated</span>
      </div>
      <div className="micro-pill-card">
        <span className="micro-pill-name">Potassium</span>
        <span className="micro-pill-val">{currentNutrients.potassium} mg</span>
        <span className="badge badge-estimate" style={{ width: 'fit-content' }}>Estimated</span>
      </div>
    </div>
  );
};
