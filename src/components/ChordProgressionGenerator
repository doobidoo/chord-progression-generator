import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Music, Shuffle } from 'lucide-react';
import Piano from './Piano';
import GuitarTabs from './GuitarTabs';
import ChordFunctionLegend, { chordFunctionColors } from './ChordFunctionLegend';

const ChordProgressionGenerator = () => {
  // State declarations
  const [selectedKey, setSelectedKey] = useState('C');
  const [complexity, setComplexity] = useState(3);
  const [useModulations, setUseModulations] = useState(false);
  const [useChromaticism, setUseChromaticism] = useState(false);
  const [progression, setProgression] = useState([]);
  const [displayDiagrams, setDisplayDiagrams] = useState({});

  // Constants
  const KEYS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];
  
  const CHORD_TYPES = {
    major: ['maj7', 'maj9', 'maj13', '6/9'],
    minor: ['m7', 'm9', 'm11', 'm13', 'm6'],
    dominant: ['7', '9', '13', '7b9', '7#9', '7b13', '7#11'],
    altered: ['7alt'],
    diminished: ['dim7', 'm7b5', 'ø7']
  };

  const SCALE_CHOICES = {
    'maj7': ['Ionian', 'Lydian'],
    'maj9': ['Ionian', 'Lydian'],
    'maj13': ['Lydian'],
    '6/9': ['Ionian', 'Pentatonic Major'],
    'm7': ['Dorian', 'Aeolian'],
    'm9': ['Dorian'],
    'm11': ['Dorian'],
    'm13': ['Dorian'],
    'm6': ['Dorian', 'Melodic Minor'],
    '7': ['Mixolydian', 'Lydian Dominant'],
    '9': ['Mixolydian'],
    '13': ['Mixolydian', 'Lydian Dominant'],
    '7b9': ['Half-Whole Diminished'],
    '7#9': ['Altered Scale'],
    '7b13': ['Altered Scale'],
    '7#11': ['Lydian Dominant'],
    '7alt': ['Altered Scale']
  };

  // Helper functions
  const transposeNote = (note, key) => {
    const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const noteIndex = chromaticScale.indexOf(note);
    const keyIndex = chromaticScale.indexOf(key);
    return chromaticScale[(noteIndex + keyIndex) % 12];
  };

  const generateVoicing = (root, chordType) => {
    const intervals = {
      'maj7': [0, 4, 7, 11],
      'maj9': [0, 4, 7, 11, 14],
      'maj13': [0, 4, 7, 11, 14, 21],
      '6/9': [0, 4, 7, 9, 14],
      'm7': [0, 3, 7, 10],
      'm9': [0, 3, 7, 10, 14],
      'm11': [0, 3, 7, 10, 14, 17],
      'm13': [0, 3, 7, 10, 14, 21],
      'm6': [0, 3, 7, 9],
      '7': [0, 4, 7, 10],
      '9': [0, 4, 7, 10, 14],
      '13': [0, 4, 7, 10, 14, 21],
      '7b9': [0, 4, 7, 10, 13],
      '7#9': [0, 4, 7, 10, 15],
      '7b13': [0, 4, 7, 10, 14, 20],
      '7#11': [0, 4, 7, 10, 14, 18],
      '7alt': [0, 4, 8, 10, 13, 20]
    };
    
    const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const rootIndex = chromaticScale.indexOf(root);
    return (intervals[chordType] || intervals['7']).map(interval => 
      chromaticScale[(rootIndex + interval) % 12]
    );
  };

  const toggleDiagram = (index, type) => {
    setDisplayDiagrams(prev => ({
      ...prev,
      [index]: { ...prev[index], [type]: !prev[index]?.[type] }
    }));
  };

  const generateProgression = () => {
    let base = [
      { degree: 'ii', type: 'minor' },
      { degree: 'V', type: 'dominant' },
      { degree: 'I', type: 'major' }
    ];

    if (useChromaticism) {
      const approaches = [
        { degree: 'bII', type: 'altered' },
        { degree: '#IV', type: 'altered' },
        { degree: 'bVI', type: 'altered' }
      ];
      base.splice(1, 0, approaches[Math.floor(Math.random() * approaches.length)]);
    }

    const newProgression = base.map((step, index) => {
      const root = transposeNote(
        step.degree === 'ii' ? 'D' : 
        step.degree === 'V' ? 'G' : 
        step.degree === 'bII' ? 'Db' :
        step.degree === '#IV' ? 'F#' :
        step.degree === 'bVI' ? 'Ab' : 'C', 
        selectedKey
      );

      const typeArray = CHORD_TYPES[step.type];
      const extension = typeArray[Math.min(
        Math.floor((complexity - 1) * (typeArray.length / 4)),
        typeArray.length - 1
      )];

      const voicing = generateVoicing(root, extension);
      const scales = SCALE_CHOICES[extension] || ['Mixolydian'];

      return {
        chord: `${root}${extension}`,
        function: step.degree,
        voicing: voicing,
        scales: scales,
        tension: index === base.length - 2 ? 'high' : 
                index === base.length - 1 ? 'resolution' : 'medium'
      };
    });

    if (useModulations && complexity > 3) {
      const modulationOptions = [
        { interval: 5, name: 'IV' },
        { interval: 7, name: 'V' },
        { interval: 3, name: 'bIII' }
      ];
      const modulation = modulationOptions[Math.floor(Math.random() * modulationOptions.length)];
      const modulationRoot = KEYS[(KEYS.indexOf(selectedKey) + modulation.interval) % 12];
      const extension = CHORD_TYPES.major[Math.floor(Math.random() * CHORD_TYPES.major.length)];
      
      newProgression.push({
        chord: `${modulationRoot}${extension}`,
        function: modulation.name,
        voicing: generateVoicing(modulationRoot, extension),
        scales: SCALE_CHOICES[extension] || ['Ionian'],
        tension: 'resolution'
      });
    }

    setProgression(newProgression);
    setDisplayDiagrams({});  // Reset diagrams when generating new progression
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-6 h-6" />
            Advanced Harmonic Progression Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <label className="w-32">Key:</label>
              <Select value={selectedKey} onValueChange={setSelectedKey}>
                <SelectTrigger className="w-40">
                  <SelectValue>{selectedKey}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {KEYS.map(key => (
                    <SelectItem key={key} value={key}>{key}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32">Complexity:</label>
              <div className="flex-1">
                <Slider
                  value={[complexity]}
                  onValueChange={([value]) => {
                    setComplexity(value);
                    if (progression.length > 0) generateProgression();
                  }}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>
              <span className="w-8 text-center">{complexity}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <label className="w-32">Modulations:</label>
                <Switch
                  checked={useModulations}
                  onCheckedChange={(checked) => {
                    setUseModulations(checked);
                    if (progression.length > 0) generateProgression();
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32">Chromaticism:</label>
                <Switch
                  checked={useChromaticism}
                  onCheckedChange={(checked) => {
                    setUseChromaticism(checked);
                    if (progression.length > 0) generateProgression();
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={generateProgression}
                className="flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Generate Progression
              </Button>
            </div>

            {progression.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {progression.map((chord, index) => (
                    <Card
                      key={index}
                      className={`${chordFunctionColors[chord.function]} transition-all`}
                    >
                      <CardHeader className="p-4">
                        <div className="text-xl font-bold">{chord.chord}</div>
                        <div className="text-sm text-gray-500">{chord.function}</div>
                        <div className="mt-2">
                          <div className="text-sm font-medium">Tension: {chord.tension}</div>
                          <div className="text-sm">Scales: {chord.scales.join(', ')}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Piano Voicing</h4>
                          <Piano notes={chord.voicing} octaves={2} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Guitar Fingering</h4>
                          <GuitarTabs notes={chord.voicing} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Add the chord function legend */}
                <ChordFunctionLegend />
                
                {/* Additional music theory information */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Progression Analysis</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      This progression follows a {progression.length}-chord structure with 
                      {useChromaticism ? ' chromatic approaches and ' : ' '}
                      {useModulations ? 'modulations.' : 'standard functional harmony.'}
                    </p>
                    <p className="text-sm">
                      Key characteristics:
                    </p>
                    <ul className="list-disc list-inside mt-1 text-sm">
                      <li>Starting key: {selectedKey}</li>
                      <li>Harmonic complexity: {complexity}/5</li>
                      <li>Voice leading: {complexity > 3 ? 'Advanced' : 'Standard'}</li>
                    </ul>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChordProgressionGenerator;