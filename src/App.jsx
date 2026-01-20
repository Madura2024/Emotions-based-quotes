import { useState } from 'react'
import './App.css'
import { quotes } from './data/quotes'

function App() {
  const [currentMood, setCurrentMood] = useState(null)
  const [currentQuote, setCurrentQuote] = useState(null)
  const [fadeKey, setFadeKey] = useState(0) // Logic to trigger fade animation on new quote

  const handleMoodSelect = (mood) => {
    const moodQuotes = quotes[mood]
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
    setCurrentMood(mood)
    setCurrentQuote(randomQuote)
    setFadeKey(prev => prev + 1)
  }

  const handleNewQuote = () => {
    if (!currentMood) return
    const moodQuotes = quotes[currentMood]
    let randomQuote
    // Simple retry to try and get a different quote, though not guaranteed unique every time if pool is small
    do {
      randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
    } while (randomQuote.text === currentQuote.text && moodQuotes.length > 1)

    setCurrentQuote(randomQuote)
    setFadeKey(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentMood(null)
    setCurrentQuote(null)
  }

  return (
    <div className="app-container">
      <div className="glass-card">
        {!currentMood ? (
          <div className="mood-selection">
            <h1 className="title">How are you feeling properly?</h1>
            <p className="subtitle">Select your vibe to get the student wisdom you need.</p>

            <div className="button-grid">
              <button
                className="mood-btn stress"
                onClick={() => handleMoodSelect('stress')}
              >
                🤯 Stressed
              </button>
              <button
                className="mood-btn failure"
                onClick={() => handleMoodSelect('failure')}
              >
                📉 Setback
              </button>
              <button
                className="mood-btn motivation"
                onClick={() => handleMoodSelect('motivation')}
              >
                🔥 Motivated
              </button>
            </div>
          </div>
        ) : (
          <div className="quote-display" key={fadeKey}>
            <div className="quote-content">
              <span className="quote-icon">“</span>
              <p className="quote-text">{currentQuote.text}</p>
              <span className="quote-icon right">”</span>
            </div>
            <p className="quote-author">— {currentQuote.author}</p>

            <div className="action-buttons">
              <button className="action-btn secondary" onClick={handleBack}>
                Change Vibe
              </button>
              <button className="action-btn primary" onClick={handleNewQuote}>
                Another One
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        Student Survival Kit v1.0
      </footer>
    </div>
  )
}

export default App
