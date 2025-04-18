import React, { useRef, useState } from 'react';
import '../styles/PolicyBlock.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PolicyBlock = ({ stepNumber, instruction, policy }) => {
  const textareaRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(policy);
    toast.success("Copied!", {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: 'colored',
    });
  };

  const handleClick = () => {
    copyToClipboard();
  };

  return (
    <div className="policy-block">
     

      <div
        className="code-box"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      // >
      >
        {showTooltip && (
          <div className="tooltip">
            Click anywhere in box to copy the content inside.
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={policy}
          readOnly
          className="code-textarea"
        />
      </div>

      {/* Toast container */}
      <ToastContainer />
      
      
    </div>
  );
};

export default PolicyBlock;
