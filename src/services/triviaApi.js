// Open Trivia DB API Integration
const BASE_URL = 'https://opentdb.com/api.php';

// Category mapping for different quiz themes
const CATEGORIES = {
  'any': '',
  'science': '17',
  'computers': '18',
  'mathematics': '19',
  'mythology': '20',
  'sports': '21',
  'geography': '22',
  'history': '23',
  'politics': '24',
  'art': '25',
  'celebrities': '26',
  'animals': '27',
  'vehicles': '28',
  'entertainment': '11',
  'music': '12',
  'film': '11',
  'television': '14',
  'books': '10',
  'nature': '17',
  // Programming & Web Development Categories
  'react': 'programming',
  'javascript': 'programming',
  'html': 'programming',
  'css': 'programming',
  'java': 'programming',
  'python': 'programming',
  'nodejs': 'programming',
  'webdev': 'programming',
  'programming': 'programming'
};

// Programming questions database
const PROGRAMMING_QUESTIONS = {
  react: [
    {
      question: "What is the correct way to create a functional component in React?",
      correct_answer: "function MyComponent() { return <div>Hello</div>; }",
      incorrect_answers: ["class MyComponent() { return <div>Hello</div>; }", "const MyComponent = <div>Hello</div>;", "MyComponent() => <div>Hello</div>;"],
      difficulty: "easy",
      category: "Programming: React"
    },
    {
      question: "Which hook is used to manage state in functional components?",
      correct_answer: "useState",
      incorrect_answers: ["useEffect", "useContext", "useReducer"],
      difficulty: "easy",
      category: "Programming: React"
    },
    {
      question: "What is JSX in React?",
      correct_answer: "JavaScript XML - a syntax extension for JavaScript",
      incorrect_answers: ["Java Syntax Extension", "JavaScript eXtended", "JSON Syntax eXtension"],
      difficulty: "medium",
      category: "Programming: React"
    },
    {
      question: "Which hook is used for side effects in React?",
      correct_answer: "useEffect",
      incorrect_answers: ["useState", "useCallback", "useMemo"],
      difficulty: "medium",
      category: "Programming: React"
    }
  ],
  javascript: [
    {
      question: "Which of the following is NOT a JavaScript data type?",
      correct_answer: "float",
      incorrect_answers: ["string", "boolean", "undefined"],
      difficulty: "easy",
      category: "Programming: JavaScript"
    },
    {
      question: "What does '===' operator do in JavaScript?",
      correct_answer: "Strict equality comparison (type and value)",
      incorrect_answers: ["Assignment", "Loose equality comparison", "Greater than or equal"],
      difficulty: "medium",
      category: "Programming: JavaScript"
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      correct_answer: "push()",
      incorrect_answers: ["pop()", "shift()", "unshift()"],
      difficulty: "easy",
      category: "Programming: JavaScript"
    },
    {
      question: "What is a closure in JavaScript?",
      correct_answer: "A function that has access to variables in its outer scope",
      incorrect_answers: ["A way to close the browser", "A method to end a loop", "A type of error handling"],
      difficulty: "hard",
      category: "Programming: JavaScript"
    }
  ],
  html: [
    {
      question: "What does HTML stand for?",
      correct_answer: "HyperText Markup Language",
      incorrect_answers: ["High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      difficulty: "easy",
      category: "Programming: HTML"
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      correct_answer: "<style>",
      incorrect_answers: ["<css>", "<script>", "<link>"],
      difficulty: "easy",
      category: "Programming: HTML"
    },
    {
      question: "Which attribute specifies a unique identifier for an HTML element?",
      correct_answer: "id",
      incorrect_answers: ["class", "name", "key"],
      difficulty: "easy",
      category: "Programming: HTML"
    },
    {
      question: "What is the correct HTML element for the largest heading?",
      correct_answer: "<h1>",
      incorrect_answers: ["<heading>", "<h6>", "<header>"],
      difficulty: "easy",
      category: "Programming: HTML"
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      correct_answer: "Cascading Style Sheets",
      incorrect_answers: ["Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      difficulty: "easy",
      category: "Programming: CSS"
    },
    {
      question: "Which CSS property is used to change the text color?",
      correct_answer: "color",
      incorrect_answers: ["text-color", "font-color", "text-style"],
      difficulty: "easy",
      category: "Programming: CSS"
    },
    {
      question: "What is the CSS box model?",
      correct_answer: "Content, Padding, Border, Margin",
      incorrect_answers: ["Header, Body, Footer", "Width, Height, Depth", "Top, Right, Bottom, Left"],
      difficulty: "medium",
      category: "Programming: CSS"
    },
    {
      question: "Which CSS property is used to make text bold?",
      correct_answer: "font-weight",
      incorrect_answers: ["text-weight", "font-style", "text-decoration"],
      difficulty: "easy",
      category: "Programming: CSS"
    }
  ],
  java: [
    {
      question: "Which of the following is the correct way to declare a variable in Java?",
      correct_answer: "int x = 5;",
      incorrect_answers: ["var x = 5;", "x = 5;", "declare int x = 5;"],
      difficulty: "easy",
      category: "Programming: Java"
    },
    {
      question: "What is the main method signature in Java?",
      correct_answer: "public static void main(String[] args)",
      incorrect_answers: ["public void main(String[] args)", "static void main(String args)", "public main(String[] args)"],
      difficulty: "medium",
      category: "Programming: Java"
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      correct_answer: "extends",
      incorrect_answers: ["implements", "inherits", "super"],
      difficulty: "medium",
      category: "Programming: Java"
    },
    {
      question: "What is encapsulation in Java?",
      correct_answer: "Hiding internal implementation details",
      incorrect_answers: ["Creating multiple objects", "Inheriting from parent class", "Overriding methods"],
      difficulty: "hard",
      category: "Programming: Java"
    }
  ],
  python: [
    {
      question: "Which of the following is the correct way to create a list in Python?",
      correct_answer: "my_list = [1, 2, 3]",
      incorrect_answers: ["my_list = (1, 2, 3)", "my_list = {1, 2, 3}", "my_list = <1, 2, 3>"],
      difficulty: "easy",
      category: "Programming: Python"
    },
    {
      question: "What is the correct way to define a function in Python?",
      correct_answer: "def my_function():",
      incorrect_answers: ["function my_function():", "def my_function[]:", "function my_function[]:"],
      difficulty: "easy",
      category: "Programming: Python"
    },
    {
      question: "Which Python keyword is used for exception handling?",
      correct_answer: "try",
      incorrect_answers: ["catch", "handle", "exception"],
      difficulty: "medium",
      category: "Programming: Python"
    },
    {
      question: "What is a lambda function in Python?",
      correct_answer: "An anonymous function",
      incorrect_answers: ["A built-in function", "A class method", "A variable type"],
      difficulty: "hard",
      category: "Programming: Python"
    }
  ]
};

// Fallback questions for offline mode
const FALLBACK_QUESTIONS = [
  {
    question: "What is the largest planet in our solar system?",
    correct_answer: "Jupiter",
    incorrect_answers: ["Saturn", "Neptune", "Earth"],
    difficulty: "easy",
    category: "Science: Space"
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    correct_answer: "JavaScript",
    incorrect_answers: ["Python", "Java", "C++"],
    difficulty: "medium",
    category: "Science: Computers"
  },
  {
    question: "What is the speed of light in vacuum?",
    correct_answer: "299,792,458 m/s",
    incorrect_answers: ["300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
    difficulty: "hard",
    category: "Science: Physics"
  },
  {
    question: "Which galaxy is closest to the Milky Way?",
    correct_answer: "Andromeda",
    incorrect_answers: ["Whirlpool", "Sombrero", "Triangulum"],
    difficulty: "medium",
    category: "Science: Space"
  },
  {
    question: "What does HTML stand for?",
    correct_answer: "HyperText Markup Language",
    incorrect_answers: ["High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    difficulty: "easy",
    category: "Science: Computers"
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"],
    difficulty: "easy",
    category: "Science: Space"
  },
  {
    question: "What is the binary representation of the decimal number 10?",
    correct_answer: "1010",
    incorrect_answers: ["1100", "1001", "1110"],
    difficulty: "medium",
    category: "Science: Computers"
  },
  {
    question: "Which star is at the center of our solar system?",
    correct_answer: "The Sun",
    incorrect_answers: ["Proxima Centauri", "Alpha Centauri", "Sirius"],
    difficulty: "easy",
    category: "Science: Space"
  },
  {
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
    difficulty: "easy",
    category: "Science: Computers"
  },
  {
    question: "How many moons does Jupiter have approximately?",
    correct_answer: "79",
    incorrect_answers: ["45", "23", "156"],
    difficulty: "hard",
    category: "Science: Space"
  }
];

// Decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Shuffle array function
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Format question data
const formatQuestion = (questionData) => {
  const allAnswers = [
    questionData.correct_answer,
    ...questionData.incorrect_answers
  ];
  
  const shuffledAnswers = shuffleArray(allAnswers);
  const correctAnswerIndex = shuffledAnswers.indexOf(questionData.correct_answer);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    question: decodeHtml(questionData.question),
    answers: shuffledAnswers.map(answer => decodeHtml(answer)),
    correctAnswerIndex,
    difficulty: questionData.difficulty,
    category: decodeHtml(questionData.category),
    type: questionData.type || 'multiple'
  };
};

// Get programming questions by category
const getProgrammingQuestions = (category, difficulty = 'any', amount = 10) => {
  const categoryQuestions = PROGRAMMING_QUESTIONS[category] || [];
  
  let filteredQuestions = categoryQuestions;
  if (difficulty !== 'any') {
    filteredQuestions = categoryQuestions.filter(q => q.difficulty === difficulty);
  }
  
  // If not enough questions after filtering, use all questions from category
  if (filteredQuestions.length < amount) {
    filteredQuestions = categoryQuestions;
  }
  
  // If still not enough, mix with other programming questions
  if (filteredQuestions.length < amount) {
    const allProgrammingQuestions = Object.values(PROGRAMMING_QUESTIONS).flat();
    const additionalQuestions = allProgrammingQuestions.filter(q => 
      !filteredQuestions.includes(q) && (difficulty === 'any' || q.difficulty === difficulty)
    );
    filteredQuestions = [...filteredQuestions, ...additionalQuestions];
  }
  
  const shuffledQuestions = shuffleArray(filteredQuestions);
  return shuffledQuestions.slice(0, Math.min(amount, shuffledQuestions.length));
};

// Fetch questions from API with fallback
export const fetchTriviaQuestions = async (amount = 10, difficulty = 'medium', category = 'any') => {
  // Check if it's a programming category
  const programmingCategories = ['react', 'javascript', 'html', 'css', 'java', 'python', 'nodejs', 'webdev', 'programming'];
  
  if (programmingCategories.includes(category)) {
    console.log(`Using programming questions for category: ${category}`);
    const questions = getProgrammingQuestions(category, difficulty, amount);
    return questions.map(formatQuestion);
  }
  
  try {
    // Build API URL for non-programming categories
    let url = `${BASE_URL}?amount=${amount}&type=multiple`;
    
    if (difficulty !== 'any') {
      url += `&difficulty=${difficulty}`;
    }
    
    if (category !== 'any' && CATEGORIES[category] && CATEGORIES[category] !== 'programming') {
      url += `&category=${CATEGORIES[category]}`;
    }

    console.log('Fetching questions from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API Error: ${data.response_code}`);
    }

    if (!data.results || data.results.length === 0) {
      throw new Error('No questions received from API');
    }

    // Format and return questions
    return data.results.map(formatQuestion);
    
  } catch (error) {
    console.warn('API fetch failed, using fallback questions:', error.message);
    
    // Filter fallback questions by difficulty if specified
    let filteredQuestions = FALLBACK_QUESTIONS;
    if (difficulty !== 'any') {
      filteredQuestions = FALLBACK_QUESTIONS.filter(q => q.difficulty === difficulty);
    }
    
    // If not enough questions after filtering, use all fallback questions
    if (filteredQuestions.length < amount) {
      filteredQuestions = FALLBACK_QUESTIONS;
    }
    
    // Shuffle and take requested amount
    const shuffledQuestions = shuffleArray(filteredQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, Math.min(amount, shuffledQuestions.length));
    
    return selectedQuestions.map(formatQuestion);
  }
};

// Get available categories
export const getCategories = () => {
  const categoryNames = {
    'any': 'Any Category',
    'science': 'Science',
    'computers': 'Computers',
    'mathematics': 'Mathematics',
    'mythology': 'Mythology',
    'sports': 'Sports',
    'geography': 'Geography',
    'history': 'History',
    'politics': 'Politics',
    'art': 'Art',
    'celebrities': 'Celebrities',
    'animals': 'Animals',
    'vehicles': 'Vehicles',
    'entertainment': 'Entertainment',
    'music': 'Music',
    'film': 'Film',
    'television': 'Television',
    'books': 'Books',
    'nature': 'Nature',
    // Programming categories
    'react': '⚛️ React',
    'javascript': '🟨 JavaScript',
    'html': '🌐 HTML',
    'css': '🎨 CSS',
    'java': '☕ Java',
    'python': '🐍 Python',
    'nodejs': '🟢 Node.js',
    'webdev': '💻 Web Development',
    'programming': '👨‍💻 Programming (Mixed)'
  };
  
  return Object.keys(CATEGORIES).map(key => ({
    id: key,
    name: categoryNames[key] || key.charAt(0).toUpperCase() + key.slice(1)
  }));
};

// Get difficulty levels
export const getDifficultyLevels = () => {
  return [
    { id: 'easy', name: 'Easy', description: 'Perfect for beginners' },
    { id: 'medium', name: 'Medium', description: 'Moderate challenge' },
    { id: 'hard', name: 'Hard', description: 'Expert level' },
    { id: 'any', name: 'Mixed', description: 'All difficulty levels' }
  ];
};
