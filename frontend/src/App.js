import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Summarizer from './pages/Summarizer';
import ImageCaptioner from './pages/ImageCaptioner';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarize" element={<Summarizer />} />
        <Route path="/caption" element={<ImageCaptioner />} />
      </Routes>
    </Router>
  );
}

export default App;
