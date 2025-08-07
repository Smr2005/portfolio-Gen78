import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserNavigation from './UserNavigation';
import 'aos/dist/aos.css';
import Aos from 'aos';

const AboutDevelopers = () => {
  const history = useHistory();
  const { state } = useContext(UserContext);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Sameer Shaik",
      role: "Backend Developer & Database Architect",
      team: "Individual - Backend",
      description: "🚀 Passionate about solving real-world problems with AI, IoT, and Deep Learning. Whether it's building facial recognition systems or disease prediction apps, I thrive on innovation. 🖋 I'm also a poet, creative writer, and someone who believes in technology with a soul.",
      responsibilities: [
        "Backend Development",
        "Database Connectivity & Design",
        "API Development",
        "Server Architecture",
        "Authentication & Security",
        "Data Management"
      ],
      skills: ["Node.js", "Express.js", "MongoDB", "JWT", "RESTful APIs", "Database Design", "AI/ML", "IoT", "Deep Learning"],
      github: "https://github.com/Smr2005",
      portfolio: "https://sameer-porfolio.onrender.com/",
      email: "shaiksameershubhan71@gmail.com",
      image: "https://avatars.githubusercontent.com/Smr2005?v=4", // GitHub avatar
      contributions: [
        "Designed and implemented the complete backend architecture",
        "Built secure authentication system with JWT",
        "Created comprehensive database schema for portfolios",
        "Developed RESTful APIs for all frontend interactions",
        "Implemented file upload and storage system",
        "Built email notification system",
        "Created user management and portfolio analytics"
      ]
    },
    {
      id: 2,
      name: "Frontend Team",
      role: "Frontend Development Team",
      team: "Team - Frontend",
      description: "Collaborative frontend development team focused on creating intuitive and responsive user interfaces. The team works together to deliver modern web experiences with React.js and responsive design principles.",
      teamMembers: ["S. Suheb", "A.R. Hima Varshini", "J. Pavithra"],
      responsibilities: [
        "Frontend Development",
        "UI/UX Implementation",
        "Component Development",
        "State Management",
        "Responsive Design",
        "Template Creation",
        "User Experience Optimization"
      ],
      skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Responsive Design", "UI/UX Design"],
      github: "#", // Individual GitHub profiles to be updated
      portfolio: "#", // Individual portfolios to be updated
      email: "#", // Team contact to be updated
      image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Frontend+Team",
      contributions: [
        "Developed responsive frontend components",
        "Implemented user interface designs",
        "Created interactive portfolio templates",
        "Built user authentication interfaces",
        "Designed portfolio template layouts",
        "Implemented cross-browser compatibility",
        "Built reusable React components",
        "Ensured code quality and standards"
      ]
    },
    {
      id: 3,
      name: "Deployment Team",
      role: "DevOps & Deployment Team",
      team: "Team - Deployment",
      description: "Deployment team responsible for application deployment, infrastructure management, and ensuring smooth delivery. The team combines DevOps expertise with backend knowledge for comprehensive deployment solutions.",
      teamMembers: ["D. Vishnu Vardhan", "Sameer Shaik"],
      responsibilities: [
        "Application Deployment",
        "Infrastructure Management",
        "CI/CD Pipeline Setup",
        "Performance Monitoring",
        "Server Configuration",
        "Cloud Platform Management"
      ],
      skills: ["Cloud Deployment", "DevOps", "Server Management", "CI/CD", "Infrastructure", "Backend Integration"],
      github: "#", // Individual GitHub profiles to be updated
      portfolio: "#", // Individual portfolios to be updated
      email: "#", // Team contact to be updated
      image: "https://via.placeholder.com/300x300/6f42c1/ffffff?text=Deploy+Team",
      contributions: [
        "Deployed application to production",
        "Set up cloud infrastructure",
        "Configured deployment pipelines",
        "Monitored application performance",
        "Managed server environments",
        "Integrated backend services with deployment"
      ]
    },
    {
      id: 4,
      name: "V. Kowsik Sai",
      role: "Quality Assurance Engineer",
      team: "Individual - Testing",
      description: "Quality assurance specialist ensuring the application meets the highest standards. Expert in testing methodologies and bug detection across all application components.",
      responsibilities: [
        "Application Testing",
        "Quality Assurance",
        "Bug Detection & Reporting",
        "Test Case Development",
        "Performance Testing",
        "End-to-End Testing"
      ],
      skills: ["Software Testing", "QA Methodologies", "Bug Tracking", "Test Automation", "Performance Testing", "Cross-platform Testing"],
      github: "#", // To be updated
      portfolio: "#", // To be updated
      email: "#", // To be updated
      image: "https://via.placeholder.com/300x300/fd7e14/ffffff?text=KS",
      contributions: [
        "Comprehensive application testing",
        "Identified and reported bugs",
        "Created test cases and scenarios",
        "Ensured application quality",
        "Performed performance testing",
        "Tested all user workflows and features"
      ]
    }
  ];

  const teamStats = {
    totalMembers: 6, // Total individual members
    frontendTeam: 3, // S. Suheb, A.R. Hima Varshini, J. Pavithra
    backendIndividual: 1, // Sameer Shaik
    deploymentTeam: 2, // D. Vishnu Vardhan, Sameer Shaik
    testingIndividual: 1 // V. Kowsik Sai
  };

  return (
    <div>
      {state && <UserNavigation />}
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#343a40', color: 'white', padding: '60px 0' }}>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 mb-3" data-aos="fade-up">Meet Our Development Team</h1>
              <p className="lead" data-aos="fade-up" data-aos-delay="200">
                The talented individuals behind Portfolio Generator
              </p>
              <Button 
                variant="outline-light" 
                onClick={() => history.push('/')}
                data-aos="fade-up" 
                data-aos-delay="400"
              >
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Stats */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col md={3} className="mb-3" data-aos="fade-up">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h3 className="text-primary">{teamStats.totalMembers}</h3>
                <p className="mb-0">Total Members</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3" data-aos="fade-up" data-aos-delay="100">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h3 className="text-success">{teamStats.frontendTeam}</h3>
                <p className="mb-0">Frontend Team</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3" data-aos="fade-up" data-aos-delay="200">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h3 className="text-info">{teamStats.deploymentTeam}</h3>
                <p className="mb-0">Deployment Team</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3" data-aos="fade-up" data-aos-delay="300">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h3 className="text-warning">2</h3>
                <p className="mb-0">Individual Roles</p>
                <small className="text-muted">Backend & Testing</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Project Overview */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm" data-aos="fade-up">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">About Portfolio Generator</h2>
                <Row>
                  <Col md={6}>
                    <h5>🎯 Our Mission</h5>
                    <p>
                      To democratize professional portfolio creation by providing an intuitive, 
                      powerful platform that helps individuals showcase their skills and achievements 
                      in beautiful, responsive portfolios.
                    </p>
                    
                    <h5>⚡ Key Features</h5>
                    <ul>
                      <li>Multiple professional templates</li>
                      <li>Drag-and-drop portfolio builder</li>
                      <li>Real-time preview and editing</li>
                      <li>Responsive design for all devices</li>
                      <li>SEO optimization</li>
                      <li>Analytics and insights</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h5>🛠 Technology Stack</h5>
                    <div className="mb-3">
                      <Badge bg="primary" className="me-2 mb-2">React.js</Badge>
                      <Badge bg="success" className="me-2 mb-2">Node.js</Badge>
                      <Badge bg="info" className="me-2 mb-2">Express.js</Badge>
                      <Badge bg="warning" className="me-2 mb-2">MongoDB</Badge>
                      <Badge bg="danger" className="me-2 mb-2">Bootstrap</Badge>
                      <Badge bg="dark" className="me-2 mb-2">JWT</Badge>
                    </div>
                    
                    <h5>📊 Project Stats</h5>
                    <ul>
                      <li>6+ Professional Templates</li>
                      <li>Full-stack Web Application</li>
                      <li>User Authentication & Management</li>
                      <li>File Upload & Storage</li>
                      <li>Email Notifications</li>
                      <li>Analytics Dashboard</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Members */}
        <h2 className="text-center mb-5" data-aos="fade-up">Our Team</h2>
        <Row>
          {teamMembers.map((member, index) => (
            <Col lg={6} className="mb-4" key={member.id}>
              <Card 
                className="h-100 border-0 shadow-sm team-card" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body className="p-4">
                  <Row>
                    <Col md={4} className="text-center mb-3">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="rounded-circle mb-3"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                      <Badge 
                        bg={
                          member.team === 'Individual - Backend' ? 'primary' :
                          member.team === 'Team - Frontend' ? 'success' :
                          member.team === 'Team - Deployment' ? 'info' :
                          member.team === 'Individual - Testing' ? 'warning' :
                          'secondary'
                        }
                        className="mb-2"
                      >
                        {member.team}
                      </Badge>
                      {member.teamMembers && (
                        <div className="mt-2">
                          <small className="text-muted d-block">Team Members:</small>
                          {member.teamMembers.map((teamMember, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1 small">
                              {teamMember}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </Col>
                    <Col md={8}>
                      <h5 className="mb-2">{member.name}</h5>
                      <p className="text-muted mb-3">{member.role}</p>
                      <p className="small mb-3">{member.description}</p>
                      
                      <div className="mb-3">
                        <h6 className="small text-uppercase text-muted mb-2">Key Skills</h6>
                        <div>
                          {member.skills.slice(0, 4).map((skill, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 4 && (
                            <Badge bg="secondary" className="me-1 mb-1">
                              +{member.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h6 className="small text-uppercase text-muted mb-2">Responsibilities</h6>
                        <ul className="small mb-0" style={{ fontSize: '0.85rem' }}>
                          {member.responsibilities.slice(0, 3).map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                          {member.responsibilities.length > 3 && (
                            <li>+{member.responsibilities.length - 3} more...</li>
                          )}
                        </ul>
                      </div>

                      <div className="d-flex gap-2">
                        {member.github !== "#" && (
                          <Button 
                            variant="outline-dark" 
                            size="sm"
                            href={member.github}
                            target="_blank"
                          >
                            GitHub
                          </Button>
                        )}
                        {member.portfolio !== "#" && (
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            href={member.portfolio}
                            target="_blank"
                          >
                            Portfolio
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Team Contributions */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm" data-aos="fade-up">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Team Contributions</h2>
                <Row>
                  <Col md={6}>
                    <h5 className="text-primary">🔧 Backend Development (Individual)</h5>
                    <p><strong>Sameer Shaik</strong> - Single-handedly built the entire backend architecture, 
                    database design, authentication system, and all server-side functionality.</p>
                    
                    <h5 className="text-success">🎨 Frontend Development (Team)</h5>
                    <p><strong>Frontend Team:</strong> S. Suheb, A.R. Hima Varshini, and J. Pavithra 
                    collaborated as a team to create the responsive user interface, portfolio templates, and user experience.</p>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-info">🚀 Deployment (Team)</h5>
                    <p><strong>Deployment Team:</strong> D. Vishnu Vardhan and Sameer Shaik 
                    worked together to deploy the application and manage the production infrastructure.</p>
                    
                    <h5 className="text-warning">🧪 Quality Assurance (Individual)</h5>
                    <p><strong>V. Kowsik Sai</strong> - Individually conducted comprehensive testing to ensure 
                    the application meets quality standards and provides a bug-free experience.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Section */}
        <Row className="mt-5">
          <Col className="text-center">
            <Card className="border-0 shadow-sm" data-aos="fade-up">
              <Card.Body className="p-5">
                <h3 className="mb-3">Get In Touch</h3>
                <p className="mb-4">
                  Have questions about our project or want to collaborate? 
                  We'd love to hear from you!
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Button variant="primary" onClick={() => history.push('/templates')}>
                    Try Our Platform
                  </Button>
                  <Button variant="outline-primary" onClick={() => history.push('/')}>
                    Learn More
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default AboutDevelopers;