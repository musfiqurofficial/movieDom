import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { email_pattern } from "../../../../const";
import Auth from "../../../../firebase/firebase.action";
import { _firebase_auth_provier_type } from "../../../../type";
import { toast } from "react-toastify";
import PasswordInput from "../../../components/common/Form/PasswordInput";

const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const user_sign_in_promise = Auth.singin_user(data);
    toast
      .promise(
        user_sign_in_promise,
        {
          pending: "Please wait. 🕑",
          success: "Verify mail. 🏁",
        },
        {
          position: "bottom-right",
        }
      )
      .then((res) => {
        const is_verified = res?.user?.emailVerified;
        toast.dismiss();
        reset();
        if (is_verified) {
          toast.success("Successfully sign in.", {
            position: "bottom-right",
          });
        } else {
          const verify_email_promise = Auth.verify_email(res.user);
          toast
            .promise(
              verify_email_promise,
              {
                pending: "Please wait. 🕑",
                success: "Verify your e-mail. Check inbox. 📧",
              },
              {
                position: "bottom-right",
              }
            )
            .catch((err) => {
              toast.dismiss();
              toast.error(err.code || "Try again! ⛔", {
                position: "bottom-right",
              });
            });
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.code || "Try again! ⛔", {
          position: "bottom-right",
        });
      });
  };

  const onRedirectLogin = (provider) => {
    Auth.singin_with(provider)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onGoogleLogin = () =>
    onRedirectLogin(_firebase_auth_provier_type.google);
  const onFacebookLogin = () =>
    onRedirectLogin(_firebase_auth_provier_type.facebook);
  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2 className="form-title">Sign In</h2>
        <p className="form-sub-title">Watch Movie and TV Series.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login_email">
          <p className="lable-text">Email </p>
          <input
            type="text"
            name="email"
            id="login_email"
            placeholder="example@mail.com"
            {...register("email", {
              required: true,
              pattern: email_pattern,
            })}
          />
          {errors.email && (
            <small className="text-danger">
              * {errors.email?.message || "Email is invalid"}
            </small>
          )}
        </label>
        <label htmlFor="login_password">
          <p className="lable-text">Passward </p>
          <PasswordInput register={register} name="password" />
          {errors.password && (
            <small className="text-danger">
              *{" "}
              {errors.password.type === "minLength"
                ? "Too short password"
                : "Invalid password."}
            </small>
          )}
        </label>{" "}
        <div className="form-footer">
          <div className="form-btns">
            <button type="submit">Sing in</button>
            <NavLink to={"/auth/forget-password"} className="forget_pass">
              Forget Password?
            </NavLink>
          </div>
        </div>
      </form>
      <div className="other-option">
        <p className="other-option-title">Signin with : </p>
        <div className="other-option-btns">
          <button
            type="button"
            className="bg-transparent option-btn facebook"
            onClick={onFacebookLogin}
          >
            <span className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </span>
            <span className="text">Facebook</span>
          </button>
          <button
            type="button"
            className="bg-transparent option-btn google"
            onClick={onGoogleLogin}
          >
            <span className="icon">
              <i className="fa-brands fa-google"></i>
            </span>
            <span className="text">Google</span>
          </button>
        </div>
      </div>
      <div className="login-regi-footer">
        <NavLink to="/auth/signup">Create new account?</NavLink>
      </div>
    </div>
  );
};

export default Signin;
