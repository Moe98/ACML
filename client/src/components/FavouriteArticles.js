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

  async componentDidMount() {
    const res = await axios.get(
      `http://localhost:5000/api/users/favouriteArticles/5dd6c4bd9a80c44d5089b31e`
    );
    this.setState({
      FavouriteArticles: res.data
    });
  }

  render() {
    console.log(this.state.FavouriteArticles);
    if (this.state.FavouriteArticles) {
      return (
        <div>
          {this.state.FavouriteArticles.map(article => (
            <div class="column small-3">
              <Article key={article._id} article={article} />
            </div>
          ))}
        </div>
      );
    } else return <div></div>;
  }
}
export default FavouriteArticles;
