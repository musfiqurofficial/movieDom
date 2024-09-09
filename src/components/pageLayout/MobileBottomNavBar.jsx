import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { WindowContext } from "../../Context/WindowContextProvider";
import usePublicMenu from "../../Hook/usePublicMenu";
import { FaClipboardList } from "react-icons/fa";
import { Nav } from "react-bootstrap";

const MobileBottomNavBar = () => {
  const { notDesktop } = useContext(WindowContext);
  const location = useLocation();
  const public_menu = usePublicMenu();

  return notDesktop && !location.pathname.includes("/player") ? (
    <nav className="mobile-bottom-nav-bar">
      <ul className="mobile-nav-items justify-content-space-around mx-auto">
        {public_menu?.mobile_menu?.map(
          (item) =>
            item.route ? (
              <NavLink
                key={item.name}
                to={item.route}
                className={({ isActive }) =>
                  ` mobile-nav-item ${isActive ? "active" : ""}`
                }
              >
                <div className="icon">
                  {item.name.toLowerCase().includes("home") ? (
                    <AiOutlineHome />
                  ) : item.name.toLowerCase().includes("movie") ? (
                    <BiMoviePlay />
                  ) : item.name.toLowerCase().includes("tv") ? (
                    <RiPlayList2Fill />
                  ) : (
                    <FaClipboardList />
                  )}
                </div>
                <span>{item.name}</span>
              </NavLink>
            ):(
              <Nav.Link
                key={item.name}
                href={item.url}
                className='mobile-nav-item'
              >
                <div className="icon">
                  {item.name.toLowerCase().includes("home") ? (
                    <AiOutlineHome />
                  ) : item.name.toLowerCase().includes("movie") ? (
                    <BiMoviePlay />
                  ) : item.name.toLowerCase().includes("tv") ? (
                    <RiPlayList2Fill />
                  ) : (
                    <FaClipboardList />
                  )}
                </div>
                <span>{item.name}</span>
              </Nav.Link>
            )
        )}
      </ul>
    </nav>
  ) : (
    <></>
  );
};

export default MobileBottomNavBar;
