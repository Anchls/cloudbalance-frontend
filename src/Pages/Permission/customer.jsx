import React from 'react';
// import './../../styles/Dashboard.css'; // Assuming you have a CSS file for styling
const dashboard= () => {
  return (<><div>
  <div className="top-navbar">
  <div className="left-section">
    <div className="logo"><img src="../../imh.png" alt="" /></div>
    <div className="module-title">Module Lens</div>
  </div>

  <div className="right-section">
    <span className="welcome-text">Welcome, Aanchal Sharma</span>
    <div className="profile-icon">AS</div>
    <button className="logout-button">Logout</button>
  </div>
</div>
<aside className="sidebar">
  <h2 className="sidebar-title">Dashboard</h2>
  <nav>
    <ul>
     <li><a href="/cost-explorer"> Cost Explorer</a></li>
      <li><a href="/aws-services"> AWS Services</a></li>
    </ul>
  </nav>
</aside>
<main className="main-content">
  {/* <div className="header">
    <h1>Users</h1>
    <button className="add-user">+ Add User</button>
  </div>

  <div className="user-table"> */}
    {/* <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Aanchal Sharma</td>
          <td>aanchal@example.com</td>
          <td>Admin</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>Customer</td>
          <td>Active</td>
        </tr>
      </tbody>
    </table> */}
  {/* </div> */}
  

  <footer className="footer">
    © 2025 CloudBalance | All rights reserved.
  </footer>
</main>

  </div>
  </>
   
  );
};

export default dashboard;
