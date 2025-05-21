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
      setCaption(''); // Reset caption on new image
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
      setCaption('Failed to generate caption. Please try again.');
    }
  };

  return (
    <div className="page-container center-container">
      <div>
        <h2 className="page-title">🖼️ Image Caption Generator</h2>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button type="submit" className="btn">Generate Caption</button>
        </form>

        {preview && (
          <div className="output">
            <h3>Uploaded Image:</h3>
            <img src={preview} alt="Uploaded Preview" className="preview-image" />
          </div>
        )}

        {caption && (
          <div className="output">
            <h3>Generated Caption:</h3>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCaptioner;
