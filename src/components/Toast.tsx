import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="toast-container" aria-live="polite">
      <div className={`toast toast-${toast.type}`}>
        <span>{toast.type === 'success' ? '✓' : 'ℹ'}</span>
        <span>{toast.text}</span>
      </div>
    </div>
  );
};
