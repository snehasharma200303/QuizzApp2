import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total, score, userAnswers, isQuizCompleted }) => {
  const progressPercentage = (current / total) * 100;
  const answeredQuestions = userAnswers ? userAnswers.length : 0;
  const completionPercentage = (answeredQuestions / total) * 100;
  const scorePercentage = answeredQuestions > 0 ? (score / answeredQuestions) * 100 : 0;

  const getMarkerStatus = (index) => {
    if (userAnswers && userAnswers[index]) {
      const answer = userAnswers[index];
      if (answer.skipped) return 'skipped';
      return answer.isCorrect ? 'correct' : 'incorrect';
    }
    if (index < current - 1) return 'completed';
    if (index === current - 1) return 'current';
    return 'upcoming';
  };

  const getMarkerIcon = (index) => {
    if (userAnswers && userAnswers[index]) {
      const answer = userAnswers[index];
      if (answer.skipped) return '⏭️';
      return answer.isCorrect ? '✅' : '❌';
    }
    if (index < current - 1) return '✅';
    if (index === current - 1) return '🎯';
    return '⭕';
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <div className="progress-stats">
          <span className="current-question">
            🎯 Question {current} of {total}
          </span>
          <span className="current-score">
            ⭐ Score: {score}/{answeredQuestions}
          </span>
          <span className="completion-rate">
            🚀 Progress: {Math.round(completionPercentage)}%
          </span>
        </div>
        
        {answeredQuestions > 0 && (
          <div className="performance-stats">
            <div className="accuracy-meter">
              <span className="accuracy-label">🎯 Accuracy:</span>
              <div className="accuracy-bar">
                <div 
                  className="accuracy-fill"
                  style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
              <span className="accuracy-percentage">{Math.round(scorePercentage)}%</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="progress-track">
        <div 
          className="progress-fill"
          style={{ width: `${completionPercentage}%` }}
        >
          <div className="progress-shimmer"></div>
        </div>
        <div className="progress-markers">
          {Array.from({ length: total }, (_, index) => (
            <div
              key={index}
              className={`progress-marker ${getMarkerStatus(index)}`}
              style={{ left: `${((index + 1) / total) * 100}%` }}
              title={`Question ${index + 1}: ${getMarkerStatus(index)}`}
            >
              {getMarkerIcon(index)}
            </div>
          ))}
        </div>
      </div>
      
      <div className="progress-labels">
        <span>Start Mission</span>
        <span>{Math.round(completionPercentage)}% Complete</span>
        <span>Mission Success</span>
      </div>
      
      {isQuizCompleted && (
        <div className="completion-summary">
          <div className="final-stats">
            <div className="stat-item">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{answeredQuestions - score}</span>
              <span className="stat-label">Incorrect</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{total - answeredQuestions}</span>
              <span className="stat-label">Skipped</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
