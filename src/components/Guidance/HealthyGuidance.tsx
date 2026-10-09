import React from 'react';

export const HealthyGuidance: React.FC = () => {
  return (
    <section className="section" id="nutrition-guide" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Evidence-Based Wellness</span>
          <h2 className="section-title">Healthy Eating Guidance</h2>
          <p className="section-desc">
            Actionable dietary wisdom tailored for students, athletes, and busy professionals.
          </p>
        </div>

        <div className="guidance-cards-grid">
          {/* Gym Athletes */}
          <div className="guidance-card">
            <div className="guidance-icon-wrap icon-gym">💪</div>
            <h3 className="guidance-card-title">Gym & Fitness Athletes</h3>
            <p className="guidance-card-text">
              Optimize muscle protein synthesis and recovery with consistent macro distribution throughout the day.
            </p>
            <ul className="guidance-tips-list">
              <li>Aim for 1.6g to 2.2g protein per kg of bodyweight</li>
              <li>Pair complex carbs with lean protein 1-2 hours pre-workout</li>
              <li>Stay hydrated with electrolytes during intense lifting</li>
            </ul>
          </div>

          {/* Students */}
          <div className="guidance-card">
            <div className="guidance-icon-wrap icon-student">🎓</div>
            <h3 className="guidance-card-title">Students & Brain Power</h3>
            <p className="guidance-card-text">
              Affordable, nutrient-dense nutrition designed for sharp cognitive function, memory, and sustained exam energy.
            </p>
            <ul className="guidance-tips-list">
              <li>Lentils, eggs, and oats provide budget-friendly complete nutrition</li>
              <li>Avoid high-sugar energy drinks that lead to reactive glucose crashes</li>
              <li>Include omega-3 rich walnuts and chia seeds for brain clarity</li>
            </ul>
          </div>

          {/* Working Professionals */}
          <div className="guidance-card">
            <div className="guidance-icon-wrap icon-pro">💼</div>
            <h3 className="guidance-card-title">Working Professionals</h3>
            <p className="guidance-card-text">
              Prevent the 2 PM afternoon slump and maintain steady metabolic health during sedentary office hours.
            </p>
            <ul className="guidance-tips-list">
              <li>Follow the Plate Method: 50% vegetables, 25% protein, 25% carbs</li>
              <li>Keep raw almonds or fresh fruit handy to prevent vending machine raids</li>
              <li>Take a 5-minute walk after meals to blunt postprandial glucose</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
