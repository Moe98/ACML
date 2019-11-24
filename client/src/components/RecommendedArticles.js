import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";

class RecommendedArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RecommendedArticles: [],
      finished: false
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `http://localhost:5000/api/users/recommend/5dd6c4bd9a80c44d5089b31e`
    ); //change hardcoded id
    console.log(res.data.data)
    console.log(Math.floor(Math.random()*res.data.data.length-1))
    this.setState({ RecommendedArticles: res.data.data[Math.min(Math.max(0,Math.floor(Math.random()*res.data.data.length-1)),res.data.data.length-1)].articles });
  }

  render() {
    console.log(this.state.RecommendedArticles);
    if(this.state.RecommendedArticles){
        return (
          <div>
            <ul style={{ display: "flex", flexWrap: "wrap", paddingTop: "10vh" }}>
              {this.state.RecommendedArticles.map(article => (
                <Article key={article._id} article={article} />
              ))}
            </ul>
          </div>
        );
    }
    else
     return(<div></div>);
  }
}
export default RecommendedArticles;
