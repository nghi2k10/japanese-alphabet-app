import React, { useState } from 'react';
import AlphabetGrid from '../components/AlphabetGrid';
import { KanaData } from '../types/types';

interface LearnPageProps {
  hiragana: KanaData;
  katakana: KanaData;
}

const LearnPage: React.FC<LearnPageProps> = ({ hiragana, katakana }) => {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const currentKana = activeTab === 'hiragana' ? hiragana : katakana;

  return (
    <div className="learn-page">
      <div className="kana-tabs">
        <button
          className={`kana-tab ${activeTab === 'hiragana' ? 'active' : ''}`}
          onClick={() => setActiveTab('hiragana')}
        >
          Hiragana
        </button>
        <button
          className={`kana-tab ${activeTab === 'katakana' ? 'active' : ''}`}
          onClick={() => setActiveTab('katakana')}
        >
          Katakana
        </button>
      </div>

      <div className="kana-container">
        <div className="basic-section">
          <AlphabetGrid 
            characters={currentKana.basic} 
            title="Basic" 
            groupByRow={true}
          />
        </div>

        <div className="dakuten-section">
            <AlphabetGrid 
              characters={currentKana.dakuten} 
              title="Dakuten" 
              groupByRow={true}
            />
          </div>

         <div className="youon-section">
            <AlphabetGrid 
              characters={currentKana.youon} 
              title="Youon" 
              groupByRow={true}
            />
          </div>
      </div>
    </div>
  );
};

export default LearnPage;