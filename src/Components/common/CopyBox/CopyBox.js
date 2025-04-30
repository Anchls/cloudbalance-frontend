// src/components/CopyBox.jsx
import React, { useState } from 'react';
import '../CopyBox/CopyBox.css';

const CopyBox = ({ text = "CK-Tuner-Role-dev2" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2 sec
  };

  return (
    <div className="copy-box-container" onClick={handleCopy}>
      <div className="copy-box">
        <div className="copy-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="white"
            viewBox="0 0 24 24"
          >
              <path d="M19 21H9c-1.1 0-2-.9-2-2V7h2v12h10v2zM16 1H5c-1.1 0-2 .9-2 2v14h2V3h11V1z" />
          </svg>
        </div>
        <span className="copy-text">{text}</span>
      </div>
      <small className="copy-instruction">
        {copied ? "Copied!" : "Click anywhere in box to copy the content inside."}
      </small>
    </div>
  );
};

export default CopyBox;