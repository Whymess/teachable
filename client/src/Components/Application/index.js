import React, { Component } from "react";
import {
  Title,
  Searchbar,
  GemPaper,
  Loader,
  ModalViewSaved
} from "../../Components/";

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      error: "",
      response: [],
      loading: false,
      savedGems: []
    };
  }

  handleChange = e => {
    let { value } = e.target;
    this.setState({ searchTerm: value, error: "" });
  };

  onSumbit = () => {
    let { searchTerm } = this.state;
    this.setState({
      loading: true,
      response: []
    });

    Promise.all([
      fetch(`/api/v1/search.json?query=${searchTerm}`),
      fetch(`/savedGems`)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([GemApi, savedGems]) => {
        this.checkRetrivedGems(GemApi, savedGems);
      });
  };

  checkRetrivedGems(GemApi, savedGems) {
    for (let i = 0; i < GemApi.length; i++) {
      if (savedGems[i] && GemApi[i]["sha"] === savedGems[i]["sha"]) {
        GemApi[i]["exists"] = true;
      }
    }
    this.setState({
      response: GemApi,
      loading: false
    });
  }

  renderResponse = () => {
    return this.state.response.map((el, i) => {
      return <GemPaper key={i} {...el} />;
    });
  };

  handleKeyPress = e => {
    let { searchTerm } = this.state;
    if (e.key === "Enter") {
      if (searchTerm.length !== 0) {
        this.onSumbit(searchTerm);
        this.setState({
          searchTerm: ""
        });
      } else {
        this.setState({
          error: "You need to enter a search term!"
        });
      }
    }
  };

  removeSavedGems = sha => {
    this.setState({
      savedGems: this.state.savedGems.filter(function(gem) {
        return gem.sha !== sha;
      })
    });
  };

  retriveSavedGems = () => {
    fetch(`/savedGems`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          savedGems: response
        });
      })
      .catch(response => {
        this.setState({
          error:
            "There was an error fetching the data .... Please try again later"
        });
      });
  };

  render() {
    let { searchTerm, error, loading, savedGems } = this.state;
    return (
      <div className="application">
        <nav className="navbar navbar-dark bg-dark">
          <button
            type="button"
            onClick={this.retriveSavedGems}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Show saved gems
          </button>
        </nav>
        <div className="container d-flex justify-content-center flex-column">
          <Title title="Find, and save RubyGems." />
          <Searchbar
            error={error}
            value={searchTerm}
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
          />
        </div>

        <div className="container d-flex justify-content-center flex-column">
          {loading && <Loader />}
          {this.renderResponse()}
        </div>

        <ModalViewSaved
          savedGems={savedGems}
          
        />
      </div>
    );
  }
}
