import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import './Quiz.css';

const Quiz = ({ 
  quizState, 
  onSubmitAnswer, 
  onNextQuestion, 
  onPreviousQuestion, 
  onSkipQuestion, 
  onCompleteQuiz 
}) => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;
  const isFirstQuestion = quizState.currentQuestionIndex === 0;

  // Check if current question was already answered
  const existingAnswer = quizState.userAnswers.find(
    answer => answer.questionIndex === quizState.currentQuestionIndex
  );

  useEffect(() => {
    // Reset state when question changes
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.selectedAnswer);
      setIsAnswerSubmitted(true);
      setTimeUp(false);
    } else {
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setTimeUp(false);
    }
  }, [quizState.currentQuestionIndex, existingAnswer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isAnswerSubmitted) return;

      const key = event.key.toLowerCase();
      
      // Number keys 1-4 for answer selection
      if (['1', '2', '3', '4'].includes(key)) {
        const answerIndex = parseInt(key) - 1;
        if (answerIndex < currentQuestion.answers.length) {
          setSelectedAnswer(answerIndex);
        }
      }
      
      // Enter to submit answer
      if (key === 'enter' && selectedAnswer !== null) {
        handleSubmitAnswer();
      }
      
      // S to skip
      if (key === 's') {
        handleSkip();
      }
      
      // Q to submit quiz
      if (key === 'q') {
        handleSubmitQuiz();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedAnswer, isAnswerSubmitted, currentQuestion]);

  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswerSubmitted && !timeUp) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerIndex;
    onSubmitAnswer(selectedAnswer, isCorrect);
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onCompleteQuiz();
      navigate('/results');
    } else {
      onNextQuestion();
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      onPreviousQuestion();
    }
  };

  const handleSkip = () => {
    if (!isAnswerSubmitted) {
      onSkipQuestion();
    }
  };

  const handleSubmitQuiz = () => {
    // If current question has an answer, submit it first
    if (selectedAnswer !== null && !isAnswerSubmitted) {
      handleSubmitAnswer();
    }
    
    // Complete the quiz immediately
    onCompleteQuiz();
    navigate('/results');
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    if (!isAnswerSubmitted) {
      // Auto-submit current selection or mark as skipped
      if (selectedAnswer !== null) {
        handleSubmitAnswer();
      } else {
        handleSkip();
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading mission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header">
        <h1 className="quiz-title">🚀 Space Mission in Progress</h1>
        
        {/* Progress Bar */}
        <ProgressBar 
          current={quizState.currentQuestionIndex + 1}
          total={quizState.questions.length}
          score={quizState.score}
          userAnswers={quizState.userAnswers}
          isQuizCompleted={quizState.isQuizCompleted}
        />
        
        {/* Timer */}
        <Timer 
          duration={30}
          onTimeUp={handleTimeUp}
          isActive={!isAnswerSubmitted && !timeUp}
          key={`timer-${quizState.currentQuestionIndex}`}
        />
      </div>

      <div className="quiz-content">
        {/* Question Component */}
        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          isAnswerSubmitted={isAnswerSubmitted}
          showCorrectAnswer={isAnswerSubmitted}
          questionNumber={quizState.currentQuestionIndex + 1}
          timeUp={timeUp}
        />

        {/* Action Buttons */}
        <div className="quiz-actions">
          <div className="action-row">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="btn btn-secondary"
              aria-label="Go to previous question"
            >
              ⬅️ Previous
            </button>

            {!isAnswerSubmitted && !timeUp && (
              <>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="btn btn-success"
                  aria-label="Submit your answer"
                >
                  ✅ Submit Answer
                </button>
                
                <button
                  onClick={handleSkip}
                  className="btn btn-warning"
                  aria-label="Skip this question"
                >
                  ⏭️ Skip
                </button>
              </>
            )}

            {(isAnswerSubmitted || timeUp) && (
              <button
                onClick={handleNext}
                className="btn btn-primary pulse"
                aria-label={isLastQuestion ? "Complete quiz" : "Go to next question"}
              >
                {isLastQuestion ? '🏁 Complete Mission' : '➡️ Next Question'}
              </button>
            )}
          </div>

          {/* Submit Quiz Early Button */}
          <div className="submit-quiz-section">
            <button
              onClick={handleSubmitQuiz}
              className="btn btn-submit-quiz"
              aria-label="Submit quiz and view overall results"
            >
              📊 Submit Quiz & View Overall Results
            </button>
            <p className="submit-quiz-note">
              Complete your space mission early and see comprehensive results
            </p>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="keyboard-shortcuts">
            <p>⌨️ Shortcuts: 1-4 (Select) • Enter (Submit) • S (Skip) • Q (Submit Quiz)</p>
          </div>
        </div>

        {/* Status Messages */}
        {timeUp && !isAnswerSubmitted && (
          <div className="status-message time-up">
            ⏰ Time's up! Moving to next question...
          </div>
        )}

        {isAnswerSubmitted && (
          <div className={`status-message ${selectedAnswer === currentQuestion.correctAnswerIndex ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentQuestion.correctAnswerIndex ? (
              <>🎉 Excellent! You got it right!</>
            ) : (
              <>❌ Not quite right. The correct answer was highlighted.</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
