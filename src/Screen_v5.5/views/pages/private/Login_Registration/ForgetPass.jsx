import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { email_pattern } from "../../../../const";
import Auth from "../../../../firebase/firebase.action";

const ForgetPass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    const reset_promise = Auth.reset_password(data.email);
    toast
      .promise(
        reset_promise,
        {
          pending: "Please wait. 🕑",
          success: "Check your mail. 📧",
        },
        {
          position: "bottom-right",
        }
      )
      .then(() => reset())
      .catch((err) => {
        toast.dismiss();
        toast.error(err.code || "Try again! ⛔", {
          position: "bottom-right",
        });
      });
  };
  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2 className="form-title">Forget Password?</h2>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="login_email">
          <p className="lable-text">Email </p>
          <input
            type="email"
            name="email"
            id="login_email"
            placeholder="example@mail.com"
            {...register("email", {
              required: "* Email is required",
              pattern: email_pattern,
            })}
          />
          {errors.email && (
            <small className="text-danger">{errors?.email?.message}</small>
          )}
        </label>
        <div className="form-footer">
          <div className="form-btns">
            <button type="submit">Send Mail</button>
          </div>
        </div>
      </form>
      <div className="login-regi-footer">
        <NavLink className="" to={"/auth/signin"}>
          Singin
        </NavLink>
      </div>
    </div>
  );
};

export default ForgetPass;
