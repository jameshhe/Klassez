import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Provider} from "react-redux"
import {setCurrentUser, logoutUser} from "./actions/authActions"
import jwt_decode from "jwt-decode"
import PrivateRoute from "./components/privateRoute"
import store from "./store"
import setAuthToken from "./utils/setAuthToken"
import {ROUTES} from "./Routes.jsx"
import Navigation from "./components/navigation"
import Landing from "./components/landing"
import Login from "./components/login"
import Register from "./components/register/register"
import ClassList from "./components/classList/classList"
import ClassForm from "./components/classForm"
import "./App.css"


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
	            <Router>
                    <Navigation/>
	                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/landing" component={Landing}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/classList" component={ClassList}/>
                    <Route exact path="/classForm" component={ClassForm}/>
                    <Route exact path="/classForm/edit/:classId" component={ClassForm}/>
                    {ROUTES.map((route, i) => <PrivateRoute key={i} {...route}/>)}
	                </Switch>
	            </Router>
	    	</div>
    </Provider>
  );
};

export default App;

