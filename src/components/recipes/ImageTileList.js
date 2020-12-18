import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import M from "materialize-css/dist/js/materialize.min";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 450,
  },
}));

export default function ImageTileList({ tileData }) {
  const classes = useStyles();
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems);
    });
  }, []);
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 3}>
            <img class='materialboxed' src={`${tile.img}`} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
