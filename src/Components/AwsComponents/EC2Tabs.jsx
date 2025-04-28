import React, { useEffect, useState } from 'react';
import { fetchEC2Data } from '../../api/api.js';
import FilterableTable from '../FilterableTableComponent/FilterableTable.js';
import LoadingSpinner from '../Loading/Loading.js';
import '../../styles/EC2Tabs.css';

const EC2Table = ({ selectedRoleArn }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch EC2 instances
  useEffect(() => {
    const loadEC2 = async () => {
      if (!selectedRoleArn) return;
      setLoading(true);
      try {
        const res = await fetchEC2Data(selectedRoleArn);
        setData(res);
      } catch (err) {
        console.error('Error fetching EC2 instances:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadEC2();
  }, [selectedRoleArn]);

  const columns = [
    { key: 'resourceId', label: 'Resource ID', className: 'col-resource-id' },
    { key: 'resourceName', label: 'Resource Name', className: 'col-resource-name' },
    { key: 'region', label: 'Region', className: 'col-region' },
    { key: 'status', label: 'Status', className: 'col-status' },
  ];

  return (
  
    <div className="ec2-table-container">
      <h2>EC2 Instances</h2>
      <div className="table-wrapper">
        {loading ? (
          <LoadingSpinner />
        ) : data.length > 0 ? (
          <FilterableTable className="th-headings" columns={columns} data={data} />
        ) : (
          <p style={{ marginTop: '20px' }}>
            {selectedRoleArn ? 'No EC2 instances found.' : 'Please select a cloud account.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default EC2Table;
