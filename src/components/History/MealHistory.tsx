import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MealType } from '../../types';

export const MealHistory: React.FC = () => {
  const { history, clearHistory, showToast } = useApp();
  const [filter, setFilter] = useState<string>('All');

  const filteredHistory = filter === 'All'
    ? history
    : history.filter(h => h.mealType === filter);

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `nutriscan_history_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Exported history as JSON file", "success");
  };

  const exportCsv = () => {
    if (history.length === 0) {
      showToast("No history to export!", "warning");
      return;
    }

    const headers = ["Timestamp", "Food Name", "Meal Type", "Portion", "Calories (kcal)", "Protein (g)", "Carbs (g)", "Fat (g)", "CO2e (kg)"];
    const rows = history.map((h) => [
      `"${h.timestamp}"`,
      `"${h.name}"`,
      `"${h.mealType}"`,
      `"${h.portionText}"`,
      h.calories,
      h.protein,
      h.carbs,
      h.fat,
      h.co2Kg
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const a = document.createElement("a");
    a.setAttribute("href", encodeURI(csvContent));
    a.setAttribute("download", `nutriscan_history_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Exported history as CSV file", "success");
  };

  return (
    <section className="section" id="meal-history">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Historical Records</span>
          <h2 className="section-title">Meal History</h2>
          <p className="section-desc">
            Review past scanned dishes, inspect nutritional trends, and export your personal dietary logs.
          </p>
        </div>

        <div className="history-controls-bar">
          <div className="history-filter-pills">
            {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'All Meals' : cat}
              </button>
            ))}
          </div>

          <div className="history-actions-group">
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={exportCsv}>
              <span>📊 Export CSV</span>
            </button>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={exportJson}>
              <span>💾 Export JSON</span>
            </button>
            <button
              className="btn-secondary"
              style={{ padding: '6px 10px', fontSize: '0.8rem', color: 'var(--rose-500)' }}
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your meal history?")) {
                  clearHistory();
                }
              }}
            >
              <span>🗑️ Clear</span>
            </button>
          </div>
        </div>

        <div className="history-cards-grid">
          {filteredHistory.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📁</div>
              <p>No meals recorded for this category yet.</p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const dateStr = new Date(item.timestamp).toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              return (
                <div key={item.id} className="history-food-card">
                  <div className="history-card-img-wrap">
                    <img src={item.image} alt={item.name} className="history-card-img" />
                    <span className="history-card-badge">{item.mealType}</span>
                  </div>
                  <div className="history-card-body">
                    <div className="history-card-title">{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.portionText}</div>
                    <div className="history-card-macros">
                      <strong style={{ color: 'var(--amber-400)' }}>{item.calories} kcal</strong>
                      <span>• P: {item.protein}g</span>
                      <span>• C: {item.carbs}g</span>
                      <span>• F: {item.fat}g</span>
                    </div>
                    <div className="history-card-footer">
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dateStr}</span>
                      <span className="badge badge-estimate">~{item.co2Kg} kg CO₂e</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
