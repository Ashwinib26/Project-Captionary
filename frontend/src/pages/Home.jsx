import React from 'react';
import { Link } from 'react-router-dom';
import 'D:/projects/ML/Project-Captionary/frontend/src/App.css'; // make sure this file exists

const Home = () => {
  return (
    <div className="home-container">
      <p className="home-subtitle">AI-Powered Tools for Image Captioning and Text Summarization</p>
      
      <div className="card-container">
        <div className="tool-card">
          <img src="https://img.freepik.com/free-photo/artificial-intelligence-visual-technology-concept_53876-124663.jpg" alt="Text Summary" className="card-image" />
          <h2>Text Summary Generator</h2>
          <p>Simplify long content with extractive and abstractive summaries.</p>
          <Link to="/summarize" className="card-button">Try Now</Link>
        </div>

        <div className="tool-card">
          <img src="https://img.freepik.com/free-vector/deep-learning-concept-illustration_114360-7294.jpg" alt="Image Caption" className="card-image" />
          <h2>Image Caption Generator</h2>
          <p>Generate human-like descriptions for your images using AI.</p>
          <Link to="/caption" className="card-button">Try Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
