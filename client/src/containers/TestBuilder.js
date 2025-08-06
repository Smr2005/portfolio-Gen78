import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

function TestBuilder() {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const templateId = urlParams.get('template') || 'template1';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('TestBuilder mounted');
    console.log('Template ID:', templateId);
    console.log('Location:', location);
    
    // Check authentication
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('Token exists:', !!token);
    console.log('User exists:', !!user);
    
    if (token && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    
    setLoading(false);
  }, [templateId, location]);

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h3>Loading Portfolio Builder...</h3>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <h4>Authentication Required</h4>
          <p>Please login to access the portfolio builder.</p>
          <Button variant="primary" onClick={() => history.push('/')}>
            Go to Login
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header>
              <h3>Portfolio Builder - {templateId}</h3>
              <p>Template selected: {templateId}</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="success">
                <h5>✅ Builder is working!</h5>
                <p>You have successfully accessed the portfolio builder.</p>
                <p><strong>Template:</strong> {templateId}</p>
                <p><strong>Authentication:</strong> Verified</p>
              </Alert>

              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => history.push(`/full-builder?template=${templateId}`)}>
                  Go to Full Builder
                </Button>
                <Button variant="secondary" onClick={() => history.push('/templates')}>
                  Back to Templates
                </Button>
                <Button variant="outline-primary" onClick={() => history.push('/')}>
                  Home
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TestBuilder;