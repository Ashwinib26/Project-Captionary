import React, { useState } from 'react';
import axios from 'axios';
import 'D:/projects/ML/Project-Captionary/frontend/src/App.css';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [abstractSummary, setAbstractSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/summarize', { text });
      setSummary(response.data.extractive_summary);
      setAbstractSummary(response.data.abstractive_summary);
    } catch (error) {
      console.error('Error summarizing:', error);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title">📝 Text Summarizer</h2>
      <form onSubmit={handleSubmit} className="tool-card">
        <textarea
          rows="8"
          cols="60"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginBottom: '15px',
          }}
        ></textarea>
        <button type="submit" className="card-button">Generate Summary</button>
      </form>

      {(summary || abstractSummary) && (
        <div className="tool-card" style={{ marginTop: '20px' }}>
          {summary && (
            <>
              <h3>Extractive Summary:</h3>
              <p>{summary}</p>
            </>
          )}
          {abstractSummary && (
            <>
              <h3>Abstractive Summary:</h3>
              <p>{abstractSummary}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Summarizer;
