import React from 'react';

const GuitarTabs = ({ notes = [] }) => {
  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const frets = Array.from({ length: 5 }, (_, i) => i); // Show first 5 frets
  
  // Function to find optimal fret positions for notes in a chord
  const findChordPositions = (notes) => {
    const positions = [];
    const normalizedNotes = notes.map(note => 
      note.replace('♯', '#').replace('♭', 'b')
    );
    
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Convert flat notation to sharp notation
    const toSharp = (note) => {
      const flatToSharp = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
      };
      return flatToSharp[note] || note;
    };
    
    strings.forEach((string, stringIndex) => {
      const stringStart = chromaticScale.indexOf(toSharp(string));
      normalizedNotes.forEach(note => {
        const noteIndex = chromaticScale.indexOf(toSharp(note));
        if (noteIndex !== -1) {
          let fret = (noteIndex - stringStart + 12) % 12;
          if (fret <= 4) { // Only show positions within first 5 frets
            positions.push({ string: stringIndex, fret });
          }
        }
      });
    });
    
    return positions;
  };

  const positions = findChordPositions(notes);

  return (
    <div className="w-full max-w-md overflow-x-auto bg-white rounded-lg border border-gray-200 p-4">
      <div className="space-y-2">
        {strings.map((string, stringIndex) => (
          <div key={stringIndex} className="flex items-center">
            <div className="w-8 text-right pr-2 font-mono">{string}</div>
            <div className="flex-1 flex border-b border-gray-300">
              {frets.map((fret) => {
                const position = positions.find(
                  p => p.string === stringIndex && p.fret === fret
                );
                return (
                  <div
                    key={fret}
                    className="w-12 h-8 flex items-center justify-center border-l border-gray-300"
                  >
                    {position ? (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                        {fret}
                      </div>
                    ) : (
                      '—'
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {/* Fret numbers */}
        <div className="flex pl-8">
          {frets.map((fret) => (
            <div key={fret} className="w-12 text-center text-sm text-gray-500">
              {fret}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuitarTabs;