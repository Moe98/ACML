import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchField from "./components/SearchField";
import setAuthToken from "./helpers/setAuthToken";
import Login from "./components/login/Login";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route exact path="/" component={SearchField} />
            <Route path="/Login" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
