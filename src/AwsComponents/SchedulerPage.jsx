import React, { useState } from 'react';
import EC2Table from './EC2Tabs';
import RDSTable from './RDSTable';
import ASGTable from './ASGTable';
import '../styles/scheduler.css';

const SchedulerPage = () => {
  const [activeTab, setActiveTab] = useState('EC2');

  return (
    <div className='scheduler-main'>
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

      {activeTab === 'EC2' && <EC2Table />}
      {activeTab === 'RDS' && <RDSTable />}
      {activeTab === 'ASG' && <ASGTable />}
    </div>
  );
};

export default SchedulerPage;
