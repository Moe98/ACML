import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";
import parseJwt from "../helpers/decryptAuthToken";

class FavouriteArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FavouriteArticles: []
    };
  }

  async componentWillMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      return;
    }
    try {
      await this.setState({ id: parseJwt(localStorage.jwtToken).id });
      const res = await axios.get(
        `http://localhost:5000/api/users/favouriteArticles/${this.state.id}`
      );
      this.setState({
        FavouriteArticles: res.data.data
      });
    } catch {
      this.setState({ id: null });
    }
  }

  render() {
    console.log(this.state.FavouriteArticles);
    if (this.state.FavouriteArticles !== []) {
      return (
        <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
          {this.state.FavouriteArticles.map(article => (
            <Article key={article._id} article={article} />
          ))}
        </ul>
      );
    } else return <div></div>;
  }
}
export default FavouriteArticles;
