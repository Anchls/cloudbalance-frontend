import React from 'react';
import '../styles/GroupByDropdown.css';

const GroupByDropdown = ({ options, selected, onChange }) => {
  return (
    <div className="group-by-dropdown">
      <label>Group By:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default GroupByDropdown;
