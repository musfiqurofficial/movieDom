import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./Screen_v5.5/redux/store";
import "./Screen_v5.5/scss/style.scss";
import "./assets/scss/style.scss";
import reportWebVitals from "./reportWebVitals";
import "./simple_theme/style/css/main.css";
import { ErrorBoundary } from "react-error-boundary";
import { _HIT_ORIGIN } from "./tools";
import { logError } from "./log";

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div
      role="alert"
      style={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#000011",
        color: "#aabbff",
      }}
      className="text-center"
    >
      <div className="container py-5">
        <img
          src={`${_HIT_ORIGIN}/failed.png`}
          alt="ERROR"
          style={{
            maxWidth: 360,
            width: "100%",
            padding: "1rem",
            margin: "auto",
          }}
        />
        <h3 className="fw-bold mb-4">Something went wrong !</h3>
        <div
          className="p-2 rounded-2 text-start mb-4 mx-auto"
          style={{ maxWidth: 660, border: "2px dashed #444" }}
        >
          <pre className="mb-1">
            <h6 className="text-warning">{error?.name}</h6>
          </pre>
          <div
            className="p-3 rounded-2 text-start mx-auto"
            style={{
              background: "#ffffff10",
              border: "2px dashed #444444",
              maxWidth: 680,
            }}
          >
            {error?.message}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-dark d-flex justify-content-center align-items-center gap-2 py-2 px-3 mx-auto"
          onClick={() => {
            resetErrorBoundary();
            try {
              window.location.pathname = "/";
            } catch (error) {
              console.log(error?.message);
            }
          }}
        >
          <i className="fa-solid fa-rotate-right"></i>
          RETRY
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(
  <ErrorBoundary fallback={Fallback} onError={logError}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById("root")
);

reportWebVitals();
