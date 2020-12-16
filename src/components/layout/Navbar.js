import React, { useEffect, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min";
import AuthContext from "../../context/auth/AuthContext";
const Navbar = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
  });

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = async () => {
    await logout();
    window.location.reload();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>|</li>
      <li>
        <Link to='/about'> About</Link>
      </li>

      <li>
        <Link to='/update'> Update Preferences</Link>
      </li>

      <li>
        <Link to='/savedrecipes/0'> Saved Recipes</Link>
      </li>
      <li>
        <Link to='/searchrecipes'> Search Recipes</Link>
      </li>

      <li>Hello {user && user.username}</li>
      <li>
        <a onClick={onLogout}>
          Logout <i className='material-icons right'>arrow_back</i>
          <span className='hide'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>|</li>
      <li>
        <Link to='/about'> About</Link>
      </li>
      <li>
        <Link to='/register'> Register </Link>
      </li>
      <li>
        <Link to='/login'> Login </Link>
      </li>
    </Fragment>
  );
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo special-font'>
            <i className='large material-icons'>restaurant_menu</i>
            RecipeHub
            <i className='large material-icons'>people</i>
          </a>
          <ul id='nav-mobile' className='right '>
            {isAuthenticated ? authLinks : guestLinks}
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
