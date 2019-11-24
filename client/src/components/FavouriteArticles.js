import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";

class FavouriteArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FavouriteArticles: []
    };
  }

  async componentWillMount() {
    const res = await axios.get(
      `http://localhost:5000/api/users/favouriteArticles/5dda846b6a01150b5df8bc3f`
    );
    this.setState({
      FavouriteArticles: res.data.data
    });
  }

  render() {
    console.log(this.state.FavouriteArticles);
    if (this.state.FavouriteArticles !== []) {
      return (
        <div style={{ display: "inline-block" }}>
          {this.state.FavouriteArticles.map(article => (
            <div style={{ display: "inline-block" }}>
              <Article key={article._id} article={article} />
            </div>
          ))}
        </div>
      );
    } else return <div></div>;
  }
}
export default FavouriteArticles;
