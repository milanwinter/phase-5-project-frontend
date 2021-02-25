import Button from 'react-bootstrap/Button';
import React from 'react';
import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'

const MenuBar = (props) => {

  const logout = () => {
    localStorage.clear("token","user")
    window.location.href = "/"
  }

    
    return (
    <div >
            <Navbar bg="success" variant="dark">
              <Container>
                <Navbar.Brand >Webistes Name</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/home"> Home </Nav.Link>
                {/* put  some dots or little skies in between the links? */}
                  <Nav.Link href="/resorts"> Resorts</Nav.Link>
                  <Nav.Link href="/playlists">Favorites</Nav.Link>
                  <Nav.Link href="/reviews">Reviews</Nav.Link>  
                  
                </Nav>
                <Nav>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="#" onSelect={logout}> Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
    </div>
    )
}

export default MenuBar;