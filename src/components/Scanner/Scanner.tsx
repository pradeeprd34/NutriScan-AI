import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { FOOD_DATABASE } from '../../data/foodDatabase';
import { CameraModal } from './CameraModal';
import { AnalysisHUD } from './AnalysisHUD';

export const Scanner: React.FC = () => {
  const { isAnalyzing, scanStepIndex, scanStepName, runAnalysis, setFood, showToast } = useApp();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      showToast("Please upload a valid image (JPG, PNG, WEBP)", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
      showToast("Image ready for AI analysis", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    if (selectedImage) {
      runAnalysis(selectedImage);
    }
  };

  return (
    <section className="section" id="scanner">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Instant Food Scanner</span>
          <h2 className="section-title">AI Food Scanner</h2>
          <p className="section-desc">
            Take a photo using your device camera or upload any food image. Our vision engine detects the dish, estimates ingredients, and calculates nutritional composition.
          </p>
        </div>

        <div className="scanner-card">
          {isAnalyzing ? (
            <AnalysisHUD stepIndex={scanStepIndex} stepName={scanStepName} />
          ) : selectedImage ? (
            /* Active Image Preview Card */
            <div className="preview-card" style={{ display: 'grid' }}>
              <div className="preview-media-container">
                <img src={selectedImage} alt="Selected Plate Preview" className="preview-img" />
                <div className="preview-overlay-active">
                  <span className="corner-reticle corner-tl"></span>
                  <span className="corner-reticle corner-tr"></span>
                  <span className="corner-reticle corner-bl"></span>
                  <span className="corner-reticle corner-br"></span>
                </div>
              </div>

              <div className="preview-controls">
                <div className="badge badge-ai" style={{ width: 'fit-content' }}>
                  Image Ready For Analysis
                </div>
                <h3 className="preview-heading">Plate Ready</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Our neural vision network will detect ingredients, estimate portion weights, and breakdown macronutrients.
                </p>

                <div className="preview-actions-row">
                  <button
                    className="btn-primary btn-ai"
                    style={{ padding: '12px 24px' }}
                    onClick={handleStartAnalysis}
                  >
                    <span>✨</span>
                    <span>Analyze Food</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setIsCameraOpen(true)}>
                    <span>📸</span>
                    <span>Retake</span>
                  </button>
                  <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                    <span>📁</span>
                    <span>Choose Another</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Option Grid: Camera / Upload */
            <div className="scanner-options-grid">
              <div
                className="scanner-option-box"
                onClick={() => setIsCameraOpen(true)}
                role="button"
                tabIndex={0}
              >
                <div className="option-icon-large">📷</div>
                <h3 className="option-title">Take Photo</h3>
                <p className="option-desc">Use your smartphone or laptop camera to snap your plate directly.</p>
                <button className="btn-primary" style={{ marginTop: 16, pointerEvents: 'none' }}>
                  Open Camera
                </button>
              </div>

              <div
                className={`scanner-option-box ${dragOver ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
              >
                <div className="option-icon-large">📤</div>
                <h3 className="option-title">Upload Food Image</h3>
                <p className="option-desc">Drag & drop or browse from your device. Supports JPG, PNG, WEBP.</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="file-input-hidden"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />
                <button className="btn-secondary" style={{ marginTop: 16, pointerEvents: 'none' }}>
                  Browse Files
                </button>
              </div>
            </div>
          )}

          {/* Instant Sample Preset Chips */}
          <div className="sample-presets-wrap">
            <div className="sample-title">
              <span>⚡</span>
              <span>Or try instant sample dishes:</span>
            </div>
            <div className="sample-chips-list">
              {FOOD_DATABASE.slice(0, 5).map((food) => (
                <button
                  key={food.id}
                  className="sample-chip"
                  onClick={() => {
                    setFood(food, food.image, true);
                    setSelectedImage(null);
                    showToast(`Selected "${food.name}"`, "success");
                  }}
                >
                  <img src={food.image} alt={food.name} />
                  <span>{food.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          setSelectedImage(dataUrl);
          showToast("Photo captured! Click Analyze Food to scan.", "success");
        }}
      />
    </section>
  );
};
