import React from 'react';

const ActionButton = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`action-button ${className || ''}`}>
    {children}
  </button>
);

export default ActionButton;
