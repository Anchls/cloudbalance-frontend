import React from 'react';

const toastStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '12px 16px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    color: '#333',
    minWidth: '300px',
  },
  bar: {
    width: '6px',
    height: '100%',
    borderRadius: '6px',
    marginRight: '12px',
  },
  icon: {
    fontSize: '24px',
    marginRight: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '4px',
    fontSize: '16px',
  },
  message: {
    fontSize: '14px',
  }
};

const Toast = ({ type, title, message }) => {
  let color, icon;
  if (type === 'success') {
    color = '#4caf50';
    icon = '✅';
  } else if (type === 'error') {
    color = '#f44336';
    icon = '❌';
  } else {
    color = '#2196f3';
    icon = 'ℹ️';
  }

  return (
    <div style={toastStyles.container}>
      <div style={{ ...toastStyles.bar, backgroundColor: color }}></div>
      <div style={toastStyles.icon}>{icon}</div>
      <div style={toastStyles.content}>
        <div style={toastStyles.title}>{title}</div>
        <div style={toastStyles.message}>{message}</div>
      </div>
    </div>
  );
};

export default Toast;
