import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

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
  state = {
    searchText: ""
  };

  handleTextChange = eventTarget => {
    this.setState({ searchText: eventTarget.value });
  };

  render() {
    const classes = { ...styles };
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
          onKeyPress={e => {
            if (e.key === "Enter") {
              //console.log("Enter key pressed"); //change to searching
              //console.log(this.state.searchText)
              // <Articles
              // key={some id}
              // searchText={searchText}
            }
          }}
          onChange={e => this.handleTextChange(e.target)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchField);
