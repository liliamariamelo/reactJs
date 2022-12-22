import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
  return (
    <header>
      <Navbar style={{backgroundColor: '#FFF0F5'}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Cafeteria"
              src="https://cdn-icons-png.flaticon.com/512/2751/2751721.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Cafeteria Doce Vida
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cardápio</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};
