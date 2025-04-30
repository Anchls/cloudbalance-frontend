import React, { useState, useEffect, useRef } from 'react';
import { FaFilter } from 'react-icons/fa'; 
import '../FilterableTableComponent/FilterableTable.css';

const FilterableTable = ({ columns, data }) => {
  const initialFilters = columns.reduce((acc, col) => {
    acc[col.key] = '';
    return acc;
  }, {});

  const [filters, setFilters] = useState(initialFilters);
  const [activeFilter, setActiveFilter] = useState(null);
  const popupRef = useRef(null);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setActiveFilter(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const filteredData = data.filter(row =>
    Object.entries(filters).every(([key, value]) =>
      row[key]?.toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <div className="filterable-table-container">
      <table className="filterable-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>
                <div className="filter-header" style={{ position: 'relative' }}>
                  {col.label}
                  <FaFilter
                    className="filter-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click bubbling
                      setActiveFilter(activeFilter === col.key ? null : col.key);
                    }}
                  />
                  {activeFilter === col.key && (
                    <div ref={popupRef} className="filter-popup">
                      <input
                        placeholder={`Search ${col.label}`}
                        value={filters[col.key]}
                        onChange={(e) => handleFilterChange(e, col.key)}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr key={idx}>
              {columns.map((col, cidx) => (
                <td key={cidx}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterableTable;
