import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { _HIT_ORIGINE } from "../../../../const";
import { If } from "react-haiku";
import { NavLink } from "react-router-dom";

const Preference = () => {
  const [key, setKey] = useState(0);
  const { profiles } = useSelector((store) => store.user);
  return (
    <div id="page" className="preference-page">
      <If isTrue={!profiles?.length}>
        <div className="center" style={{ minHeight: "70vh" }}>
          <NavLink to="/manage-profiles" className="btn rounded-0 white-btn">
            Manage Profile
          </NavLink>
        </div>
      </If>
      <If isTrue={!!profiles?.length}>
        <Container>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="border-0 justify-content-center"
          >
            {profiles.map((profile, index) => (
              <Tab
                eventKey={index}
                title={
                  <li className="user-profile">
                    <div className="profile-image-wrapper">
                      <img
                        src={`${_HIT_ORIGINE}profile-images/${profile.img}`}
                        alt=""
                        className={`profile-img ${
                          index === +key ? "border border-3" : "border-0"
                        }`}
                      />
                    </div>
                    <p className="profile-name">{profile.name}</p>
                  </li>
                }
                tabClassName="border-0 bg-transparent"
              >
              </Tab>
            ))}
          </Tabs>
        </Container>
      </If>
    </div>
  );
};

export default Preference;
