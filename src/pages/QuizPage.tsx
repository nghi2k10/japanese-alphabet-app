import React, { useEffect, useState } from 'react';
import { AlphabetCharacter, KanaData } from '../types/types';
import '../styles/QuizPage.css';

interface QuizPageProps {
  hiragana: KanaData;
  katakana: KanaData;
}

type ScriptType = 'hiragana' | 'katakana';
type Difficulty = 'all' | 'basic' | 'vowels' | 'k' | 's';

const QuizPage: React.FC<QuizPageProps> = ({ hiragana, katakana }) => {
  const [script, setScript] = useState<ScriptType>('hiragana');
  const [includeYouon, setIncludeYouon] = useState(true);
  const [includeDakuten, setIncludeDakuten] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('all');

  const [characters, setCharacters] = useState<AlphabetCharacter[]>([]);
  const [currentChar, setCurrentChar] = useState<AlphabetCharacter | null>(null);

  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const source = script === 'hiragana' ? hiragana : katakana;
    let combined: AlphabetCharacter[] = [];

    if (difficulty === 'vowels') {
      combined = source.basic.filter(k => ['a', 'i', 'u', 'e', 'o'].includes(k.romaji));
    } else if (difficulty === 'k') {
      combined = source.basic.filter(k => k.romaji.startsWith('k'));
    } else if (difficulty === 's') {
      combined = source.basic.filter(k => k.romaji.startsWith('s'));
    } else {
      combined = [...source.basic];
      if (includeDakuten) combined.push(...source.dakuten);
      if (includeYouon) combined.push(...source.youon);
    }

    setCharacters(combined);
  }, [script, includeDakuten, includeYouon, difficulty, hiragana, katakana]);

  useEffect(() => {
    if (characters.length > 0) {
      setCurrentChar(characters[Math.floor(Math.random() * characters.length)]);
      setUserAnswer('');
      setFeedback('');
      setShowNext(false);
    }
  }, [characters]);

  const checkAnswer = () => {
    if (!currentChar) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentChar.romaji.toLowerCase();

    if (isCorrect) {
      setFeedback('✅ Correct!');
      setCorrectCount(c => c + 1);
      setStreak(s => s + 1);
    } else {
      setFeedback(`❌ Wrong! Correct: ${currentChar.romaji}`);
      setWrongCount(w => w + 1);
      setStreak(0);
    }

    setShowNext(true);
  };

  const nextQuestion = () => {
    if (characters.length > 0) {
      const next = characters[Math.floor(Math.random() * characters.length)];
      setCurrentChar(next);
      setUserAnswer('');
      setFeedback('');
      setShowNext(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Kana Master</h1>
        <div className="controls">
          <div className="mode-selector">
            <button
              className={script === 'hiragana' ? 'active' : ''}
              onClick={() => setScript('hiragana')}
            >
              Hiragana
            </button>
            <button
              className={script === 'katakana' ? 'active' : ''}
              onClick={() => setScript('katakana')}
            >
              Katakana
            </button>
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={includeYouon}
                onChange={(e) => setIncludeYouon(e.target.checked)}
              />
              Include Youon (Âm ghép)
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeDakuten}
                onChange={(e) => setIncludeDakuten(e.target.checked)}
              />
              Include Dakuten (Âm đục)
            </label>
          </div>

          <div className="difficulty">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value="all">All Characters</option>
              <option value="basic">Basic Only</option>
              <option value="vowels">Vowels Only</option>
              <option value="k">K Row</option>
              <option value="s">S Row</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <div className="quiz-area">
          <div className="question-display">
            <span id="current-kana">{currentChar?.character}</span>
          </div>

          <div className="answer-section">
            <input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  showNext ? nextQuestion() : checkAnswer();
                }
              }}
              placeholder="Type romaji..."
              disabled={showNext}
            />
            {!showNext ? (
              <button id="check-btn" onClick={checkAnswer}>
                Check
              </button>
            ) : (
              <button onClick={nextQuestion}>Next</button>
            )}
          </div>

          <div className="feedback">{feedback}</div>
        </div>

        <div className="progress-container">
          <div className="stats">
            <div className="stat">
              <span className="stat-label">Correct:</span>
              <span id="correct-count" className="stat-value">{correctCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Wrong:</span>
              <span id="wrong-count" className="stat-value">{wrongCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Streak:</span>
              <span id="streak-count" className="stat-value">{streak}</span>
            </div>
          </div>

          <div className="progress-bar">
            <div
              id="progress-fill"
              className="progress-fill"
              style={{ width: `${Math.min(100, streak * 10)}%` }}
            />
          </div>
        </div>
      </main>

      <footer>
        <p>Practice makes perfect! Try to get a 10-correct streak!</p>
      </footer>
    </div>
  );

};

export default QuizPage;
