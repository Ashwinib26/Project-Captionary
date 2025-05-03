import React, { useState } from 'react';
import axios from 'axios';

const ImageCaptioner = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/caption', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCaption(response.data.caption);
    } catch (error) {
      console.error('Error generating caption:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Image Caption Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        <br /><br />
        <button type="submit">Generate Caption</button>
      </form>
      {caption && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Generated Caption:</h3>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCaptioner;
