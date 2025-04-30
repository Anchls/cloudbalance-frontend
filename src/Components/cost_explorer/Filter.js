import React from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Filter = ({
  columns,
  activeSidebarFilter,
  onColumnClick,
  filterValues,
  selectedFilterValues,
  setSelectedFilterValues,
  loading,
}) => {
  const handleCheckboxChange = (filterName, value) => {
    setSelectedFilterValues((prev) => {
      const currentValues = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const closeFilterPanel = () => {
    onColumnClick(null);
  };

  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        position: "sticky",
        top: 24,
        height: "fit-content",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filters
      </Typography>

      {loading.columns ? (
        <Box sx={{ py: 2, textAlign: "center" }}>
          <CircularProgress size={20} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Loading filters...
          </Typography>
        </Box>
      ) : (
        columns.map((filter, idx) => (
          <Box key={idx} sx={{ mb: 1 }}>
            <Button
              fullWidth
              variant={activeSidebarFilter === filter ? "contained" : "outlined"}
              onClick={() => onColumnClick(filter)}
              sx={{ justifyContent: "flex-start", textTransform: "none" }}
            >
              {filter}
            </Button>

            {activeSidebarFilter === filter && (
              <Paper elevation={1} sx={{ mt: 1, p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle2">{filter}</Typography>
                  <IconButton size="small" onClick={closeFilterPanel}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 1 }} />

                {loading.values ? (
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Loading values...
                    </Typography>
                  </Box>
                ) : filterValues.length > 0 ? (
                  <FormGroup sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {filterValues.map((value, i) => (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={(selectedFilterValues[filter] || []).includes(value)}
                            onChange={() => handleCheckboxChange(filter, value)}
                          />
                        }
                        label={value}
                      />
                    ))}
                  </FormGroup>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                    No values available
                  </Typography>
                )}
              </Paper>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default Filter;
