# Chord Progression Generator

A React application that generates advanced harmonic chord progressions with interactive piano and guitar visualizations.

## Features

- Generate complex chord progressions
- Interactive piano visualization
- Interactive guitar fretboard visualization
- Adjustable complexity levels
- Support for modulations and chromaticism
- Scale suggestions for improvisation

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd chord-progression-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Project Structure

```
src/
  ├── components/
  │   ├── ui/          # shadcn/ui components
  │   ├── Piano.jsx    # Piano visualization
  │   ├── Guitar.jsx   # Guitar visualization
  │   └── ChordProgressionGenerator.jsx
  ├── lib/
  │   ├── utils.js     # Utility functions
  │   └── chordUtils.js # Music theory utilities
  ├── App.jsx
  ├── main.jsx
  └── index.css
```

## Technologies Used

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React Icons

## License

MIT