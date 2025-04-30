import { useState ,useEffect} from "react";
import Step1 from "./Step1";
import Step2 from "./Step2"; 
import Step3 from "./Step3"; 
import "../../styles/CreateIAMRolePage.css";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const scrollLayout = document.getElementById("layout-main");
    scrollLayout.scrollTo(0, 0);
  }, [step]);

  const steps = {
    1: <Step1 data={formData} onChange={handleChange} onNext={nextStep} />,
    2: <Step2 data={formData} onChange={handleChange} onNext={nextStep} onBack={prevStep} />,
    3: <Step3 data={formData} onBack={prevStep} onNext={nextStep}/>
  };

  return <>{steps[step]}</>;
};

export default IAMRoleWizard;
