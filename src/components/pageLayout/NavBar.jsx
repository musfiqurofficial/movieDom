import React, { useState, useContext } from "react";
import { WindowContext } from "../../Context/WindowContextProvider";
import { useNavigate, Link, useLocation, NavLink } from "react-router-dom";
import { useRef } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import usePublicMenu from "../../Hook/usePublicMenu";
import useSite from "../../Hook/useSite";
import useMenu from "../../Hook/useMenu";

const Header = ({ handleButton, openSideBar, menu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logo, appName, logo_width } = useSite();
  const [prevPath, setPrevPath] = useState("/");
  const { menu: api_menu } = useMenu();
  function handleSearch(e) {
    if (!location.pathname.includes("/search")) {
      setPrevPath(location.pathname);
    }
    if (e.target.value.length) {
      navigate({
        pathname: "/search",
        search: `?search=${e.target.value}`,
      });
    } else {
      navigate({ pathname: prevPath });
    }
  }

  const { notScrolled, notDesktop } = useContext(WindowContext);
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef(null);

  return (
    <header>
      <div
        className={`${
          !notScrolled ? "glass-bg" : "slideInUp"
        } animated header-sticky menu-fixed fadeInDown`}
      >
        <div className="theme-container">
          <div className="header-item">
            <div className="logo-area">
              <div className="logo">
                <Link to="/">
                  <img
                    src={logo}
                    alt={appName}
                    style={{ maxWidth: logo_width }}
                  />
                </Link>
              </div>
            </div>
            {!notDesktop && (
              <div className="main-menu">
                <ul className="menu-list">
                  <li className="nav-bar-item">
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to="/movies"
                    >
                      Movies
                    </NavLink>
                    {api_menu?.movies?.categories &&
                      api_menu?.movies?.categories?.length !== 0 && (
                        <div className="sub-menu">
                          <ul className="sub-list">
                            {api_menu?.movies?.categories?.map((item, i) => (
                              <li key={i}>
                                <NavLink to={`movies?category=${item.name}`}>
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </li>
                  <li className="nav-bar-item">
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to="/tv-series"
                    >
                      TV Series
                    </NavLink>
                    {api_menu?.tvs?.categories &&
                      api_menu?.tvs?.categories?.length !== 0 && (
                        <div className="sub-menu">
                          <ul className="sub-list">
                            {api_menu?.tvs?.categories?.map((item, i) => (
                              <li key={i}>
                                <NavLink to={`tv-series?category=${item.name}`}>
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </li>
                  {menu.show_genre && (
                    <li className="nav-bar-item">
                      <Nav.Link href="#Genre">Genre</Nav.Link>
                      {api_menu?.movies?.genre &&
                        api_menu?.movies?.genre?.length !== 0 && (
                          <div className="sub-menu">
                            <ul className="sub-list">
                              {api_menu?.movies?.genre?.map((item, i) => (
                                <li key={i}>
                                  <NavLink to={`movies?genre=${item.name}`}>
                                    {item.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </li>
                  )}

                  {menu?.main_menu?.map((main_item, i) => (
                    <li key={i} className="nav-bar-item">
                      {main_item?.route && (
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          to={main_item?.route}
                        >
                          {main_item?.name}
                        </NavLink>
                      )}
                      {(main_item.url || main_item.ip || main_item.origin) && (
                        <Nav.Link
                          target="_blank"
                          href={
                            main_item.url || main_item.ip || main_item.origin
                          }
                          dangerouslySetInnerHTML={{ __html: main_item.name }}
                        />
                      )}
                      {(main_item.sub_menu
                        ? main_item?.sub_menu?.length !== 0
                        : main_item.sub_menu) && (
                        <>
                          <Nav.Link
                            href={
                              main_item.url || main_item.ip || main_item.origin
                            }
                            dangerouslySetInnerHTML={{ __html: main_item.name }}
                          />
                          <div className="sub-menu">
                            <ul className="sub-list">
                              {main_item?.sub_menu?.map((sub_item, i) => (
                                <li key={i}>
                                  {main_item.type !== "outer" ? (
                                    main_item?.route ? (
                                      <NavLink
                                        to={`${main_item?.route}?${main_item.params}=${sub_item.name}#filter-section`}
                                      >
                                        {sub_item.name}
                                      </NavLink>
                                    ) : sub_item.params ? (
                                      <NavLink
                                        to={`${sub_item?.route}?${main_item.params}=${sub_item.name}#filter-section`}
                                      >
                                        {sub_item.name}
                                      </NavLink>
                                    ) : (
                                      <a
                                        href={sub_item.ip}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {sub_item.name}
                                      </a>
                                    )
                                  ) : (
                                    <a
                                      href={sub_item.ip}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {sub_item.name}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="user-item">
              <div className="item-list">
                <button
                  type="button"
                  className="search-bar"
                  onClick={() => {
                    setOpenSearch(true);
                  }}
                >
                  <i className="fa fa-search"></i>
                </button>
                <div
                  onBlur={() => setOpenSearch(false)}
                  className={`search-input ${openSearch && "open"}`}
                >
                  <div className="search-input-icon">
                    <i className="fa fa-search info"></i>
                  </div>
                  <input
                    ref={searchRef}
                    className="input"
                    type="text"
                    placeholder="SEARCH Movie , Tv Series by name , year , actors..."
                    id="searchList"
                    onChange={handleSearch}
                  />
                  <div
                    className="search-input-close"
                    onClick={() => {
                      setOpenSearch(false);
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </div>
                  <ul className="search-list search-list-main"></ul>
                </div>
                <button
                  type="button"
                  className={`movie-sliderBtn ${openSideBar ? "active" : ""}`}
                  onClick={() => handleButton("open")}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div
              className={`${openSideBar && "active"} body-overlay`}
              onClick={() => handleButton("close")}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavBar = () => {
  const { menu: api_menu } = useMenu();
  const [openSideBar, setOpenSideBar] = useState(false);
  const { pathname } = useLocation();
  const handleButton = (type) => {
    if (type === "open") setOpenSideBar(true);
    else if (type === "close") setOpenSideBar(false);
  };
  const public_menu = usePublicMenu();

  return (
    <>
      {!pathname.includes("/player") ? (
        <>
          <Header
            handleButton={handleButton}
            menu={public_menu}
            openSideBar={openSideBar}
          />
          <div className={`movie-sidebar ${openSideBar ? "active" : ""}`}>
            <div className="sidebar-title">
              <button
                type="button"
                id="croseBtn"
                onClick={() => handleButton("close")}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <ul className="sidebar-menulist" id="accordionExample">
              <li>
                <NavDropdown title="Movie Genre" id="basic-nav-dropdown">
                  {api_menu?.movies?.genre &&
                    api_menu?.movies?.genre?.length !== 0 &&
                    api_menu?.movies?.genre?.map((item) => (
                      <NavDropdown.Item
                        as={Link}
                        to={`movies?genre=${item?.name}`}
                        key={item.id}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              </li>

              <li>
                <NavDropdown title="TV Genre" id="basic-nav-dropdown">
                  {api_menu?.tvs?.genre &&
                    api_menu?.tvs?.genre?.length !== 0 &&
                    api_menu?.tvs?.genre?.map((item) => (
                      <NavDropdown.Item
                        as={Link}
                        to={`tv-series?genre=${item?.name}`}
                        key={item.id}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              </li>

              {public_menu?.side_menu?.map((item) => (
                <li key={item.name}>
                  {item.route && (
                    <NavLink
                      to={item.route}
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                  )}
                  {item.sub_menu && (
                    <NavDropdown
                      title={
                        <span
                          dangerouslySetInnerHTML={{ __html: item?.name }}
                        />
                      }
                      id="basic-nav-dropdown"
                    >
                      {item?.sub_menu?.map((item) =>
                        item?.route ? (
                          <NavDropdown.Item
                            as={Link}
                            to={`${item?.route}?${item?.name}=${item?.name}`}
                            key={item.id}
                          >
                            {item.name}
                          </NavDropdown.Item>
                        ) : (
                          <a
                            href={item.ip}
                            key={item.name}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.name}
                          </a>
                        )
                      )}
                    </NavDropdown>
                  )}
                  {(item.url || item.origin || item.ip) && (
                    <Nav.Link
                      target="_blank"
                      href={item.origin || item.url || item.ip}
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBar;
