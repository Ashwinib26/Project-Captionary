import React, { useState } from 'react';
import axios from 'axios';
import 'D:/projects/ML/Project-Captionary/frontend/src/App.css';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [abstractSummary, setAbstractSummary] = useState('');
  const [summaryType, setSummaryType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/summarize', {
        text,
        summary_type: summaryType,
      });

      // Reset both summaries first
      setSummary('');
      setAbstractSummary('');

      if (summaryType === 'extractive') {
        setSummary(response.data.extractive_summary);
      } else if (summaryType === 'abstractive') {
        setAbstractSummary(response.data.abstractive_summary);
      } else {
        setSummary(response.data.extractive_summary);
        setAbstractSummary(response.data.abstractive_summary);
      }
    } catch (error) {
      console.error('Error summarizing:', error);
    }
  };

  return (
    <div className="page-container center-container" style={{ flexDirection: 'column' }}>
      <h2 className="page-title">📝 Text Summarizer</h2>

      <form onSubmit={handleSubmit} className="input-form tool-card" style={{ maxWidth: '700px', width: '100%' }}>
        <textarea
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="text-input"
          required
        />

        <select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className="text-input2"
        >
          <option value="" disabled hidden>Select Summary Type</option>
          <option value="both">Both Summaries</option>
          <option value="extractive">Extractive Summary Only</option>
          <option value="abstractive">Abstractive Summary Only</option>
        </select>

        <button type="submit" className="primary-button">Generate Summary</button>
      </form>

      {(summary || abstractSummary) && (
        <div className="tool-card" style={{ maxWidth: '700px', width: '100%', marginTop: '30px' }}>
          {summary && (
            <>
              <h3 className="section-title">Extractive Summary:</h3>
              <p className="output-text">{summary}</p>
            </>
          )}
          {abstractSummary && (
            <>
              <h3 className="section-title">Abstractive Summary:</h3>
              <p className="output-text">{abstractSummary}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Summarizer;
