import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";
import { MOVIES_DUMMY_DATA } from "../../../data/movies";
import Auth from "../../../firebase/firebase.action";
import Icon from "../icons/Icons";
import { If } from "react-haiku";
import { Button } from "react-bootstrap";
import { _HIT_ORIGINE } from "../../../const";
import { useDispatch } from "react-redux";
import {
  fitlerSelector,
  updateSearch,
} from "../../../redux/slices/filter_slice";
import { useMemo } from "react";

const Header = () => {
  const { user, menu } = useSelector((store) => store);
  const onSignOut = () => {
    toast
      .promise(Auth.singout_user(), {
        pending: "Please wait. ",
        success: "Signed out.",
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.code || "Try Again!");
      });
  };

  const menu_1 = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/movies",
      name: "Movies",
      params: "category",
      subMenu: menu.movies.category,
    },
    {
      route: "/tvseries",
      name: "TVseries",
    },
    {
      route: "/favourit",
      name: "Favourite",
    },
    {
      route: "/movies",
      name: "Others",
      subMenu: [
        {
          route: "/otp",
          name: "OTP",
        },
        {
          route: "/preference",
          name: "Preference",
        },
        {
          route: "/manage-profiles",
          name: "Profile",
        },
        {
          route: "/checkout",
          name: "checkout",
        },
      ],
    },
    {
      route: "/movies",
      name: "Others",
      subMenu: [
        {
          route: "/otp",
          name: "OTP",
        },
        {
          route: "/preference",
          name: "Preference",
        },
        {
          route: "/manage-profiles",
          name: "Profile",
        },
        {
          route: "/checkout",
          name: "checkout",
        },
      ],
    },
  ];
  return (
    <Navbar className="mdom-header">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="" className="img-fluid" />
        </Navbar.Brand>
        <Nav className="mdom-nav-text-menu">
          {menu_1.map((parent_item, i) => (
            <Nav.Link
              as={NavLink}
              to={parent_item.route}
              key={i}
              className={`mdom-nav-menu-item ${
                parent_item?.subMenu ? "drop-down-menu-area" : ""
              }`}
            >
              <span
                className={`${parent_item?.subMenu ? "drop-down-header" : ""}`}
              >
                {parent_item.name}
              </span>
              {parent_item.subMenu && (
                <div className="drop-down-box">
                  <ul className="drop-down-list">
                    {parent_item?.subMenu?.map((item) => {
                      const params = parent_item.params
                        ? `?${parent_item.params}=${item}`
                        : "";
                      const ulr_to = item.route
                        ? item.route
                        : `${parent_item.route}${params}`;
                      return (
                        <Nav.Link
                          as={NavLink}
                          to={ulr_to}
                          className="drop-down-item"
                        >
                          {item.name ? item.name : item}
                        </Nav.Link>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Nav.Link>
          ))}
        </Nav>
        <Nav className="mdom-nav-icon-menu">
          <SearchArea />
          <If isTrue={!!user?.account?.uid}>
            {/* notification */}
            <Nav.Link
              href="#notification"
              className="mdom-nav-menu-item header-notification drop-down-menu-area"
            >
              <span className="drop-down-header">
                <Icon.NotificationDuoTone size="32px" />
              </span>

              {MOVIES_DUMMY_DATA.length !== 0 && (
                <div className="drop-down-box rigthed">
                  <ul className="drop-down-list">
                    {MOVIES_DUMMY_DATA.map((item, i) => (
                      <li className="drop-down-item">
                        <div className="img-box">
                          <img
                            src={item.backdrop}
                            className="w-100"
                            alt="poster"
                          />
                        </div>
                        <div className="details">
                          <p className="title">{item.title}</p>
                          <p className="desc">{i + 1} day ago</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Nav.Link>
            {/* user opt. */}
            <Nav.Link
              href="##"
              className="mdom-nav-menu-item header-user drop-down-menu-area"
            >
              <span className="drop-down-header">
                <Icon.UserDuoTone size="32px" />
              </span>
              <div className="drop-down-box rigthed">
                <ul className="drop-down-list">
                  <If isTrue={user?.profiles?.length}>
                    {user?.profiles?.map((item) => (
                      <li className="drop-down-item">
                        <img
                          src={`${_HIT_ORIGINE}profile-images/${item.img}`}
                          alt={item.name}
                        />
                        <p>{item.name}</p>
                      </li>
                    ))}
                    <hr />
                  </If>

                  <NavLink to="/manage-profiles" className="drop-down-item">
                    <span className="icon">
                      <Icon.PenDuoTone size="24px" />
                    </span>
                    <p>Manage Profile</p>
                  </NavLink>
                  <NavLink to="/preference" className="drop-down-item">
                    <span className="icon">
                      <Icon.PenDuoTone size="24px" />
                    </span>
                    <p>Preference</p>
                  </NavLink>
                  <hr />
                  <li className="drop-down-item">
                    <span className="icon">
                      <Icon.Setting size="24px" />
                    </span>
                    <p>Settings</p>
                  </li>
                  <li className="drop-down-item">
                    <span className="icon">
                      <Icon.Report size="24px" />
                    </span>
                    <p>Help</p>
                  </li>
                  <li className="drop-down-item">
                    <button
                      className="bg-transparent d-flex p-0"
                      onClick={onSignOut}
                    >
                      <span className="icon">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      </span>
                      <p className="bg-transparent py-10 px-10">Sign Out</p>
                    </button>
                  </li>
                </ul>
              </div>
            </Nav.Link>
          </If>
          <If isTrue={!user?.account?.uid}>
            <Button
              className="login-btn rounded-5"
              as={NavLink}
              to={"/auth/signin"}
            >
              <i className="fa-solid fa-arrow-right-to-bracket me-1"></i> Signin
            </Button>
          </If>
        </Nav>
      </Container>
    </Navbar>
  );
};

const SearchArea = () => {
  const [open, setOpen] = useState(false);
  const search_input = useRef(null);
  const dispatch = useDispatch();
  const { search } = useSelector(fitlerSelector);
  const [search_params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [prev_route, setPrevRoute] = useState("/");
  const query_obj=useMemo(()=>Object.fromEntries(search_params),[search_params]);

  function onSearch(e) {
    const search_text = e.target.value;
    dispatch(updateSearch(search_text || query_obj.search || ''))
    if (!search_text) {
      navigate(prev_route);
    } else {
      navigate(`/search?search=${search_text}`, { replace: true });
    }
  }

  useEffect(() => {
    if (search_input.current && open) {
      search_input.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const query_obj = Object.fromEntries(search_params);
    dispatch(updateSearch(query_obj?.search || ""));
    const redirect_to_prev =
      !query_obj?.search && location.pathname === "/search";
    redirect_to_prev && navigate(prev_route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(location.pathname !== "/search"){
      setPrevRoute(location.pathname);
      dispatch(updateSearch(''))
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Nav.Link
        href="#home"
        className="mdom-nav-menu-item"
        onClick={() => setOpen(true)}
      >
        <Icon.SearchDuoTone size="32px" />
      </Nav.Link>
      <div className="search-area">
        <div className={`search-form ${open ? "top-0" : "top-/-100"}`}>
          <span className="icon">
            <Icon.SearchDuoTone size="42px" />
          </span>
          <label htmlFor="header-search-input">
            <input
              ref={search_input}
              onBlur={() => setOpen(false)}
              type="search"
              value={search}
              onChange={onSearch}
              id="header-search-input"
              placeholder="Search Movie / TVseries / Software ... ..."
            />
          </label>
          <span className="icon" onClick={() => setOpen(false)}>
            <Icon.CloseCircleDuoTone size="42px" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
