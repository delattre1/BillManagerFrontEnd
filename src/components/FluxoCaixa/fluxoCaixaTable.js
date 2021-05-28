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
import {convertDate, createTotalColumn} from './utils'; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const [bills, setBills] = useState([]);

  function removeBill(id) {
    let url = `http://127.0.0.1:8000/api/movimentacao/${id}`
    axios
      .delete(url)
      .then((res) => {
        let movs = createTotalColumn(res.data);
        setBills(movs);
      })
  }

  useEffect(() => {
  axios
    .get('http://127.0.0.1:8000/api/movimentacoes/')
      .then((res) => {
        let movs = createTotalColumn(res.data);
        setBills(movs);
    })
  }, []);

  const classes = useStyles();
  
  const TableCellAporte = (props) =>{
    let table = <TableCell/>;
    if (props.tipo === "aporte") {
      table = <TableCell>{props.valor}</TableCell>
    } 
    return table;
  }

  const TableCellDespesa = (props) =>{
    let table = <TableCell/>;
    if (props.tipo === "despesa") {
      table = <TableCell>{props.valor}</TableCell>
    } 
    return table;
  }
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Aporte    </TableCell>
            <TableCell>Despesa    </TableCell>
            <TableCell>Total   </TableCell>
            <TableCell>Remover   </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {convertDate(row.data)}
              </TableCell>
              <TableCellAporte  tipo={row.tipo} valor={row.valor}/>
              <TableCellDespesa tipo={row.tipo} valor={row.valor}/>
              <TableCell>{row.totalAtual}</TableCell>
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

