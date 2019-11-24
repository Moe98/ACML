import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";

const styles = {
  card: {
    width: 345,
    borderRadius: 12,
    fontFamily: "Helvetica Neue",
    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
    margin: "1%"
  },
  media: {
    height: 140
  },
  root: {
    width: 345
  },
  avatar: {
    margin: -10,
    width: 35,
    height: 35,
    backgroundColor: "#3480E3"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  cardActions: {
    height: 50
  },
  avatarCardAction: {
    margin: -5,
    width: 25,
    height: 25,
    backgroundColor: "#3480E3"
  },
  iconCardAction: {
    width: 15,
    height: 15
  }
};
class Article extends Component {
  routeTo(link) {
    window.open(link); //This will open Google in a new
  }

  formatTime(t) {
    return moment
      .utc(t.substring(0, 23))
      .format("DD MMM, YYYY")
      .toUpperCase();
  }
  async addFavourite(article) {
    const res = await axios.post(
      `http://localhost:5000/api/users/favouriteArticles/5dd6c4bd9a80c44d5089b31e`,
      article
    );
  }

  render() {
    const classes = { ...styles };

    return (
      //<Link to={this.props.article.url}>
      <Card style={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={classes.avatar}>
              {this.props.article.author
                ? this.props.article.author.charAt(0)
                : "NA"}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="add author to favorites"
              title="favorite author"
            >
              <FavoriteIcon />
            </IconButton>
          }
          title={this.props.article.title}
          subheader={this.formatTime(this.props.article.publishedAt)}
        />
        <CardMedia
          style={{
            height: 0,
            paddingTop: "56.25%"
          }}
          image={this.props.article.urlToImage}
          title={this.props.article.description}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.props.article.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            oncClick={() => this.addFavourite(this.props.article)}
            title="favorite article"
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" title="continue reading">
            <ExpandMoreIcon
              onClick={() => this.routeTo(this.props.article.url)}
            />
          </IconButton>
        </CardActions>
      </Card>
      //</Link>
    );
  }
}

export default withStyles(styles)(Article);
