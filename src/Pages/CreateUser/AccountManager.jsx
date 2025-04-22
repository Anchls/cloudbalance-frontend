import React, { useEffect, useState } from 'react';
import '../../styles/AccountManager.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
const AccountManager = ({ selectedAccounts, setSelectedAccounts }) => {
  const [Accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToMove, setSelectedToMove] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/account/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAccounts(response.data); 
      } catch (error) {
        console.error("Error fetching accounts", error);
      }
    };

    fetchAccounts();
  }, [token]);

  const handleCheckboxChange = (accountId) => {
    setSelectedToMove((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId]
    );
  };

  const handleMoveToSelected = () => {
    const toAdd = Accounts.filter((acc) => selectedToMove.includes(acc.id));
    setSelectedAccounts([...selectedAccounts, ...toAdd]);
    setAccounts(Accounts.filter((acc) => !selectedToMove.includes(acc.id)));
    setSelectedToMove([]);
  };

  const handleMoveBack = (accountId) => {
    const toMoveBack = selectedAccounts.find((acc) => acc.id === accountId);
    setAccounts([...Accounts, toMoveBack]);
    setSelectedAccounts(selectedAccounts.filter((acc) => acc.id !== accountId));
  };

  const filteredOrphanAccounts = Accounts.filter((acc) =>
    acc.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-manager-container">
      <div className="account-box">
        <h4>Choose Account IDs to Associate</h4>
        <p className="count">{Accounts.length} Available</p>
        <input
          type="text"
          placeholder="Search accounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="account-list">
          {filteredOrphanAccounts.map((acc) => (
            <div key={acc.id} className="account-item">
              <input
                type="checkbox"
                checked={selectedToMove.includes(acc.id)}
                onChange={() => handleCheckboxChange(acc.id)}
              />
              <div>
                <span>{acc.accountName} ({acc.accountId})</span>
                <div className="arn">{acc.arn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="arrow-buttons">
        <button onClick={handleMoveToSelected} disabled={selectedToMove.length === 0}>
          &rarr;
        </button>
      </div>

      <div className="account-box">
        <h4>Associated Account IDs</h4>
        <p className="count">{selectedAccounts.length} Added</p>
        {selectedAccounts.length === 0 ? (
          <div className="empty-placeholder">
            <span role="img" aria-label="folder">📁</span>
            <p>No Account IDs Added</p>
          </div>
        ) : (
          <div className="account-list">
            {selectedAccounts.map((acc) => (
              <div key={acc.id} className="account-item">
                <div>
                  <span>{acc.accountName} ({acc.accountId})</span>
                  <div className="arn">{acc.arn}</div>
                </div>
                <button onClick={() => handleMoveBack(acc.id)} className="remove-btn">
                  &larr;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManager;
