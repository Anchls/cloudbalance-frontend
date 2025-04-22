import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    <div className="onboarding-wrapper">
  
      <div className="step-container">
<Outlet/>
      </div>
    </div>
  );
};

export default OnboardingLayout;
