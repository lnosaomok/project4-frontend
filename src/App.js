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
import { MessagesState } from "./context/messages/MessagesState";
import SavedRecipesIndex from "./components/recipes/SavedRecipiesIndex";
import { useState, useEffect, useContext } from "react";
import RecommendedRecipes from "./components/recipes/RecommendedRecipes";
import ViewRecipe from "./components/recipes/ViewRecipe";
import SavedRecipesView from "./components/recipes/SavedRecipesView";
import AllMessages from "./components/messages/AllMessages";
import CreateRecipe from "./components/recipes/CreateRecipe";
function App() {
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  return (
    <MessagesState>
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
                    <Route exact path='/create' component={CreateRecipe} />

                    <Route
                      exact
                      path='/recommended'
                      component={RecommendedRecipes}
                    />
                    <Route
                      path='/savedrecipes/:index'
                      component={SavedRecipesIndex}
                    />

                    <Route
                      exact
                      path='/searchrecipes'
                      component={SearchRecipes}
                    />
                    <Route exact path='/update' component={UpdatePreferences} />
                    <Route
                      exact
                      path='/view'
                      component={(props) => <ViewRecipe {...props} />}
                    />
                    <Route
                      exact
                      path='/showrecipe'
                      component={(props) => <SavedRecipesView {...props} />}
                    />
                    <Route exact path='/allmessages' component={AllMessages} />
                  </Switch>
                </div>
              </Router>
            </UserPreferencesState>
          </AlertState>
        </AuthState>
      </RecipesState>
    </MessagesState>
  );
}

export default App;
