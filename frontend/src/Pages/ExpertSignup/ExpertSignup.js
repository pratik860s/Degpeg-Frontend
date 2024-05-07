import React, { useState } from "react";
import axios from "axios";
import "./ExpertSignup.css";

const ExpertSignup = () => {
  // State hooks to manage the form's current level, password visibility, and form data
  const [level, setLevel] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Initial form data state with all fields set to default values
    businessName: "",
    businessEmail: "",
    businessMobile: "",
    businessLocation: "",
    password: "",
    confirmPassword: "",
    gst: "",
    cancelledCheque: null,
    bankName: "",
    accountNo: "",
    ifscCode: "",
  });

  // Function to toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000); // Hide password after 2 seconds
  };

  const passwordsMatch = formData.password === formData.confirmPassword;

  // Function to handle the 'Next' button click, advancing the form level
  const handleNext = () => {
    // Validation checks for each level's completion
    const isLevel1Complete =
      formData.businessName &&
      formData.businessEmail &&
      formData.businessMobile &&
      formData.businessLocation &&
      formData.password &&
      formData.confirmPassword;
    const isLevel2Complete =
      formData.gst && formData.cancelledCheque && formData.addressProof;
    const isLevel3Complete =
      formData.bankName && formData.accountNo && formData.ifscCode;

    const passwordsMatch = formData.password === formData.confirmPassword;

    // Logic to advance to the next level or show alerts for incomplete fields or mismatched passwords
    if (
      (level === 1 && isLevel1Complete) ||
      (level === 2 && isLevel2Complete) ||
      (level === 3 && isLevel3Complete)
    ) {
      if (passwordsMatch && level < 3) {
        setLevel(level + 1);
      } else if (!passwordsMatch) {
        alert("Passwords do not match. Please try again.");
      }
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  // Function to handle changes in the form inputs and update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Regular expressions for validating email, mobile, GST, and IFSC code
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const gstRegex = /^[A-Z0-9]{15}$/;
  const ifscRegex = /^[A-Z]{4}\d{7}$/;

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // API endpoint for form submission
    const apiEndpoint = "your-api-end-point/submit-form";

    // Creating a FormData object to hold the form data for submission
    const formPayload = new FormData();

    // Appending each form field to the FormData object
    formPayload.append("businessName", formData.businessName);
    formPayload.append("businessEmail", formData.businessEmail);
    formPayload.append("businessMobile", formData.businessMobile);
    formPayload.append("businessLocation", formData.businessLocation);
    formPayload.append("password", formData.password);
    formPayload.append("gst", formData.gst);
    formPayload.append("cancelledCheque", formData.cancelledCheque);
    formPayload.append("addressProof", formData.addressProof);
    formPayload.append("bankName", formData.bankName);
    formPayload.append("accountNo", formData.accountNo);
    formPayload.append("ifscCode", formData.ifscCode);

    // Making a POST request using axios to submit the form data
    axios
      .post(apiEndpoint, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Success:", response.data); // Log success message and data
      })
      .catch((error) => {
        console.error("Error:", error); // Log Any Error
      });
  };

  // JSX to render the multi-level form with conditional rendering based on the current level
  return (
    <div className="expertSignup">
      {level === 1 && (
        <div>
          <h1>Expert Registration</h1>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business/Expert Name"
            required
          />
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            placeholder="Business/Expert Email"
            pattern={emailRegex.source}
            required
          />
          <input
            type="tel"
            name="businessMobile"
            value={formData.businessMobile}
            onChange={handleChange}
            placeholder="Business/Expert Mobile No."
            pattern={mobileRegex.source}
            required
          />
          <input
            type="text"
            name="businessLocation"
            value={formData.businessLocation}
            onChange={handleChange}
            placeholder="Business/Expert Location"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Password"
            required
          />
          <button className="showButton" onClick={togglePasswordVisibility}>
            Show
          </button>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {formData.password !== formData.confirmPassword && (
            <p style={{ color: "red" }}>Passwords do not match.</p>
          )}
        </div>
      )}

      {level === 2 && (
        <div>
          <h2>Verification</h2>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            placeholder="Business/Expert GST"
            pattern={gstRegex.source}
            required
          />
          <label htmlFor="cancelledCheque">
            Cancelled Cheque (Max size: 50KB)
          </label>
          <input
            type="file"
            id="cancelledCheque"
            name="cancelledCheque"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.size > 50 * 1024) {
                alert("File size should not exceed 50KB");
                e.target.value = "";
              } else {
                setFormData({ ...formData, cancelledCheque: file });
              }
            }}
            required
          />

          <label htmlFor="addressProof">Address Proof (Max size: 50KB)</label>
          <input
            type="file"
            id="addressProof"
            name="addressProof"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.size > 50 * 1024) {
                // 500KB limit
                alert("File size should not exceed 50KB");
                e.target.value = ""; // Clear the file input
              } else {
                setFormData({ ...formData, addressProof: file });
              }
            }}
            required
          />
        </div>
      )}

      {level === 3 && (
        <div>
          <h2>Payment Purpose</h2>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Business/Expert Bank/Branch Name"
            required
          />
          <input
            type="text"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            placeholder="Business/Expert Account No."
            required
          />
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="Business/Expert IFSC Code"
            pattern={ifscRegex.source}
            required
          />
        </div>
      )}

      {level < 3 ? (
        <button
          className="buttons"
          onClick={handleNext}
          disabled={!passwordsMatch}
        >
          Next
        </button>
      ) : (
        <button className="buttons" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default ExpertSignup;
