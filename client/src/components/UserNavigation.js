import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import M from 'materialize-css';

const UserNavigation = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    dispatch({ type: "CLEAR" });
    M.toast({ html: "Logged out successfully", classes: "#4caf50 green" });
    history.push('/');
  };

  if (!state) {
    return null; // Don't show navigation if user is not logged in
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand onClick={() => history.push('/')} style={{cursor: 'pointer'}}>
        &#8918;Portfolio Generator/&#8919;
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="user-navbar-nav" />
      <Navbar.Collapse id="user-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => history.push('/profile')}>
            Dashboard
          </Nav.Link>
          <Nav.Link onClick={() => history.push('/templates')}>
            Templates
          </Nav.Link>
          <Nav.Link onClick={() => history.push('/dashboard')}>
            Portfolio Manager
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown title={`Welcome, ${state.name}`} id="user-nav-dropdown">
            <NavDropdown.Item onClick={() => history.push('/profile')}>
              <i className="fas fa-user me-2"></i>My Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/dashboard')}>
              <i className="fas fa-chart-line me-2"></i>Portfolio Dashboard
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => history.push('/about-developers')}>
              <i className="fas fa-info-circle me-2"></i>About Developers
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavigation;