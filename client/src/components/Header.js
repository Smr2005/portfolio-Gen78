import React, { Component } from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

class Header extends Component {
  static contextType = UserContext;

  handleLogout = () => {
    const { dispatch } = this.context;
    localStorage.removeItem('jwt');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('portfolioData');
    dispatch({type:"CLEAR"});
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="mb-5">
        <Navbar
          variant="dark"
          expand="lg"
          fixed="top"
          style={{backgroundColor: "rgb(32,32,32)"}}
        >
          <Navbar.Brand onClick={() => this.props.history.push('/')} className="brand ml-md-5" style={{cursor: 'pointer'}}>
           &#8918;Portfolio Generator/&#8919;
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => this.props.history.push('/templates')} className="links">
                TEMPLATES
              </Nav.Link>
              <Nav.Link onClick={() => this.props.history.push('/my-work')} className="links">
                MY WORK
              </Nav.Link>
              <Nav.Link onClick={() => this.props.history.push('/admin')} className="links" style={{color: '#ffc107'}}>
                ADMIN
              </Nav.Link>
              <Nav.Link onClick={this.handleLogout} className="links">
                LOGOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);

