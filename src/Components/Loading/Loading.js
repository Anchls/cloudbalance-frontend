import React from 'react';
import '../Loading/Loading.CSS';
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
