import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Button, Card } from "react-bootstrap";

function MyWork() {
  const history = useHistory();

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="mb-4" style={{backgroundColor: '#343a40'}}>
        <Navbar.Brand onClick={() => history.push('/')} style={{cursor: 'pointer'}}>
          &#8918;Portfolio Generator/&#8919;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => history.push('/home')}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => history.push('/templates')}>
              Templates
            </Nav.Link>
            <Nav.Link onClick={() => {
              localStorage.removeItem('jwt');
              localStorage.removeItem('user');
              history.push('/');
            }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <div className="container">
        <h1 className="text-center mb-5" style={{ fontSize: "6vh" }}>
          My Portfolio Projects
        </h1>
        
        <div className="row">
          <div className="col-12 text-center">
            <Card className="p-5" style={{backgroundColor: '#f8f9fa'}}>
              <Card.Body>
                <h3>No portfolios created yet</h3>
                <p className="text-muted">
                  Start by selecting a template and creating your first portfolio website.
                </p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => history.push('/templates')}
                  className="mt-3"
                >
                  Browse Templates
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWork;