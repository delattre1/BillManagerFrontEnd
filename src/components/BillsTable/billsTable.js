import "./bills.css";
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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {handlePDFDownload, convertDate} from './utils';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const [bills, setBills] = useState([]);
  const classes = useStyles();

  function removeBill(id) {
    console.log(`remove ${id}`);
    let url = `http://127.0.0.1:8000/api/bill/${id}`
    axios
      .delete(url)
      .then((res) => {setBills(res.data)})
  }

  useEffect(() => {
  axios
    .get('http://127.0.0.1:8000/api/bills/')
    .then((res) => {
      setBills(res.data)
    })
  }, []);


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
              <TableCell>
                <PictureAsPdfIcon onClick={(e) => handlePDFDownload(row.id,e)}/> 
              </TableCell>
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
