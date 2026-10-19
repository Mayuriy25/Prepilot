
import { useState } from 'react';
import './App.css';
import CustomCursor from './CustomCursor';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('auth');
  const [selectedPath, setSelectedPath] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setCurrentPage('career');
  }

  function handleCareerSelect(path) {
    setSelectedPath(path);
  }

  return (
    <main className="auth-page">
      <CustomCursor />

      <nav className="navbar">
        <h2>PrePilot</h2>
        <span>Your next interview starts here.</span>
      </nav>

      {currentPage === 'auth' && (
        <section className="auth-card">
          <p className="eyebrow">
            YOUR CAREER JOURNEY STARTS HERE
          </p>

          <h1>{isLogin ? 'Welcome back!' : 'Create your account'}</h1>

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
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </section>
      )}

      {currentPage === 'career' && (
        <section className="career-section">
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h1>Ready to land your next role?</h1>
          <p className="description">
            Your career. Your preparation. Your pace.
          </p>

          <h2>What are you preparing for?</h2>

          <div className="career-grid">
            <button
              className="career-card"
              onClick={() => handleCareerSelect('Fresher')}
            >
              <span>🎓</span>
              <h3>Fresher</h3>
              <p>Start your career</p>
            </button>

            <button
              className="career-card"
              onClick={() => handleCareerSelect('Experienced')}
            >
              <span>💼</span>
              <h3>Experienced</h3>
              <p>Switch or grow</p>
            </button>

            <button
              className="career-card"
              onClick={() => handleCareerSelect('Tech Roles')}
            >
              <span>💻</span>
              <h3>Tech Roles</h3>
              <p>Coding and technical interviews</p>
            </button>

            <button
              className="career-card"
              onClick={() => handleCareerSelect('Non-Tech Roles')}
            >
              <span>📊</span>
              <h3>Non-Tech Roles</h3>
              <p>Business and other careers</p>
            </button>
          </div>

          {selectedPath && (
            <p className="selected-topic">
              You selected: {selectedPath}
            </p>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
