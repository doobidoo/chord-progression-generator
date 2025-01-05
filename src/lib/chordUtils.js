export const KEYS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];

export const CHORD_TYPES = {
  major: ['maj7', 'maj9', 'maj13', '6/9'],
  minor: ['m7', 'm9', 'm11', 'm13', 'm6'],
  dominant: ['7', '9', '13', '7b9', '7#9', '7b13', '7#11'],
  altered: ['7alt'],
  diminished: ['dim7', 'm7b5', 'ø7']
};

export const SCALE_CHOICES = {
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

export const transposeNote = (note, key) => {
  const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const noteIndex = chromaticScale.indexOf(note);
  const keyIndex = chromaticScale.indexOf(key);
  return chromaticScale[(noteIndex + keyIndex) % 12];
};

export const generateVoicing = (root, chordType) => {
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