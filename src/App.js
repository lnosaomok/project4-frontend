import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./layout/Login";
import Register from "./layout/Register";
import About from "./layout/About";
import Navbar from "./layout/Navbar";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container-fluid'>
          {/* <Alerts /> */}
          <Switch>
            {/* <PrivateRoute
                        exact
                        path='/collections'
                        component={Collections}
                      />  */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
