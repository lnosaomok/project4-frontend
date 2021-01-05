import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Navbar from "./components/layout/Navbar";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import RecipesState from "./context/recipes/RecipesState";
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
            <Router>
              <Navbar />
              <Alerts />
              <div>
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute exact path='/create' component={CreateRecipe} />

                  <PrivateRoute
                    exact
                    path='/recommended'
                    component={RecommendedRecipes}
                  />
                  <PrivateRoute
                    path='/savedrecipes/:index'
                    component={SavedRecipesIndex}
                  />
                  <PrivateRoute
                    exact
                    path='/view'
                    component={(props) => <ViewRecipe {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path='/post'
                    component={(props) => <ViewPost {...props} />}
                  />
                  <PrivateRoute
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
          </AlertState>
        </AuthState>
      </RecipesState>
    </MessagesState>
  );
}

export default App;
