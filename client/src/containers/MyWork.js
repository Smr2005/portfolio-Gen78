import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Button, Card } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

function MyWork() {
  const history = useHistory();
  const { state } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication from localStorage and context
    const checkAuth = () => {
      const token = localStorage.getItem('token') || localStorage.getItem('jwt');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        setIsAuthenticated(true);
      } else if (state && state.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, [state]);
  
  if (loading) {
    return (
      <div className="container mt-5" style={{ padding: window.innerWidth < 768 ? '1rem' : undefined }}>
        <div className="text-center">
          <h3 style={{
            fontSize: window.innerWidth < 480 ? '1.5rem' : window.innerWidth < 768 ? '1.75rem' : '2rem'
          }}>
            ⏳ Loading...
          </h3>
        </div>
      </div>
    );
  }
  
  // Show login message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mt-5" style={{ padding: window.innerWidth < 768 ? '1rem' : undefined }}>
        <div className="row justify-content-center">
          <div className={window.innerWidth < 768 ? "col-12" : "col-md-6"}>
            <div className="card" style={{
              margin: window.innerWidth < 768 ? '0' : undefined
            }}>
              <div className="card-body" style={{
                padding: window.innerWidth < 480 ? '1.5rem 1rem' : '2rem 1.5rem',
                textAlign: 'center'
              }}>
                <h3 className="card-title" style={{
                  fontSize: window.innerWidth < 480 ? '1.5rem' : window.innerWidth < 768 ? '1.75rem' : '2rem',
                  marginBottom: '1rem'
                }}>
                  🔒 Authentication Required
                </h3>
                <p className="card-text" style={{
                  fontSize: window.innerWidth < 480 ? '1rem' : '1.1rem',
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Please log in to view your portfolio projects.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => history.push('/')}
                  style={{
                    minHeight: '44px',
                    fontSize: window.innerWidth < 480 ? '1rem' : '1.1rem',
                    padding: window.innerWidth < 480 ? '0.75rem 1.5rem' : '0.875rem 2rem',
                    width: window.innerWidth < 768 ? '100%' : 'auto',
                    maxWidth: '300px'
                  }}
                >
                  🏠 Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar 
        variant="dark" 
        expand="lg" 
        className="mb-4" 
        style={{
          backgroundColor: '#343a40',
          padding: window.innerWidth < 768 ? '0.5rem 1rem' : '0.5rem 1.5rem'
        }}
      >
        <Navbar.Brand 
          onClick={() => history.push('/')} 
          style={{
            cursor: 'pointer',
            fontSize: window.innerWidth < 480 ? '1.2rem' : window.innerWidth < 768 ? '1.4rem' : '1.6rem'
          }}
        >
          &#8918;Portfolio Generator/&#8919;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{
            backgroundColor: window.innerWidth < 768 ? 'rgba(52,58,64,0.95)' : 'transparent',
            borderRadius: window.innerWidth < 768 ? '8px' : '0',
            marginTop: window.innerWidth < 768 ? '0.5rem' : '0',
            padding: window.innerWidth < 768 ? '0.5rem 0' : '0'
          }}>
            <Nav.Link 
              onClick={() => history.push('/home')}
              style={{
                padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
                textAlign: window.innerWidth < 768 ? 'center' : 'left',
                borderBottom: window.innerWidth < 768 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                fontSize: window.innerWidth < 480 ? '14px' : '16px'
              }}
            >
              📊 Dashboard
            </Nav.Link>
            <Nav.Link 
              onClick={() => history.push('/templates')}
              style={{
                padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
                textAlign: window.innerWidth < 768 ? 'center' : 'left',
                borderBottom: window.innerWidth < 768 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                fontSize: window.innerWidth < 480 ? '14px' : '16px'
              }}
            >
              🎨 Templates
            </Nav.Link>
            <Nav.Link onClick={() => {
              localStorage.removeItem('jwt');
              localStorage.removeItem('user');
              history.push('/');
            }}
            style={{
              padding: window.innerWidth < 768 ? '0.75rem 1rem' : '0.5rem 1rem',
              textAlign: window.innerWidth < 768 ? 'center' : 'left',
              fontSize: window.innerWidth < 480 ? '14px' : '16px'
            }}>
              🚪 Logout
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