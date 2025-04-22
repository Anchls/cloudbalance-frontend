import React, { useEffect, useState } from 'react';
import { fetchEC2Data } from '../api/api';
import '../styles/EC2Tabs.css'

const EC2Table = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    resourceId: '',
    resourceName: '',
    region: '',
    status: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchEC2Data();
      setData(res);
    };
    loadData();
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, value]) =>
      row[key]?.toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <div className="ec2-table-container">
      <h2>EC2</h2>
      <table className="ec2-table">
        <thead>
          <tr>
            {['Resource ID', 'Resource Name', 'Region', 'Status'].map((label, idx) => (
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
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EC2Table;
