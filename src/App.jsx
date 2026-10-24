
import { useState } from 'react';
import './App.css';
import CustomCursor from './CustomCursor';

const courses = [
  {
    title: 'JavaScript Fundamentals',
    level: 'Beginner',
    description: 'Revise variables, functions, arrays, objects and ES6.',
  },
  {
    title: 'React Development',
    level: 'Beginner',
    description: 'Learn components, props, state, hooks and events.',
  },
  {
    title: 'Frontend Interview Preparation',
    level: 'Interview Prep',
    description: 'Practise HTML, CSS, JavaScript and React questions.',
  },
  {
    title: 'Coding Problem Solving',
    level: 'Practice',
    description: 'Improve your logic through common coding problems.',
  },
];

const questions = [
  {
    question: 'What is React?',
    answer:
      'React is a JavaScript library used to build user interfaces using reusable components.',
  },
  {
    question: 'What is the difference between props and state?',
    answer:
      'Props are passed from a parent component. State is managed by a component and can change over time.',
  },
  {
    question: 'What does useState do?',
    answer:
      'useState is a React Hook that lets a functional component store and update state.',
  },
  {
    question: 'Why do we use useEffect?',
    answer:
      'useEffect is used to synchronize a component with external systems, such as APIs, timers or subscriptions.',
  },
  {
    question: 'What is the Virtual DOM?',
    answer:
      'It is a lightweight representation of the UI that React uses when calculating updates to the rendered interface.',
  },
];

