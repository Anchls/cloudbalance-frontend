import React from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  TableContainer,
  useTheme,
} from "@mui/material";

// Helper: Convert '01-04-2025 to 30-04-2025' => 'Apr 2025'
const parsePeriod = (period) => {
  if (!period) return "";
  const [startDate] = period.split(" to ");
  const [day, month, year] = startDate.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

// Helper: Format cost with K/M/B
const formatCost = (value) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
};

const CostTable = ({ data, loading, groupBy }) => {
  const theme = useTheme();

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: theme.palette.text.disabled, fontStyle: "italic" }}
        >
          No data available for the selected criteria
        </Typography>
      </Paper>
    );
  }

  const months = [...new Set(data.map((item) => parsePeriod(item.period)))].sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const services = [...new Set(data.map((item) => item.name))].sort();

  const tableData = services.map((service) => {
    const row = { service };
    let rowTotal = 0;

    months.forEach((month) => {
      const item = data.find((d) => d.name === service && parsePeriod(d.period) === month);
      const value = item ? item.total : 0;
      row[month] = value;
      rowTotal += value;
    });

    row.total = rowTotal;
    return row;
  });

  const totalRow = { service: "Total" };
  let grandTotal = 0;
  months.forEach((month) => {
    const monthTotal = tableData.reduce((sum, row) => sum + row[month], 0);
    totalRow[month] = monthTotal;
    grandTotal += monthTotal;
  });
  totalRow.total = grandTotal;

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1, mt: 3, mb: 10 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {groupBy} Cost Breakdown (Month-wise)
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <CircularProgress size={24} />
          <Typography sx={{ ml: 2, color: theme.palette.text.secondary }}>
            Loading table data...
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 340 }}>
          <Table stickyHeader sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: theme.palette.grey[100],
                    fontWeight: 600,
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {groupBy}
                </TableCell>
                {months.map((month) => (
                  <TableCell
                    key={month}
                    sx={{
                      backgroundColor: theme.palette.grey[100],
                      fontWeight: 600,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {month}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    backgroundColor: theme.palette.grey[100],
                    fontWeight: 600,
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.service}>
                  <TableCell>{row.service}</TableCell>
                  {months.map((month) => (
                    <TableCell key={month}>{formatCost(row[month])}</TableCell>
                  ))}
                  <TableCell>{formatCost(row.total)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: 600, backgroundColor: theme.palette.grey[200] }}>
                  {totalRow.service}
                </TableCell>
                {months.map((month) => (
                  <TableCell key={month} sx={{ fontWeight: 600, backgroundColor: theme.palette.grey[200] }}>
                    {formatCost(totalRow[month])}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: 600, backgroundColor: theme.palette.grey[200] }}>
                  {formatCost(totalRow.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default CostTable;
