import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";
import parseJwt from "../helpers/decryptAuthToken";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      finished: false
    };
  }

  async componentDidMount() {
    if (!localStorage.jwtToken) {
      alert("You must login!");
      return;
    }
    try {
      await this.setState({ id: parseJwt(localStorage.jwtToken).id });
      console.log(this.state.id);
      console.log("inside articles", this.props.searchText);
      const res = await axios.post(
        `http://localhost:5000/api/users/search/${this.state.id}/${this.props.searchText}`
      );
      this.setState({ articles: res.data.data.articles });
    } catch {
      this.setState({ id: null });
    }
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
