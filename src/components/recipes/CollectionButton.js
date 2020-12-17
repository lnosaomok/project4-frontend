import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthContext from "../../context/auth/AuthContext";
import UserPreferencesContext from "../../context/userPreferences/UserPreferencesContext";
import MessagesContext from "../../context/messages/MessagesContext";

export default function CollectionButton({ recipe }) {
  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: {
      fetchMessages,
      publish,
      sendFile,
      addListener,
      addMessageAction,
      getMessageActions,
      getFile,
    },
  } = messagesContext;
  const authContext = useContext(AuthContext);
  const userPreferencesContext = useContext(UserPreferencesContext);
  const {
    userPreferences,
    error,
    getUserPreferences,
    setUserPreferences,
  } = userPreferencesContext;
  useEffect(async () => {
    await getUserPreferences();
  }, []);
  const { user } = authContext;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const recommendRecipeEveryone = (e, channelName) => {
    console.log(userPreferences);

    setAnchorEl(null);
    let channel = "RECCOMENDATIONS_CHANNEL";
    publish(
      {
        recipe,
        name: user.username,
        recommendations_wanted: userPreferences.channels,
      },
      channel
    );
  };

  const recommendRecipeToOtherUser = () => {};

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        id='focus-transparent'
      >
        <span>Recommend Recipe</span>
        <i class='material-icons'>share</i>
      </Button>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          id='capitalize'
          onClick={(e) => {
            recommendRecipeEveryone(e);
          }}
        >
          Recommend to Everyone
        </MenuItem>
        <MenuItem
          id='capitalize'
          onClick={(e) => {
            recommendRecipeToOtherUser(e);
          }}
        >
          Recommend to Someone
        </MenuItem>
      </Menu>
    </div>
  );
}
