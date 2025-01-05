import React from 'react';
import ChordProgressionGenerator from './components/ChordProgressionGenerator';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <ChordProgressionGenerator />
      </div>
    </div>
  );
};

export default App;