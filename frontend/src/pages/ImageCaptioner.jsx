import React, { useState } from 'react';
import axios from 'axios';
import 'D:/projects/ML/Project-Captionary/frontend/src/App.css';

const ImageCaptioner = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/caption', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCaption(response.data.caption);
    } catch (error) {
      console.error('Error generating caption:', error);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title">🖼️ Image Caption Generator</h2>
      <form onSubmit={handleSubmit} className="tool-card">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="card-button"
        />
        <button type="submit" className="card-button">Generate Caption</button>
      </form>

      {caption && (
        <div className="tool-card" style={{ marginTop: '20px' }}>
          <h3>Generated Caption:</h3>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCaptioner;
