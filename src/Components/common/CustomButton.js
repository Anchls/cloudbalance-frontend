import React from 'react';
import '../../styles/button.css'; 

const CustomButton = ({ type = "button", onClick, children, className }) => {
  return (
    <button type={type} onClick={onClick} className={`custom-button ${className}`}>
      {children}
    </button>
  );
};

export default CustomButton;
