import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timer-container ${isWarning ? 'warning' : ''} ${isCritical ? 'critical' : ''}`}>
      <div className="timer-label">⏱️ Mission Timer</div>
      
      <div className="timer-display">
        <div className="timer-circle">
          <svg className="timer-svg" viewBox="0 0 100 100">
            <circle
              className="timer-track"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
            />
            <circle
              className="timer-progress"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="timer-text">
            <div className="timer-time">{formatTime(timeLeft)}</div>
            <div className="timer-status">
              {isCritical ? '🚨 CRITICAL' : isWarning ? '⚠️ WARNING' : '✅ ACTIVE'}
            </div>
          </div>
        </div>
      </div>
      
      {!isActive && (
        <div className="timer-inactive">
          ⏸️ Timer Paused
        </div>
      )}
    </div>
  );
};

export default Timer;
