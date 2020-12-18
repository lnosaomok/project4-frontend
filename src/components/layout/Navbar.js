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
        <Link to='/recommended'> Recommended</Link>
      </li>

      <li>
        <Link to='/savedrecipes/0'> Saved Recipes</Link>
      </li>
      <li>
        <Link to='/searchrecipes'> Search Recipes</Link>
      </li>
      <li>
        <Link to='/allmessages'> All Messages</Link>
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
            Chef's Hub
          </a>
          <ul id='nav-mobile' className='right '>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
