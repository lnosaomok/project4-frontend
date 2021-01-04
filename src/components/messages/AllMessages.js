import React, { useContext, useState, useEffect } from "react";
import AllMessagesItem from "./AllMessagesItem";
import Button from "@material-ui/core/Button";
import AddPostModal from "./AddPostModal";
import MessagesContext from "../../context/messages/MessagesContext";
import useInitializeListeners from "../../utils/useInitializeListeners";

const AllMessages = () => {
  useInitializeListeners();

  const messagesContext = useContext(MessagesContext);
  const { getPostReplies, allPosts, getAllPosts } = messagesContext;

  useEffect(() => {
    getPostReplies();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const sortedPosts = allPosts.sort((a, b) => {
    return b.message.date - a.message.date;
  });

  return (
    <div class='container messages-all'>
      <AddPostModal open={open} handleClose={handleClose} />
      <div className='messages-container' id='messages-all'>
        <Button
          variant='contained'
          id='post-button'
          color='primary'
          disableElevation
          onClick={handleClickOpen}
        >
          Add Post
        </Button>{" "}
        {sortedPosts &&
          sortedPosts.map((item) => {
            return <AllMessagesItem post={item} />;
          })}
      </div>
    </div>
  );
};

export default AllMessages;
