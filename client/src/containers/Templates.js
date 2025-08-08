import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { images } from "../components/images";
import "aos/dist/aos.css";
import Aos from "aos";
import "../stylesheets/templates.css";

function Templates() {
  const history = useHistory();
  const { state } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
    
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
      <div className="container mt-5">
        <div className="text-center">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }
  
  // Show login message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">🔒 Authentication Required</h3>
                <p className="card-text">Please log in to access portfolio templates and builder.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => history.push('/')}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleUseTemplate = (templateId) => {
    // Navigate to working builder page with template selection
    // Authentication will be checked in WorkingBuilder component
    history.push(`/full-builder?template=${templateId}`);
  };

  const handlePreview = (templateId) => {
    // Navigate to preview page in same window
    history.push(`/preview/${templateId}`);
  };

  const templates = [
    { id: 'template1', image: images.portfolio1, name: 'Modern Developer' },
    { id: 'template2', image: images.portfolio2, name: 'Creative Designer' },
    { id: 'template3', image: images.portfolio3, name: 'Business Professional' },
    { id: 'template4', image: images.portfolio4, name: 'Minimalist Clean' },
    { id: 'template5', image: images.portfolio2, name: 'Developer Terminal' },
    { id: 'template6', image: images.portfolio1, name: 'Marketing Pro' }
  ];

  return (
    <div id="templates-body">
      <Navbar variant="dark" expand="lg" className="mb-4" style={{backgroundColor: '#343a40'}}>
        <Navbar.Brand onClick={() => history.push('/')} style={{cursor: 'pointer'}}>
          &#8918;Portfolio Generator/&#8919;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {state && (
              <Nav.Link onClick={() => history.push('/profile')}>
                My Profile
              </Nav.Link>
            )}
            <Nav.Link onClick={() => history.push('/')}>
              Back to Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <h1 className="text-center p-2" style={{ fontSize: "8vh" }}>
          Portfolio Templates
        </h1>
        <div className="row">
          {templates.map((template, index) => (
            <div key={template.id} className="col-12 col-md-6 p-3 temp" data-aos="fade-up">
              <img className="img-fluid" src={template.image} alt={template.name} />
              <div className="temp-overlay"></div>
              <div className="temp-details">
                <a href="#" onClick={(e) => {e.preventDefault(); handleUseTemplate(template.id);}} className="animated">
                  Use this Template
                </a>
                <br />
                <a href="#" onClick={(e) => {e.preventDefault(); handlePreview(template.id);}} className="animated">
                  Preview
                </a>
              </div>
              <div className="mobile-temp-detail d-flex d-block d-md-none">
                <a href="#" onClick={(e) => {e.preventDefault(); handleUseTemplate(template.id);}} className="animated" style={{ color: "black" }}>
                  Use this Template
                </a>
                <br />
                <a href="#" onClick={(e) => {e.preventDefault(); handlePreview(template.id);}} className="animated" style={{ color: "black" }}>
                  Preview
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Templates;
