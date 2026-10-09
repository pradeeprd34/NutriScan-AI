import React from 'react';
import { useApp } from '../../context/AppContext';

export const DailyTracker: React.FC = () => {
  const { todayMeals, goals, waterMl, addWater, deleteTodayMeal, setIsGoalsModalOpen } = useApp();

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  todayMeals.forEach((m) => {
    totalCalories += m.calories || 0;
    totalProtein += m.protein || 0;
    totalCarbs += m.carbs || 0;
    totalFat += m.fat || 0;
  });

  totalProtein = +totalProtein.toFixed(1);
  totalCarbs = +totalCarbs.toFixed(1);
  totalFat = +totalFat.toFixed(1);

  const remainingKcal = Math.max(0, goals.calories - totalCalories);
  const isOver = totalCalories > goals.calories;

  // Ring Circumference = 2 * PI * 42 = 263.89
  const c = 263.89;
  const pct = Math.min(1, totalCalories / goals.calories);
  const ringOffset = c - pct * c;

  const proteinPct = Math.min(100, Math.round((totalProtein / goals.protein) * 100));
  const carbsPct = Math.min(100, Math.round((totalCarbs / goals.carbs) * 100));
  const fatPct = Math.min(100, Math.round((totalFat / goals.fat) * 100));

  return (
    <section className="section tracker-section" id="calorie-tracker">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Daily Nutrition Log</span>
          <h2 className="section-title">Track Daily Calories & Nutrition</h2>
          <p className="section-desc">
            Monitor consumed meals against your personal calorie targets, balance your macros, and maintain healthy hydration.
          </p>
        </div>

        <div className="tracker-grid">
          {/* Daily Summary & Target Progress */}
          <div className="daily-summary-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Today's Target</h3>
              <button
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => setIsGoalsModalOpen(true)}
              >
                ⚙ Change Goal
              </button>
            </div>

            {/* Calorie Radial Ring Gauge */}
            <div className="goal-progress-wrap">
              <svg className="goal-ring-svg" viewBox="0 0 94 94">
                <circle cx="47" cy="47" r="42" strokeWidth="7" fill="none" className="ring-bg"></circle>
                <circle
                  cx="47"
                  cy="47"
                  r="42"
                  strokeWidth="7"
                  fill="none"
                  className="ring-fill"
                  strokeDasharray="263.89"
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  style={{ stroke: isOver ? 'var(--rose-500)' : 'var(--amber-400)' }}
                ></circle>
              </svg>
              <div className="goal-center-content">
                <div className="goal-consumed-kcal">{totalCalories}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>KCAL CONSUMED</div>
                <div
                  className="goal-remaining-label"
                  style={{ color: isOver ? 'var(--rose-500)' : 'var(--text-secondary)' }}
                >
                  {isOver ? `+${totalCalories - goals.calories} kcal over target` : `${remainingKcal} kcal remaining`}
                </div>
              </div>
            </div>

            {/* Mini Macro Bars */}
            <div className="daily-macros-mini-bars">
              <div className="mini-macro-item">
                <div className="mini-macro-header">
                  <span style={{ color: '#3b82f6' }}>Protein</span>
                  <span>{totalProtein} / {goals.protein} g</span>
                </div>
                <div className="mini-macro-track">
                  <div className="mini-macro-fill" style={{ width: `${proteinPct}%`, background: '#3b82f6' }}></div>
                </div>
              </div>

              <div className="mini-macro-item">
                <div className="mini-macro-header">
                  <span style={{ color: '#10b981' }}>Carbohydrates</span>
                  <span>{totalCarbs} / {goals.carbs} g</span>
                </div>
                <div className="mini-macro-track">
                  <div className="mini-macro-fill" style={{ width: `${carbsPct}%`, background: '#10b981' }}></div>
                </div>
              </div>

              <div className="mini-macro-item">
                <div className="mini-macro-header">
                  <span style={{ color: '#f59e0b' }}>Fat</span>
                  <span>{totalFat} / {goals.fat} g</span>
                </div>
                <div className="mini-macro-track">
                  <div className="mini-macro-fill" style={{ width: `${fatPct}%`, background: '#f59e0b' }}></div>
                </div>
              </div>
            </div>

            {/* Water Tracker */}
            <div className="water-tracker-card">
              <div className="water-info-group">
                <span className="water-icon">💧</span>
                <div>
                  <div className="water-text-val">{waterMl} / {goals.water} ml</div>
                  <div className="water-text-sub">Daily Hydration</div>
                </div>
              </div>
              <button className="add-water-btn" onClick={() => addWater(250)}>
                <span>+ 250ml</span>
              </button>
            </div>
          </div>

          {/* Logged Meals Timeline */}
          <div className="meals-timeline-card">
            <div className="timeline-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Meals Consumed Today</h3>
              <span className="badge badge-health" style={{ fontSize: '0.72rem' }}>Live Log</span>
            </div>

            <div className="logged-meals-list">
              {todayMeals.length === 0 ? (
                <div className="empty-meals-placeholder">
                  <div className="empty-meals-icon">🥗</div>
                  <p>No meals logged today yet.</p>
                  <small>Scan a food plate or pick a sample dish above to log your intake!</small>
                </div>
              ) : (
                todayMeals.map((meal) => {
                  const timeStr = new Date(meal.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  return (
                    <div key={meal.id} className="meal-log-item">
                      <img src={meal.image} alt={meal.name} className="meal-item-thumb" />
                      <div className="meal-item-info">
                        <span className="meal-item-title">{meal.name}</span>
                        <div className="meal-item-meta">
                          <span className="badge badge-health" style={{ fontSize: '0.68rem' }}>{meal.mealType}</span>
                          <span>{meal.portionText}</span>
                          <span>• {timeStr}</span>
                        </div>
                      </div>
                      <div className="meal-item-kcal">{meal.calories} kcal</div>
                      <button
                        className="delete-meal-btn"
                        onClick={() => deleteTodayMeal(meal.id)}
                        title="Remove meal"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
