import React from 'react';
import '../styles/Chart.css';

const Chart = ({ costData }) => {
  if (!costData) return <div className="chart-placeholder">Loading Chart...</div>;

  return (
    <div className="chart">
      {/* Later you can replace with real chart like Recharts Bar Chart */}
      <pre>{JSON.stringify(costData, null, 2)}</pre>
    </div>
  );
};

export default Chart;
