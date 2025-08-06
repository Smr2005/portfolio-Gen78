import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

function SimpleBuilder() {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const templateId = urlParams.get('template') || 'template1';

  const [userData, setUserData] = useState({
    name: "",
    title: "",
    email: ""
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('SimpleBuilder mounted with templateId:', templateId);
    console.log('Current location:', location);
    
    // Check authentication
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('Token exists:', !!token);
    console.log('User exists:', !!user);
    
    if (!token || !user) {
      setError('Please login to access the portfolio builder');
      return;
    }
  }, [templateId, location]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to save your portfolio');
        return;
      }

      if (!userData.name || !userData.title || !userData.email) {
        setError('Please fill in all required fields');
        return;
      }

      console.log('Saving portfolio with data:', { templateId, userData });

      const response = await fetch('/api/portfolio/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId,
          data: {
            name: userData.name,
            title: userData.title,
            email: userData.email,
            skills: [{ name: 'JavaScript', level: 80, category: 'Technical' }],
            projects: [{
              title: 'Sample Project',
              description: 'A sample project',
              tech: ['React'],
              github: 'https://github.com/user/project',
              demo: 'https://project.demo.com',
              featured: false
            }],
            experience: [{
              company: 'Sample Company',
              position: 'Developer',
              duration: '2020-2023',
              description: 'Sample work experience'
            }],
            education: [{
              institution: 'Sample University',
              degree: 'Bachelor',
              field: 'Computer Science',
              duration: '2016-2020'
            }]
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Portfolio saved successfully!');
        console.log('Save successful:', data);
      } else {
        setError(data.error || 'Failed to save portfolio');
        console.error('Save failed:', data);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Save error:', err);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header>
              <h3>Simple Portfolio Builder</h3>
              <p>Template: {templateId}</p>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Professional Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={handleSave}>
                    Save Portfolio
                  </Button>
                  <Button variant="secondary" onClick={() => history.push('/templates')}>
                    Back to Templates
                  </Button>
                  <Button variant="outline-primary" onClick={() => history.push('/')}>
                    Home
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SimpleBuilder;