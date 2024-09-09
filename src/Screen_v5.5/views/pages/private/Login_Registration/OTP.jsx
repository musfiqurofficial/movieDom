import React, { useState } from "react";
import OtpInput from "react-otp-input";

const OTP = () => {
  const [otp, setOtp] = useState();
  return (
    <div className="form-wrapper otp">
      <div className="form-header">
        <h2 className="form-title">Confirm OTP</h2>
        <p className="form-sub-title">example@mail.com</p>
      </div>
      <form className="otp-form">
        <div className="otp-inputs mb-35">
          <OtpInput
            value={otp}
            onChange={(ot) => setOtp(ot)}
            numInputs={4}
            className="otp-input"
          />
        </div>
        <div className="form-footer">
          <div className="form-btns">
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>

      <div className="login-regi-footer">
        <button>Free 10 days trial</button>
      </div>
    </div>
  );
};

export default OTP;
