import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Articles from "./Articles";
import RecommendedArticles from "./RecommendedArticles";
const styles = {
  button: {
    margin: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 1,
    marginRight: 1,
    width: 200
  },
  input: {
    display: 'none',
  }
};

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: [],
      done: false,
      remove: false,
      clicked: false
    };
  }
  componentDidMount() {
    this.setState({ searchText: [] });
    this.setState({ done: false });
    this.setState({ remove: false });
    this.setState({ clicked: false });
    this.setState({ againClicked: false });
  }

  keyPressed = event => {
    console.log([event.target.value]);
    if (event.key === "Enter") {
      this.setState({ searchText: [event.target.value] });
      this.setState({ done: true });
      this.setState({ remove: true });
      this.setState({ clicked: false });
      this.setState({ againClicked: false });
    } else {
      this.setState({ remove: false });
    }
  };

  onClick = event => {
    if(!this.state.clicked)   {
      this.setState({ clicked: true });
      this.setState({ againClicked: false });
    }
    else{
      this.setState({ clicked: false });
      this.setState({ againClicked: true });
    }

    this.setState({ remove: false });
   
  };

  render() {
    const classes = { ...styles };
    if (!(this.state.remove === true && this.state.done === true)||this.state.clicked === true||this.state.againClicked === true) {
      return (
        <div className={classes.container}>
            <div>
           <Button variant="outlined" color="inherit" className={classes.button}  onClick={this.onClick}>
             Home
           </Button>
           </div>
          <TextField
            id="outlined-full-width"
            label="Search"
            style={{ margin: 8 }}
            placeholder="Topic/Article"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onKeyPress={this.keyPressed}
          />
          <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
            {
              <RecommendedArticles key={1} />
            }
          </ul>
        </div>
      );
    } else if(this.state.clicked === false&&this.state.againClicked === false) {
      return (
        <div className={classes.container}>
            <div>
           <Button variant="outlined" color="inherit" className={classes.button}  onClick={this.onClick}>
             Home
           </Button>
           </div>
          <TextField
            id="outlined-full-width"
            label="Search"
            style={{ margin: 8 }}
            placeholder="Topic/Article"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onKeyPress={this.keyPressed}
          />
          <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
            {this.state.searchText.map(text => (
              <Articles key={1} searchText={text} />
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default withStyles(styles)(SearchField);
