import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      finished: false
    };
  }

  async componentDidMount() {
    console.log("inside articles", this.props.searchText);
    const res = await axios.post(
      `http://localhost:5000/api/users/search/5dd6c4bd9a80c44d5089b31e/${this.props.searchText}`
    ); //change hardcoded id
    // console.log(res.data.data.articles);
    console.log(res.data.data.articles)
    this.setState({ articles: res.data.data.articles });
  }

  render() {
    return (
      <div>
        <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
          {this.state.articles.map(article => (
            <Article key={article._id} article={article} />
          ))}
        </ul>
      </div>
    );
  }
}
export default Articles;
