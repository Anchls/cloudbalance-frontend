import React, { useState, useEffect } from 'react';
import EC2Table from './EC2Tabs';
import RDSTable from './RDSTable';
import ASGTable from './ASGTable';
import AccountDropdown from '../DropdownComponent/Dropdown.js'; 
import { fetchCloudAccounts } from '../../api/api.js'; 
import '../../styles/scheduler.css';

const SchedulerPage = () => {
  const [activeTab, setActiveTab] = useState('EC2');
  const [selectedRoleArn, setSelectedRoleArn] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const res = await fetchCloudAccounts(); 
        setAccounts(res);
      } catch (err) {
        console.error('Error fetching accounts:', err);
      }
    };
    loadAccounts();
  }, []);

// SchedulerPage.js (only JSX layout part is changed)

return (
  <div className="scheduler-main">
    <h1>AWS Services</h1>
    {/* New container for dropdown and tabs */}
    <div className="top-controls">
     

      <div className="tabs-container">
        {['EC2', 'RDS', 'ASG'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <AccountDropdown 
        accounts={accounts}
        selectedRoleArn={selectedRoleArn}
        setSelectedRoleArn={setSelectedRoleArn}
      />
    </div>

    {/* Render the selected tab content */}
    {activeTab === 'EC2' && <EC2Table selectedRoleArn={selectedRoleArn} />}
    {activeTab === 'RDS' && <RDSTable selectedRoleArn={selectedRoleArn} />}
    {activeTab === 'ASG' && <ASGTable selectedRoleArn={selectedRoleArn} />}
  </div>
);

};

export default SchedulerPage;
