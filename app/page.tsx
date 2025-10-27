'use client'

import { useState } from 'react'
import styles from './page.module.css'

const contentTypes = [
  'Instagram Caption',
  'Tweet/Thread',
  'TikTok Script',
  'YouTube Short Idea',
  'Quote',
  'Roast',
  'Motivational Post',
  'Comeback'
]

const baddiePersonas = [
  { name: 'Sassy Queen', emoji: '👑', vibe: 'sassy and confident' },
  { name: 'Savage Boss', emoji: '💅', vibe: 'savage and bold' },
  { name: 'Classy Icon', emoji: '💎', vibe: 'elegant yet fierce' },
  { name: 'Spicy Fire', emoji: '🔥', vibe: 'spicy and unapologetic' },
  { name: 'Witty Genius', emoji: '🧠', vibe: 'clever and sharp-tongued' },
]

export default function Home() {
  const [contentType, setContentType] = useState(contentTypes[0])
  const [persona, setPersona] = useState(baddiePersonas[0])
  const [topic, setTopic] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic!')
      return
    }

    setLoading(true)
    setGeneratedContent('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          persona: persona.name,
          vibe: persona.vibe,
          topic,
        }),
      })

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      setGeneratedContent('Oops, something went wrong. Try again, babe!')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    alert('Copied to clipboard!')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          <span className={styles.sparkle}>✨</span> AI Baddie Content Creator{' '}
          <span className={styles.sparkle}>✨</span>
        </h1>
        <p className={styles.subtitle}>
          Generate sassy, bold, and iconic content that slays
        </p>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Content Type</label>
            <select
              className={styles.select}
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Baddie Persona</label>
            <div className={styles.personaGrid}>
              {baddiePersonas.map((p) => (
                <button
                  key={p.name}
                  className={`${styles.personaBtn} ${
                    persona.name === p.name ? styles.personaActive : ''
                  }`}
                  onClick={() => setPersona(p)}
                >
                  <span className={styles.personaEmoji}>{p.emoji}</span>
                  <span className={styles.personaName}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Topic or Theme</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g., Monday motivation, dealing with haters, self-love..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateContent()}
            />
          </div>

          <button
            className={styles.generateBtn}
            onClick={generateContent}
            disabled={loading}
          >
            {loading ? 'Creating magic...' : '💫 Generate Content'}
          </button>
        </div>

        {generatedContent && (
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>Your Content {persona.emoji}</h3>
              <button className={styles.copyBtn} onClick={copyToClipboard}>
                📋 Copy
              </button>
            </div>
            <div className={styles.resultContent}>{generatedContent}</div>
          </div>
        )}
      </div>
    </div>
  )
}
