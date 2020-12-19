import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Navbar from "./components/layout/Navbar";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import RecipesState from "./context/recipes/RecipesState";
import UserPreferencesState from "./context/userPreferences/UserPreferencesState";
import Alerts from "./components/alerts/Alerts";
import setToken from "./utils/setToken";
import { MessagesState } from "./context/messages/MessagesState";
import SavedRecipesIndex from "./components/recipes/SavedRecipiesIndex";
import RecommendedRecipes from "./components/recipes/RecommendedRecipes";
import ViewRecipe from "./components/recipes/ViewRecipe";
import SavedRecipesView from "./components/recipes/SavedRecipesView";
import AllMessages from "./components/messages/AllMessages";
import CreateRecipe from "./components/recipes/CreateRecipe";
import ViewPost from "./components/messages/ViewPost";
import PrivateRoute from "./components/Routing/PrivateRoute";

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
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute
                      exact
                      path='/'
                      component={RecommendedRecipes}
                    />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute
                      exact
                      path='/create'
                      component={CreateRecipe}
                    />

                    <PrivateRoute
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
                      path='/view'
                      component={(props) => <ViewRecipe {...props} />}
                    />
                    <Route
                      exact
                      path='/post'
                      component={(props) => <ViewPost {...props} />}
                    />
                    <Route
                      exact
                      path='/showrecipe'
                      component={(props) => <SavedRecipesView {...props} />}
                    />
                    <PrivateRoute
                      exact
                      path='/allmessages'
                      component={AllMessages}
                    />
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
