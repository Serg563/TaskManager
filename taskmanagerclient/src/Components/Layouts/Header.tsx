import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../Storage/Redux/store";
import { emptyUserState, setLoggedIn } from "../../Storage/Redux/userAuthSlice";
import { userModel } from "../../Interfaces";
import { SD_Roles } from "../../Utility/SD";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  // console.log(userData.id);
  // console.log(userData.fullname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedIn({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" aria-current="page" to="/tasks">
                  Tasks
                </NavLink>
              </li>
              {userData.role == SD_Roles.ADMIN && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/developers">
                        Developers
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              <div className="d-flex" style={{ margin: "auto" }}></div>

              {userData.email && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      {userData.fullname}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!userData.email && (
                <>
                  <li className="nav-item"></li>
                  <li className="nav-item text-white">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
