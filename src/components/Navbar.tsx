import React from 'react';
import { AppMode } from '../types/types';

interface NavbarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ mode, setMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Japanese Alphabet</div>
      <div className="navbar-menu">
        <button 
          className={`navbar-item ${mode === 'learn' ? 'active' : ''}`}
          onClick={() => setMode('learn')}
        >
          Learn
        </button>
        <button 
          className={`navbar-item ${mode === 'quiz' ? 'active' : ''}`}
          onClick={() => setMode('quiz')}
        >
          Quiz
        </button>
      </div>
    </nav>
  );
};

export default Navbar;