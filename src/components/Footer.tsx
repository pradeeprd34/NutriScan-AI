import React from 'react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#hero" className="brand-logo" style={{ fontSize: '1.25rem' }} onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
              <span className="logo-icon" style={{ width: 32, height: 32, fontSize: '0.9rem' }}>🌿</span>
              <span>NutriScan <span className="gradient-text">AI</span></span>
            </a>
            <p className="footer-brand-desc">
              Snap your food. Understand your nutrition. Empowering healthier daily choices with transparent computer vision and ecological impact tracking.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Features</h4>
            <ul className="footer-links-list">
              <li><a href="#scanner" onClick={(e) => { e.preventDefault(); scrollTo('scanner'); }}>Camera Food Scan</a></li>
              <li><a href="#nutrition-dashboard" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-dashboard'); }}>Macro Distribution</a></li>
              <li><a href="#calorie-tracker" onClick={(e) => { e.preventDefault(); scrollTo('calorie-tracker'); }}>Calorie Tracker</a></li>
              <li><a href="#environmental-impact" onClick={(e) => { e.preventDefault(); scrollTo('environmental-impact'); }}>Carbon Footprint</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Audience</h4>
            <ul className="footer-links-list">
              <li><a href="#nutrition-guide" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-guide'); }}>Gym & Fitness</a></li>
              <li><a href="#nutrition-guide" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-guide'); }}>Students</a></li>
              <li><a href="#nutrition-guide" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-guide'); }}>Working Professionals</a></li>
              <li><a href="#nutrition-guide" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-guide'); }}>Eco-Conscious Eaters</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Transparency</h4>
            <ul className="footer-links-list">
              <li><a href="#results-container" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-dashboard'); }}>AI Estimation Notice</a></li>
              <li><a href="#results-container" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-dashboard'); }}>Portion Adjustments</a></li>
              <li><a href="#meal-history" onClick={(e) => { e.preventDefault(); scrollTo('meal-history'); }}>Data Export (CSV/JSON)</a></li>
              <li><a href="/NutriScan-AI.zip" download="NutriScan-AI.zip" style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>📦 Export Project ZIP</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 NutriScan AI. All rights reserved.</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: 600 }}>
            Disclaimer: NutriScan AI provides estimated nutritional values for informational and educational purposes. Values are not intended as medical advice or precise dietary diagnosis.
          </div>
        </div>
      </div>
    </footer>
  );
};
