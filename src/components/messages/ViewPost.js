import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MessagesContext from "../../context/messages/MessagesContext";
import AuthContext from "../../context/auth/AuthContext";

import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min";

const ViewPost = (props) => {
  const { data } = props.location;
  const [postReply, setPostReply] = useState("");
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: { fetchMessages, publish, addPost, addMessageAction },
    getPostReplies,
    postReplies,
  } = messagesContext;
  const onChangePostReply = (e) => {
    setPostReply(e.target.value);
  };
  useEffect(() => {
    getPostReplies();
  }, []);
  console.log(postReplies);
  let messagePostReplies =
    postReplies && postReplies.length > 0
      ? postReplies.filter((item) => {
          return item.messageTimetoken === data.post.timetoken;
        })
      : [];
  const publishReply = () => {
    let channel = "ALL_USERS";
    let username = user.username;
    let reply = `${username},${postReply}`;
    addMessageAction(channel, data.post.timetoken, reply);

    setPostReply("");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: "blue",
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  // const { post } = data;
  return (
    <div className='card container' id='container'>
      <div id='post-div'>
        <Card className={classes.root} id='message-item'>
          <CardActionArea id='focus-transparent'>
            <CardContent>
              <Typography
                variant='subtitle2'
                color='textSecondary'
                component='p'
              >
                <i class='material-icons'>person_outline</i>{" "}
                {data.post.message.name}
              </Typography>
              <Typography variant='h4' color='primary' component='p'>
                {data.post.message.postMessage}
              </Typography>
              <Button size='small' color='textsecondary'>
                <i class='material-icons'>comment</i>
                {` ${messagePostReplies.length}`}
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div id='space'></div>
      <div id='replies-card'>
        <Card className={classes.root} id='message-item'>
          <CardActionArea id='focus-transparent'>
            <CardContent>
              <div className='input-field search-box'>
                <input
                  className='autocomplete '
                  id='round'
                  type='text'
                  value={postReply}
                  onChange={(e) => {
                    onChangePostReply(e);
                  }}
                  required
                />

                <button
                  type='submit'
                  className='btn small waves-effect waves-light'
                  id='reply-post'
                  onClick={() => {
                    publishReply();
                  }}
                >
                  Reply
                </button>
              </div>
              <Typography
                variant='h6'
                color='textSecondary'
                component='h4'
              ></Typography>
              {messagePostReplies &&
                messagePostReplies.map((reply) => {
                  let text = reply.value.split(",")[1];
                  return (
                    <div>
                      <Typography
                        variant='subtitle2'
                        color='textSecondary'
                        component='p'
                        id='replies-header'
                      >
                        {`${reply.value.split(",")[0]}`}
                      </Typography>
                      <Typography gutterBottom variant='h6' component='h2'>
                        {" "}
                        {text}
                      </Typography>
                    </div>
                  );
                })}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default ViewPost;
