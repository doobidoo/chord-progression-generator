import React from 'react';
import { Card } from '@/components/ui/card';

// Color scheme for chord functions
export const chordFunctionColors = {
  'I': 'border-l-8 border-green-500',   // Tonic
  'ii': 'border-l-8 border-blue-500',   // Supertonic
  'iii': 'border-l-8 border-purple-500', // Mediant
  'IV': 'border-l-8 border-yellow-500',  // Subdominant
  'V': 'border-l-8 border-orange-500',   // Dominant
  'vi': 'border-l-8 border-red-500',     // Submediant
  'vii': 'border-l-8 border-pink-500',   // Leading tone
  'bII': 'border-l-8 border-indigo-500', // Neapolitan
  '#IV': 'border-l-8 border-cyan-500',   // Lydian
  'bVI': 'border-l-8 border-amber-500'   // Submediant flat
};

const ChordFunctionLegend = () => {
  const legendItems = {
    'I': 'Tonic - Home chord, point of rest',
    'ii': 'Supertonic - Sets up dominant',
    'V': 'Dominant - Creates tension',
    'bII': 'Neapolitan - Chromatic approach',
    '#IV': 'Lydian - Chromatic approach',
    'bVI': 'Submediant flat - Modal interchange'
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Chord Function Legend</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(legendItems).map(([function_, description]) => (
          <div key={function_} className={`${chordFunctionColors[function_]} pl-2 p-2 rounded bg-gray-50`}>
            <div className="font-medium">{function_}</div>
            <div className="text-sm text-gray-600">{description}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChordFunctionLegend;