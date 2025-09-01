import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Clean, single-file Template1 component
export default function Template1({ isPreview = false, userData = null }) {
  const defaultData = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    about: 'Experienced developer building web apps with React and Node.',
    experience: []
  };

  const data = userData ? { ...defaultData, ...userData } : defaultData;

  const renderExperience = (exp, i) => (
    <Card key={i} className="mb-3">
      <Card.Body>
        <Card.Title>{exp.position} — {exp.company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{exp.duration} • {exp.location}</Card.Subtitle>
        <p>{exp.description}</p>
      </Card.Body>
    </Card>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
      <section style={{ padding: '60px 0', background: 'linear-gradient(90deg,#eef2ff,#fff)' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{data.name}</h1>
              <div style={{ fontSize: '1rem', color: '#475569' }}>{data.title}</div>
              <div style={{ marginTop: 8 }}>{data.email} • {data.location}</div>
            </Col>
            <Col md={6} className="text-center">
              <div style={{ width: 220, height: 220, margin: '0 auto', borderRadius: 12, overflow: 'hidden' }}>
                <img src={data.profileImage} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="about" style={{ padding: '40px 0', background: '#fff' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>About</h2>
              <p style={{ color: '#475569' }}>{data.about}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="experience" style={{ padding: '40px 0', background: '#f8fafc' }}>
        <Container>
          <h3 style={{ textAlign: 'center', marginBottom: 20 }}>Experience</h3>
          <Row>
            <Col lg={10} className="mx-auto">
              {(data.experience || []).map(renderExperience)}
            </Col>
          </Row>
        </Container>
      </section>

      {isPreview && (
          <div style={{ position: 'fixed', top: 0, right: 0, background: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px 12px', zIndex: 9999, borderRadius: '0 0 0 8px' }}>Preview Mode - Professional Template</div> 
        )}
      </div>
  );
}