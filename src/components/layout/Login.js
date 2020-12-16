import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userData;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        username,
        password,
      });
    }
  };

  return (
    <div class='container' id='container'>
      <div className='register'>
        <h4 className='special-font'>Login to your account</h4>
        <form
          className='col s6'
          onSubmit={(e) => {
            onSubmitForm(e);
          }}
        >
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='text'
                type='text'
                placeholder='username'
                name='username'
                value={username}
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <span
                className='helper-text'
                data-error='wrong'
                data-success='right'
              >
                Username must be minimun 6 characters
              </span>
            </div>
            <div className='input-field col s12'>
              <input
                id='text'
                type='text'
                placeholder='password'
                name='password'
                value={password}
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

export default Login;
