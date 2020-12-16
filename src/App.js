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
import RecipesState from "./context/recipes/RecipesState";
import UserPreferencesState from "./context/userPreferences/UserPreferencesState";
import Alerts from "./components/alerts/Alerts";
import setToken from "./utils/setToken";
import SearchRecipes from "./components/recipes/SearchRecipes";
import RecipesContext from "./context/recipes/RecipesContext";
import SavedRecipes from "./components/recipes/SavedRecipies";
import { useState, useEffect, useContext } from "react";

function App() {
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  return (
    <RecipesState>
      <AuthState>
        <AlertState>
          <UserPreferencesState>
            <Router>
              <Navbar />
              <Alerts />
              <div>
                <Switch>
                  {/* <PrivateRoute
                        exact
                        path='/collections'
                        component={Collections}
                      />  */}
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/about' component={About} />
                  <Route path='/savedrecipes/:index' component={SavedRecipes} />

                  <Route
                    exact
                    path='/searchrecipes'
                    component={SearchRecipes}
                  />
                  <Route exact path='/update' component={UpdatePreferences} />
                </Switch>
              </div>
            </Router>
          </UserPreferencesState>
        </AlertState>
      </AuthState>
    </RecipesState>
  );
}

export default App;
