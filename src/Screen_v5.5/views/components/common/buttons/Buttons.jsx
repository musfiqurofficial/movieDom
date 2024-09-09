import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const ButtonOne = ({
  hover_content,
  children,
  className = "Hover Me",
  type = "button",
  to = "/",
  ...rest
}) => {
  const { is_small_device } = useSelector((store) => store.device);

  return is_small_device ? (
    <NavLink className={`${className} mdom-btn`} to={to} {...rest}>
      {children}
    </NavLink>
  ) : hover_content ? (
    <NavLink to={to} className={`mdom-btn ${className}`} type={type} {...rest}>
      <span className="initial-content one">{children}</span>
      <span className="initial-content two">{children}</span>
      <span className="hover-content">{hover_content}</span>
    </NavLink>
  ) : (
    <NavLink to={to} {...rest} className={`${className} mdom-btn`}>
      {children}
    </NavLink>
  );
};

export const IconButton = ({
  className = "",
  type = "button",
  children = "",
  size,
  icon_size,
  style = {},
  ...rest
}) => {
  if (type === "NavLink") {
    return (
      <NavLink
        type={type}
        className={`icon-btn ${className}`}
        style={{
          "--size": size ? `${size}px` : "",
          "--icon-size": icon_size ? `${icon_size}px` : "",
          ...style,
        }}
        {...rest}
      >
        {children}
      </NavLink>
    );
  } else {
    return (
      <button
        type={type}
        className={`icon-btn ${className}`}
        style={{
          "--size": size ? `${size}px` : "",
          "--icon-size": icon_size ? `${icon_size}px` : "",
          ...style,
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }
};
