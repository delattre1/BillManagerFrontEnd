import React from "react";
import NavBar from "../components/NavBar/navBar"
import CaixaForm from "../components/FluxoCaixa/fluxoCaixaForm"
import CaixaTable from "../components/FluxoCaixa/fluxoCaixaTable"
import styled from "styled-components";

const ContainerForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #d4fcdf;
`;


const ContainerTable = styled.div`
  margin-left: 10%;
`;

export default function FluxoCaixa() {
  return (
    <div>
      <NavBar></NavBar>
      <ContainerForm>
        <CaixaForm></CaixaForm>
      </ContainerForm>

      <ContainerTable>
        <CaixaTable></CaixaTable>
      </ContainerTable>
    </div>
  )
}

