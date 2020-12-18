import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
import MessagesContext from "../../context/messages/MessagesContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 745,
  },
  media: {
    height: 140,
  },
});

export default function AllMesssagesItem({ post }) {
  TimeAgo.locale(en);
  const classes = useStyles();
  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: { fetchMessages, publish, addPost },
    getPostReplies,
    allPosts,
    postReplies,
  } = messagesContext;
  useEffect(() => {
    getPostReplies();
  }, []);
  let messagePostReplies =
    postReplies && postReplies.length > 0
      ? postReplies.filter((item) => {
          return item.messageTimetoken === post.timetoken;
        })
      : [];
  console.log(postReplies);
  const timeAgo = new TimeAgo();
  console.log(post);
  return (
    <Card className={classes.root} id='message-item'>
      <CardActionArea id='focus-transparent'>
        <CardContent>
          <Typography variant='subtitle2' color='textSecondary' component='p'>
            <i class='material-icons'>person_outline</i> {post.message.name}{" "}
            :::::::::::::
            {timeAgo.format(new Date(post.message.date))}
          </Typography>
          <Typography gutterBottom variant='h5' component='h2'>
            {post.message.postMessage}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Button size='small' color='textsecondary'>
        <i class='material-icons'>comment</i>
        {` ${messagePostReplies.length}`}
      </Button>
      <Button size='small' color='primary'>
        <Link
          to={{
            pathname: "/post",
            data: {
              post,
              timeAgo,
            },
          }}
        >
          {" "}
          View Post
        </Link>
      </Button>
    </Card>
  );
}
