import React, { useState } from 'react';

const UploadModal = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Upload a new map</h3>
        <p>Supports jpg, and png</p>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleSubmit}>Upload</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadModal;
