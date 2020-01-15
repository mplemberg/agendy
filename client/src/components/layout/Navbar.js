import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import { Navbar as Nav } from "react-bootstrap";

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white border-bottom py-1'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <img
            src='/logo2.png'
            alt={title}
            style={{
              width: "92px",
              height: "22px"
            }}
          />
        </Link>
        <button className='navbar-toggler' type='button'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>{" "}
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-link'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "hippidy",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
