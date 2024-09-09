import { useState } from "react";

const PasswordInput = ({
  register,
  name,
  validate = () => {},
}) => {
  const [show, setShow] = useState(false);
  const onToggleShow = () => setShow((state) => !state);
  return (
    <div className="password-input">
      <input
        type={show ? "text" : "password"}
        placeholder="*** password ***"
        {...register(name, {
          required: true,
          minLength: 6,
          validate: validate,
        })}
      />
      {!show ? (
        <i
          className="fa-solid fa-eye password-toggle-icon"
          onClick={onToggleShow}
        ></i>
      ) : (
        <i
          className="fa-solid fa-eye-slash password-toggle-icon"
          onClick={onToggleShow}
        ></i>
      )}
    </div>
  );
};

export default PasswordInput;
