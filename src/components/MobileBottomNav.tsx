import React from 'react';

export const MobileBottomNav: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="mobile-nav-items">
        <a href="#hero" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="mobile-nav-icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="#scanner" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('scanner'); }}>
          <span className="mobile-nav-icon">📸</span>
          <span>Scan</span>
        </a>
        <a href="#nutrition-dashboard" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-dashboard'); }}>
          <span className="mobile-nav-icon">📊</span>
          <span>Macros</span>
        </a>
        <a href="#calorie-tracker" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('calorie-tracker'); }}>
          <span className="mobile-nav-icon">🔥</span>
          <span>Tracker</span>
        </a>
        <a href="#meal-history" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('meal-history'); }}>
          <span className="mobile-nav-icon">📖</span>
          <span>History</span>
        </a>
      </div>
    </nav>
  );
};
