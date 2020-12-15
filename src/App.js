import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import About from "./components/layout/About";
import Navbar from "./components/layout/Navbar";
import UpdatePreferences from "./components/layout/UpdatePreferences";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import UserPreferencesState from "./context/userPreferences/UserPreferencesState";
import Alerts from "./components/alerts/Alerts";
import setToken from "./utils/setToken";
function App() {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  return (
    <AuthState>
      <AlertState>
        <UserPreferencesState>
          <Router>
            <Navbar />
            <Alerts />
            <div class='container' id='container'>
              <Switch>
                {/* <PrivateRoute
                        exact
                        path='/collections'
                        component={Collections}
                      />  */}
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/about' component={About} />
                <Route exact path='/update' component={UpdatePreferences} />
              </Switch>
            </div>
          </Router>
        </UserPreferencesState>
      </AlertState>
    </AuthState>
  );
}

export default App;
