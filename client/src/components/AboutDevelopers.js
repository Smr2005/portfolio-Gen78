import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserNavigation from './UserNavigation';
import 'aos/dist/aos.css';
import Aos from 'aos';

/**
 * AboutDevelopers Component
 * 
 * Displays information about the development team members including:
 * - Individual developers (Backend, Testing)
 * - Team groups (Frontend, Deployment)
 * - Skills, contributions, and contact information
 * - Interactive animations and responsive design
 * 
 * @returns {JSX.Element} The AboutDevelopers component
 */
const AboutDevelopers = () => {
  const history = useHistory();
  const { state } = useContext(UserContext);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Team members data structure with individual developers and teams
  const teamMembers = [
    {
      id: 1,
      name: "Sameer Shaik",
      role: "Backend Developer & Database Architect",
      team: "Backend",
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
      email: "shaiksameershubhan@gmail.com",
      image: "https://avatars.githubusercontent.com/Smr2005?v=4",
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
      name: "Frontend Development Team",
      role: "Frontend Developers",
      team: "Team - Frontend",
      description: "Collaborative frontend development team focused on creating intuitive and responsive user interfaces. The team works together to deliver modern web experiences with React.js and responsive design principles.",
      teamMembers: [
        {
          name: "S. Suheb",
          role: "Frontend Developer & UI/UX Specialist",
          description: "💻 Creative frontend developer with a passion for crafting beautiful, intuitive user interfaces. I love turning design concepts into interactive experiences that users enjoy. 🎨 Always exploring the latest frontend technologies and design trends to create modern, responsive web applications.",
          github: "https://github.com/suheb09",
          portfolio: "https://suhebportfolio.netlify.app/",
          email: "syedshuheb444@gmail.com",
          image: "https://avatars.githubusercontent.com/u/164171138?v=4",
          skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Responsive Design", "UI/UX Design", "Git", "Figma"],
          contributions: [
            "Developed responsive React components for portfolio templates",
            "Implemented modern UI/UX designs with Bootstrap integration",
            "Created interactive user interfaces with smooth animations",
            "Ensured cross-browser compatibility and mobile responsiveness",
            "Collaborated on component architecture and reusability"
          ]
        },
        {
          name: "A.R. Hima Varshini",
          role: "Frontend Developer & Component Architect",
          description: "⚡ Enthusiastic frontend developer focused on building scalable and maintainable React applications. I enjoy solving complex UI challenges and creating seamless user experiences. 🌟 Passionate about clean code, component reusability, and modern web development practices.",
          github: "https://github.com/Himavarshini30",
          portfolio: "#",
          email: "alaharirajuhimavarshini30@gmail.com",
          image: "https://avatars.githubusercontent.com/u/195284097?v=4",
          skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Component Design", "State Management", "Git", "Debugging"],
          contributions: [
            "Built reusable React components for the portfolio system",
            "Implemented state management solutions for complex UI flows",
            "Developed template customization features and controls",
            "Created responsive layouts for various screen sizes",
            "Contributed to frontend architecture and best practices"
          ]
        },
        {
          name: "J. Pavithra",
          role: "Frontend Developer & Template Designer",
          description: "🎯 Detail-oriented frontend developer with a keen eye for design and user experience. I specialize in creating beautiful, functional templates that help users showcase their work effectively. 💡 Always striving to balance aesthetics with performance and usability.",
          github: "https://github.com/PavithraJanne",
          portfolio: "#",
          email: "jannepavithra@gmail.com",
          image: "https://avatars.githubusercontent.com/u/192334373?v=4",
          skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Template Design", "Responsive Design", "Git", "Web Performance"],
          contributions: [
            "Designed and developed multiple portfolio template layouts",
            "Implemented dynamic content rendering for user portfolios",
            "Created responsive design systems for consistent UI",
            "Optimized frontend performance and loading speeds",
            "Developed user-friendly template customization interfaces"
          ]
        }
      ],
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
      teamMembers: [
        {
          name: "D. Vishnu Vardhan",
          role: "DevOps Engineer & Cloud Specialist",
          description: "☁️ Dedicated DevOps engineer passionate about cloud infrastructure and seamless deployment processes. I believe in automation, scalability, and reliable systems that support great applications. 🚀 Always working to optimize performance and ensure smooth user experiences through robust deployment strategies.",
          github: "#",
          portfolio: "#",
          email: "devathavishnuvardhan1013@gmail.com",
          image: "",
          skills: ["Cloud Deployment", "DevOps", "CI/CD", "Server Management", "Infrastructure", "Automation", "Monitoring", "Docker", "AWS"],
          contributions: [
            "Designed and implemented cloud deployment architecture",
            "Set up automated CI/CD pipelines for seamless deployments",
            "Configured server environments and infrastructure management",
            "Implemented monitoring and performance optimization solutions",
            "Ensured application scalability and high availability",
            "Collaborated with development team for deployment best practices"
          ]
        },
        {
          name: "Sameer Shaik",
          role: "Backend Developer & Deployment Lead",
          description: "🔧 Full-stack developer with expertise in both backend development and deployment operations. I bridge the gap between development and operations, ensuring smooth integration and deployment of applications. 💪 Passionate about creating robust systems that scale and perform reliably in production.",
          github: "https://github.com/Smr2005",
          portfolio: "https://sameer-porfolio.onrender.com/",
          email: "shaiksameershubhan@gmail.com",
          image: "https://avatars.githubusercontent.com/Smr2005?v=4",
          skills: ["Node.js", "Express.js", "MongoDB", "Cloud Deployment", "DevOps", "CI/CD", "Server Management", "API Integration", "Database Management"],
          contributions: [
            "Led the deployment strategy and implementation",
            "Integrated backend services with cloud infrastructure",
            "Configured database connections and server environments",
            "Implemented security measures for production deployment",
            "Monitored application performance and optimized server resources",
            "Provided technical leadership for deployment processes"
          ]
        }
      ],
      responsibilities: [
        "Application Deployment",
        "Infrastructure Management",
        "CI/CD Pipeline Setup",
        "Performance Monitoring",
        "Server Configuration",
        "Cloud Platform Management"
      ],
      skills: ["Cloud Deployment", "DevOps", "Server Management", "CI/CD", "Infrastructure", "Backend Integration"],
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
      role: "Quality Assurance Engineer & Testing Specialist",
      team: "Testing",
      description: "🔍 Meticulous quality assurance engineer with a keen eye for detail and a passion for delivering bug-free applications. I believe that great software is built on a foundation of thorough testing and continuous quality improvement. 🎯 My mission is to ensure every user has a seamless, error-free experience.",
      responsibilities: [
        "Application Testing & Quality Assurance",
        "Bug Detection & Reporting",
        "Test Case Development & Execution",
        "Performance & Load Testing",
        "End-to-End Testing",
        "User Experience Testing",
        "Cross-browser Compatibility Testing"
      ],
      skills: ["Software Testing", "QA Methodologies", "Bug Tracking", "Test Automation", "Performance Testing", "Cross-platform Testing", "Selenium", "Jest", "Manual Testing"],
      github: "https://github.com/VADDEKOWSIKSAI",
      portfolio: "#",
      email: "vaddekowsiksai5@gmail.com",
      image: "https://avatars.githubusercontent.com/u/223649933?v=4",
      contributions: [
        "Conducted comprehensive application testing across all modules",
        "Identified and documented critical bugs and issues",
        "Created detailed test cases and testing scenarios",
        "Ensured application meets quality standards before deployment",
        "Performed performance testing and optimization recommendations",
        "Tested all user workflows and edge cases",
        "Collaborated with development team for bug resolution",
        "Maintained testing documentation and reports"
      ]
    }
  ];

  // Team statistics for dashboard display
  const teamStats = {
    totalMembers: 6,
    frontendTeam: 3,
    backendIndividual: 1,
    deploymentTeam: 2,
    testingIndividual: 1
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
                      {/* Display individual photo for single members */}
                      {!member.teamMembers && (
                        <div className="mb-3">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="rounded-circle mb-2"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                          />
                          <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                            {member.name}
                          </div>
                        </div>
                      )}
                      
                      {/* Display multiple photos for team members */}
                      {member.teamMembers && Array.isArray(member.teamMembers) && member.teamMembers.length > 0 && typeof member.teamMembers[0] === 'object' && (
                        <div className="mb-3">
                          <div className="d-flex justify-content-center flex-wrap gap-2 mb-2">
                            {member.teamMembers.map((teamMember, idx) => (
                              <div key={idx} className="text-center">
                                <img 
                                  src={teamMember.image} 
                                  alt={teamMember.name}
                                  className="rounded-circle"
                                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                                  {teamMember.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Fallback for old string array format */}
                      {member.teamMembers && Array.isArray(member.teamMembers) && member.teamMembers.length > 0 && typeof member.teamMembers[0] === 'string' && (
                        <div className="mb-3">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="rounded-circle mb-2"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-center">
                        <Badge 
                          bg={
                            member.team === 'Backend' ? 'primary' :
                            member.team === 'Team - Frontend' ? 'success' :
                            member.team === 'Team - Deployment' ? 'info' :
                            member.team === 'Testing' ? 'warning' :
                            'secondary'
                          }
                          className="mb-2"
                          style={{ 
                            fontSize: '0.75rem', 
                            padding: '0.25rem 0.5rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {member.team}
                        </Badge>
                      </div>
                      
                      {/* Show team member names as badges for string array format */}
                      {member.teamMembers && Array.isArray(member.teamMembers) && member.teamMembers.length > 0 && typeof member.teamMembers[0] === 'string' && (
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
                      <h5 className="mb-2">
                        {member.team === 'Backend' ? 'Backend Developer' :
                         member.team === 'Testing' ? 'Tester' :
                         member.name}
                      </h5>
                      <p className="text-muted mb-3">{member.role}</p>
                      <p className="small mb-3">{member.description}</p>
                      
                      <div className="mb-3">
                        <h6 className="small text-uppercase text-muted mb-2">Key Skills</h6>
                        <div className="d-flex flex-wrap gap-1">
                          {member.skills && member.skills.slice(0, 4).map((skill, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.85rem' }}>
                              {skill}
                            </Badge>
                          ))}
                          {member.skills && member.skills.length > 4 && (
                            <Badge bg="secondary" className="me-1 mb-1" style={{ fontSize: '0.85rem' }}>
                              +{member.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>



                      <div className="d-flex gap-2 flex-wrap">
                        {/* Individual member links */}
                        {!member.teamMembers && member.github !== "#" && (
                          <Button 
                            variant="outline-dark" 
                            size="sm"
                            href={member.github}
                            target="_blank"
                          >
                            GitHub
                          </Button>
                        )}
                        {!member.teamMembers && member.portfolio !== "#" && (
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            href={member.portfolio}
                            target="_blank"
                          >
                            Portfolio
                          </Button>
                        )}
                        {!member.teamMembers && member.email && member.email !== "#" && member.email !== "" && (
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            href={`mailto:${member.email}`}
                          >
                            Email
                          </Button>
                        )}
                        
                        {/* Team member links */}
                        {member.teamMembers && Array.isArray(member.teamMembers) && member.teamMembers.length > 0 && typeof member.teamMembers[0] === 'object' && (
                          <div className="d-flex gap-1 flex-wrap">
                            {member.teamMembers.map((teamMember, idx) => (
                              <div key={idx} className="d-flex gap-1 mb-1 flex-wrap">
                                {teamMember.github && teamMember.github !== "#" && (
                                  <Button 
                                    variant="outline-dark" 
                                    size="sm"
                                    href={teamMember.github}
                                    target="_blank"
                                  >
                                    {teamMember.name.split(' ')[0]}'s GitHub
                                  </Button>
                                )}
                                {teamMember.portfolio && teamMember.portfolio !== "#" && (
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    href={teamMember.portfolio}
                                    target="_blank"
                                  >
                                    {teamMember.name.split(' ')[0]}'s Portfolio
                                  </Button>
                                )}
                                {teamMember.email && teamMember.email !== "#" && (
                                  <Button 
                                    variant="outline-success" 
                                    size="sm"
                                    href={`mailto:${teamMember.email}`}
                                  >
                                    {teamMember.name.split(' ')[0]}'s Email
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Fallback for old format */}
                        {member.teamMembers && Array.isArray(member.teamMembers) && member.teamMembers.length > 0 && typeof member.teamMembers[0] === 'string' && member.github !== "#" && (
                          <Button 
                            variant="outline-dark" 
                            size="sm"
                            href={member.github}
                            target="_blank"
                          >
                            Team GitHub
                          </Button>
                        )}
                        {member.teamMembers && Array.isArray(member.teamMembers) && member.teamMembers.length > 0 && typeof member.teamMembers[0] === 'string' && member.portfolio !== "#" && (
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