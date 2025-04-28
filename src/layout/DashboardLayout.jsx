import React from 'react';
import Header from '../Components/StructureComponent/header';
import Sidebar from '../Components/StructureComponent/Sidebar';
import { Outlet } from 'react-router-dom';
import "../styles/mainLayout.scss";
import Footer from '../Components/StructureComponent/footer';

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
        <div className="layout-main" id="layout-main">
        <main>
          <Outlet />
        </main>
        {/* <Footer/> */}
        </div>
       
      </div>
    </div>
  );
};

export default MainLayout;
