import React from 'react';
import '../Loading/Loading.js';
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
