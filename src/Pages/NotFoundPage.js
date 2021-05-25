import React from "react";
import NavBar from "../components/NavBar/navBar"
import styled from "styled-components";


const MainContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 4rem;
`;

export default function FluxoCaixa() {
  return (
    <div>
      <NavBar></NavBar>

      <MainContainer>
        <h3>Página não encontrada</h3>
        <img alt="gif not found" src="/lost_meme.gif" />
      </MainContainer>
    </div>
  )
}

