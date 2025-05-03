import React, { useState } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('extractive');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/summarize', { text, mode });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Text Summarizer</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="8"
          cols="60"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          required
        ></textarea>
        <br />
        <label>
          <input
            type="radio"
            name="mode"
            value="extractive"
            checked={mode === 'extractive'}
            onChange={() => setMode('extractive')}
          />
          Extractive
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="mode"
            value="abstractive"
            checked={mode === 'abstractive'}
            onChange={() => setMode('abstractive')}
          />
          Abstractive
        </label>
        <br /><br />
        <button type="submit">Generate Summary</button>
      </form>
      {summary && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
