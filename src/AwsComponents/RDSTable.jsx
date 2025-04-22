import React, { useEffect, useState } from 'react';
import { fetchRDSData } from '../api/api';
import '../styles/RDSTable.css';


const RDSTable = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ resourceId: '', resourceName: '', engine: '', region: '', status: '' });

  useEffect(() => {
    const getData = async () => {
      const response = await fetchRDSData();
      setData(response);
    };
    getData();
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredData = data.filter((row) => {
    return Object.entries(filters).every(([key, value]) =>
      row[key].toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className="rds-table-container">
      <h2>RDS</h2>
      <table className="rds-table">
        <thead>
          <tr>
            <th>
              <input placeholder="Resource ID" onChange={(e) => handleFilterChange(e, 'resourceId')} />
            </th>
            <th>
              <input placeholder="Resource Name" onChange={(e) => handleFilterChange(e, 'resourceName')} />
            </th>
            <th>
              <input placeholder="Engine" onChange={(e) => handleFilterChange(e, 'engine')} />
            </th>
            <th>
              <input placeholder="Region" onChange={(e) => handleFilterChange(e, 'region')} />
            </th>
            <th>
              <input placeholder="Status" onChange={(e) => handleFilterChange(e, 'status')} />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.resourceId}</td>
              <td>{item.resourceName}</td>
              <td>{item.engine}</td>
              <td>{item.region}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RDSTable;
