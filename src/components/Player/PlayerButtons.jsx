import { useNavigate } from "react-router-dom";

export default function PlayerButtons({
  children,
  classList = {},
  className = "",
  type,
  ...rest
}) {
  const navigate = useNavigate();
  switch (type) {
    case "link": {
      return (
        <button
          {...rest}
          onClick={() => navigate(-1)}
          className={`${classList.player_button} ${className}`}
        >
          {children}
        </button>
      );
    }
    case "button": {
      return (
        <button
          type="button"
          {...rest}
          className={`${classList.player_button} ${className}`}
        >
          {children}
        </button>
      );
    }
    default: {
      return (
        <button
          type="button"
          {...rest}
          className={`${classList.player_button} ${className}`}
        >
          {children}
        </button>
      );
    }
  }
}
