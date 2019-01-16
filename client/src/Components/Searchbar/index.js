import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./Searchbar.css";

export default class Searchbar extends Component {
  render() {
    let { handleKeyPress, handleChange, value, error } = this.props;
    return (
      <FormControl error aria-describedby="component-error-text">
        <TextField
          error={error.length > 0 ? true : false}
          value={value}
          onChange={e => handleChange(e)}
          onKeyPress={e => handleKeyPress(e)}
          style={{ backgroundColor: "white" }}
          label="Search Gems.."
          type="text"
          margin="normal"
          variant="filled"
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    );
  }
}
