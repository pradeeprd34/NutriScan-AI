import React, { useRef, useState, useEffect } from 'react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      return;
    }

    let activeStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) return;
        activeStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        setStream(activeStream);
        if (videoRef.current) {
          videoRef.current.srcObject = activeStream;
          videoRef.current.play();
        }
      } catch (err) {
        console.warn("Camera access error:", err);
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  if (!isOpen) return null;

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onCapture(dataUrl);
      onClose();
    }
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="camera-modal active">
      <div className="camera-container">
        <div className="camera-header">
          <span style={{ fontWeight: 700 }}>📸 Camera Scanner</span>
          <button className="icon-btn" style={{ width: 32, height: 32 }} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="camera-video-wrap">
          <video ref={videoRef} className="camera-video" playsInline autoPlay muted />
          <div className="camera-overlay-reticle"></div>
        </div>

        <div className="camera-controls-bottom">
          <button className="icon-btn" onClick={toggleFacingMode} title="Switch camera">
            🔄
          </button>
          <button className="shutter-btn" onClick={handleCapture} aria-label="Capture food photo">
            <div className="shutter-inner"></div>
          </button>
          <div style={{ width: 40 }}></div>
        </div>
      </div>
    </div>
  );
};
