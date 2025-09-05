import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css';

const Results = ({ quizState, onRestartQuiz, highScores }) => {
  const navigate = useNavigate();
  const { score, questions, userAnswers, difficulty, category } = quizState;
  const answeredQuestions = userAnswers.length;
  const totalQuestions = questions.length;
  const percentage = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;
  const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { emoji: '🏆', message: 'LEGENDARY SPACE EXPLORER!', class: 'legendary' };
    if (percentage >= 80) return { emoji: '🌟', message: 'STELLAR PERFORMANCE!', class: 'excellent' };
    if (percentage >= 70) return { emoji: '🚀', message: 'GREAT JOB, ASTRONAUT!', class: 'good' };
    if (percentage >= 60) return { emoji: '🛸', message: 'SOLID EFFORT!', class: 'average' };
    if (percentage >= 50) return { emoji: '🌙', message: 'KEEP EXPLORING!', class: 'below-average' };
    return { emoji: '🌍', message: 'MISSION TRAINING NEEDED!', class: 'poor' };
  };

  const performance = getPerformanceMessage();
  
  const handleRestart = () => {
    onRestartQuiz();
    navigate('/');
  };

  const handleNewMission = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="results-container fade-in">
      <div className="results-content">
        {/* Mission Complete Header */}
        <div className="mission-complete-header">
          <h1 className="mission-title pulse">🚀 MISSION COMPLETE 🌌</h1>
          <div className={`performance-badge ${performance.class}`}>
            <div className="performance-emoji">{performance.emoji}</div>
            <div className="performance-message">{performance.message}</div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="score-summary card glow">
          <h2>📊 Mission Report</h2>
          <div className="score-display">
            <div className="final-score">
              <span className="score-number">{score}</span>
              <span className="score-divider">/</span>
              <span className="score-total">{answeredQuestions}</span>
            </div>
            <div className="score-percentage">{percentage}%</div>
            <div className="completion-info">
              <span className="completion-rate">{completionRate}% Complete</span>
              <span className="answered-info">({answeredQuestions}/{totalQuestions} answered)</span>
            </div>
          </div>
          
          {/* Enhanced Progress Visualization */}
          <div className="results-progress-section">
            <div className="progress-overview">
              <h3>🚀 Mission Progress Overview</h3>
              <div className="progress-visual">
                <div className="progress-track-results">
                  <div 
                    className="progress-fill-results"
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="progress-shimmer-results"></div>
                  </div>
                </div>
                <div className="progress-markers-results">
                  {questions.map((_, index) => {
                    const answer = userAnswers[index];
                    let markerClass = 'upcoming';
                    let markerIcon = '⭕';
                    
                    if (answer) {
                      if (answer.skipped) {
                        markerClass = 'skipped';
                        markerIcon = '⏭️';
                      } else if (answer.isCorrect) {
                        markerClass = 'correct';
                        markerIcon = '✅';
                      } else {
                        markerClass = 'incorrect';
                        markerIcon = '❌';
                      }
                    }
                    
                    return (
                      <div
                        key={index}
                        className={`progress-marker-results ${markerClass}`}
                        style={{ left: `${((index + 1) / questions.length) * 100}%` }}
                        title={`Question ${index + 1}: ${markerClass}`}
                      >
                        {markerIcon}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="performance-breakdown">
              <div className="breakdown-stats">
                <div className="breakdown-item correct">
                  <div className="breakdown-icon">✅</div>
                  <div className="breakdown-info">
                    <span className="breakdown-count">{score}</span>
                    <span className="breakdown-label">Correct</span>
                  </div>
                </div>
                <div className="breakdown-item incorrect">
                  <div className="breakdown-icon">❌</div>
                  <div className="breakdown-info">
                    <span className="breakdown-count">{userAnswers.filter(a => !a.isCorrect && !a.skipped).length}</span>
                    <span className="breakdown-label">Incorrect</span>
                  </div>
                </div>
                <div className="breakdown-item skipped">
                  <div className="breakdown-icon">⏭️</div>
                  <div className="breakdown-info">
                    <span className="breakdown-count">{userAnswers.filter(a => a.skipped).length}</span>
                    <span className="breakdown-label">Skipped</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mission-details">
            <div className="detail-item">
              <span className="detail-label">🎯 Difficulty:</span>
              <span className="detail-value">{difficulty}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">🎭 Category:</span>
              <span className="detail-value">{category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">⏱️ Questions:</span>
              <span className="detail-value">{questions.length}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">🎯 Accuracy:</span>
              <span className="detail-value">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="detailed-results card">
          <h3>🔍 Mission Analysis</h3>
          <div className="results-list">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer?.isCorrect;
              const wasSkipped = userAnswer?.skipped;
              
              return (
                <div key={index} className={`result-item ${isCorrect ? 'correct' : wasSkipped ? 'skipped' : 'incorrect'}`}>
                  <div className="result-header">
                    <div className="result-number">Q{index + 1}</div>
                    <div className="result-status">
                      {isCorrect ? '✅' : wasSkipped ? '⏭️' : '❌'}
                    </div>
                  </div>
                  
                  <div className="result-content">
                    <div className="result-question">{question.question}</div>
                    
                    <div className="result-answers">
                      <div className="answer-row">
                        <span className="answer-label">Your Answer:</span>
                        <span className={`answer-value ${isCorrect ? 'correct' : wasSkipped ? 'skipped' : 'incorrect'}`}>
                          {wasSkipped ? 'Skipped' : question.answers[userAnswer?.selectedAnswer]}
                        </span>
                      </div>
                      
                      {!isCorrect && (
                        <div className="answer-row">
                          <span className="answer-label">Correct Answer:</span>
                          <span className="answer-value correct">
                            {question.answers[question.correctAnswerIndex]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High Scores */}
        {highScores.length > 0 && (
          <div className="high-scores-section card">
            <h3>🏆 Hall of Fame</h3>
            <div className="scores-grid">
              {highScores.slice(0, 5).map((scoreEntry, index) => (
                <div key={scoreEntry.id} className="score-entry">
                  <div className="score-rank">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="score-details">
                    <div className="score-percent">{scoreEntry.percentage}%</div>
                    <div className="score-info">
                      {scoreEntry.difficulty} • {formatDate(scoreEntry.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="results-actions">
          <button
            onClick={handleRestart}
            className="btn btn-primary pulse"
            aria-label="Restart the same quiz"
          >
            🔄 Retry Mission
          </button>
          
          <button
            onClick={handleNewMission}
            className="btn btn-success"
            aria-label="Start a new quiz"
          >
            🚀 New Mission
          </button>
        </div>

        {/* Motivational Message */}
        <div className="motivation-card card">
          <h4>🌟 Space Explorer's Log</h4>
          <p>
            {percentage >= 80 
              ? "Outstanding work, Commander! Your knowledge of the cosmos is truly impressive. Ready for the next challenge?"
              : percentage >= 60
              ? "Good job, Space Cadet! You're making progress on your journey through the galaxy. Keep exploring!"
              : "Every great explorer starts somewhere! Review the mission data and prepare for your next adventure among the stars."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
