import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    <div className="onboarding-wrapper">
      <h2>CloudBalance Onboarding</h2>
      <div className="step-container">
<Outlet/>
      </div>
    </div>
  );
};

export default OnboardingLayout;
