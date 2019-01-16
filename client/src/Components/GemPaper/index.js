import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { SaveButton } from "../../Components/";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class GemPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      data: "",
      error: ""
    };
  }

  componentDidMount() {
    fetch(`/savedGems`)
      .then(res => res.json())
      .then(savedGems => {
        if (savedGems.find(g => g.sha === this.props.sha)) {
          this.setState({ saved: true });
        }
      });
  }

  saveGem = gem => {
    fetch("/savedGems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gem)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ saved: true });
      })
  };

  removeSavedGem = sha => {
    fetch(`/savedGems/${sha}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ saved: false });
      });
  };

  render() {
    const { classes, name, authors, info, isModal } = this.props;
    const { saved } = this.state;
    return (
      <div className="mt-3">
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h4" component="h3">
            {name}
          </Typography>
          <Typography component="p">{info}</Typography>
          <Typography component="p">{authors}</Typography>

          {isModal ? (
            ""
          ) : (
            <SaveButton
              removeSavedGem={this.removeSavedGem}
              saved={saved}
              saveGem={this.saveGem}
              gem={this.props}
            />
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(GemPaper);
