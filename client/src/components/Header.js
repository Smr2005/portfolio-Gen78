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
      <div className="mb-3 mb-md-5">
        <Navbar
          variant="dark"
          expand="lg"
          fixed="top"
          style={{
            backgroundColor: "rgb(32,32,32)",
            padding: window.innerWidth < 768 ? "0.5rem 1rem" : "0.5rem 1.5rem"
          }}
        >
          <Navbar.Brand 
            onClick={() => this.props.history.push('/')} 
            className="brand" 
            style={{
              cursor: 'pointer',
              fontSize: window.innerWidth < 480 ? '1.2rem' : window.innerWidth < 768 ? '1.4rem' : '1.6rem',
              marginLeft: window.innerWidth < 768 ? '0' : '2rem'
            }}
          >
           &#8918;Portfolio Generator/&#8919;
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{
              border: 'none',
              padding: '0.25rem 0.5rem'
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" style={{
              backgroundColor: window.innerWidth < 768 ? 'rgba(32,32,32,0.95)' : 'transparent',
              borderRadius: window.innerWidth < 768 ? '8px' : '0',
              marginTop: window.innerWidth < 768 ? '0.5rem' : '0',
              padding: window.innerWidth < 768 ? '0.5rem 0' : '0'
            }}>
              <Nav.Link 
                onClick={() => this.props.history.push('/templates')} 
                className="links"
                style={{
                  padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left',
                  borderBottom: window.innerWidth < 768 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  fontSize: window.innerWidth < 480 ? '14px' : '16px'
                }}
              >
                TEMPLATES
              </Nav.Link>
              <Nav.Link 
                onClick={() => this.props.history.push('/my-work')} 
                className="links"
                style={{
                  padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left',
                  borderBottom: window.innerWidth < 768 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  fontSize: window.innerWidth < 480 ? '14px' : '16px'
                }}
              >
                MY WORK
              </Nav.Link>
              <Nav.Link 
                onClick={() => this.props.history.push('/admin')} 
                className="links" 
                style={{
                  color: '#ffc107',
                  padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left',
                  borderBottom: window.innerWidth < 768 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  fontSize: window.innerWidth < 480 ? '14px' : '16px'
                }}
              >
                ADMIN
              </Nav.Link>
              <Nav.Link 
                onClick={this.handleLogout} 
                className="links"
                style={{
                  padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left',
                  fontSize: window.innerWidth < 480 ? '14px' : '16px'
                }}
              >
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

