//https://rsuitejs.com/components/nav
import 'bootstrap/dist/css/bootstrap.min.css';

//import 'rsuite/lib/styles/themes/dark/index.less';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";

export default function NavBar() {
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Nova Vista Contas</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/add">Adicionar</Nav.Link>

          <NavDropdown title="Fluxo de Caixa" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/fluxoCaixa">Comercial</NavDropdown.Item>
            <NavDropdown.Item href="/fluxoCaixa">Operacional</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


