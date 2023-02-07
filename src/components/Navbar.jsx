import { ShoppingCartSharp } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const qty = useSelector((state) => state.cart.qty);

  const { state } = useContext(AuthContext);

  const { userInfo } = state;

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li id="logo">
              {" "}
              <NavLink to="/" className="unnstyled-link">
                ICYGB
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/sneakers" className="nav-link">
                Brands
              </NavLink>
            </li>
            <li>
              {" "}
              {userInfo ? (
                <NavLink to="/" className="nav-link" onClick={handleLogOut}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}
            </li>
            <li>
              {userInfo ? null : (
                <NavLink to="/register" className="nav-link">
                  Registro
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to="/cart" className="unnstyled-link">
                <Badge badgeContent={qty} color="primary">
                  <ShoppingCartSharp />
                </Badge>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
