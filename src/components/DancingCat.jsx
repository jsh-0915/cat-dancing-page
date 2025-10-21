import { useState, useEffect } from 'react';
import catImage from '../assets/images/cat.svg';
import '../styles/animations.css';
import './DancingCat.css';

function DancingCat() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [speed, setSpeed] = useState('normal'); // slow, normal, fast
  const [danceMode, setDanceMode] = useState('bounce'); // bounce, spin, wiggle, float
  const [theme, setTheme] = useState(0); // 0-4 for different themes

  const themes = [
    { name: 'Purple Dream', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Sunset', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Ocean', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Forest', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'Fire', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
  ];

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const changeDanceMode = (mode) => {
    setDanceMode(mode);
  };

  const changeTheme = () => {
    setTheme((prev) => (prev + 1) % themes.length);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          toggleAnimation();
          break;
        case '1':
          changeSpeed('slow');
          break;
        case '2':
          changeSpeed('normal');
          break;
        case '3':
          changeSpeed('fast');
          break;
        case 'q':
          changeDanceMode('bounce');
          break;
        case 'w':
          changeDanceMode('spin');
          break;
        case 'e':
          changeDanceMode('wiggle');
          break;
        case 'r':
          changeDanceMode('float');
          break;
        case 't':
          changeTheme();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.style.background = themes[theme].gradient;
  }, [theme]);

  return (
    <div className="dancing-cat-container">
      <div
        className={`cat-wrapper ${isAnimating ? `dancing ${danceMode} ${speed}` : ''}`}
      >
        <img src={catImage} alt="Dancing Cat" className="cat-image" />
      </div>

      <button className="control-button main-toggle" onClick={toggleAnimation}>
        {isAnimating ? '⏸️ Pause (Space)' : '▶️ Dance (Space)'}
      </button>

      <div className="controls-panel">
        <div className="control-group">
          <label>Speed:</label>
          <div className="button-group">
            <button
              className={`control-btn ${speed === 'slow' ? 'active' : ''}`}
              onClick={() => changeSpeed('slow')}
            >
              🐌 Slow (1)
            </button>
            <button
              className={`control-btn ${speed === 'normal' ? 'active' : ''}`}
              onClick={() => changeSpeed('normal')}
            >
              🚶 Normal (2)
            </button>
            <button
              className={`control-btn ${speed === 'fast' ? 'active' : ''}`}
              onClick={() => changeSpeed('fast')}
            >
              🏃 Fast (3)
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Dance Mode:</label>
          <div className="button-group">
            <button
              className={`control-btn ${danceMode === 'bounce' ? 'active' : ''}`}
              onClick={() => changeDanceMode('bounce')}
            >
              ⬆️ Bounce (Q)
            </button>
            <button
              className={`control-btn ${danceMode === 'spin' ? 'active' : ''}`}
              onClick={() => changeDanceMode('spin')}
            >
              🔄 Spin (W)
            </button>
            <button
              className={`control-btn ${danceMode === 'wiggle' ? 'active' : ''}`}
              onClick={() => changeDanceMode('wiggle')}
            >
              🔀 Wiggle (E)
            </button>
            <button
              className={`control-btn ${danceMode === 'float' ? 'active' : ''}`}
              onClick={() => changeDanceMode('float')}
            >
              ☁️ Float (R)
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Theme: {themes[theme].name}</label>
          <button className="control-btn theme-btn" onClick={changeTheme}>
            🎨 Change Theme (T)
          </button>
        </div>
      </div>

      <div className="keyboard-hints">
        <p>⌨️ Keyboard Shortcuts: Space=Play/Pause | 1,2,3=Speed | Q,W,E,R=Mode | T=Theme</p>
      </div>
    </div>
  );
}

export default DancingCat;
