import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDifficultyLevels, getCategories } from '../services/triviaApi';
import './Home.css';

const Home = ({ onStartQuiz, highScores, loading, error }) => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [showHighScores, setShowHighScores] = useState(false);

  const difficulties = getDifficultyLevels();
  const categories = getCategories();

  const handleStartQuiz = async () => {
    await onStartQuiz(selectedDifficulty, selectedCategory);
    navigate('/quiz');
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
    <div className="home-container fade-in">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title pulse">
            🚀 SPACE QUIZ ADVENTURE 🌌
          </h1>
          <p className="hero-subtitle">
            Embark on an interstellar journey of knowledge! Test your skills across the cosmos
            and become the ultimate space explorer.
          </p>
        </div>

        {/* Main Menu Card */}
        <div className="menu-card card glow">
          <h2>🎯 Mission Control</h2>

          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          {/* Difficulty Selection */}
          <div className="selection-group">
            <h3>🌟 Choose Your Challenge Level</h3>
            <div className="difficulty-grid">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  className={`difficulty-btn ${selectedDifficulty === diff.id ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  aria-label={`Select ${diff.name} difficulty`}
                >
                  <div className="difficulty-name">{diff.name}</div>
                  <div className="difficulty-desc">{diff.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="selection-group">
            <h3>🎭 Select Knowledge Domain</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
              aria-label="Select quiz category"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Button */}
          <div className="start-section">
            <button
              onClick={handleStartQuiz}
              disabled={loading}
              className="btn btn-start pulse"
              aria-label="Start the space quiz adventure"
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Loading Mission...
                </>
              ) : (
                <>
                  🚀 Launch Mission
                </>
              )}
            </button>
          </div>
        </div>

        {/* High Scores Section */}
        <div className="scores-section">
          <button
            onClick={() => setShowHighScores(!showHighScores)}
            className="btn btn-secondary"
            aria-expanded={showHighScores}
            aria-controls="high-scores-list"
          >
            {showHighScores ? '🔽 Hide' : '🏆 Show'} Hall of Fame
          </button>

          {showHighScores && (
            <div id="high-scores-list" className="high-scores-card card fade-in">
              <h3>🏆 Galactic Leaderboard</h3>
              {highScores.length === 0 ? (
                <p className="no-scores">
                  🌟 No missions completed yet. Be the first space explorer!
                </p>
              ) : (
                <div className="scores-list">
                  {highScores.map((score, index) => (
                    <div key={score.id} className="score-item">
                      <div className="score-rank">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div className="score-details">
                        <div className="score-percentage">{score.percentage}%</div>
                        <div className="score-info">
                          {score.score}/{score.total} • {score.difficulty} • {formatDate(score.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="instructions-card card">
          <h3>📋 Mission Briefing</h3>
          <ul className="instructions-list">
            <li>🎯 Answer 10 challenging questions from across the galaxy</li>
            <li>⏱️ Each question has a 30-second time limit</li>
            <li>🔄 Navigate between questions or skip if needed</li>
            <li>📊 Track your progress with the mission status bar</li>
            <li>🏆 Earn your place in the Hall of Fame</li>
            <li>⌨️ Use keyboard shortcuts: 1-4 for answers, Enter to submit, S to skip</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
