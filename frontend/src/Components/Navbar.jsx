import { NavLink } from "react-router-dom";
import "../Components/Navbar.css";

const Navbar = () => {

  return (
    <>
      <nav className="flex w-full justify-between bg-[#2d3a4b]">
        <ul className="nav-container float-right ">
          {/* <li>
            <NavLink to="/" className={`nav-links nav-link-ltr `}>
              ChatApp
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/signup" className={`nav-links nav-link-ltr `}>
              Signup
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/login"
              className={`border text-white bg-red-500 p-2 rounded-md  hover:bg-red-600 `}
              
            >
              LogOut
            </NavLink>
          </li> */}

          <li>
            <NavLink to="login" className={`nav-links nav-link-ltr `}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
