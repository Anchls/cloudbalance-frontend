import { useState } from "react";
import { IAM_POLICY, iamRoleSteps } from "./config/iamRoleSteps";
import PolicyBlock from "../../Components/StructureComponent/PolicyBlock";
import CopyBox from "../../Components/StructureComponent/CopyBox";
import one from "../../assets/1.png";


const Step1 = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!data.arn.trim()) tempErrors.arn = "Please fill this field";
    if (!data.accountId.trim()) {
      tempErrors.accountId = "Please fill this field";
    } else if (!/^\d{12}$/.test(data.accountId)) {
      tempErrors.accountId = "Account ID must be exactly 12 digits";
    }
    if (!data.accountName.trim()) tempErrors.accountName = "Please fill this field";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className=" bg-gray-100">
      <h1>Create an IAM Role</h1>
      <p>Create an IAM Role by following these steps</p>

      <main className="main-content">
        <section className="instructions">
          <ol>
            {iamRoleSteps.map((step) => (
              <li className="body_text" key={step.number}>
                <div>{step.text}</div>

                {step.showTextarea && <PolicyBlock policy={IAM_POLICY} />}
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
                    {errors.arn && <p className="error-text">{errors.arn}</p>}
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
                    {errors.accountId && <p className="error-text">{errors.accountId}</p>}
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
                    {errors.accountName && <p className="error-text">{errors.accountName}</p>}
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
                onClick={handleNext}
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
