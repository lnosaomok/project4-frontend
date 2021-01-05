import React, { useEffect, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { Redirect } from "react-router-dom";

const Navbar = (props) => {
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
        <Link to='/recommended'> Recommended Recipes</Link>
      </li>
      <li>|</li>
      <li>
        <Link to='/savedrecipes/0'> My Recipes</Link>
      </li>
      <li>|</li>
      <li>
        <Link to='/create'> Create Recipe</Link>
      </li>
      <li>|</li>
      <li>
        <Link to='/allmessages'> Q&A Channel</Link>
      </li>
      <li>|</li>
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
            Chefs' Place
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
