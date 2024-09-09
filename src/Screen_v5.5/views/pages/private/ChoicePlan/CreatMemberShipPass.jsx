import React from "react";

const CreatMemberShipPass = () => {
  return (
    <div id="page">
      <div className="form-wrapper membership-step">
        <div className="content">
          <p className="step">StEP 2 of 3</p>
          <h1 className="title">Create password to start your membership</h1>
          <p className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <form>
          <label htmlFor="#membership-email">
            <p className="lable-text">Email</p>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              id="membership-email"
            />
          </label>
          <label htmlFor="#membership-password">
            <p className="lable-text">Password</p>
            <input
              type="password"
              name="password"
              placeholder="*** password ***"
              id="membership-password"
            />
            
          </label>
          <div className="form-footer">
            <div className="form-btns">
              <button type="submit">Next</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatMemberShipPass;
