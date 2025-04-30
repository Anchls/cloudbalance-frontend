import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GroupBy = ({
  columns,
  activeGroupBy,
  setActiveGroupBy,
  selectedAccountId,
  loading,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const mainGroupByColumns = [
    "Tenancy",
    "Account Id",
    "Usage Type",
    "Platform",
    "Operation Type",
    "Usage Type Group",
    "Service"
  ];

  const additionalGroupByColumns = [
    "Charge Type",
    "Purchase Option",
    "Instance Type",
    "Policies",
    "Region",
    "Tags",
    "API Operation",
    "Database Engine",
    "Availability Zone",
  ];

  const handleGroupByClick = (columnName) => {
    if (!selectedAccountId) {
      alert("Please select an account first");
      return;
    }
    setActiveGroupBy(columnName);
  };

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Group By
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {mainGroupByColumns.map(
            (column, index) =>
              columns.includes(column) && (
                <Button
                  key={index}
                  variant={activeGroupBy === column ? "contained" : "outlined"}
                  color={activeGroupBy === column ? "primary" : "inherit"}
                  onClick={() => handleGroupByClick(column)}
                  sx={{ whiteSpace: "nowrap", fontWeight: 500 }}
                >
                  {column}
                </Button>
              )
          )}

          {additionalGroupByColumns.some((col) => columns.includes(col)) && (
            <>
              <Button
                variant={open ? "contained" : "outlined"}
                color={open ? "primary" : "inherit"}
                endIcon={<ExpandMoreIcon />}
                onClick={handleMoreClick}
              >
                More
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMoreClose}
                PaperProps={{
                  sx: {
                    borderRadius: 1,
                    boxShadow: 3,
                  },
                }}
              >
                {additionalGroupByColumns.map(
                  (column, index) =>
                    columns.includes(column) && (
                      <MenuItem
                        key={index}
                        selected={activeGroupBy === column}
                        onClick={() => {
                          handleGroupByClick(column);
                          handleMoreClose();
                        }}
                        sx={{
                          fontWeight:
                            activeGroupBy === column ? "600" : "400",
                        }}
                      >
                        {column}
                      </MenuItem>
                    )
                )}
              </Menu>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GroupBy;
