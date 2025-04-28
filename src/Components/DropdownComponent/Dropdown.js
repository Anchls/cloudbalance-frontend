// Dropdown.js
import React from 'react';

const AccountDropdown = ({ accounts, selectedRoleArn, setSelectedRoleArn }) => {
  return (
    <div className="dropdown-wrapper">
      <select
        value={selectedRoleArn}
        onChange={(e) => setSelectedRoleArn(e.target.value)}
      >
        <option value="">Select Cloud Account</option>
        {accounts.map((account, idx) => (
          <option key={idx} value={account.arn}>
            {account.accountName || account.accountId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountDropdown;
