import React from 'react';

interface AnalysisHUDProps {
  stepIndex: number;
  stepName: string;
}

const STEPS = [
  "Detecting food",
  "Identifying ingredients",
  "Estimating portion",
  "Calculating nutrition",
  "Preparing your report"
];

export const AnalysisHUD: React.FC<AnalysisHUDProps> = ({ stepIndex, stepName }) => {
  return (
    <div className="analysis-screen" style={{ display: 'block' }}>
      <div className="analysis-hud">
        <div className="scanner-reticle-circle">
          <div className="reticle-ring"></div>
          <div className="reticle-ring-inner"></div>
          <div className="ai-pulse-dot">🧠</div>
        </div>

        <h3 className="analysis-status-text">
          {stepName ? `AI Analyzing: ${stepName}...` : 'Analyzing your food...'}
        </h3>

        <div className="analysis-stepper-list">
          {STEPS.map((step, idx) => {
            const isDone = idx < stepIndex;
            const isActive = idx === stepIndex;
            return (
              <div
                key={step}
                className={`analysis-step-item ${isDone ? 'done' : isActive ? 'active' : ''}`}
              >
                <span className="step-status-icon">
                  {isDone ? '✓' : isActive ? '⚙' : '○'}
                </span>
                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
