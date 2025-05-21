import React, { useState } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [abstractSummary, setAbstractSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/summarize', {
        input_text: text,
      });
      setSummary(response.data.summary);
      setAbstractSummary(response.data.abstract_summary);
    } catch (error) {
      console.error('Error summarizing:', error);
    }
  };

  return (
    <div>
      <h2>Text Summarizer</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="8"
          cols="60"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>
        <br />
        <button type="submit">Generate Summary</button>
      </form>

      {summary && (
        <div>
          <h3>Extractive Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
      {abstractSummary && (
        <div>
          <h3>Abstractive Summary:</h3>
          <p>{abstractSummary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
