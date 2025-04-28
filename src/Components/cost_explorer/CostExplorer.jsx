import React, { useEffect, useState } from 'react';
import GroupByDropdown from './GroupBy';
import DateSelector from './DateSelector';
import Chart from './Chart';
import Filters from './Filters';
import '../styles/CostExplorer.css';
import { getGroupByColumns, getGroupedCosts } from '../../api/api';

const accountId = 1; // You can dynamically set it based on user/account info.

const CostExplorer = () => {
  const [groupByOptions, setGroupByOptions] = useState([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState('');
  const [costData, setCostData] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    loadGroupByOptions();
  }, []);

  const loadGroupByOptions = async () => {
    const groups = await getGroupByColumns();
    setGroupByOptions(groups);
  };

  const loadCostData = async () => {
    const costRequest = {
      groupBy: selectedGroupBy,
      filters: [],  // later we can add selected filters
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    };
    const data = await getGroupedCosts(accountId, costRequest);
    setCostData(data);
  };

  useEffect(() => {
    if (selectedGroupBy && dateRange.startDate && dateRange.endDate) {
      loadCostData();
    }
  }, [selectedGroupBy, dateRange]);

  return (
    <div className="cost-explorer">
      <header className="header">
        <h1>Cost Explorer</h1>
      </header>

      <div className="controls">
        <GroupByDropdown
          options={groupByOptions}
          selected={selectedGroupBy}
          onChange={setSelectedGroupBy}
        />
        <DateSelector dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <div className="main-content">
        <Chart costData={costData} />
        <Filters accountId={accountId} selectedGroupBy={selectedGroupBy} />
      </div>
    </div>
  );
};

export default CostExplorer;
