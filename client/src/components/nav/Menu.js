import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function Menu() {
  // hook
  const [auth, setAuth] = useAuth();

  const logout = () => {
    // Remove user and token from local storage
    localStorage.removeItem("auth");
    // Put context
    setAuth({ ...auth, user: null, token: null });
  };

  return (
    <>
      {/* justify-content-between: add space between elements; shadow: put bar with shadow; mb-2: margin-bottom: 2*/}
      <ul className="nav d-flex justify-content-between shadow-sm mb-2">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            Homepage
          </NavLink>
        </li>
        {/* if condition true => do login register : do logout */}
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li className="nav-item">
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
                href="/"
              >
                {auth?.user?.firstName}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link pointer" onClick={logout} href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}
