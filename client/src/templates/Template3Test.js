import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Template3Test({ isPreview = false, userData = null }) {
  const data = userData || {
    name: "Michael Chen",
    title: "Senior Business Consultant & Strategy Director",
    email: "michael.chen@example.com",
    about: "Results-driven senior business consultant with 12+ years of experience."
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container>
        <Row className="py-5">
          <Col>
            <Card className="text-center p-5">
              <h1 style={{ color: '#1e3c72', fontWeight: 'bold' }}>{data.name}</h1>
              <h2 style={{ color: '#2a5298', marginBottom: '2rem' }}>{data.title}</h2>
              <p style={{ fontSize: '1.1rem', color: '#666' }}>{data.about}</p>
              {data.email && (
                <a href={`mailto:${data.email}`} style={{ color: '#1e3c72', textDecoration: 'none' }}>
                  {data.email}
                </a>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      
      {isPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px 20px',
          zIndex: 9999,
          borderRadius: '0 0 0 10px'
        }}>
          Template3 Test - Working!
        </div>
      )}
    </div>
  );
}

export default Template3Test;