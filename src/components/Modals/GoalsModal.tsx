import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const GoalsModal: React.FC = () => {
  const { isGoalsModalOpen, setIsGoalsModalOpen, goals, updateGoals } = useApp();

  const [cal, setCal] = useState(goals.calories);
  const [protein, setProtein] = useState(goals.protein);
  const [carbs, setCarbs] = useState(goals.carbs);
  const [fat, setFat] = useState(goals.fat);
  const [water, setWater] = useState(goals.water);

  useEffect(() => {
    setCal(goals.calories);
    setProtein(goals.protein);
    setCarbs(goals.carbs);
    setFat(goals.fat);
    setWater(goals.water);
  }, [goals, isGoalsModalOpen]);

  if (!isGoalsModalOpen) return null;

  const handlePreset = (c: number, p: number, cb: number, f: number) => {
    setCal(c);
    setProtein(p);
    setCarbs(cb);
    setFat(f);
  };

  const handleSave = () => {
    updateGoals({
      ...goals,
      calories: cal || 2000,
      protein: protein || 130,
      carbs: carbs || 240,
      fat: fat || 65,
      water: water || 2500
    });
    setIsGoalsModalOpen(false);
  };

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true">
      <div className="modal-box">
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Personal Calorie & Macro Target</h3>
          <button className="icon-btn" style={{ width: 32, height: 32 }} onClick={() => setIsGoalsModalOpen(false)}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Quick Goal Presets</label>
            <div className="preset-goals-grid">
              <button
                className="preset-goal-btn"
                onClick={() => handlePreset(1600, 120, 160, 45)}
              >
                🔥 Weight Loss (1,600 kcal)
              </button>
              <button
                className="preset-goal-btn"
                onClick={() => handlePreset(2400, 160, 270, 75)}
              >
                💪 Muscle Building (2,400 kcal)
              </button>
              <button
                className="preset-goal-btn"
                onClick={() => handlePreset(2000, 130, 240, 65)}
              >
                ⚖️ Maintenance (2,000 kcal)
              </button>
              <button
                className="preset-goal-btn"
                onClick={() => handlePreset(2200, 110, 280, 60)}
              >
                ⚡ Student Active (2,200 kcal)
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Daily Calorie Target (kcal)</label>
            <input
              type="number"
              className="form-input"
              value={cal}
              min={800}
              max={6000}
              onChange={(e) => setCal(parseInt(e.target.value, 10) || 0)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <div className="form-group">
              <label className="form-label">Protein (g)</label>
              <input
                type="number"
                className="form-input"
                value={protein}
                onChange={(e) => setProtein(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Carbs (g)</label>
              <input
                type="number"
                className="form-input"
                value={carbs}
                onChange={(e) => setCarbs(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Fat (g)</label>
              <input
                type="number"
                className="form-input"
                value={fat}
                onChange={(e) => setFat(parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hydration Target (ml)</label>
            <input
              type="number"
              className="form-input"
              value={water}
              step={250}
              onChange={(e) => setWater(parseInt(e.target.value, 10) || 0)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={handleSave}>
            Save Targets
          </button>
        </div>
      </div>
    </div>
  );
};
