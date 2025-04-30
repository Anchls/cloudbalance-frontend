import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './Toast';

// Function to show toast
export const showToast = (title, message, type = 'success') => {
  toast(<Toast title={title} message={message} type={type} />, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    transition: Slide,
  });
};

// Toast Container Component
const CommonToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      limit={3}
      transition={Slide}
    />
  );
};

export default CommonToast;
