import React, { useRef } from 'react';
import "./Navbar.css";
import { FcTodoList } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const navbarCollapse = useRef(null);

  const logout = () => {
    sessionStorage.removeItem("id");
    dispatch(authActions.logout());
    closeNavbar();
  };

  const closeNavbar = () => {
    if (navbarCollapse.current && window.innerWidth < 992) {
      navbarCollapse.current.classList.remove('show');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          <FcTodoList className="logo-icon" /> <span className="brand-text">TODO</span>
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarCollapse}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item mx-2">
              <Link className="nav-link btn-nav" to="/home" onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link btn-nav" to="/about" onClick={closeNavbar}>About Us</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link btn-nav" to="/todo" onClick={closeNavbar}>ToDo</Link>
            </li>

            {!isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link btn-nav" to="/signup" onClick={closeNavbar}>Sign Up</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link btn-nav" to="/signin" onClick={closeNavbar}>Sign In</Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li className="nav-item mx-2">
                <span className="nav-link btn-nav logout-btn" onClick={logout} role="button" tabIndex={0}>
                  Log out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
