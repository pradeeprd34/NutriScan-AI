import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, soundEnabled, toggleSound, setIsGoalsModalOpen } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileDrawerOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            <span className="logo-icon">🌿</span>
            <span>NutriScan <span className="gradient-text">AI</span></span>
          </a>

          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a></li>
              <li><a href="#scanner" onClick={(e) => { e.preventDefault(); scrollTo('scanner'); }}>Scan Food</a></li>
              <li><a href="#nutrition-dashboard" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-dashboard'); }}>Nutrition</a></li>
              <li><a href="#calorie-tracker" onClick={(e) => { e.preventDefault(); scrollTo('calorie-tracker'); }}>Calorie Tracker</a></li>
              <li><a href="#meal-history" onClick={(e) => { e.preventDefault(); scrollTo('meal-history'); }}>Meal History</a></li>
              <li><a href="#environmental-impact" onClick={(e) => { e.preventDefault(); scrollTo('environmental-impact'); }}>Eco Impact</a></li>
              <li><a href="#nutrition-guide" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-guide'); }}>Guide</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={toggleSound}
              title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            <button
              className="icon-btn"
              onClick={toggleTheme}
              title="Toggle Light / Dark mode"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              className="icon-btn"
              onClick={() => setIsGoalsModalOpen(true)}
              title="Calorie & Macro Goals"
              aria-label="Set Goals"
            >
              🎯
            </button>

            <a
              href="/NutriScan-AI.zip"
              download="NutriScan-AI.zip"
              className="btn-secondary"
              title="Download Full Project ZIP (Ready for VS Code)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <span>📦</span>
              <span className="desktop-only">Export ZIP</span>
            </a>

            <button
              className="btn-primary"
              onClick={() => scrollTo('scanner')}
            >
              <span>📸</span>
              <span className="desktop-only">Scan Food</span>
            </button>

            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="camera-modal active">
          <div className="camera-container" style={{ maxWidth: 320, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span className="brand-logo" style={{ fontSize: '1.2rem' }}>
                NutriScan <span className="gradient-text">AI</span>
              </span>
              <button
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                onClick={() => setMobileDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  🏠 Home
                </a>
              </li>
              <li>
                <a href="#scanner" onClick={(e) => { e.preventDefault(); scrollTo('scanner'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  📸 Scan Food
                </a>
              </li>
              <li>
                <a href="#nutrition-dashboard" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-dashboard'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  📊 Nutrition Dashboard
                </a>
              </li>
              <li>
                <a href="#calorie-tracker" onClick={(e) => { e.preventDefault(); scrollTo('calorie-tracker'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  🔥 Calorie Tracker
                </a>
              </li>
              <li>
                <a href="#meal-history" onClick={(e) => { e.preventDefault(); scrollTo('meal-history'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  📖 Meal History
                </a>
              </li>
              <li>
                <a href="#environmental-impact" onClick={(e) => { e.preventDefault(); scrollTo('environmental-impact'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  🌍 Carbon Impact
                </a>
              </li>
              <li>
                <a href="#nutrition-guide" onClick={(e) => { e.preventDefault(); scrollTo('nutrition-guide'); }} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  💡 Healthy Guide
                </a>
              </li>
              <li>
                <a
                  href="/NutriScan-AI.zip"
                  download="NutriScan-AI.zip"
                  style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--emerald-400)' }}
                >
                  📦 Download Project ZIP
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
