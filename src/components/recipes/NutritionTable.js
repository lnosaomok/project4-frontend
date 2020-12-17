import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  table: {
    minWidth: 70,
  },
});

export default function NutritionTable({ allNutrients }) {
  const classes = useStyles();
  function createData(name, Daily, percent) {
    return { name, Daily, percent };
  }
  let rows = [];

  if (allNutrients) {
    let allNutrientsFiltered = allNutrients.filter((nutrient) => {
      return (
        nutrient !== null && nutrient !== "undefined" && nutrient !== undefined
      );
    });
    allNutrientsFiltered.forEach((element) => {
      if (element !== undefined) {
        const quantity = `${element.quantity.toFixed()}${element.unit}`;
        rows.push(createData(element.label, quantity));
      }
    });
  }

  //   const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='simple table'>
          <TableHead id='t-head'>
            <TableRow>
              <TableCell>Nutrients</TableCell>
              <TableCell align='right'>%Daily</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.Daily}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