const mockQuestions = [
  'Tell me about yourself.',
  'Explain one project you have built.',
  'What is the difference between let, const and var?',
  'How does useState work in React?',
  'How would you debug an issue in your application?',
];

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('auth');
  const [selectedPath, setSelectedPath] = useState('');
  const [revealedQuestions, setRevealedQuestions] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [mockIndex, setMockIndex] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    setCurrentPage('career');
  }

  function handleCareerSelect(path) {
    setSelectedPath(path);
    setCurrentPage('dashboard');
  }

  function goToDashboard() {
    setCurrentPage('dashboard');
  }

  function toggleAnswer(index) {
    setRevealedQuestions((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  function toggleTask(task) {
    setCompletedTasks((previous) =>
      previous.includes(task)
        ? previous.filter((item) => item !== task)
        : [...previous, task]
    );
  }

  const progressTasks = [
    'Explore my courses',
    'Practise interview questions',
    'Complete a mock interview',
    'Revise my weak topics',
  ];

  const progressPercentage = Math.round(
    (completedTasks.length / progressTasks.length) * 100
  );

  return (
    <main className="auth-page">
      <CustomCursor />

      <nav className="navbar">
        <h2
          onClick={goToDashboard}
          style={{ cursor: 'pointer' }}
        >
          PrePilot
        </h2>
        <span>Your next interview starts here.</span>
      </nav>

      {/* LOGIN / SIGN-UP */}
      {currentPage === 'auth' && (
        <section className="auth-card">
          <p className="eyebrow">
            YOUR CAREER JOURNEY STARTS HERE
          </p>

          <h1>
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h1>

          <p className="description">
            {isLogin
              ? 'Sign in and continue your preparation.'
              : 'Take the first step towards your dream role.'}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <label>
                Full name
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </label>

            <button type="submit" className="primary-button">
              {isLogin ? 'Login' : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}

            <button
              type="button"
              className="text-button"
              onClick={() => setIsLogin((previous) => !previous)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>

          <p className="small-note">
            Demo only: this form does not verify or create accounts.
          </p>
        </section>
      )}

      {/* CAREER SELECTION */}
      {currentPage === 'career' && (
        <section className="career-section">
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h1>Ready to land your next role?</h1>
          <p className="description">
            Your career. Your preparation. Your pace.
          </p>

          <h2>What are you preparing for?</h2>

          <div className="career-grid">
            {[
              ['🎓', 'Fresher', 'Start your career'],
              ['💼', 'Experienced', 'Switch or grow'],
              ['💻', 'Tech Roles', 'Coding and technical interviews'],
              ['📊', 'Non-Tech Roles', 'Business and other careers'],
            ].map(([icon, title, description]) => (
              <button
                key={title}
                type="button"
                className="career-card"
                onClick={() => handleCareerSelect(title)}
              >
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="text-button"
            onClick={() => setCurrentPage('auth')}
          >
            ← Back to Login
          </button>
        </section>
      )}

      {/* DASHBOARD */}
      {currentPage === 'dashboard' && (
        <section className="dashboard">
          <p className="eyebrow">YOUR LEARNING SPACE</p>
          <h1>Welcome to PrePilot! ✨</h1>

          <p className="description">
            Your career path: {selectedPath}
          </p>

          <h2>Your dashboard</h2>

          <div className="career-grid">
            {[
              ['📚', 'My Courses', 'Explore learning resources.', 'courses'],
              ['🎯', 'Interview Practice', 'Revise common questions.', 'practice'],
              ['🎤', 'Mock Interviews', 'Practise answering aloud.', 'mock'],
              ['📈', 'My Progress', 'Track your practice checklist.', 'progress'],
            ].map(([icon, title, description, page]) => (
              <button
                key={page}
                type="button"
                className="career-card"
                onClick={() => setCurrentPage(page)}
              >
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="text-button"
            onClick={() => setCurrentPage('career')}
          >
            ← Change career path
          </button>
        </section>
      )}

      {/* COURSES */}
      {currentPage === 'courses' && (
        <section className="courses-section">
          <p className="eyebrow">LEARN AND GROW</p>
          <h1>My Courses 📚</h1>
          <p className="description">
            Build your skills, one lesson at a time.
          </p>

          <div className="career-grid">
            {courses.map((course) => (
              <article className="career-card" key={course.title}>
                <p className="eyebrow">{course.level}</p>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="text-button"
            onClick={goToDashboard}
          >
            ← Back to Dashboard
          </button>
        </section>
      )}

      {/* INTERVIEW PRACTICE */}
      {currentPage === 'practice' && (
        <section className="courses-section">
          <p className="eyebrow">PREPARE WITH CONFIDENCE</p>
          <h1>Interview Practice 🎯</h1>
          <p className="description">
            Try answering each question before revealing the sample answer.
          </p>

          {questions.map((item, index) => (
            <article className="career-card" key={item.question}>
              <h3>
                {index + 1}. {item.question}
              </h3>

              <button
                type="button"
                className="primary-button"
                onClick={() => toggleAnswer(index)}
              >
                {revealedQuestions.includes(index)
                  ? 'Hide sample answer'
                  : 'Reveal sample answer'}
              </button>

              {revealedQuestions.includes(index) && (
                <p>{item.answer}</p>
              )}
            </article>
          ))}

          <button
            type="button"
            className="text-button"
            onClick={goToDashboard}
          >
            ← Back to Dashboard
          </button>
        </section>
      )}

      {/* MOCK INTERVIEWS */}
      {currentPage === 'mock' && (
        <section className="courses-section">
          <p className="eyebrow">PRACTISE YOUR ANSWERS</p>
          <h1>Mock Interviews 🎤</h1>
          <p className="description">
            Answer each prompt aloud as if you were speaking to an interviewer.
          </p>

          <article className="career-card">
            <p>
              Question {mockIndex + 1} of {mockQuestions.length}
            </p>

            <h2>{mockQuestions[mockIndex]}</h2>

            <p>
              Tip: Explain your answer clearly and include a real example
              when appropriate.
            </p>

            <div className="mock-actions">
              <button
                type="button"
                className="text-button"
                disabled={mockIndex === 0}
                onClick={() => setMockIndex((index) => index - 1)}
              >
                Previous
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  setMockIndex((index) =>
                    index === mockQuestions.length - 1 ? 0 : index + 1
                  )
                }
              >
                {mockIndex === mockQuestions.length - 1
                  ? 'Start Again'
                  : 'Next Question'}
              </button>
            </div>
          </article>

          <p className="small-note">
            This is a self-practice demo. It does not record or evaluate
            your answers.
          </p>

          <button
            type="button"
            className="text-button"
            onClick={goToDashboard}
          >
            ← Back to Dashboard
          </button>
        </section>
      )}

      {/* PROGRESS */}
      {currentPage === 'progress' && (
        <section className="courses-section">
          <p className="eyebrow">SMALL STEPS, BIG PROGRESS</p>
          <h1>My Progress 📈</h1>

          <p className="description">
            Mark the activities you have completed.
          </p>

          <h2>{progressPercentage}% completed</h2>

          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning checklist completion"
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {progressTasks.map((task) => (
            <label className="progress-task" key={task}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task)}
                onChange={() => toggleTask(task)}
              />
              {task}
            </label>
          ))}

          <p className="small-note">
            Progress is stored in React state only and resets when the page
            is refreshed.
          </p>

          <button
            type="button"
            className="text-button"
            onClick={goToDashboard}
          >
            ← Back to Dashboard
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
