import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchField from "./components/SearchField";
import RecommendedArticles from "./components/RecommendedArticles";
import FavouriteArticles from "./components/FavouriteArticles";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
            <Route path="/" component={SearchField} />
            <Route path="/favourite" component={FavouriteArticles} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
