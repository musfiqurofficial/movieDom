import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { email_pattern } from "../../../../const";
import Auth from "../../../../firebase/firebase.action";
import { _firebase_auth_provier_type } from "../../../../type";
import { toast } from "react-toastify";
import PasswordInput from "../../../components/common/Form/PasswordInput";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data) => {
    const sign_up_promise = Auth.signup_user(data);

    toast
      .promise(
        sign_up_promise,
        {
          pending: "Please wait. 🕑",
          success: "Verify e-mail. 📧",
        },
        {
          position: "bottom-right",
        }
      )
      .then((res) => {
        toast.dismiss();
        reset();
        const verify_email_promise = Auth.verify_email(res.user);
        const is_verified = res?.user?.emailVerified;
        if (is_verified) {
          toast.success("Successfully sign up. 🎯", {
            position: "bottom-right",
          });
        } else {
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
            .catch((err) =>
              toast.error(err?.code || "Try again. ⛔", {
                position: "bottom-right",
              })
            );
        }
      })
      .catch((err) =>
        toast.error(err?.code || "Try again. ⛔", {
          position: "bottom-right",
        })
      );
  };

  const onRedirectLogin = (provider) => {
    Auth.singin_with(provider)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onGoogleLogin = () => 
    onRedirectLogin(_firebase_auth_provier_type.google);
  ;
  const onFacebookLogin = () =>
    onRedirectLogin(_firebase_auth_provier_type.facebook);

// useEffect(()=>{
//   dispatch(_update_status(_STATUS.PENDING));
//   getRedirectResult(auth).then(res=>{
//     dispatch(_update_status(_STATUS.SUCCESS));
//   }).catch(err=>{
//     dispatch(_update_status(_STATUS.FAILED));
//     console.log(err.code)
//   })
// },[])

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2 className="form-title">Sign Up</h2>
        <p className="form-sub-title">Watch Movie and TV Series.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login_email">
          <p className="lable-text">Email </p>
          <input
            type="email"
            name="email"
            id="login_email"
            placeholder="example@mail.com"
            {...register("email", {
              required: true,
              pattern: email_pattern,
            })}
          />
          {errors.email && (
            <small className="text-danger">* Email is invalid</small>
          )}
        </label>
        <label htmlFor="login_password">
          <p className="lable-text">Passward </p>
          <PasswordInput register={register} name="password" />
        </label>
        <label htmlFor="login_password">
          <p className="lable-text">Confirm passward </p>
          <PasswordInput
            register={register}
            name="confirm_password"
            validate={(val) => {
              if (watch("password") !== val) {
                return "Password not matched.";
              }
            }}
          />
          {errors.confirm_password && (
            <small className="text-danger">
              * {errors.confirm_password.message || "Password not matched"}.
            </small>
          )}
        </label>{" "}
        <div className="form-footer">
          <div className="form-btns">
            <button type="submit">Sing up</button>
            <NavLink to={"/auth/forget-password"} className="forget_pass">
              Forget Password?
            </NavLink>
          </div>
          <div className="other-option">
            <p className="other-option-title">Sign up with : </p>
            <div className="other-option-btns">
              <button
                onClick={onFacebookLogin}
                type="button"
                className="option-btn facebook  bg-transparent"
              >
                <span className="icon">
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
                <span className="text">Facebook</span>
              </button>
              <button
                onClick={onGoogleLogin}
                type="button"
                className="option-btn google bg-transparent"
              >
                <span className="icon">
                  <i className="fa-brands fa-google"></i>
                </span>
                <span className="text">Google</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="login-regi-footer">
        <NavLink to="/auth/signin">Have an account?</NavLink>
      </div>
    </div>
  );
};

export default Signup;
