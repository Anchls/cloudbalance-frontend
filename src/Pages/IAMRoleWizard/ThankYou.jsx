import React from 'react';
import tick from '../../assets/tick.svg';
import { useNavigate } from 'react-router-dom';
import '../../styles/ThankYouPage.css';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/onboarding');
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-box">
        <img src={tick} alt='green tick'/>
        <h1>Thank You!</h1>
        <p>
          <strong>Please check your email</strong> for further instructions on how to complete your account setup.
        </p>
        <hr />
        <p className="trouble-text">
          Having trouble? <a href="/contact">Contact us</a>
        </p>
        <button onClick={handleContinue} className="continue-btn">
          Continue to homepage
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
