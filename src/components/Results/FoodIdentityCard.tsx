import React from 'react';
import { useApp } from '../../context/AppContext';
import { PortionController } from './PortionController';

export const FoodIdentityCard: React.FC = () => {
  const { currentFood, activeImage, setIsEditFoodModalOpen } = useApp();

  if (!currentFood) return null;

  return (
    <div className="food-identity-card">
      <div className="food-result-img-wrap">
        <img src={activeImage} alt={currentFood.name} className="food-result-img" />
        <div className="food-confidence-badge">
          <span>🎯</span>
          <span>AI Confidence: {currentFood.confidence}%</span>
        </div>
      </div>

      <div className="food-identity-body">
        <div className="food-title-row">
          <div>
            <span className="badge badge-health" style={{ marginBottom: 6 }}>Detected Food</span>
            <h3 className="food-detected-title">{currentFood.name}</h3>
          </div>
          <button
            className="edit-food-btn"
            onClick={() => setIsEditFoodModalOpen(true)}
            title="Correct or change detected food"
          >
            <span>✏️</span>
            <span>Edit Food</span>
          </button>
        </div>

        <div className="detected-components-wrap">
          <div className="components-label">Detected Components</div>
          <div className="ingredient-tags-list">
            {currentFood.components.map((comp) => (
              <span key={comp.name} className="ingredient-tag">
                <span className="tag-dot"></span>
                {comp.name}
                <small style={{ color: 'var(--text-muted)' }}>({comp.confidence}%)</small>
              </span>
            ))}
          </div>
        </div>

        {/* Portion Controller */}
        <PortionController />
      </div>
    </div>
  );
};
