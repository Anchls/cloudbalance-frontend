import React, { useEffect, useState } from 'react';
import { fetchASGData } from '../api/api';
import '../styles/ASGTable.css';

const ASGTable = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    resourceId: '',
    resourceName: '',
    region: '',
    desiredCapacity: '',
    minSize: '',
    maxSize: '',
    status: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchASGData();
      setData(res);
    };
    loadData();
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredData = data.filter((row) => {
    return Object.entries(filters).every(([key, value]) =>
      row[key]?.toString().toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className="asg-table-container">
      <h2>ASG</h2>
      <table className="asg-table">
        <thead>
          <tr>
            {['Resource ID', 'Resource Name', 'Region', 'Desired Capacity', 'Min Size', 'Max Size', 'Status'].map((label, idx) => (
              <th key={idx}>
                <input
                  placeholder={label}
                  onChange={(e) =>
                    handleFilterChange(e, Object.keys(filters)[idx])
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.resourceId}</td>
              <td>{item.resourceName}</td>
              <td>{item.region}</td>
              <td>{item.desiredCapacity}</td>
              <td>{item.minSize}</td>
              <td>{item.maxSize}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ASGTable;
