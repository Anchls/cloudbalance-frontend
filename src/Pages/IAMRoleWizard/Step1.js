import { useState } from "react";
import { IAM_POLICY, iamRoleSteps } from "./config/iamRoleSteps";
import PolicyBlock from "../../Components/common/CopyBox/PolicyBlock";
import CopyBox from "../../Components/common/CopyBox/CopyBox";
import CustomButton from "../../Components/common/Button/CustomButton";
import one from "../../assets/1.png";

const Step1 = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let error = "";

    if (fieldName === "arn") {
      if (!value.trim()) {
        error = "Please fill this field";
      }
    }

    if (fieldName === "accountId") {
      if (!value.trim()) {
        error = "Please fill this field";
      } else if (!/^\d{12}$/.test(value)) {
        error = "Account ID must be exactly 12 digits";
      }
    }

    if (fieldName === "accountName") {
      if (!value.trim()) {
        error = "Please fill this field";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(e); // Update parent data

    const errorMessage = validateField(name, value);

    // Update errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Check if all fields are valid
  const isFormValid =
    data.arn.trim() &&
    /^\d{12}$/.test(data.accountId) &&
    data.accountName.trim() &&
    !errors.arn &&
    !errors.accountId &&
    !errors.accountName;

  const handleNext = () => {
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onNext(); 
    }
  };

  return (
    <div className="bg-gray-100">
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

              <form className="ArnRole">
                <div className="form-group">
                  <label htmlFor="iamArn">Enter the IAM Role ARN*</label>
                  <input
                    type="text"
                    id="iamArn"
                    name="arn"
                    placeholder="Enter the IAM ARN"
                    value={data.arn}
                    onChange={handleChange}
                    required
                  />
                  {errors.arn && <p className="error-text">{errors.arn}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="accountId">Enter the Account ID*</label>
                  <input
                    type="text"
                    id="accountId"
                    name="accountId"
                    placeholder="Enter Account ID"
                    value={data.accountId}
                    onChange={handleChange} // changed to handleChange
                    required
                  />
                  {errors.accountId && <p className="error-text">{errors.accountId}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="name">Enter the Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="accountName"
                    placeholder="Enter Name"
                    value={data.accountName}
                    onChange={handleChange} // changed to handleChange
                    required
                  />
                  {errors.accountName && <p className="error-text">{errors.accountName}</p>}
                </div>
              </form>
            </li>
          </ol>

          <div className="form_footer">
            <CustomButton variant="secondary" onClick={() => console.log("Cancel clicked")}>
              Cancel
            </CustomButton>

            <div className="rightbutton">
              <CustomButton variant="secondary" disabled>
                Back
              </CustomButton>
              <CustomButton
                variant="primary"
                onClick={handleNext}
                disabled={!isFormValid} // Button disabled when form is invalid
              >
                Next - Add Customer Managed Policies
              </CustomButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Step1;
