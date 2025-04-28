import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Sample icons (you can replace these with actual icons)
import onboardIcon from '../../assets/onboarding.png';
import costIcon from '../../assets/cost.png';
import awsIcon from '../../assets/aws.png';
import userIcon from '../../assets/user.png'
import '../../styles/Sidebar.scss';

const Sidebar = () => {
  const { role } = useSelector(state => state);
  console.log(role);

  return (
    <div className="sidebar">
      <ul>
        {role === "ADMIN" && (
          <li>
            <Link to="/dashboard/users">
              <img src={userIcon} alt="User" className="sidebar-icon" />
              User Management
            </Link>
          </li>
        )}
        {role === "ADMIN" && (
          <li>
            <Link to="/dashboard/onboarding">
              <img src={onboardIcon} alt="Onboarding" className="sidebar-icon" />
              Onboarding
            </Link>
          </li>
        )}
        <li>
          <Link to="/dashboard/cost-explorer">
            <img src={costIcon} alt="Cost" className="sidebar-icon" />
            Cost Explorer
          </Link>
        </li>
        <li>
          <Link to="/dashboard/aws-services">
            <img src={awsIcon} alt="AWS" className="sidebar-icon" />
            AWS Services
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
