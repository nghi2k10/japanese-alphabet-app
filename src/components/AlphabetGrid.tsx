import React, { useState } from 'react';
import { AlphabetCharacter } from '../types/types';
import '../styles/AlphabetGrid.css'; // Nhớ import CSS riêng cho modal

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
  const [selectedChar, setSelectedChar] = useState<AlphabetCharacter | null>(null);

  const playAudio = (audioSrc: string) => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  const groupedCharacters = groupByRow
    ? characters.reduce((groups, char) => {
        const row = char.row;
        if (!groups[row]) groups[row] = [];
        groups[row].push(char);
        return groups;
      }, {} as Record<string, AlphabetCharacter[]>)
    : { all: characters };

  return (
    <div className="alphabet-section">
      <h3 className="section-title">{title}</h3>

      {Object.entries(groupedCharacters).map(([row, rowCharacters]) => (
        <div key={row} className="character-group">
          <div className="character-row">
            {rowCharacters.map((char) => (
              <div
                key={char.id}
                className="character-card"
                onClick={() => setSelectedChar(char)}
              >
                <div className="character">{char.character}</div>
                <div className="romaji">{char.romaji}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal hiển thị khi click chữ */}
      {selectedChar && (
        <div className="kana-modal" onClick={() => setSelectedChar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="kana-big">{selectedChar.character}</div>
            <div className="kana-romaji">{selectedChar.romaji}</div>
            <button
              className="sound-btn"
              onClick={() => playAudio(selectedChar.audio)}
            >
              🔊 Phát âm
            </button>
            <button className="close-btn" onClick={() => setSelectedChar(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetGrid;
