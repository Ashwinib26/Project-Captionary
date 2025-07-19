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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="tool-card" style={{ maxWidth: '750px', width: '100%', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '12px', background: '#fff' }}>
        
        <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px' }}>
          📝 AI Text Summarizer
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <textarea
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="text-input"
            required
            style={{ resize: 'vertical', padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <select
            value={summaryType}
            onChange={(e) => setSummaryType(e.target.value)}
            className="text-input2"
            required
            style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
          >
            <option value="" disabled hidden>Select Summary Type</option>
            <option value="both">Both Summaries</option>
            <option value="extractive">Extractive Only</option>
            <option value="abstractive">Abstractive Only</option>
          </select>

          <button
            type="submit"
            className="primary-button"
            style={{ padding: '12px', fontSize: '16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Generate Summary
          </button>
        </form>

        {(summary || abstractSummary) && (
          <div style={{ marginTop: '30px' }}>
            {summary && (
              <div style={{ marginBottom: '24px' }}>
                <h3 className="section-title" style={{ fontSize: '20px', color: '#333' }}>🧠 Extractive Summary</h3>
                <p className="output-text" style={{ lineHeight: '1.6', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>{summary}</p>
              </div>
            )}
            {abstractSummary && (
              <div>
                <h3 className="section-title" style={{ fontSize: '20px', color: '#333' }}>🧬 Abstractive Summary</h3>
                <p className="output-text" style={{ lineHeight: '1.6', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>{abstractSummary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
