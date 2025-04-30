import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../Sidebar/Sidebar.scss';
import sidebarConfig from "./SidebarConfig";

const Sidebar = () => {
  const { role } = useSelector(state => state);

  return (
    <div className="sidebar">
      <ul>
        {sidebarConfig
          .filter(item => item.role === role) // Filter items by the user's role
          .map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <img src={item.icon} alt={item.label} className="sidebar-icon" />
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
