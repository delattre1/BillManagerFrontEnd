import "./bills.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useEffect, useState } from "react";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function convertDate(date) {
  var ano  = date.split("-")[0];
  var mes  = date.split("-")[1];
  var dia  = date.split("-")[2];
  return `${dia}/${mes}/${ano}`
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function removeBill(id) {
  console.log(`remove ${id}`);
}
export default function BasicTable() {
  const [bills, setBills] = useState([]);
  useEffect(() => {
  axios
    .get('http://127.0.0.1:8000/api/bills/')
    .then((res) => {
      setBills(res.data)
    })
  }, []);

  console.log(bills);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vencimento</TableCell>
            <TableCell>Empresa   </TableCell>
            <TableCell>Valor     </TableCell>
            <TableCell>Código    </TableCell>
            <TableCell>Boleto    </TableCell>
            <TableCell>Remover   </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {convertDate(row.vencimento)}
              </TableCell>
              <TableCell>   {row.empresa}</TableCell>
              <TableCell>R$ {row.valor}</TableCell>
              <TableCell>   {row.codigoPagamento}</TableCell>
              <TableCell>   {row.boleto}</TableCell>
              <TableCell>
              <IconButton aria-label="delete" >
                <DeleteIcon onClick={(e) => removeBill(row.id, e)}/>
              </IconButton>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
