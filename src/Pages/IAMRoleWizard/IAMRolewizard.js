import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2"; // Add later
import Step3 from "./Step3"; // Add later
// import ThankYou from "./ThankYou";
// import '../../styles/IAMRole.css';
const IAMRoleWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    arn: "",
    accountId: "",
    accountName: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const steps = {
    1: <Step1 data={formData} onChange={handleChange} onNext={nextStep} />,
    2: <Step2 data={formData} onChange={handleChange} onNext={nextStep} onBack={prevStep} />,
    3: <Step3 data={formData} onBack={prevStep} onNext={nextStep}/>
  };

  return <div>{steps[step]}</div>;
};

export default IAMRoleWizard;
