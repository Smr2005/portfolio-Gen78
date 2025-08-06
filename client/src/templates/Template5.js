import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal, ProgressBar, Navbar, Nav } from "react-bootstrap";

function Template5({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeSection, setActiveSection] = useState('about');
  const [typedText, setTypedText] = useState('');

  const defaultData = {
    name: "David Rodriguez",
    title: "Senior Software Engineer & DevOps Specialist",
    email: "david.rodriguez@example.com",
    phone: "+1 (555) 654-3210",
    location: "Austin, TX",
    linkedin: "https://linkedin.com/in/davidrodriguez",
    github: "https://github.com/davidrodriguez",
    website: "https://davidrodriguez.dev",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    about: "Senior full-stack developer and DevOps specialist with 7+ years of experience building scalable, high-performance applications. Expert in microservices architecture, cloud infrastructure, and modern development practices. Passionate about clean code, automation, and mentoring junior developers.",
    experience: [
      {
        company: "CloudTech Solutions",
        position: "Senior Software Engineer",
        duration: "Mar 2021 - Present",
        location: "Austin, TX",
        description: "Lead development of cloud-native applications serving 500K+ users. Architected microservices infrastructure and implemented DevOps best practices.",
        achievements: [
          "Reduced deployment time by 80% with CI/CD automation",
          "Improved system reliability to 99.99% uptime",
          "Led team of 8 developers across 3 time zones",
          "Implemented monitoring reducing incident response by 60%"
        ]
      },
      {
        company: "StartupHub Inc.",
        position: "Full Stack Developer",
        duration: "Jan 2019 - Feb 2021",
        location: "Remote",
        description: "Built MVP and scaled platform from 0 to 100K users. Implemented real-time features and payment systems.",
        achievements: [
          "Developed entire platform architecture from scratch",
          "Integrated multiple payment gateways",
          "Achieved sub-200ms API response times",
          "Built real-time collaboration features"
        ]
      },
      {
        company: "TechCorp",
        position: "Software Developer (Internship)",
        duration: "Jun 2018 - Dec 2018",
        location: "Austin, TX",
        description: "Summer internship focused on backend development and database optimization.",
        achievements: [
          "Optimized database queries reducing load time by 40%",
          "Developed REST APIs for mobile applications",
          "Learned enterprise development practices"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Texas at Austin",
        duration: "2015 - 2019",
        location: "Austin, TX",
        gpa: "3.7/4.0",
        relevant: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Computer Networks"]
      }
    ],
    certifications: [
      {
        name: "AWS Certified DevOps Engineer - Professional",
        issuer: "Amazon Web Services",
        date: "February 2023",
        credentialId: "AWS-DEVOPS-2023-001",
        validUntil: "February 2026",
        verifyLink: "https://aws.amazon.com/verification"
      },
      {
        name: "Kubernetes Certified Application Developer",
        issuer: "Cloud Native Computing Foundation",
        date: "December 2022",
        credentialId: "CKAD-2022-001",
        validUntil: "December 2025",
        verifyLink: "https://training.linuxfoundation.org/certification/verify"
      },
      {
        name: "Docker Certified Associate",
        issuer: "Docker Inc.",
        date: "October 2022",
        credentialId: "DCA-2022-001",
        validUntil: "October 2024",
        verifyLink: "https://credentials.docker.com/verify"
      }
    ],
    skills: [
      { name: "JavaScript", level: 95, category: "Language" },
      { name: "Python", level: 90, category: "Language" },
      { name: "React", level: 92, category: "Frontend" },
      { name: "Node.js", level: 88, category: "Backend" },
      { name: "Docker", level: 90, category: "DevOps" },
      { name: "Kubernetes", level: 85, category: "DevOps" },
      { name: "AWS", level: 87, category: "Cloud" },
      { name: "MongoDB", level: 83, category: "Database" },
      { name: "PostgreSQL", level: 80, category: "Database" },
      { name: "Redis", level: 78, category: "Database" }
    ],
    projects: [
      {
        title: "Microservices E-commerce Platform",
        description: "Built scalable microservices system handling 1M+ requests daily with Docker and Kubernetes. Implemented event-driven architecture with message queues.",
        tech: ["Node.js", "Docker", "Kubernetes", "MongoDB", "Redis", "RabbitMQ"],
        liveLink: "https://ecommerce.davidrodriguez.dev",
        githubLink: "https://github.com/davidrodriguez/microservices-ecommerce",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        featured: true,
        status: "Live",
        metrics: {
          requests: "1M+/day",
          uptime: "99.99%",
          users: "50K+"
        }
      },
      {
        title: "Real-time Analytics Dashboard",
        description: "Developed real-time data visualization platform using React and WebSocket connections. Features live data streaming and interactive charts.",
        tech: ["React", "D3.js", "WebSocket", "Redis", "Python", "FastAPI"],
        liveLink: "https://analytics.davidrodriguez.dev",
        githubLink: "https://github.com/davidrodriguez/realtime-analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        featured: true,
        status: "Live",
        metrics: {
          dataPoints: "10M+",
          latency: "<50ms",
          concurrent: "1K+"
        }
      },
      {
        title: "DevOps Automation Suite",
        description: "Created comprehensive DevOps toolkit for automated deployment, monitoring, and scaling of containerized applications.",
        tech: ["Python", "Terraform", "Ansible", "Prometheus", "Grafana"],
        liveLink: "https://devops.davidrodriguez.dev",
        githubLink: "https://github.com/davidrodriguez/devops-suite",
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop",
        featured: false,
        status: "Open Source"
      }
    ]
  };

  const data = userData ? { ...defaultData, ...userData } : defaultData;
  
  // Convert skills from string array to object array if needed
  if (data.skills && data.skills.length > 0 && typeof data.skills[0] === 'string') {
    data.skills = data.skills.filter(skill => skill.trim()).map((skill, index) => ({
      name: skill.trim(),
      level: 75 + (index % 4) * 5, // Generate levels between 75-90
      category: index % 4 === 0 ? 'Frontend' : 
                index % 4 === 1 ? 'Backend' : 
                index % 4 === 2 ? 'Database' : 'DevOps'
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

  // Typing animation effect
  useEffect(() => {
    const text = "console.log('Hello, World! I build amazing software.');";
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Add terminal-style animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      @keyframes slideInTerminal {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(88, 166, 255, 0.3); }
        50% { box-shadow: 0 0 20px rgba(88, 166, 255, 0.6); }
      }
      
      .terminal-cursor::after {
        content: '|';
        animation: blink 1s infinite;
        color: #58a6ff;
      }
      
      .terminal-card {
        animation: slideInTerminal 0.8s ease-out;
      }
      
      .glow-on-hover:hover {
        animation: glow 2s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
    setShowCertModal(true);
  };

  const downloadResume = () => {
    // Create a simple resume content
    const resumeContent = `
${data.name}
${data.title}
${data.email} | ${data.phone} | ${data.location}

ABOUT
${data.about}

EXPERIENCE
${data.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.duration} | ${exp.location}
${exp.description}
${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${data.education.map(edu => `
${edu.degree}
${edu.school} | ${edu.duration}
GPA: ${edu.gpa}
`).join('\n')}

SKILLS
${data.skills.map(skill => `${skill.name} (${skill.level}%)`).join(', ')}
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(' ', '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      fontFamily: 'Fira Code, Monaco, monospace', 
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh'
    }}>
      {/* Navigation */}
      <Navbar expand="lg" style={{ 
        backgroundColor: '#161b22', 
        borderBottom: '1px solid #30363d',
        padding: '1rem 0'
      }} fixed="top">
        <Container>
          <Navbar.Brand style={{ 
            color: '#58a6ff', 
            fontFamily: 'Fira Code, monospace',
            fontSize: '1.2rem'
          }}>
            {data.name.split(' ')[0].toLowerCase()}@portfolio:~$
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {['about', 'experience', 'skills', 'projects', 'certifications', 'contact'].map((section) => (
                <Nav.Link 
                  key={section}
                  href={`#${section}`}
                  style={{ 
                    color: activeSection === section ? '#58a6ff' : '#7d8590',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '0.9rem',
                    margin: '0 0.5rem'
                  }}
                  onClick={() => setActiveSection(section)}
                >
                  ./{section}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section id="about" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px'
      }}>
        {/* Code-like background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(33, 38, 45, 0.3) 2px,
              rgba(33, 38, 45, 0.3) 4px
            )
          `,
          opacity: 0.5
        }}></div>
        
        <Container className="h-100 d-flex align-items-center position-relative">
          <Row className="w-100 align-items-center">
            <Col lg={8}>
              <div className="terminal-card" style={{
                background: '#21262d',
                border: '1px solid #30363d',
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}>
                {/* Terminal header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #30363d'
                }}>
                  <div style={{ display: 'flex', gap: '8px', marginRight: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
                  </div>
                  <span style={{ color: '#7d8590', fontSize: '0.9rem' }}>~/portfolio/developer.js</span>
                </div>
                
                <div style={{ fontFamily: 'Fira Code, monospace' }}>
                  <div style={{ color: '#7d8590', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#f85149' }}>const</span>{' '}
                    <span style={{ color: '#79c0ff' }}>developer</span>{' '}
                    <span style={{ color: '#ff7b72' }}>=</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>{'{'}</span>
                  </div>
                  <div style={{ marginLeft: '2rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#79c0ff' }}>name</span>
                    <span style={{ color: '#ff7b72' }}>:</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>"{data.name}"</span>
                    <span style={{ color: '#7d8590' }}>,</span>
                  </div>
                  <div style={{ marginLeft: '2rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#79c0ff' }}>role</span>
                    <span style={{ color: '#ff7b72' }}>:</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>"{data.title}"</span>
                    <span style={{ color: '#7d8590' }}>,</span>
                  </div>
                  <div style={{ marginLeft: '2rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#79c0ff' }}>location</span>
                    <span style={{ color: '#ff7b72' }}>:</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>"{data.location}"</span>
                    <span style={{ color: '#7d8590' }}>,</span>
                  </div>
                  <div style={{ marginLeft: '2rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#79c0ff' }}>passion</span>
                    <span style={{ color: '#ff7b72' }}>:</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>"Building scalable software solutions"</span>
                    <span style={{ color: '#7d8590' }}>,</span>
                  </div>
                  <div style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#79c0ff' }}>contact</span>
                    <span style={{ color: '#ff7b72' }}>:</span>{' '}
                    <span style={{ color: '#a5d6ff' }}>() => console.log("Let's connect!")</span>
                  </div>
                  <div style={{ color: '#a5d6ff' }}>{'}'}</div>
                  
                  <div style={{ marginTop: '2rem', color: '#7d8590' }}>
                    <span className="terminal-cursor">{typedText}</span>
                  </div>
                </div>
                
                <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Button 
                    className="glow-on-hover"
                    style={{
                      background: '#238636',
                      border: '1px solid #2ea043',
                      color: 'white',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      fontFamily: 'Fira Code, monospace'
                    }}
                    href="#projects"
                  >
                    ./view-projects.sh
                  </Button>
                  <Button 
                    style={{
                      background: '#1f6feb',
                      border: '1px solid #1f6feb',
                      color: 'white',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      fontFamily: 'Fira Code, monospace'
                    }}
                    onClick={() => setShowResumeModal(true)}
                  >
                    cat resume.pdf
                  </Button>
                  <Button 
                    style={{
                      background: 'transparent',
                      border: '1px solid #30363d',
                      color: '#c9d1d9',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      fontFamily: 'Fira Code, monospace'
                    }}
                    href="#contact"
                  >
                    git contact
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <div style={{
                background: '#21262d',
                border: '1px solid #30363d',
                borderRadius: '50%',
                padding: '2rem',
                display: 'inline-block',
                marginBottom: '2rem'
              }}>
                <img 
                  src={data.profileImage}
                  alt={data.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #58a6ff'
                  }}
                />
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <a href={data.github} target="_blank" rel="noopener noreferrer" style={{
                    color: '#7d8590',
                    fontSize: '1.5rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#58a6ff'}
                  onMouseLeave={(e) => e.target.style.color = '#7d8590'}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    color: '#7d8590',
                    fontSize: '1.5rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#58a6ff'}
                  onMouseLeave={(e) => e.target.style.color = '#7d8590'}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={data.website} target="_blank" rel="noopener noreferrer" style={{
                    color: '#7d8590',
                    fontSize: '1.5rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#58a6ff'}
                  onMouseLeave={(e) => e.target.style.color = '#7d8590'}
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                </div>
                <p style={{ color: '#7d8590', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }}>
                  {data.about.substring(0, 100)}...
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ 
        padding: '80px 0', 
        backgroundColor: '#161b22',
        borderTop: '1px solid #30363d'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#f0f6fc',
              marginBottom: '1rem',
              fontFamily: 'Fira Code, monospace'
            }}>
              <span style={{ color: '#7d8590' }}>//</span> Work Experience
            </h2>
            <p style={{ color: '#7d8590', fontFamily: 'Fira Code, monospace' }}>
              My professional journey in software development
            </p>
          </div>
          
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <Card style={{
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#c9d1d9'
              }}>
                <Card.Body style={{ padding: '2rem' }}>
                  <Row>
                    <Col md={8}>
                      <h4 style={{ 
                        color: '#58a6ff',
                        fontFamily: 'Fira Code, monospace',
                        marginBottom: '0.5rem'
                      }}>
                        {exp.position}
                      </h4>
                      <h5 style={{ 
                        color: '#f0f6fc',
                        marginBottom: '0.5rem'
                      }}>
                        {exp.company}
                      </h5>
                      <p style={{ 
                        color: '#7d8590',
                        marginBottom: '1rem',
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '0.9rem'
                      }}>
                        {exp.duration} | {exp.location}
                      </p>
                      <p style={{ 
                        color: '#c9d1d9',
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                      }}>
                        {exp.description}
                      </p>
                      <div>
                        <h6 style={{ color: '#f0f6fc', marginBottom: '0.5rem' }}>Key Achievements:</h6>
                        <ul style={{ color: '#c9d1d9', paddingLeft: '1.5rem' }}>
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} style={{ marginBottom: '0.25rem' }}>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col md={4} className="text-end">
                      <Badge 
                        style={{
                          background: index === 0 ? '#238636' : '#1f6feb',
                          color: 'white',
                          fontFamily: 'Fira Code, monospace',
                          fontSize: '0.8rem',
                          padding: '8px 12px'
                        }}
                      >
                        {index === 0 ? 'Current' : 'Previous'}
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ 
        padding: '80px 0', 
        backgroundColor: '#0d1117'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#f0f6fc',
              marginBottom: '1rem',
              fontFamily: 'Fira Code, monospace'
            }}>
              <span style={{ color: '#7d8590' }}>//</span> Technical Skills
            </h2>
            <p style={{ color: '#7d8590', fontFamily: 'Fira Code, monospace' }}>
              Technologies and tools I work with
            </p>
          </div>
          
          <Row>
            {data.skills.map((skill, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <div style={{
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#58a6ff';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#30363d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h5 style={{ 
                      color: '#f0f6fc',
                      fontFamily: 'Fira Code, monospace',
                      margin: 0
                    }}>
                      {skill.name}
                    </h5>
                    <Badge 
                      style={{
                        background: '#1f6feb',
                        color: 'white',
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '0.7rem'
                      }}
                    >
                      {skill.category}
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={skill.level} 
                    style={{ 
                      height: '8px',
                      backgroundColor: '#21262d'
                    }}
                  />
                  <div style={{ 
                    textAlign: 'right', 
                    marginTop: '0.5rem',
                    color: '#7d8590',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '0.8rem'
                  }}>
                    {skill.level}%
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ 
        padding: '80px 0', 
        backgroundColor: '#161b22',
        borderTop: '1px solid #30363d'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#f0f6fc',
              marginBottom: '1rem',
              fontFamily: 'Fira Code, monospace'
            }}>
              <span style={{ color: '#7d8590' }}>//</span> Featured Projects
            </h2>
            <p style={{ color: '#7d8590', fontFamily: 'Fira Code, monospace' }}>
              Some of my recent work and contributions
            </p>
          </div>
          
          <Row>
            {data.projects.map((project, index) => (
              <Col lg={6} key={index} className="mb-4">
                <Card style={{
                  background: '#0d1117',
                  border: '1px solid #30363d',
                  borderRadius: '8px',
                  color: '#c9d1d9',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#58a6ff';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#30363d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                      }}
                    />
                    <Badge 
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: project.status === 'Live' ? '#238636' : '#1f6feb',
                        color: 'white',
                        fontFamily: 'Fira Code, monospace'
                      }}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <Card.Body style={{ padding: '2rem' }}>
                    <Card.Title style={{ 
                      fontSize: '1.3rem', 
                      color: '#58a6ff',
                      fontFamily: 'Fira Code, monospace',
                      marginBottom: '1rem'
                    }}>
                      {project.title}
                    </Card.Title>
                    <Card.Text style={{ 
                      color: '#c9d1d9',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem'
                    }}>
                      {project.description}
                    </Card.Text>
                    
                    {project.metrics && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <Row className="text-center">
                          {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                            <Col key={metricIndex}>
                              <div style={{ 
                                background: '#161b22',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                border: '1px solid #30363d'
                              }}>
                                <div style={{ color: '#58a6ff', fontWeight: 'bold' }}>{value}</div>
                                <div style={{ color: '#7d8590', fontSize: '0.8rem' }}>{key}</div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {(Array.isArray(project.tech) ? project.tech : project.tech ? project.tech.split(',').map(t => t.trim()) : []).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          style={{
                            background: '#1f6feb',
                            color: 'white',
                            fontFamily: 'Fira Code, monospace',
                            fontSize: '0.7rem',
                            padding: '4px 8px'
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Button 
                        href={project.liveLink}
                        target="_blank"
                        style={{
                          background: '#238636',
                          border: '1px solid #2ea043',
                          color: 'white',
                          fontSize: '0.8rem',
                          fontFamily: 'Fira Code, monospace',
                          flex: 1
                        }}
                      >
                        <i className="fas fa-external-link-alt me-2"></i>
                        Live Demo
                      </Button>
                      <Button 
                        href={project.githubLink}
                        target="_blank"
                        style={{
                          background: 'transparent',
                          border: '1px solid #30363d',
                          color: '#c9d1d9',
                          fontSize: '0.8rem',
                          fontFamily: 'Fira Code, monospace',
                          flex: 1
                        }}
                      >
                        <i className="fab fa-github me-2"></i>
                        Code
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={{ 
        padding: '80px 0', 
        backgroundColor: '#0d1117'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#f0f6fc',
              marginBottom: '1rem',
              fontFamily: 'Fira Code, monospace'
            }}>
              <span style={{ color: '#7d8590' }}>//</span> Certifications
            </h2>
            <p style={{ color: '#7d8590', fontFamily: 'Fira Code, monospace' }}>
              Professional certifications and achievements
            </p>
          </div>
          
          <Row>
            {data.certifications.map((cert, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card 
                  style={{
                    background: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                    color: '#c9d1d9',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleCertClick(cert)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#58a6ff';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#30363d';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Card.Body style={{ padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{ 
                        fontSize: '3rem',
                        marginBottom: '1rem'
                      }}>
                        🏆
                      </div>
                    </div>
                    <Card.Title style={{ 
                      fontSize: '1.1rem', 
                      color: '#58a6ff',
                      fontFamily: 'Fira Code, monospace',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>
                      {cert.name}
                    </Card.Title>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ 
                        color: '#f0f6fc',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold'
                      }}>
                        {cert.issuer}
                      </p>
                      <p style={{ 
                        color: '#7d8590',
                        marginBottom: '0.5rem',
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '0.9rem'
                      }}>
                        Issued: {cert.date}
                      </p>
                      <p style={{ 
                        color: '#7d8590',
                        marginBottom: '1rem',
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '0.9rem'
                      }}>
                        Valid until: {cert.validUntil}
                      </p>
                      <Badge 
                        style={{
                          background: '#238636',
                          color: 'white',
                          fontFamily: 'Fira Code, monospace',
                          fontSize: '0.7rem'
                        }}
                      >
                        Click to verify
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '80px 0',
        backgroundColor: '#161b22',
        borderTop: '1px solid #30363d'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div style={{
                background: '#21262d',
                border: '1px solid #30363d',
                borderRadius: '8px',
                padding: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #30363d'
                }}>
                  <div style={{ display: 'flex', gap: '8px', marginRight: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
                  </div>
                  <span style={{ color: '#7d8590', fontSize: '0.9rem' }}>~/contact/connect.sh</span>
                </div>
                
                <div className="text-center">
                  <h2 style={{ 
                    fontSize: '2rem', 
                    color: '#58a6ff',
                    marginBottom: '1rem',
                    fontFamily: 'Fira Code, monospace'
                  }}>
                    Let's Connect!
                  </h2>
                  <p style={{ 
                    color: '#c9d1d9',
                    marginBottom: '2rem',
                    fontSize: '1.1rem'
                  }}>
                    Ready to collaborate on your next project? Let's build something amazing together.
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#58a6ff', fontSize: '2rem', marginBottom: '0.5rem' }}>
                        <i className="fas fa-envelope"></i>
                      </div>
                      <a href={`mailto:${data.email}`} style={{ 
                        color: '#c9d1d9', 
                        textDecoration: 'none',
                        fontFamily: 'Fira Code, monospace'
                      }}>
                        {data.email}
                      </a>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#58a6ff', fontSize: '2rem', marginBottom: '0.5rem' }}>
                        <i className="fas fa-phone"></i>
                      </div>
                      <a href={`tel:${data.phone}`} style={{ 
                        color: '#c9d1d9', 
                        textDecoration: 'none',
                        fontFamily: 'Fira Code, monospace'
                      }}>
                        {data.phone}
                      </a>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#58a6ff', fontSize: '2rem', marginBottom: '0.5rem' }}>
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <span style={{ 
                        color: '#c9d1d9',
                        fontFamily: 'Fira Code, monospace'
                      }}>
                        {data.location}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Button 
                      href={`mailto:${data.email}`}
                      style={{
                        background: '#238636',
                        border: '1px solid #2ea043',
                        color: 'white',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontFamily: 'Fira Code, monospace'
                      }}
                    >
                      <i className="fas fa-envelope me-2"></i>
                      Send Email
                    </Button>
                    <Button 
                      onClick={downloadResume}
                      style={{
                        background: '#1f6feb',
                        border: '1px solid #1f6feb',
                        color: 'white',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontFamily: 'Fira Code, monospace'
                      }}
                    >
                      <i className="fas fa-download me-2"></i>
                      Download Resume
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resume Modal */}
      <Modal show={showResumeModal} onHide={() => setShowResumeModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}>
          <Modal.Title style={{ color: '#f0f6fc', fontFamily: 'Fira Code, monospace' }}>
            Resume Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#0d1117', color: '#c9d1d9', maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', lineHeight: '1.6' }}>
            <div className="text-center mb-4">
              <h3 style={{ color: '#58a6ff' }}>{data.name}</h3>
              <p style={{ color: '#7d8590' }}>{data.title}</p>
              <p style={{ color: '#7d8590' }}>{data.email} | {data.phone} | {data.location}</p>
            </div>
            
            <div className="mb-4">
              <h5 style={{ color: '#f0f6fc', borderBottom: '1px solid #30363d', paddingBottom: '0.5rem' }}>
                About
              </h5>
              <p>{data.about}</p>
            </div>
            
            <div className="mb-4">
              <h5 style={{ color: '#f0f6fc', borderBottom: '1px solid #30363d', paddingBottom: '0.5rem' }}>
                Experience
              </h5>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <h6 style={{ color: '#58a6ff' }}>{exp.position} - {exp.company}</h6>
                  <p style={{ color: '#7d8590', fontSize: '0.9rem' }}>{exp.duration} | {exp.location}</p>
                  <p>{exp.description}</p>
                  <ul>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <h5 style={{ color: '#f0f6fc', borderBottom: '1px solid #30363d', paddingBottom: '0.5rem' }}>
                Skills
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {data.skills.map((skill, index) => (
                  <Badge key={index} style={{ background: '#1f6feb', color: 'white' }}>
                    {skill.name} ({skill.level}%)
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}>
          <Button 
            variant="outline-light" 
            onClick={() => setShowResumeModal(false)}
            style={{ fontFamily: 'Fira Code, monospace' }}
          >
            Close
          </Button>
          <Button 
            onClick={downloadResume}
            style={{
              background: '#238636',
              border: '1px solid #2ea043',
              fontFamily: 'Fira Code, monospace'
            }}
          >
            Download Resume
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Certification Modal */}
      <Modal show={showCertModal} onHide={() => setShowCertModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}>
          <Modal.Title style={{ color: '#f0f6fc', fontFamily: 'Fira Code, monospace' }}>
            Certification Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#0d1117', color: '#c9d1d9' }}>
          {selectedCert && (
            <div className="text-center">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
              <h4 style={{ color: '#58a6ff', marginBottom: '1rem' }}>{selectedCert.name}</h4>
              <p style={{ color: '#f0f6fc', fontSize: '1.1rem' }}>{selectedCert.issuer}</p>
              <p style={{ color: '#7d8590' }}>Issued: {selectedCert.date}</p>
              <p style={{ color: '#7d8590' }}>Valid until: {selectedCert.validUntil}</p>
              <p style={{ color: '#7d8590', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }}>
                Credential ID: {selectedCert.credentialId}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}>
          <Button 
            variant="outline-light" 
            onClick={() => setShowCertModal(false)}
            style={{ fontFamily: 'Fira Code, monospace' }}
          >
            Close
          </Button>
          {selectedCert && (
            <Button 
              href={selectedCert.verifyLink}
              target="_blank"
              style={{
                background: '#238636',
                border: '1px solid #2ea043',
                fontFamily: 'Fira Code, monospace'
              }}
            >
              Verify Certificate
            </Button>
          )}
        </Modal.Footer>
      </Modal>

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
          Preview Mode - Developer Terminal Template
        </div>
      )}
    </div>
  );
}

export default Template5;