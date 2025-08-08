import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Modal, Badge } from "react-bootstrap";

function Template3Simple({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const defaultData = {
    name: "Michael Chen",
    title: "Senior Business Consultant & Strategy Director",
    email: "michael.chen@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    linkedin: "https://linkedin.com/in/michaelchen",
    website: "https://michaelchen.consulting",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    about: "Results-driven senior business consultant with 12+ years of experience helping Fortune 500 companies optimize operations, drive growth, and implement strategic transformations. Specialized in digital transformation, operational excellence, and change management with a proven track record of delivering measurable ROI.",
    experience: [
      {
        company: "McKinsey & Company",
        position: "Senior Business Consultant",
        duration: "Jan 2020 - Present",
        location: "Chicago, IL",
        description: "Lead strategic consulting engagements for Fortune 500 clients across multiple industries, focusing on digital transformation and operational optimization.",
        achievements: [
          "Led $50M digital transformation project resulting in 35% cost reduction",
          "Managed consulting team of 15+ professionals across 3 countries",
          "Developed proprietary methodology adopted company-wide",
          "Achieved 98% client satisfaction rate across 25+ engagements"
        ]
      },
      {
        company: "Deloitte Consulting",
        position: "Business Consultant",
        duration: "Mar 2017 - Dec 2019",
        location: "New York, NY",
        description: "Specialized in operational excellence and process improvement for mid-market and enterprise clients.",
        achievements: [
          "Delivered $25M in cost savings across client portfolio",
          "Led 20+ process improvement initiatives",
          "Trained 100+ client employees in Lean Six Sigma methodologies",
          "Promoted twice in 2.5 years for exceptional performance"
        ]
      }
    ],
    skills: [
      { name: "Strategic Planning", level: 95, category: "Strategy" },
      { name: "Digital Transformation", level: 90, category: "Technology" },
      { name: "Change Management", level: 88, category: "Leadership" },
      { name: "Process Optimization", level: 92, category: "Operations" },
      { name: "Data Analytics", level: 85, category: "Analytics" },
      { name: "Team Leadership", level: 93, category: "Leadership" }
    ],
    projects: [
      {
        title: "Global Digital Transformation",
        description: "Led comprehensive digital transformation initiative for Fortune 500 manufacturing company, resulting in 35% operational cost reduction and improved efficiency across 50+ facilities worldwide.",
        tech: ["SAP S/4HANA", "Power BI", "Tableau", "Python", "SQL"],
        results: ["$50M cost savings", "35% efficiency improvement", "50+ facilities transformed"],
        featured: true
      },
      {
        title: "Merger Integration Strategy",
        description: "Developed and executed integration strategy for $5B healthcare merger, focusing on operational synergies, cultural alignment, and technology consolidation.",
        tech: ["Epic EHR", "Workday", "Salesforce", "Microsoft 365"],
        results: ["$200M in synergies", "95% employee retention", "6 months ahead of schedule"],
        featured: true
      }
    ],
    education: [
      {
        degree: "MBA",
        field: "Strategy & Operations",
        institution: "Wharton School, University of Pennsylvania",
        duration: "2015 - 2017",
        location: "Philadelphia, PA",
        gpa: "3.9/4.0"
      },
      {
        degree: "Bachelor of Science",
        field: "Industrial Engineering",
        institution: "Northwestern University",
        duration: "2011 - 2015",
        location: "Evanston, IL",
        gpa: "3.8/4.0"
      }
    ]
  };

  const data = userData ? { ...defaultData, ...userData } : defaultData;

  // Convert skills from string array to object array if needed
  if (data.skills && data.skills.length > 0 && typeof data.skills[0] === 'string') {
    data.skills = data.skills.filter(skill => skill.trim()).map((skill, index) => ({
      name: skill.trim(),
      level: 75 + (index % 4) * 5,
      category: index % 4 === 0 ? 'Strategy' : 
                index % 4 === 1 ? 'Technology' : 
                index % 4 === 2 ? 'Leadership' : 'Operations'
    }));
  }

  // Convert projects tech from string to array if needed
  if (data.projects && data.projects.length > 0) {
    data.projects = data.projects.map(project => ({
      ...project,
      tech: Array.isArray(project.tech) ? project.tech : 
            project.tech ? project.tech.split(',').map(t => t.trim()) : []
    }));
  }

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .business-gradient {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      }
      
      .business-card {
        border: none;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .business-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 16px 48px rgba(0,0,0,0.15);
      }
      
      .achievement-item {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-left: 4px solid #2a5298;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 0 8px 8px 0;
      }
      
      .skill-progress {
        height: 8px;
        border-radius: 4px;
        background: #e9ecef;
        overflow: hidden;
      }
      
      .skill-progress .progress-bar {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f8f9fa', color: '#1e293b' }}>
      {/* Professional Header */}
      <div className="business-gradient text-white" style={{ padding: '4rem 0' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              {data.profileImage && (
                <img 
                  src={data.profileImage} 
                  alt={data.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '12px',
                    border: '4px solid white',
                    objectFit: 'cover'
                  }}
                />
              )}
            </Col>
            <Col md={8}>
              <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                {data.name}
              </h1>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                {data.title}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                {data.about}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {data.email && (
                  <a 
                    href={`mailto:${data.email}`}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      border: '2px solid white',
                      borderRadius: '8px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📧 {data.email}
                  </a>
                )}
                {data.phone && (
                  <a 
                    href={`tel:${data.phone}`}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      border: '2px solid white',
                      borderRadius: '8px',
                      fontWeight: '600'
                    }}
                  >
                    📞 {data.phone}
                  </a>
                )}
                {data.linkedin && (
                  <a 
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      border: '2px solid white',
                      borderRadius: '8px',
                      fontWeight: '600'
                    }}
                  >
                    💼 LinkedIn
                  </a>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <Container>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1e3c72', 
              marginBottom: '3rem',
              textAlign: 'center',
              borderBottom: '3px solid #2a5298',
              paddingBottom: '1rem'
            }}>
              Professional Experience
            </h2>
            {data.experience.map((exp, index) => (
              <Card key={index} className="business-card mb-4">
                <Card.Body style={{ padding: '2rem' }}>
                  <Row>
                    <Col md={8}>
                      <h3 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {exp.position}
                      </h3>
                      <h4 style={{ color: '#2a5298', marginBottom: '1rem' }}>
                        {exp.company}
                      </h4>
                      <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                        {exp.duration} • {exp.location}
                      </p>
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        {exp.description}
                      </p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h5 style={{ color: '#1e3c72', marginBottom: '1rem' }}>Key Achievements:</h5>
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="achievement-item">
                              <strong>•</strong> {achievement}
                            </div>
                          ))}
                        </div>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
          <Container>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1e3c72', 
              marginBottom: '3rem',
              textAlign: 'center',
              borderBottom: '3px solid #2a5298',
              paddingBottom: '1rem'
            }}>
              Core Competencies
            </h2>
            <Row>
              {data.skills.map((skill, index) => (
                <Col key={index} md={6} className="mb-4">
                  <Card className="business-card h-100">
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h5 style={{ color: '#1e3c72', fontWeight: '600', margin: 0 }}>
                          {skill.name}
                        </h5>
                        <Badge style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', fontSize: '0.9rem' }}>
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="skill-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${skill.level}%`, height: '100%' }}
                        ></div>
                      </div>
                      {skill.category && (
                        <small style={{ color: '#6c757d', marginTop: '0.5rem', display: 'block' }}>
                          {skill.category}
                        </small>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <Container>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1e3c72', 
              marginBottom: '3rem',
              textAlign: 'center',
              borderBottom: '3px solid #2a5298',
              paddingBottom: '1rem'
            }}>
              Key Projects
            </h2>
            <Row>
              {data.projects.map((project, index) => (
                <Col key={index} lg={6} className="mb-4">
                  <Card className="business-card h-100">
                    <Card.Body style={{ padding: '2rem' }}>
                      <h4 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '1rem' }}>
                        {project.title}
                      </h4>
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        {project.description}
                      </p>
                      {project.tech && project.tech.length > 0 && (
                        <div style={{ marginBottom: '1.5rem' }}>
                          <h6 style={{ color: '#1e3c72', marginBottom: '0.5rem' }}>Technologies:</h6>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {project.tech.map((tech, techIndex) => (
                              <Badge 
                                key={techIndex}
                                style={{ 
                                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                                  fontSize: '0.8rem',
                                  padding: '0.5rem 1rem'
                                }}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.results && project.results.length > 0 && (
                        <div>
                          <h6 style={{ color: '#1e3c72', marginBottom: '0.5rem' }}>Key Results:</h6>
                          {project.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="achievement-item">
                              <strong>•</strong> {result}
                            </div>
                          ))}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
          <Container>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1e3c72', 
              marginBottom: '3rem',
              textAlign: 'center',
              borderBottom: '3px solid #2a5298',
              paddingBottom: '1rem'
            }}>
              Education
            </h2>
            <Row>
              {data.education.map((edu, index) => (
                <Col key={index} md={6} className="mb-4">
                  <Card className="business-card h-100">
                    <Card.Body style={{ padding: '2rem' }}>
                      <h4 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h4>
                      <h5 style={{ color: '#2a5298', marginBottom: '1rem' }}>
                        {edu.institution}
                      </h5>
                      <p style={{ color: '#6c757d', marginBottom: '0.5rem' }}>
                        {edu.duration} • {edu.location}
                      </p>
                      {edu.gpa && (
                        <p style={{ color: '#6c757d', marginBottom: '0' }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Footer */}
      <footer className="business-gradient text-white" style={{ padding: '3rem 0' }}>
        <Container>
          <Row>
            <Col className="text-center">
              <h3 style={{ marginBottom: '1rem' }}>Ready to Drive Results Together?</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
                Let's discuss how I can help optimize your business operations and drive growth.
              </p>
              {data.email && (
                <Button
                  href={`mailto:${data.email}`}
                  style={{
                    background: 'white',
                    color: '#1e3c72',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    textDecoration: 'none'
                  }}
                >
                  Start a Conversation
                </Button>
              )}
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <p style={{ margin: 0, opacity: 0.8 }}>
                  &copy; {new Date().getFullYear()} {data.name}. Professional Portfolio.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

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
          Preview Mode - Business Professional Template
        </div>
      )}
    </div>
  );
}

export default Template3Simple;