import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { images } from "../components/images";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";
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
    { id: 'template1', image: images.portfolio1, name: 'Modern Developer', component: Template1 },
    { id: 'template2', image: images.portfolio2, name: 'Creative Designer', component: Template2 },
    { id: 'template3', image: images.portfolio3, name: 'Business Professional', component: Template3, useLivePreview: false },
    { id: 'template4', image: images.portfolio4, name: 'Minimalist Clean', component: Template4 },
    { id: 'template5', image: images.portfolio2, name: 'Developer Terminal', component: Template5 },
    { id: 'template6', image: images.portfolio1, name: 'Marketing Pro', component: Template6 }
  ];

  const renderTemplatePreview = (template) => {
    if (template.useLivePreview && template.component) {
      const TemplateComponent = template.component;
      return (
        <div style={{
          width: '100%',
          height: window.innerWidth < 768 ? '200px' : '250px',
          overflow: 'hidden',
          borderRadius: '10px',
          transform: 'scale(0.3)',
          transformOrigin: 'top left',
          width: '333%',
          height: '833px'
        }}>
          <TemplateComponent isPreview={true} />
        </div>
      );
    } else {
      return (
        <img 
          className="img-fluid" 
          src={template.image} 
          alt={template.name}
          style={{
            borderRadius: '10px',
            width: '100%',
            height: window.innerWidth < 768 ? '200px' : '250px',
            objectFit: 'cover'
          }}
        />
      );
    }
  };

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
      <div className="container-fluid px-3 px-md-4">
        <h1 className="text-center p-2" style={{ 
          fontSize: window.innerWidth < 480 ? "4vh" : window.innerWidth < 768 ? "5vh" : "8vh",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          marginBottom: "2rem"
        }}>
          Portfolio Templates
        </h1>
        <div className="row justify-content-center">
          {templates.map((template, index) => (
            <div key={template.id} className="col-12 col-sm-6 col-lg-4 p-2 p-md-3 temp" data-aos="fade-up">
              <div className="template-card">
                {renderTemplatePreview(template)}
                <div className="temp-overlay"></div>
                <div className="temp-details">
                  <h5 className="text-white mb-3">{template.name}</h5>
                  <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                    <Button 
                      variant="light" 
                      size={window.innerWidth < 768 ? "sm" : "md"}
                      onClick={() => handleUseTemplate(template.id)}
                      className="mb-2 mb-sm-0"
                    >
                      Use Template
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size={window.innerWidth < 768 ? "sm" : "md"}
                      onClick={() => handlePreview(template.id)}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
                
                {/* Mobile-specific buttons below image */}
                <div className="d-block d-md-none mt-3 text-center">
                  <h6 className="mb-2" style={{color: 'white'}}>{template.name}</h6>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      onClick={() => handlePreview(template.id)}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Templates;
