import CopyBox from "../../Components/CopyBox";
import five from '../../assets/5.png';
import four from '../../assets/6.png';
import six from '../../assets/7.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThankYou from "../../Pages/IAMRoleWizard/ThankYou"; // create this component
import "../../styles/CreateIAMRolePage.css";
import { useSelector } from "react-redux";


const Step3 = ({ data, onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const {token} = useSelector(state => state);

    const handleSubmit = async () => {
      try {
        console.log("Submitting data:",{ data});
        const res = await axios.post("http://localhost:8080/api/account/onboarding", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("Submission success:", res.data);
        setSubmitted(true);
        navigate("/onboarding/thank-you");
      } catch (error) {
        console.error("Submission failed:", error.response?.data || error.message);
        alert("Submission failed. Check console for error.");
      }
    };

  if (submitted) return <ThankYou />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    <h1>Create Cost & Usage Report</h1>
      <p>Create Cost & Usage Report following these steps</p>
<main className="main-content">
  
    {/* <div className="instructions">
      <h1>Create Cost & Usage Report</h1>
      <p>Create Cost & Usage Report following these steps</p> */}

<section className="instructions">
<ol>
        <li className="body_text">
          <div className="steps_wrapper">
        
            <div className="content">
              Go <a href="cost" target="_blank" rel="noopener noreferrer">Cost & Usage</a> in the Billing Dashboard Create to <a href="cost">Report</a> and click on report.
            </div>
          </div>
        </li>

        <li className="body_text">
          <div className="content">
            Name the report and select "Include resource IDs" checkbox:
            <div className="copyfield_wrapper">
              <span className="black"><CopyBox />ck-tuner-275595855473</span>
              <div className="CK-wrapper4">Ensure that the following configuration is checked</div>
              Include Resource IDs
              <img src={five} alt="Include Resource IDs" />
            </div>
          </div>
        </li>

        <li className="body_text">
          <div className="content">
            In <i>Configure S3 Bucket</i>, provide the name of the S3 bucket:
            <p>Ensure that the following configuration is checked</p>
            Click on <strong>Save</strong>
            <img src={four} alt="Bucket Versioning UI" />
          </div>
        </li>

        <li className="body_text">
          <div className="content">
            In the <i>Delivery options</i> section, enter the Report path prefix:
            <p>Report path prefix</p>
            <CopyBox />
            <div>Additionally, ensure that the following checks are in place</div>
            <div>Time granularity:</div>
            <p>Please make sure these checks are enabled in "Enable report data integration for":</p>
            <img src={six} alt="Report Integration Settings" />
          </div>
        </li>

        <li className="body_text">
          <div className="content">
            Click on <strong>Next</strong>. Now, review the configuration. Once satisfied, click <strong>Create Report.</strong>
          </div>
        </li>
      </ol>

      <div className="form_footer">
        <div className="rightbutton">
          <button className="backbutton" onClick={onBack}>Back - Attach IAM Policy</button>
          <button className="submitbutton" onClick={handleSubmit}>Submit</button>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Step3;
