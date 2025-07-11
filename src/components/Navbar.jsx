import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import FavoriteDropdown from './FavoriteDropdown';

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Star Wars Bloc</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <FavoriteDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
