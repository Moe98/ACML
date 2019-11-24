import React, { Component } from "react";
import parseJwt from "../helpers/decryptAuthToken";
import { logout } from "../globalState/actions/authActions";
import { Redirect } from "react-router-dom";
import Articles from "./Articles";
import RecommendedArticles from "./RecommendedArticles";
import FavoriteArticles from "./FavouriteArticles";
import Login from "./login/Login";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { fade, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: [],
      done: false,
      remove: false,
      clicked: false,
      recommendedDone: false,
      login: false,
      favorite: false,
      home: false
    };
  }
  async componentDidMount() {
    this.setState({ searchText: [] });
    this.setState({ done: false });
    this.setState({ remove: false });
    this.setState({ clicked: false });
    this.setState({ againClicked: false });
    this.setState({ recommendedDone: false });
    this.setState({ login: false });
    try {
      await this.setState({ id: parseJwt(localStorage.jwtToken).id });
    } catch {
      this.setState({ id: null });
    }
  }

  keyPressed = event => {
    if (event.key === "Enter") {
      this.setState({ searchText: [event.target.value] });
      this.setState({ done: true });
      this.setState({ remove: true });
      this.setState({ clicked: false });
      this.setState({ againClicked: false });
      this.setState({ favorite: false });
      this.setState({ home: false });
      this.setState({ recommendedDone: false });
    } else {
      this.setState({ remove: false });
    }
  };

  handleLogin = () => {
    console.log("in here?");
    console.log("id", this.state.id);
    if (this.state.id) {
      logout();
      window.location.reload();
    } else {
      if (!this.state.login) {
        console.log("here");
        this.setState({ home: false });
        this.setState({ login: true });
      }
    }
  };

  handleFavorite = () => {
    this.setState({ favorite: true });
    this.setState({ searchText: [] });
    this.setState({ done: false });
    this.setState({ remove: false });
    this.setState({ clicked: false });
    this.setState({ againClicked: false });
    this.setState({ recommendedDone: false });
    this.setState({ login: false });
    this.setState({ home: false });
  };

  handleHome = () => {
    this.setState({ home: true });
    this.setState({ searchText: [] });
    this.setState({ done: false });
    this.setState({ remove: false });
    this.setState({ clicked: false });
    this.setState({ againClicked: false });
    this.setState({ recommendedDone: false });
    this.setState({ login: false });
    this.setState({ favorite: false });
  };

  onClick = event => {
    if (!this.state.clicked) {
      this.setState({ clicked: true });
      this.setState({ againClicked: false });
    } else {
      this.setState({ clicked: false });
      this.setState({ againClicked: true });
    }

    this.setState({ remove: false });
  };

  render() {
    const { classes } = this.props;
    if (
      (!(this.state.remove === true && this.state.done === true) ||
        this.state.clicked === true ||
        this.state.againClicked === true) &&
      this.state.favorite === false &&
      this.state.login === false
    ) {
      return (
        <div className={classes.grow}>
          {this.state.home ? <Redirect to="/" /> : null}
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={this.handleHome}>
                News App
              </Button>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  disabled={this.state.id ? false : true}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={this.keyPressed}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  disabled={this.state.id ? false : true}
                  color="inherit"
                  onClick={this.handleFavorite}
                >
                  <Badge color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={this.handleLogin}>
                  {this.state.id ? "Logout" : "Login"}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
            {<RecommendedArticles key={1} />}
            {!this.state.recommendedDone
              ? this.setState({ recommendedDone: true })
              : null}
          </ul>
        </div>
      );
    } else if (
      this.state.clicked === false &&
      this.state.againClicked === false &&
      this.state.favorite === false &&
      this.state.login === false
    ) {
      return (
        <div className={classes.grow}>
          {this.state.home ? <Redirect to="/" /> : null}
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={this.handleHome}>
                News App
              </Button>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  disabled={this.state.id ? false : true}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={this.keyPressed}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  disabled={this.state.id ? false : true}
                  color="inherit"
                  onClick={this.handleFavorite}
                >
                  <Badge color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={this.handleLogin}>
                  {this.state.id ? "Logout" : "Login"}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
            {this.state.searchText.map(text => (
              <Articles key={1} searchText={text} />
            ))}
          </ul>
        </div>
      );
    } else if (this.state.favorite === true) {
      return (
        <div className={classes.grow}>
          {this.state.home ? <Redirect to="/" /> : null}
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={this.handleHome}>
                News App
              </Button>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  disabled={this.state.id ? false : true}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={this.keyPressed}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  disabled={this.state.id ? false : true}
                  color="inherit"
                  onClick={this.handleFavorite}
                >
                  <Badge color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={this.handleLogin}>
                  {this.state.id ? "Logout" : "Login"}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <FavoriteArticles />
        </div>
      );
    } else if (this.state.login === true) {
      return (
        <div className={classes.grow}>
          {this.state.home ? <Redirect to="/" /> : null}
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={this.handleHome}>
                News App
              </Button>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  disabled={this.state.id ? false : true}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={this.keyPressed}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  disabled={this.state.id ? false : true}
                  color="inherit"
                  onClick={this.handleFavorite}
                >
                  <Badge color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={this.handleLogin}>
                  {this.state.id ? "Logout" : "Login"}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Login />
        </div>
      );
    }
  }
}

export default withStyles(styles)(SearchField);
