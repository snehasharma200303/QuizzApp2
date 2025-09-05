import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { fetchTriviaQuestions } from './services/triviaApi';
import './App.css';

function App() {
  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    isQuizStarted: false,
    isQuizCompleted: false,
    difficulty: 'medium',
    category: 'any',
    loading: false,
    error: null
  });

  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // Load high scores from localStorage
    const savedScores = localStorage.getItem('spaceQuizHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const startQuiz = async (difficulty = 'medium', category = 'any') => {
    setQuizState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const questions = await fetchTriviaQuestions(10, difficulty, category);
      setQuizState(prev => ({
        ...prev,
        questions,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        isQuizStarted: true,
        isQuizCompleted: false,
        difficulty,
        category,
        loading: false,
        error: null
      }));
    } catch (error) {
      setQuizState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load questions. Please check your internet connection and try again.'
      }));
    }
  };

  const submitAnswer = (answerIndex, isCorrect) => {
    const newAnswer = {
      questionIndex: quizState.currentQuestionIndex,
      selectedAnswer: answerIndex,
      isCorrect,
      question: quizState.questions[quizState.currentQuestionIndex]
    };

    setQuizState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, newAnswer],
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      completeQuiz();
    }
  };

  const previousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        userAnswers: prev.userAnswers.slice(0, -1),
        score: prev.userAnswers[prev.userAnswers.length - 1]?.isCorrect 
          ? prev.score - 1 
          : prev.score
      }));
    }
  };

  const skipQuestion = () => {
    const newAnswer = {
      questionIndex: quizState.currentQuestionIndex,
      selectedAnswer: null,
      isCorrect: false,
      question: quizState.questions[quizState.currentQuestionIndex],
      skipped: true
    };

    setQuizState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, newAnswer]
    }));

    nextQuestion();
  };

  const completeQuiz = () => {
    // Calculate score based on answered questions only
    const answeredQuestions = quizState.userAnswers.length;
    const finalScore = quizState.score;
    const totalQuestions = quizState.questions.length;
    const percentage = answeredQuestions > 0 ? Math.round((finalScore / answeredQuestions) * 100) : 0;
    const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);
    
    // Save high score with completion information
    const newScore = {
      score: finalScore,
      total: totalQuestions,
      answered: answeredQuestions,
      percentage,
      completionRate,
      difficulty: quizState.difficulty,
      category: quizState.category,
      date: new Date().toISOString(),
      id: Date.now()
    };

    const updatedHighScores = [...highScores, newScore]
      .sort((a, b) => {
        // Sort by completion rate first, then by percentage
        if (a.completionRate !== b.completionRate) {
          return b.completionRate - a.completionRate;
        }
        return b.percentage - a.percentage;
      })
      .slice(0, 10);

    setHighScores(updatedHighScores);
    localStorage.setItem('spaceQuizHighScores', JSON.stringify(updatedHighScores));

    setQuizState(prev => ({
      ...prev,
      isQuizCompleted: true
    }));
  };

  const restartQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      isQuizStarted: false,
      isQuizCompleted: false,
      difficulty: 'medium',
      category: 'any',
      loading: false,
      error: null
    });
  };

  return (
    <div className="App">
      <Router>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onStartQuiz={startQuiz}
                highScores={highScores}
                loading={quizState.loading}
                error={quizState.error}
              />
            } 
          />
          <Route 
            path="/quiz" 
            element={
              quizState.isQuizStarted && !quizState.isQuizCompleted ? (
                <Quiz 
                  quizState={quizState}
                  onSubmitAnswer={submitAnswer}
                  onNextQuestion={nextQuestion}
                  onPreviousQuestion={previousQuestion}
                  onSkipQuestion={skipQuestion}
                  onCompleteQuiz={completeQuiz}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/results" 
            element={
              quizState.isQuizCompleted ? (
                <Results 
                  quizState={quizState}
                  onRestartQuiz={restartQuiz}
                  highScores={highScores}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
