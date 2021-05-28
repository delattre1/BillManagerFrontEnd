function convertDate(date) {
  var ano  = date.split("-")[0];
  var mes  = date.split("-")[1];
  var dia  = date.split("-")[2];
  return `${dia}/${mes}/${ano}`
}

function createTotalColumn(movimentacoes) {
  let total = 0
  console.log(`moves: ${movimentacoes}`)
  movimentacoes.map((mov) => {
    let tipo = (mov.tipo);
    let valor = (mov.valor);
    if (tipo === 'despesa') {
      total -= valor;
    }
    else if (tipo === 'aporte') {
      total += valor;
    }
    mov.totalAtual = total;
  })
  return movimentacoes
}

export {convertDate, createTotalColumn};
