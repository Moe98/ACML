import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: 1,
        marginRight: 1,
        width: 200,
      }
  };

class SearchField extends Component {

    async componentDidMount() {
        if (localStorage.getItem("lang"))
          this.setState({ lang: localStorage.getItem("lang") });
        else this.setState({ lang: "eng" });
      }


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
            shrink: true,
          }}
          variant="outlined"
        />
     
     
      
      
    </div>
  );
}
}

export default withStyles(styles)(SearchField);