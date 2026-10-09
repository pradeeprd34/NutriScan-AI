import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PortionUnit } from '../../types';

export const PortionController: React.FC = () => {
  const { portionQuantity, portionUnit, currentNutrients, setPortion, showToast } = useApp();
  const [activeScale, setActiveScale] = useState<number>(1);
  const [notice, setNotice] = useState<string>('');

  const handleStep = (delta: number) => {
    let next: number;
    if (portionUnit === 'grams') {
      next = Math.max(50, portionQuantity + delta * 50);
    } else {
      next = Math.max(0.5, +(portionQuantity + delta * 0.5).toFixed(1));
    }
    setPortion(next, portionUnit);
  };

  const handleScalePreset = (scale: number) => {
    setActiveScale(scale);
    setPortion(scale, portionUnit);
  };

  const handleRecalculate = () => {
    setNotice("✓ Nutrition recalculated for new portion!");
    showToast("Nutrition recalculated for new portion!", "success");
    setTimeout(() => setNotice(''), 2500);
  };

  return (
    <div className="portion-controller-card">
      <div className="portion-header-row">
        <span className="portion-label">
          <span>⚖️</span>
          <span>Estimated Portion</span>
        </span>
        <span className="badge badge-estimate">
          ≈ {currentNutrients?.grams || 350} grams
        </span>
      </div>

      <div className="portion-input-group">
        <button
          className="portion-step-btn"
          onClick={() => handleStep(-1)}
          aria-label="Decrease portion"
        >
          −
        </button>

        <input
          type="number"
          className="portion-number-input"
          value={portionQuantity}
          min="0.1"
          step="0.5"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
              setPortion(val, portionUnit);
            }
          }}
        />

        <button
          className="portion-step-btn"
          onClick={() => handleStep(1)}
          aria-label="Increase portion"
        >
          +
        </button>

        <select
          className="portion-unit-select"
          value={portionUnit}
          onChange={(e) => setPortion(portionQuantity, e.target.value as PortionUnit)}
          aria-label="Portion Unit"
        >
          <option value="bowl">bowl</option>
          <option value="plate">plate</option>
          <option value="serving">serving</option>
          <option value="grams">grams</option>
          <option value="cup">cup</option>
          <option value="piece">piece</option>
        </select>
      </div>

      <div className="portion-scale-presets">
        {[0.5, 1.0, 1.5, 2.0].map((scale) => (
          <button
            key={scale}
            className={`scale-preset-btn ${activeScale === scale ? 'active' : ''}`}
            onClick={() => handleScalePreset(scale)}
          >
            {scale === 1.0 ? '1.0× (Standard)' : `${scale}×`}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <button
          className="btn-secondary"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          onClick={handleRecalculate}
        >
          <span>🔄 Recalculate Nutrition</span>
        </button>
        <div className="recalc-notification" style={{ opacity: notice ? 1 : 0 }}>
          {notice}
        </div>
      </div>
    </div>
  );
};
