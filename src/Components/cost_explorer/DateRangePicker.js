import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle2" color="text.primary">
          Start Date:
        </Typography>
        <TextField
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle2" color="text.primary">
          End Date:
        </Typography>
        <TextField
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </Box>
  );
};

export default DateRangePicker;
