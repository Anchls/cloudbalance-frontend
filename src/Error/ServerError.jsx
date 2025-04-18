import React from 'react';
import './ErrorPages.css';

const ServerError = () => {
  return (
    <div className="error-container">
      <h1>500</h1>
      <p>Oops! Something went wrong on our end.</p>
      <a href="/" className="back-link">Back to Home</a>
    </div>
  );
};

export default ServerError;
