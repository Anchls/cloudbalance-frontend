// AccountSelector.jsx
import React from "react";
import { Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function AccountSelector({ accounts, value, onChange, loading }) {
  return (
    <Paper sx={{ p: 2, mb: 3, maxWidth: 400, width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="account-select-label">Select Account</InputLabel>
        <Select
          labelId="account-select-label"
          value={value}
          label="Select Account"
          onChange={onChange}
          disabled={loading}
          color="primary"
        >
          {accounts.map((acct) => (
            <MenuItem key={acct.accountId} value={acct.accountId}>
              {acct.accountName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
