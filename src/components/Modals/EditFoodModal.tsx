import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOOD_DATABASE } from '../../data/foodDatabase';

export const EditFoodModal: React.FC = () => {
  const { isEditFoodModalOpen, setIsEditFoodModalOpen, setFood, showToast } = useApp();
  const [search, setSearch] = useState('');

  if (!isEditFoodModalOpen) return null;

  const filtered = FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true">
      <div className="modal-box">
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Correct Detected Food</h3>
          <button className="icon-btn" style={{ width: 32, height: 32 }} onClick={() => setIsEditFoodModalOpen(false)}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            If the AI visual recognition misidentified your plate, choose the closest item from our database:
          </p>

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Search dishes (e.g. Biryani, Salmon, Salad, Tofu)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {filtered.map((f) => (
              <div
                key={f.id}
                onClick={() => {
                  setFood(f, f.image, true);
                  setIsEditFoodModalOpen(false);
                  showToast(`Food corrected to "${f.name}"`, "success");
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 8,
                  cursor: 'pointer',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{f.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {f.cuisine} • ~{f.per100g.calories} kcal/100g
                  </div>
                </div>
                <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.78rem' }}>
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
