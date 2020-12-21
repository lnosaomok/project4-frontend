import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.goBack();
    }
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const { username, password, password2 } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (username === "" || password === "" || password2 === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        username,
        password,
      });
    }
  };
  return (
    <div class='container' id='container'>
      <div className='register'>
        <h4 className='special-font'>Create a Login</h4>
        <form
          className='col s6'
          onSubmit={(e) => {
            onSubmitForm(e);
          }}
        >
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='round'
                type='text'
                placeholder='username'
                name='username'
                value={username}
                autoComplete='off'
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <span
                className='helper-text'
                data-error='wrong'
                data-success='right'
              >
                Username must be minimum 6 characters and no special characters
              </span>
            </div>
            <div className='input-field col s12'>
              <input
                id='round'
                type='text'
                placeholder='password'
                name='password'
                value={password}
                autoComplete='off'
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <span
                className='helper-text'
                data-error='wrong'
                data-success='right'
              >
                Password must be minimun 6 characters
              </span>
            </div>

            <div className='input-field col s12'>
              <input
                id='round'
                type='text'
                placeholder='confirm password'
                value={password2}
                autoComplete='off'
                name='password2'
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <span
                className='helper-text'
                data-error='wrong'
                data-success='right'
              >
                Password must be minimun 6 characters
              </span>
            </div>

            <div className=''>
              <button
                className='button-btn waves-effect waves-light'
                type='submit'
                id='sign-in'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
