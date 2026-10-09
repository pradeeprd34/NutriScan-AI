import React from 'react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <span>✨</span>
            <span>AI-Powered Food Recognition & Nutrition</span>
          </div>

          <h1 className="hero-title">
            Know What You Eat.<br />
            <span className="gradient-text">Just Snap Your Food.</span>
          </h1>

          <p className="hero-desc">
            Use AI to identify your meal and get an estimated breakdown of calories, protein, carbohydrates, fibre, sugar, fats, and environmental carbon impact in seconds.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
              onClick={() => scrollTo('scanner')}
            >
              <span>📸</span>
              <span>Scan My Food</span>
            </button>
            <button
              className="btn-secondary"
              style={{ padding: '14px 24px', fontSize: '1.05rem' }}
              onClick={() => scrollTo('nutrition-dashboard')}
            >
              <span>Explore Features</span>
            </button>
            <a
              href="/NutriScan-AI.zip"
              download="NutriScan-AI.zip"
              className="btn-secondary"
              style={{
                padding: '14px 20px',
                fontSize: '1.05rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none'
              }}
              title="Download complete project folder as ZIP (Ready for VS Code)"
            >
              <span>📦</span>
              <span>Export ZIP</span>
            </a>
          </div>

          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon" style={{ color: 'var(--purple-400)' }}>🤖</span>
              <span>AI Food Recognition</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon" style={{ color: 'var(--emerald-400)' }}>📊</span>
              <span>Nutrition Estimates</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon" style={{ color: 'var(--amber-400)' }}>🔥</span>
              <span>Daily Calorie Tracking</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon" style={{ color: 'var(--cyan-400)' }}>🌱</span>
              <span>Carbon Footprint</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="plate-container">
            <img
              src="assets/images/hero_food_plate.jpg"
              alt="Salmon and Quinoa Power Bowl"
              className="hero-food-img"
              loading="eager"
            />

            <div className="hero-scan-overlay">
              <div className="hero-laser-line"></div>
              <div className="scan-target-box">
                <span className="corner-reticle corner-tl"></span>
                <span className="corner-reticle corner-tr"></span>
                <span className="corner-reticle corner-bl"></span>
                <span className="corner-reticle corner-br"></span>
              </div>
            </div>

            <div className="floating-stat-card stat-card-1">
              <div className="stat-icon-wrap">🔥</div>
              <div>
                <div className="stat-info-title">Grilled Salmon Bowl</div>
                <div className="stat-info-val">580 kcal • 32g Protein</div>
              </div>
            </div>

            <div className="floating-stat-card stat-card-2">
              <div className="stat-icon-wrap">🌱</div>
              <div>
                <div className="stat-info-title">Eco Footprint</div>
                <div className="stat-info-val">~1.1 kg CO₂e • Low Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
