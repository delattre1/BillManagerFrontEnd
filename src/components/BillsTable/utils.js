import axios from 'axios';
var fileDownload = require('js-file-download');

const handlePDFDownload = (id) => {
  axios.get(`http://localhost:8000/api/boleto/${id}`, { 
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, 'boleto_para_pagar.pdf');
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

function convertDate(date) {
  var ano  = date.split("-")[0];
  var mes  = date.split("-")[1];
  var dia  = date.split("-")[2];
  return `${dia}/${mes}/${ano}`
}


export {handlePDFDownload, convertDate};
