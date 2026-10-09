import React from 'react';
import { useApp } from '../../context/AppContext';

export const CarbonImpactCard: React.FC = () => {
  const { currentNutrients } = useApp();

  if (!currentNutrients) return null;

  return (
    <div className="carbon-impact-card" id="environmental-impact">
      <div className="carbon-header-row">
        <div className="carbon-headline-group">
          <span className="section-tag" style={{ color: 'var(--cyan-400)' }}>Sustainability Metric</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Estimated Environmental Impact</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: 520 }}>
            Carbon footprint estimate modeled from agricultural lifecycle databases. Label is estimated; actual footprint depends on supply chains.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className={`carbon-badge-level carbon-level-${currentNutrients.impactLevel.toLowerCase()}`}>
            {currentNutrients.impactLevel} Environmental Impact
          </span>
          <div className="carbon-value-display" style={{ marginTop: 6, justifyContent: 'flex-end' }}>
            <span className="carbon-kg-val">~{currentNutrients.co2Kg}</span>
            <span className="carbon-kg-unit">kg CO₂e</span>
          </div>
        </div>
      </div>

      <div className="carbon-factors-grid">
        <div className="carbon-factor-box">
          <span className="carbon-factor-title"><span>🚗</span> Driving Equivalent</span>
          <span className="carbon-factor-content">~{currentNutrients.drivingKmEquivalent} km in an average car</span>
        </div>
        <div className="carbon-factor-box">
          <span className="carbon-factor-title"><span>🏭</span> Main Drivers</span>
          <span className="carbon-factor-content">{currentNutrients.mainDrivers}</span>
        </div>
        <div className="carbon-factor-box">
          <span className="carbon-factor-title"><span>💡</span> Sustainable Tip</span>
          <span className="carbon-factor-content" style={{ fontSize: '0.82rem' }}>
            {currentNutrients.sustainableTip}
          </span>
        </div>
      </div>

      <div className="carbon-factors-disclaimer">
        <strong>Why exact footprints vary:</strong> A meal's true greenhouse gas footprint cannot be determined from a photo alone. It depends heavily on:
        <ul>
          <li>Farming method (pasture vs feedlot)</li>
          <li>Transportation & cold chain</li>
          <li>Processing & packaging</li>
          <li>Cooking fuel & energy source</li>
          <li>Food waste in preparation</li>
        </ul>
      </div>
    </div>
  );
};
