// src/components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setUploadStatus('Upload successful');
    } catch (error) {
      setUploadStatus('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default ImageUpload;
