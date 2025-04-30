import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupBy from "./GroupBy";
import Filter from "./Filter";
import ChartDisplay from "./ChartDisplay";
import DateRangePicker from "./DateRangePicker";
import CostTable from "./CostTable";

const CostExplorer = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [allColumns, setAllColumns] = useState([]);
  const [activeGroupBy, setActiveGroupBy] = useState("Service");
  const [activeSidebarFilter, setActiveSidebarFilter] = useState(null);
  const [filterValues, setFilterValues] = useState([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});
  const [loading, setLoading] = useState({
    accounts: false,
    columns: false,
    values: false,
    chart: false,
  });
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState("2025-04-01");
  const [endDate, setEndDate] = useState("2025-04-30");

  const token = localStorage.getItem("token");

  // Format date from yyyy-MM-dd to dd-MM-yyyy
  const formatDate = (dateStr) => {
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  // Fetch accounts
  useEffect(() => {
    setLoading((prev) => ({ ...prev, accounts: true }));
    axios
      .get("http://localhost:8080/api/account/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAccounts(res.data);
        if (res.data.length > 0) {
          setSelectedAccountId(res.data[0].accountId.toString());
        }
      })
      .catch((err) => console.error("Error fetching accounts:", err))
      .finally(() => setLoading((prev) => ({ ...prev, accounts: false })));
  }, []);

  // Fetch group by columns
  useEffect(() => {
    if (!selectedAccountId) return;
    setLoading((prev) => ({ ...prev, columns: true }));
    axios
      .get("http://localhost:8080/api/snowflake/group", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllColumns(res.data.GroupBy || []);
      })
      .catch((err) => console.error("Error fetching group by columns:", err))
      .finally(() => setLoading((prev) => ({ ...prev, columns: false })));
  }, [selectedAccountId]);

  // Fetch chart data
  useEffect(() => {
    if (!selectedAccountId || selectedAccountId === "undefined") return;

    setLoading((prev) => ({ ...prev, chart: true }));

    const payload = {
      groupBy: activeGroupBy,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      filters: selectedFilterValues,
    };

    console.log("Payload being sent to backend:", payload);

    axios
      .post(`http://localhost:8080/api/snowflake/${selectedAccountId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setChartData(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching chart data:", err))
      .finally(() => setLoading((prev) => ({ ...prev, chart: false })));
  }, [selectedAccountId, activeGroupBy, startDate, endDate, selectedFilterValues]);

  // Handle filter column click
  const handleFilterColumnClick = (columnName) => {
    setActiveSidebarFilter(columnName);

    if (!selectedAccountId || !columnName) return;

    setLoading((prev) => ({ ...prev, values: true }));
    const payload = { columnName };

    axios
      .post(
        `http://localhost:8080/api/snowflake/${selectedAccountId}/filter`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setFilterValues(res.data.values || []);
      })
      .catch((err) => console.error("Error fetching filter values:", err))
      .finally(() => setLoading((prev) => ({ ...prev, values: false })));
  };

  return (
    <div style={containerStyle}>
      {/* Account Selector */}
      <div style={accountSelectorStyle}>
        <label style={labelStyle}>Select Account:</label>
        <select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          style={selectStyle}
          disabled={loading.accounts}
        >
          {loading.accounts ? (
            <option>Loading accounts...</option>
          ) : (
            accounts.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountName} ({account.accountId})
              </option>
            ))
          )}
        </select>
      </div>

      {/* Date Range Picker */}
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Main Layout */}
      <div style={mainContentStyle}>
        <div style={contentAreaStyle}>
          <GroupBy
            columns={allColumns}
            activeGroupBy={activeGroupBy}
            setActiveGroupBy={setActiveGroupBy}
            selectedAccountId={selectedAccountId}
            loading={loading.columns}
          />

          <ChartDisplay
            data={chartData}
            loading={loading.chart}
            groupBy={activeGroupBy}
          />

          <CostTable
            data={chartData}
            loading={loading.chart}
            groupBy={activeGroupBy}
          />
        </div>

        <Filter
          columns={allColumns}
          activeSidebarFilter={activeSidebarFilter}
          onColumnClick={handleFilterColumnClick}
          filterValues={filterValues}
          selectedFilterValues={selectedFilterValues}
          setSelectedFilterValues={setSelectedFilterValues}
          loading={loading}
        />
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "24px",
  fontFamily: "'Inter', sans-serif",
  maxWidth: "1600px",
  margin: "0 auto",
  backgroundColor: "#f9fafb",
  minHeight: "100vh",
  overflowY: "auto",
  height: "100vh",
  boxSizing: "border-box",
};

const accountSelectorStyle = {
  marginBottom: "24px",
  maxWidth: "400px",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "8px",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#1f2937",
  outline: "none",
  transition: "border-color 0.2s",
};

const mainContentStyle = {
  display: "flex",
  gap: "24px",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const contentAreaStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  minWidth: "0",
};

export default CostExplorer;
