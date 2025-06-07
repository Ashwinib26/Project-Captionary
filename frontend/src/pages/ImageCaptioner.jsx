import React, { useState } from 'react';
import axios from 'axios';
import 'D:/projects/ML/Project-Captionary/frontend/src/App.css';

const ImageCaptioner = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCaption('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/caption', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCaption(response.data.caption);
    } catch (error) {
      console.error('Error generating caption:', error);
      setCaption('❌ Failed to generate caption. Please try again.');
    }
  };

  return (
    <div className="caption-container">
      <h2 className="caption-title">🖼️ Image Caption Generator</h2>
      <form onSubmit={handleSubmit} className="caption-form">
        <label htmlFor="imageInput" className="file-label">Choose an Image</label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="file-input"
        />
        <button type="submit" className="btn-generate">Generate Caption</button>
      </form>

      {preview && (
        <div className="preview-section">
          <h3 className="section-title">📷 Preview:</h3>
          <img src={preview} alt="Uploaded Preview" className="preview-image" />
        </div>
      )}

      {caption && (
        <div className="caption-section">
          <h3 className="section-title">📝 Caption:</h3>
          <p className="caption-text">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCaptioner;
