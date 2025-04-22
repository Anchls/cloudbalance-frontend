import React from 'react';
import Header from '../Components/header';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import "../styles/mainLayout.scss";

const MainLayout = () => {
  return (
    <div className="layout-container">
      <header>
      <Header />
      </header>
      <div className="layout-body">
        <div className="sidebar">
        <Sidebar />
        </div>
        <div className="layout-main">
        <main>
          <Outlet />
        </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
