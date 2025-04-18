import React, { useEffect, useState } from 'react';
import '../../styles/AccountManager.css';

const AccountManager = ({ selectedAccounts, setSelectedAccounts }) => {
  const [orphanAccounts, setOrphanAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToMove, setSelectedToMove] = useState([]);

  useEffect(() => {
    const fetchOrphanAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/accounts/orphan');
        if (!response.ok) {
          throw new Error('Failed to fetch orphan accounts');
        }
        const data = await response.json();
        setOrphanAccounts(data);
      } catch (error) {
        console.error("Failed to fetch orphan accounts", error);

        // Dummy fallback
        const dummyData = [
          { id: '989033863264', name: 'Roni Thomas' },
          { id: '767369465358', name: 'Aircel Money' },
          { id: '237795921511', name: 'Doodhwala' },
          { id: '315756860246', name: 'AI Gym' },
          { id: '861931862932', name: 'Tejprakash Sharma' },
          { id: '429796869693', name: 'Apoyo' },
          { id: '003429390769', name: 'IDFC' },
          { id: '112512014927', name: 'Galadari' },
        ];
        setOrphanAccounts(dummyData);
      }
    };

    fetchOrphanAccounts();
  }, []);

  const handleCheckboxChange = (accountId) => {
    setSelectedToMove((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId]
    );
  };

  const handleMoveToSelected = () => {
    const toAdd = orphanAccounts.filter((acc) => selectedToMove.includes(acc.id));
    setSelectedAccounts([...selectedAccounts, ...toAdd]);
    setOrphanAccounts(orphanAccounts.filter((acc) => !selectedToMove.includes(acc.id)));
    setSelectedToMove([]);
  };

  const handleMoveBack = (accountId) => {
    const toMoveBack = selectedAccounts.find((acc) => acc.id === accountId);
    setOrphanAccounts([...orphanAccounts, toMoveBack]);
    setSelectedAccounts(selectedAccounts.filter((acc) => acc.id !== accountId));
  };

  const filteredOrphanAccounts = orphanAccounts.filter((acc) =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-manager-container">
      <div className="account-box">
        <h4>Choose Account IDs to Associate</h4>
        <p className="count">{orphanAccounts.length} Available</p>
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
              <span>{acc.name} ({acc.id})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="arrow-buttons">
        <button onClick={handleMoveToSelected}>&rarr;</button>
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
                <span>{acc.name} ({acc.id})</span>
                <button onClick={() => handleMoveBack(acc.id)} className="remove-btn">&larr;</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManager;
