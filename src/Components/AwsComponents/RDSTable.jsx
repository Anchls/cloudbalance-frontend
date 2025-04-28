import React, { useEffect, useState } from 'react';
import { fetchRDSData } from '../../api/api.js';
import FilterableTable from '../FilterableTableComponent/FilterableTable.js';
import LoadingSpinner from '../Loading/Loading.js';
import '../../styles/EC2Tabs.css';

const RDSTable = ({ selectedRoleArn }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRDS = async () => {
      if (!selectedRoleArn) return;
      setLoading(true);
      try {
        const res = await fetchRDSData(selectedRoleArn);
        setData(res);
      } catch (err) {
        console.error('Error fetching RDS instances:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadRDS();
  }, [selectedRoleArn]);

  const columns = [
    { key: 'resourceId', label: 'Resource ID' },
    { key: 'resourceName', label: 'Resource Name' },
    { key: 'region', label: 'Region' },
    { key: 'engine', label: 'Engine' },
  ];

  return (
    <div className="ec2-table-container">
      <h2>RDS Instances</h2>
      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner />
        ) : data.length > 0 ? (
          <FilterableTable columns={columns} data={data} />
        ) : (
          <p style={{ marginTop: '20px' }}>
            {selectedRoleArn ? 'No RDS instances found.' : 'Please select a cloud account.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default RDSTable;
