import React, { useEffect, useState } from 'react';
import { fetchASGData } from '../../api/api.js';
import FilterableTable from '../FilterableTableComponent/FilterableTable.js';
import LoadingSpinner from '../Loading/Loading.js';
import '../../styles/EC2Tabs.css';

const ASGTable = ({ selectedRoleArn }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadASG = async () => {
      if (!selectedRoleArn) return;
      setLoading(true);
      try {
        const res = await fetchASGData(selectedRoleArn);
        setData(res);
      } catch (err) {
        console.error('Error fetching ASG instances:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadASG();
  }, [selectedRoleArn]);

  const columns = [
    { key: 'resourceId', label: 'Resource ID' },
    { key: 'resourceName', label: 'Resource Name' },
    { key: 'region', label: 'Region' },
    { key: 'desiredCapacity', label: 'Desired Capacity' },
    { key: 'minSize', label: 'Min Size' },
    { key: 'maxSize', label: 'Max Size' },
    { key: 'status', label: 'Status' },
  ];
  

  return (
    <div className="ec2-table-container">
      <h2>ASG Instances</h2>
      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner />
        ) : data.length > 0 ? (
          <FilterableTable columns={columns} data={data} />
        ) : (
          <p style={{ marginTop: '20px' }}>
            {selectedRoleArn ? 'No ASG instances found.' : 'Please select a cloud account.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ASGTable;
