import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthContext from "../../context/auth/AuthContext";
import MessagesContext from "../../context/messages/MessagesContext";

export default function CollectionButton({ recipe }) {
  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: { publish },
  } = messagesContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const recommendRecipeEveryone = (e, channelName) => {
    setAnchorEl(null);
    let channel = "RECCOMENDATIONS_CHANNEL";
    publish(
      {
        recipe,
        name: user.username,
      },
      channel
    );
    M.toast({ html: "Recommendation added!" });
  };

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
      </Menu>
    </div>
  );
}
