import React from "react";
import { Container } from "react-bootstrap";

const PlanTable = () => {
  return (
    <div id="page">
      <Container>
        <div className="header">
          <p className="subtitle">Step 2 of 3</p>
          <h3 className="title">Choose the plan that's right for you.</h3>
          <ul className="feature-list">
            <li className="feature-list-item">
              <span className="icon">
                <i className="fa-solid fa-check"></i>
              </span>
              <span className="text">Watch all you want. Ad-free.</span>
            </li>
            <li className="feature-list-item">
              <span className="icon">
                <i className="fa-solid fa-check"></i>
              </span>
              <span className="text">Watch all you want. Ad-free.</span>
            </li>
            <li className="feature-list-item">
              <span className="icon">
                <i className="fa-solid fa-check"></i>
              </span>
              <span className="text">Watch all you want. Ad-free.</span>
            </li>
          </ul>
        </div>

        <div className="pricing-table">
          <table>
            <tbody>
              {[...Array(4)].map((item, i) => (
                <tr>
                  <td className="package-title">
                    {i === 0 ? "" : "Title ------------------------"}{" "}
                  </td>
                  <td className={i === 0 ? "package-name" : "package-data"}>
                    <span
                      style={{
                        aspectRatio: i === 0 && 1,
                      }}
                    >
                      {i === 0
                        ? "Package"
                        : [...Array(3)].map((item) => (
                            <div className="data">
                              <span className="icon">+</span>
                              <span className="text">Pro</span>
                            </div>
                          ))}
                    </span>
                  </td>
                  <td className={i === 0 ? "package-name" : "package-data"}>
                    <span
                      style={{
                        aspectRatio: i === 0 && 1,
                      }}
                    >
                      {i === 0
                        ? "Package"
                        : [...Array(3)].map((item) => (
                            <div className="data">
                              <span className="icon">+</span>
                              <span className="text">Pro</span>
                            </div>
                          ))}
                    </span>
                  </td>
                  <td className={i === 0 ? "package-name" : "package-data"}>
                    <span
                      style={{
                        aspectRatio: i === 0 && 1,
                      }}
                    >
                      {i === 0
                        ? "Package"
                        : [...Array(3)].map((item) => (
                            <div className="data">
                              <span className="icon">+</span>
                              <span className="text">Pro</span>
                            </div>
                          ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default PlanTable;
