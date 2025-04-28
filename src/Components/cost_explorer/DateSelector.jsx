import React from 'react';
import '../styles/DateSelector.css';

const months = ["Oct-2024", "Nov-2024", "Dec-2024", "Jan-2025", "Feb-2025", "Mar-2025"];

const DateSelector = ({ dateRange, setDateRange }) => {
  return (
    <div className="date-selector">
      <label>Start Date:</label>
      <select
        value={dateRange.startDate}
        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
      >
        <option value="">Select</option>
        {months.map((month, idx) => (
          <option key={idx} value={month}>{month}</option>
        ))}
      </select>

      <label>End Date:</label>
      <select
        value={dateRange.endDate}
        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
      >
        <option value="">Select</option>
        {months.map((month, idx) => (
          <option key={idx} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
