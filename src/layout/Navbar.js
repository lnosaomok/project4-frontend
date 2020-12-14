import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min";

const Navbar = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
  });
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>
            <i className='large material-icons'>restaurant_menu</i>
            MealHub
            <i className='large material-icons'>people</i>
          </a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>|</li>
            <li>
              <Link to='/about'> About</Link>
            </li>
            <li>
              <Link to='/login'> Login</Link>
            </li>
            <li>
              <Link to='/register'> Register</Link>
            </li>
            <li>
              <i className='material-icons right'>collections</i>
            </li>
            <li>
              <Link to='/collections'> My Collections</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* <ul id='slide-out' className='sidenav '>
        <li>
          <div className='user-view'>
            <div className='background'></div>
            <a href='#name'>
              <span className='white-text name'>John Doe</span>
            </a>
            <a href='#email'>
              <span className='white-text email'>jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href='#!'>
            <i className='material-icons'>cloud</i>First Link With Icon
          </a>
        </li>
        <li>
          <a href='#!'>Second Link</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <a className='subheader'>Subheader</a>
        </li>
        <li>
          <a className='waves-effect' href='#!'>
            Third Link With Waves
          </a>
        </li>
      </ul>
      <ul id='slide-out' className='sidenav '>
        <li>
          <div className='user-view'>
            <div className='background'></div>
            <a href='#name'>
              <span className='white-text name'>John Doe</span>
            </a>
            <a href='#email'>
              <span className='white-text email'>jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href='#!'>
            <i className='material-icons'>cloud</i>First Link With Icon
          </a>
        </li>
        <li>
          <a href='#!'>Second Link</a>
        </li>
        <li>
          <div className='divider'></div>
        </li>
        <li>
          <a className='subheader'>Subheader</a>
        </li>
        <li>
          <a className='waves-effect' href='#!'>
            Third Link With Waves
          </a>
        </li>
      </ul>
      <a
        href='#'
        data-target='slide-out'
        className='sidenav-trigger show-on-large'
      >
        <i className='material-icons'>menu</i>
      </a> */}
    </>
  );
};

export default Navbar;
