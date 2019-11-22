import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Articles from "./Articles";
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 1,
    marginRight: 1,
    width: 200
  }
};

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: [],
      done: false,
      remove: false
    };
  }
  componentDidMount() {
    this.setState({ searchText: [] });
    this.setState({ done: false });
    this.setState({ remove: false });
  }

  keyPressed = event => {
    console.log([event.target.value]);
    if (event.key === "Enter") {
      this.setState({ searchText: [event.target.value] });
      this.setState({ done: true });
      this.setState({ remove: true });
    } else {
      this.setState({ remove: false });
    }
  };

  render() {
    const classes = { ...styles };
    if (!(this.state.remove === true && this.state.done === true)) {
      return (
        <div className={classes.container}>
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
        </div>
      );
    } else {
      return (
        <div className={classes.container}>
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
