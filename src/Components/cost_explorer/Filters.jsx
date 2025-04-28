import React, { useEffect, useState } from 'react';
import '../styles/Filters.css';
import { getFiltersForGroup } from '../../api/api';

const Filters = ({ accountId, selectedGroupBy }) => {
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    if (selectedGroupBy) {
      fetchFilters();
    }
  }, [selectedGroupBy]);

  const fetchFilters = async () => {
    const request = { columnName: selectedGroupBy };
    const response = await getFiltersForGroup(accountId, request);
    setFilterValues(response.values || []);
  };

  return (
    <div className="filters">
      <h3>Filters</h3>
      {filterValues.map((filter, idx) => (
        <div key={idx} className="filter-option">
          <input type="checkbox" id={`filter-${idx}`} />
          <label htmlFor={`filter-${idx}`}>{filter}</label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
