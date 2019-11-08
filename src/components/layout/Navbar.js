import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import { Navbar as Nav } from "react-bootstrap";

const Navbar = ({ icon, title }) => {
  return (
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        {title}
      </Link>
      <button class='navbar-toggler' type='button'>
        <span class='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse'>
        <ul class='navbar-nav mr-auto'>
          <li class='nav-item active'>
            <Link to='/' className='nav-link'>
              Home
            </Link>{" "}
          </li>
          <li class='nav-item'>
            <Link to='/about' className='nav-link'>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "agendy",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
