import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchField from "./components/SearchField";
import setAuthToken from "./helpers/setAuthToken";
import Login from "./components/login/Login";
import FavouriteArticles from "./components/FavouriteArticles";

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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
