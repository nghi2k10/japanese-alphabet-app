import React from 'react';
import { AlphabetCharacter } from '../types/types';

interface AlphabetGridProps {
  characters: AlphabetCharacter[];
  title: string;
  groupByRow?: boolean;
}

const AlphabetGrid: React.FC<AlphabetGridProps> = ({ 
  characters, 
  title, 
  groupByRow = true 
}) => {
  const playAudio = (audioSrc: string) => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  // Nhóm ký tự theo hàng nếu groupByRow = true
  const groupedCharacters = groupByRow
    ? characters.reduce((groups, char) => {
        const row = char.row;
        if (!groups[row]) {
          groups[row] = [];
        }
        groups[row].push(char);
        return groups;
      }, {} as Record<string, AlphabetCharacter[]>)
    : { 'all': characters };

  return (
    <div className="alphabet-section">
      <h3 className="section-title">{title}</h3>
      
      {Object.entries(groupedCharacters).map(([row, rowCharacters]) => (
        <div key={row} className="character-group">
          {/* {groupByRow && <h4 className="row-title">Hàng {row.toUpperCase()}</h4>} */}
          <div className="character-row">
            {rowCharacters.map((char) => (
              <div 
                key={char.id} 
                className="character-card"
                onClick={() => playAudio(char.audio)}
              >
                <div className="character">{char.character}</div>
                <div className="romaji">{char.romaji}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlphabetGrid;