import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Captionary</h1>
      <div>
        <Link to="/summarize">Go to Text Summarizer</Link>
        <br />
        <Link to="/caption">Go to Image Captioner</Link>
      </div>
    </div>
  );
};

export default Home;
