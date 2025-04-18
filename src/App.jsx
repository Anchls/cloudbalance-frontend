import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Step3 from './Pages/IAMRoleWizard/Step3';
import Step2 from './Pages/IAMRoleWizard/Step2';
import Step1 from './Pages/IAMRoleWizard/Step1';
import OnboardingLayout from './Pages/IAMRoleWizard/OnboardingLayout';
import { ToastContainer } from 'react-toastify';
import AddUserForm from './Pages/CreateUser/AddUserForm';
import ThankYou from './Pages/IAMRoleWizard/ThankYou';
import AwsService from './Pages/Dasboard/AwsService';
import IAMRoleWizard from './Pages/IAMRoleWizard/IAMRolewizard';
import DashboardLayout from './layout/DashboardLayout';
import { Navigate } from 'react-router-dom';
import UserManagement from './Pages/Dasboard/UserManagement';

function App() {
  const [role,setRole] = useState("");
    console.log(role);
    useEffect(()=>{
      const assignedRole = localStorage.getItem("role");
      console.log(assignedRole)
      setRole(assignedRole);
    },[]);
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={ <DashboardLayout />} >
        
            <Route index element={role === "CUSTOMER" ? <Navigate to="cost-explorer" />: <Navigate to="users" />} />
            <Route path='users' element={<UserManagement/>} />
            {/* <Route path='dashboard' element={<Dashboard/>}/> */}
            <Route path='cost-explorer' element={<>Cost explorer</>} />
            <Route path="onboarding" element={<IAMRoleWizard/>} />
            <Route path="add-user" element={<AddUserForm />} /> 
            <Route path="aws-services" element={<AwsService />} />
           
        </Route>
        <Route path="/thank-you" element={<ThankYou />} />

<Route path="/onboarding" element={<OnboardingLayout />}>
  <Route path="step1" element={<Step1 />} />
  <Route path="step2" element={<Step2 />} />
  <Route path="step3" element={<Step3 />} />
</Route>
          {/* <Route path='/update-user' element={<AddUserForm />} />  */}
         {/* <Route path ='/onboarding' element={<DashboardPage/>}/> */}
        {/* <Route path="/user-management" element={<Dashboard />} />  */}
         {/* <Route path="/onboarding" element={<Dashboard />} />  */}
        {/* <Route path="/cost-explorer" element={<CostExplorer />} /> 
        <Route path="/aws-services" element={<AwsService />} />  */}
       {/* <Route path="/add-user" element={<AddUserForm />} />  */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/readonly/dashboard" element={<ReadOnlyDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} /> */}
        
      </Routes>
      <ToastContainer  position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;
