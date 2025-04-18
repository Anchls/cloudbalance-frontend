import React from 'react';
import Header from '../Components/header';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import "../styles/mainLayout.scss";

const MainLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
