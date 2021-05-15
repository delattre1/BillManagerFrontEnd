import React from "react";

export default function Bill(props) {
  console.log(props.bills)
  return (
  <div>
    Olá mundo!
    <div>
    {props.bills.map((bill) => (
      `${bill.vencimento} | ${bill.empresa} | ${bill.valor} | ${bill.codigoPagamento}`
    ))}
    </div> 

  </div>
)
}
