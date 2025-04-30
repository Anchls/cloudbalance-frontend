// src/pages/IAMRoleWizard/Step2.js

import React, { useEffect } from "react";
import { JSON, JSON2, JSON3, JSON4, JSON5 } from "../../Pages/IAMRoleWizard/config/iamRoleSteps";
import PolicyBlock from "../../Components/common/CopyBox/PolicyBlock";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import CopyBox from "../../Components/common/CopyBox/CopyBox";
import CustomButton from "../../Components/common/Button/CustomButton";


const Step2 = ({ onBack, onNext }) => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" bg-gray-100">
      <h1>Add Customer Managed Policies</h1>
      <p>Create an Inline policy for the role by following these steps</p>

      <main className="main-content">
        <section className="instructions">
          <ol>
            <li className="body_text">
              Go to the <a href="hi">Create Policy</a> Page.
            </li>

            <li className="body_text">
              Click on the <strong>JSON</strong> tab and paste the following
              policy and click on Next:
              <PolicyBlock policy={JSON} />
            </li>

            <li className="body_text">
              In the <strong>Name</strong> field, enter below-mentioned policy
              name and click on Create Policy
              <CopyBox policy={JSON2} />
            </li>

            <li className="body_text">
              Again, go to the <a href="hi">Create Policy</a> Page.
            </li>

            <li className="body_text">
              Click on the <strong>JSON</strong> tab and paste the following
              policy and click on Next:
              <PolicyBlock policy={JSON3} />
            </li>

            <li className="body_text">
              In the <strong>Name</strong> field, enter below-mentioned policy
              name and click on Create Policy
              <CopyBox policy={JSON4} />
            </li>

            <li className="body_text">
              Again, go to the <a href="hi">Create Policy</a> Page.
            </li>

            <li className="body_text">
              Click on the <strong>JSON</strong> tab and paste the following
              policy and click on Next:
              <PolicyBlock policy={JSON5} />
            </li>

            <li className="body_text">
              In the <strong>Name</strong> field, enter below-mentioned policy
              name and click on Create Policy
              <CopyBox policy={JSON} />
            </li>

            <li className="body_text">
              <div>
                Go to the <a href="ck">CK-Tuner-Role</a>
              </div>
              <img src={one} alt="user-management" />
            </li>

            <li className="body_text">
              In Permission policies, click on{" "}
              <strong>Add permissions Attach Policy</strong>
              <img src={two} alt="user-management" />
            </li>

            <li className="body_text">
              Filter by Type {">"} Customer managed then search for{" "}
              <strong>
                cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
                cktuner-TunerReadEssentials, cktuner-SchedulerPolicy
              </strong>{" "}
              and select them.
              <img src={three} alt="user-management" />
            </li>

            <li className="body_text">
              Now, click on <strong>Add permissions</strong>
            </li>

            <li className="body_text">
              In Permission policies, click on{" "}
              <strong>Add permissions {">"} Create inline policy</strong>
              <img src={two} alt="user-management" />
            </li>

            <li className="body_text">
              <span className="steps_wrapper">
                <span className="steps">11</span>
              </span>
              Click on the <strong>JSON</strong> tab and paste the following
              policy and click on Next:
              <PolicyBlock policy={JSON5} />
            </li>

            <li className="body_text">
              Now, click on <strong>Review policy</strong>
            </li>

            <li className="body_text">
              In the <strong>Name</strong> field, enter the below-mentioned
              policy name and click on <strong>Create Policy</strong>
            </li>
          </ol>

          <div className="form_footer">
            <button className="iambutton" type="button" onClick={onBack}>
              Back
            </button>
            <div className="rightbutton">
              <CustomButton className="nextbtn" type="button" onClick={onNext}>
                Next - Add Inline Policy
              </CustomButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Step2;
