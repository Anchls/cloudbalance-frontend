// src/pages/IAMRoleWizard/Step1.js
import { IAM_POLICY, iamRoleSteps } from "./config/iamRoleSteps";
import PolicyBlock from "../../Components/PolicyBlock";
import CopyBox from "../../Components/CopyBox";
import one from "../../assets/1.png";
import "../../styles/CreateIAMRolePage.css";

const Step1 = ({ data, onChange, onNext }) => {
  const isFormValid =
    data.arn.trim() !== "" &&
    data.accountId.trim() !== "" &&
    data.accountName.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <h1>Create an IAM Role</h1>
      <p>Create an IAM Role by following these steps</p>

      <main className="main-content">
        <section className="instructions">
          <ol>
            {iamRoleSteps.map((step) => (
              <li className="body_text" key={step.number}>
                <div>{step.text}</div>

                {step.showTextarea && <PolicyBlock policy={IAM_POLICY}/>}
                {step.showInput && (
                  <div className="copyfield_wrapper">
                    <CopyBox />
                  </div>
                )}
              </li>
            ))}

            <li className="body_text">
              <div>Go to the newly created IAM Role and copy the Role ARN.</div>
              <img src={one} alt="user-management" />
            </li>

            <li className="body_text">
              <div>Paste the copied Role ARN below:</div>
              <form>
                <div className="ArnRole">
                  <div className="role">
                    <label htmlFor="iamArn">Enter the IAM Role ARN*</label>
                    <input
                      type="text"
                      id="iamArn"
                      name="arn"
                      placeholder="Enter the IAM ARN"
                      value={data.arn}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="Account">
                    <label htmlFor="accountId">Enter the Account ID*</label>
                    <input
                      type="text"
                      id="accountId"
                      name="accountId"
                      placeholder="Enter Account ID"
                      value={data.accountId}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="name">
                    <label htmlFor="name">Enter the Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="accountName"
                      placeholder="Enter Name"
                      value={data.accountName}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </li>
          </ol>

          <div className="form_footer">
            <button className="iambutton" type="button">
              Cancel
            </button>
            <div className="rightbutton">
              <button className="backbutton" type="button" disabled>
                Back
              </button>
              <button
                className="nextbtn"
                type="button"
                onClick={onNext}
                disabled={!isFormValid}
              >
                Next - Add Customer Managed Policies
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Step1;
