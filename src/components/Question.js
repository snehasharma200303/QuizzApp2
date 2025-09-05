import React from 'react';
import './Question.css';

const Question = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isAnswerSubmitted,
  showCorrectAnswer,
  questionNumber,
  timeUp
}) => {
  const getAnswerClass = (answerIndex) => {
    let classes = ['answer-option'];
    
    if (selectedAnswer === answerIndex) {
      classes.push('selected');
    }
    
    if (showCorrectAnswer) {
      if (answerIndex === question.correctAnswerIndex) {
        classes.push('correct');
      } else if (selectedAnswer === answerIndex && answerIndex !== question.correctAnswerIndex) {
        classes.push('incorrect');
      }
    }
    
    if (isAnswerSubmitted || timeUp) {
      classes.push('disabled');
    }
    
    return classes.join(' ');
  };

  const getAnswerIcon = (answerIndex) => {
    if (!showCorrectAnswer) return '';
    
    if (answerIndex === question.correctAnswerIndex) {
      return '✅';
    } else if (selectedAnswer === answerIndex && answerIndex !== question.correctAnswerIndex) {
      return '❌';
    }
    return '';
  };

  return (
    <div className="question-container card fade-in">
      <div className="question-header">
        <div className="question-meta">
          <span className="question-number">Question {questionNumber}</span>
          <span className="question-difficulty">{question.difficulty}</span>
          <span className="question-category">{question.category}</span>
        </div>
      </div>
      
      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
        
        <div className="answers-grid">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={getAnswerClass(index)}
              onClick={() => onAnswerSelect(index)}
              disabled={isAnswerSubmitted || timeUp}
              aria-label={`Option ${index + 1}: ${answer}`}
              aria-pressed={selectedAnswer === index}
            >
              <div className="answer-content">
                <div className="answer-number">{index + 1}</div>
                <div className="answer-text">{answer}</div>
                <div className="answer-icon">{getAnswerIcon(index)}</div>
              </div>
            </button>
          ))}
        </div>
        
        {!isAnswerSubmitted && !timeUp && (
          <div className="selection-hint">
            {selectedAnswer !== null ? (
              <span className="hint-selected">
                🎯 Option {selectedAnswer + 1} selected. Click Submit to confirm!
              </span>
            ) : (
              <span className="hint-select">
                🤔 Select an answer to continue your space mission...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
