import React from 'react';
import '../Button/button.css'; 

const CustomButton = ({ type = "button", onClick, children, className, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${className}`}
      disabled={disabled} 
    >
      {children}
    </button>
  );
};

export default CustomButton;
