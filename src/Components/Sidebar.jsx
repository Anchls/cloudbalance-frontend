import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getRole } from "../services/authService";
import '../styles/Sidebar.scss';
const Sidebar = () => {
  const {role} = useSelector(state => state);
  console.log(role);

  return (
    <div className="sidebar">
     
        <>
        {role === "ADMIN" && <li> <Link to="/dashboard/users">User Management</Link></li>}
        {role==="ADMIN" &&<li> <Link to="/dashboard/onboarding">Onboarding</Link></li>}
       
       <li>  <Link to="/dashboard/cost-explorer">Cost Explorer</Link></li>
       <li> <Link to="/dashboard/aws-services">AWS Services</Link></li>
        </>
  
    </div>
  );
};

export default Sidebar;
