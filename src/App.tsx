import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LearnPage from './pages/LearnPage';
import QuizPage from './pages/QuizPage';
import { AppMode, KanaData} from './types/types';
import './App.css';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('learn');
  const [hiragana, setHiragana] = useState<KanaData>({
    basic: [],
    dakuten: [],
    youon: []
  });
  const [katakana, setKatakana] = useState<KanaData>({
    basic: [],
    dakuten: [],
    youon: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Lấy dữ liệu từ file JSON
        const response = await fetch('/data/japanese-alphabet.json');
        
        // Kiểm tra nếu response không thành công
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate cấu trúc dữ liệu
        if (!data.hiragana || !data.katakana) {
          throw new Error('Invalid data structure in JSON file');
        }

        // Set dữ liệu với giá trị mặc định nếu không có
        setHiragana({
          basic: data.hiragana.basic || [],
          dakuten: data.hiragana.dakuten || [],
          youon: data.hiragana.youon || []
        });

        setKatakana({
          basic: data.katakana.basic || [],
          dakuten: data.katakana.dakuten || [],
          youon: data.katakana.youon || []
        });
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Japanese alphabet data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar mode={mode} setMode={setMode} />
      
      <main className="main-content">
        {mode === 'learn' ? (
          <LearnPage hiragana={hiragana} katakana={katakana} />
        ) : (
          <QuizPage hiragana={hiragana} katakana={katakana} />
        )}
      </main>
    </div>
  );
};

export default App;