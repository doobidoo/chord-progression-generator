import React from 'react';

const Piano = ({ notes = [], octaves = 2 }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['Db', 'Eb', null, 'Gb', 'Ab', 'Bb', null];
  
  // Convert notes to a consistent format
  const normalizedNotes = notes.map(note => 
    note.replace('♯', '#').replace('♭', 'b')
  );

  const renderOctave = (octaveIndex) => {
    return (
      <div key={octaveIndex} className="relative inline-flex h-32">
        {/* White keys */}
        <div className="flex">
          {whiteKeys.map((note, i) => {
            const isHighlighted = normalizedNotes.includes(note);
            return (
              <div
                key={`white-${i}`}
                className={`w-8 h-32 border border-gray-300 rounded-b ${
                  isHighlighted ? 'bg-blue-200' : 'bg-white'
                } relative`}
              />
            );
          })}
        </div>
        
        {/* Black keys */}
        <div className="absolute top-0 left-0 flex">
          {blackKeys.map((note, i) => {
            if (!note) return <div key={`space-${i}`} className="w-4" />;
            const isHighlighted = normalizedNotes.includes(note);
            const offset = i < 2 ? i * 8 + 6 : (i - 2) * 8 + 22;
            return (
              <div
                key={`black-${i}`}
                className={`w-6 h-20 absolute rounded-b ${
                  isHighlighted ? 'bg-blue-600' : 'bg-gray-800'
                }`}
                style={{ left: `${offset}px` }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="inline-flex border border-gray-300 rounded-lg p-1 bg-gray-50">
      {Array.from({ length: octaves }, (_, i) => renderOctave(i))}
    </div>
  );
};

export default Piano;