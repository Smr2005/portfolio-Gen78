import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, ProgressBar, Badge, Modal } from "react-bootstrap";
// Fixed data handling for userData compatibility

function Template1({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const defaultData = {
    name: "John Doe",
    title: "Senior Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    about: "Passionate full-stack developer with 5+ years of experience in creating scalable web applications using modern technologies. Specialized in React, Node.js, and cloud architecture with a proven track record of delivering high-performance solutions.",
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Full Stack Developer",
        duration: "Jan 2022 - Present",
        location: "San Francisco, CA",
        description: "Lead development of enterprise applications serving 100K+ users. Architected microservices infrastructure reducing response time by 40%. Mentored team of 5 junior developers.",
        achievements: [
          "Reduced application load time by 60%",
          "Implemented CI/CD pipeline saving 20 hours/week",
          "Led migration to cloud infrastructure"
        ]
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "Jun 2020 - Dec 2021",
        location: "Remote",
        description: "Built MVP from scratch using React and Node.js. Implemented real-time features and payment integration.",
        achievements: [
          "Built entire platform from concept to production",
          "Integrated Stripe payment system",
          "Achieved 99.9% uptime"
        ]
      },
      {
        company: "WebDev Agency",
        position: "Junior Developer (Internship)",
        duration: "Jun 2019 - Aug 2019",
        location: "San Francisco, CA",
        description: "Summer internship focusing on frontend development and UI/UX implementation.",
        achievements: [
          "Developed 5 client websites",
          "Learned modern React patterns",
          "Collaborated with design team"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        field: "Computer Science",
        duration: "2016 - 2020",
        location: "Stanford, CA",
        gpa: "3.8/4.0",
        description: "Focused on software engineering, data structures, algorithms, and web development. Graduated Magna Cum Laude.",
        relevant: ["Data Structures", "Algorithms", "Web Development", "Database Systems"]
      }
    ],
    internships: [
      {
        company: "Google",
        position: "Software Engineering Intern",
        duration: "Jun 2019 - Aug 2019",
        location: "Mountain View, CA",
        description: "Worked on Google Search infrastructure, implementing performance optimizations that improved query response time by 15%.",
        achievements: [
          "Optimized search algorithms reducing latency by 15%",
          "Collaborated with senior engineers on core infrastructure",
          "Presented findings to engineering leadership"
        ]
      },
      {
        company: "Microsoft",
        position: "Product Management Intern",
        duration: "Jun 2018 - Aug 2018",
        location: "Redmond, WA",
        description: "Assisted in product strategy for Microsoft Azure, conducting market research and user interviews.",
        achievements: [
          "Conducted 50+ user interviews for Azure features",
          "Created product roadmap recommendations",
          "Collaborated with cross-functional teams"
        ]
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        date: "March 2023",
        credentialId: "AWS-SAP-2023-001",
        validUntil: "March 2026",
        verifyLink: "https://aws.amazon.com/verification"
      },
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        date: "January 2023",
        credentialId: "GCP-PD-2023-001",
        validUntil: "January 2025",
        verifyLink: "https://cloud.google.com/certification"
      },
      {
        name: "MongoDB Certified Developer",
        issuer: "MongoDB Inc.",
        date: "November 2022",
        credentialId: "MONGO-DEV-2022-001",
        validUntil: "November 2024",
        verifyLink: "https://university.mongodb.com/verify"
      }
    ],
    skills: [
      { name: "React", level: 95, category: "Frontend" },
      { name: "Node.js", level: 90, category: "Backend" },
      { name: "Python", level: 85, category: "Backend" },
      { name: "MongoDB", level: 88, category: "Database" },
      { name: "AWS", level: 82, category: "Cloud" },
      { name: "Docker", level: 80, category: "DevOps" },
      { name: "TypeScript", level: 88, category: "Language" },
      { name: "GraphQL", level: 75, category: "API" }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform built with React and Node.js, handling 10K+ daily transactions with real-time inventory management.",
        tech: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
        liveLink: "https://ecommerce-demo.johndoe.dev",
        githubLink: "https://github.com/johndoe/ecommerce-platform",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        featured: true,
        status: "Live",
        metrics: {
          users: "50K+",
          transactions: "$2M+",
          uptime: "99.9%"
        }
      },
      {
        title: "Task Management SaaS",
        description: "A collaborative task management application with real-time updates, team collaboration, and advanced analytics dashboard.",
        tech: ["React", "Socket.io", "Express", "PostgreSQL", "Redis"],
        liveLink: "https://taskmanager-demo.johndoe.dev",
        githubLink: "https://github.com/johndoe/task-manager",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        featured: true,
        status: "Live",
        metrics: {
          users: "10K+",
          tasks: "1M+",
          teams: "500+"
        }
      },
      {
        title: "AI-Powered Analytics Dashboard",
        description: "Machine learning dashboard for business intelligence with predictive analytics and automated reporting.",
        tech: ["Python", "TensorFlow", "React", "D3.js", "FastAPI"],
        liveLink: "https://analytics-demo.johndoe.dev",
        githubLink: "https://github.com/johndoe/ai-analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        featured: false,
        status: "In Development"
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

  useEffect(() => {
    // Add 3D animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float3d {
        0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
        25% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg); }
        50% { transform: translateY(-20px) rotateX(0deg) rotateY(10deg); }
        75% { transform: translateY(-10px) rotateX(-5deg) rotateY(5deg); }
      }
      
      @keyframes rotate3d {
        0% { transform: rotateY(0deg) rotateX(0deg); }
        100% { transform: rotateY(360deg) rotateX(360deg); }
      }
      
      @keyframes slideIn3d {
        0% { transform: translateX(-100px) rotateY(-90deg); opacity: 0; }
        100% { transform: translateX(0) rotateY(0deg); opacity: 1; }
      }
      
      .card-3d {
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
      }
      
      .card-3d:hover {
        transform: rotateY(10deg) rotateX(5deg) translateZ(20px);
      }
      
      .profile-3d {
        animation: float3d 6s ease-in-out infinite;
        transform-style: preserve-3d;
      }
      
      .skill-bar-3d {
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
      }
      
      .skill-bar-3d:hover {
        transform: translateZ(10px) rotateX(5deg);
      }
      
      /* Mobile-specific styles */
      @media (max-width: 768px) {
        .card-3d:hover {
          transform: none;
        }
        
        .profile-3d {
          animation: none;
        }
        
        .skill-bar-3d:hover {
          transform: none;
        }
        
        .navbar-brand {
          font-size: 1.2rem !important;
        }
        
        .nav-link {
          padding: 0.75rem 1rem !important;
          text-align: center;
        }
        
        .btn {
          margin: 0.25rem 0;
          width: 100%;
        }
        
        .container {
          padding-left: 15px;
          padding-right: 15px;
        }
        
        .row {
          margin-left: -10px;
          margin-right: -10px;
        }
        
        .col-md-4, .col-md-6, .col-md-8 {
          padding-left: 10px;
          padding-right: 10px;
          margin-bottom: 1rem;
        }
        
        h1 {
          font-size: 2rem !important;
        }
        
        h2 {
          font-size: 1.5rem !important;
        }
        
        h3 {
          font-size: 1.25rem !important;
        }
        
        .card {
          margin-bottom: 1rem;
        }
        
        .progress {
          height: 8px;
        }
        
        .badge {
          font-size: 0.75rem;
          margin: 0.125rem;
        }
      }
      
      @media (max-width: 480px) {
        .navbar-brand {
          font-size: 1rem !important;
        }
        
        .container {
          padding-left: 10px;
          padding-right: 10px;
        }
        
        .card {
          padding: 1rem;
        }
        
        h1 {
          font-size: 1.75rem !important;
        }
        
        h2 {
          font-size: 1.25rem !important;
        }
        
        h3 {
          font-size: 1.1rem !important;
        }
        
        .btn {
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
        }
        
        .progress {
          height: 6px;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Enhanced Navigation */}
      <Navbar 
        variant="dark" 
        expand="lg" 
        fixed="top"
        style={{
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Container>
          <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            {data.name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#experience">Experience</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#certifications">Certifications</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              {data.resume ? (
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  className="ml-2"
                  href={data.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </Button>
              ) : (
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => setShowResumeModal(true)}
                >
                  Resume
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Enhanced Hero Section with Profile Picture */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 3D Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          animation: 'float3d 8s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          animation: 'float3d 6s ease-in-out infinite reverse'
        }}></div>

        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div style={{ animation: 'slideIn3d 1s ease-out' }}>
                <h1 style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Hi, I'm {data.name}
                </h1>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '2rem', 
                  opacity: 0.9,
                  fontWeight: '400'
                }}>
                  {data.title}
                </h2>
                <p style={{ 
                  fontSize: '1.2rem', 
                  marginBottom: '2rem', 
                  opacity: 0.8,
                  lineHeight: '1.6'
                }}>
                  {data.about}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <Button 
                    variant="light" 
                    size="lg"
                    href="#projects"
                    style={{ 
                      fontWeight: '600',
                      padding: '12px 30px',
                      borderRadius: '25px'
                    }}
                  >
                    View My Work
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg"
                    href="#contact"
                    style={{ 
                      fontWeight: '600',
                      padding: '12px 30px',
                      borderRadius: '25px'
                    }}
                  >
                    Get In Touch
                  </Button>
                </div>
                {/* Social Links */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer" 
                     style={{ color: 'white', fontSize: '1.5rem', opacity: 0.8 }}>
                    💼
                  </a>
                  <a href={data.github} target="_blank" rel="noopener noreferrer"
                     style={{ color: 'white', fontSize: '1.5rem', opacity: 0.8 }}>
                    🔗
                  </a>
                  <a href={data.website} target="_blank" rel="noopener noreferrer"
                     style={{ color: 'white', fontSize: '1.5rem', opacity: 0.8 }}>
                    🌐
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="profile-3d" style={{
                width: '350px',
                height: '350px',
                margin: '0 auto',
                position: 'relative'
              }}>
                <img 
                  src={data.profileImage}
                  alt={data.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '8px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transform: 'translateZ(20px)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: '#10b981',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  border: '4px solid white',
                  animation: 'float3d 4s ease-in-out infinite'
                }}>
                  ✓
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '100px 0', backgroundColor: 'white' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="text-center mb-5">
                <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
                  About Me
                </h2>
                <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
              </div>
              <Card className="card-3d" style={{ 
                border: 'none', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                borderRadius: '20px'
              }}>
                <Card.Body style={{ padding: '3rem' }}>
                  <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#64748b', textAlign: 'center' }}>
                    {data.about}
                  </p>
                  <Row className="mt-4 text-center">
                    <Col md={3}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{data.location}</div>
                    </Col>
                    <Col md={3}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💼</div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>5+ Years</div>
                    </Col>
                    <Col md={3}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>50+ Projects</div>
                    </Col>
                    <Col md={3}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>Top Rated</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
              Professional Experience
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
          </div>
          <Row>
            <Col lg={10} className="mx-auto">
              {(data.experience || []).map((exp, index) => (
                <Card key={index} className="card-3d mb-4" style={{ 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '15px'
                }}>
                  <Card.Body style={{ padding: '2.5rem' }}>
                    <Row>
                      <Col md={8}>
                        <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '0.5rem' }}>
                          {exp.position}
                        </h4>
                        <h5 style={{ color: '#667eea', fontWeight: '600', marginBottom: '1rem' }}>
                          {exp.company} • {exp.location}
                        </h5>
                        <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                          {exp.description}
                        </p>
                        {exp.achievements && (
                          <div>
                            <h6 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1rem' }}>
                              Key Achievements:
                            </h6>
                            <ul style={{ color: '#64748b' }}>
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Col>
                      <Col md={4} className="text-right">
                        <Badge 
                          style={{ 
                            background: '#667eea', 
                            fontSize: '0.9rem',
                            padding: '8px 15px',
                            borderRadius: '20px'
                          }}
                        >
                          {exp.duration}
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section with 3D Progress Bars */}
      <section id="skills" style={{ padding: '100px 0', backgroundColor: 'white' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
              Technical Skills
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
          </div>
          <Row>
            {data.skills.map((skill, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="card-3d skill-bar-3d" style={{ 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '100%'
                }}>
                  <Card.Body className="text-center" style={{ padding: '2rem' }}>
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                      animation: 'float3d 4s ease-in-out infinite'
                    }}>
                      {skill.category === 'Frontend' ? '🎨' : 
                       skill.category === 'Backend' ? '⚙️' : 
                       skill.category === 'Database' ? '🗄️' : 
                       skill.category === 'Cloud' ? '☁️' : 
                       skill.category === 'DevOps' ? '🚀' : '💻'}
                    </div>
                    <h5 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '1rem' }}>
                      {skill.name}
                    </h5>
                    <ProgressBar 
                      now={skill.level} 
                      style={{ 
                        height: '8px', 
                        borderRadius: '4px',
                        marginBottom: '1rem'
                      }}
                    >
                      <ProgressBar 
                        now={skill.level} 
                        style={{
                          background: 'linear-gradient(90deg, #667eea, #764ba2)'
                        }}
                      />
                    </ProgressBar>
                    <small style={{ color: '#64748b', fontWeight: '600' }}>
                      {skill.level}% Proficiency
                    </small>
                    <div style={{ 
                      marginTop: '0.5rem',
                      fontSize: '0.8rem',
                      color: '#94a3b8'
                    }}>
                      {skill.category}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
              Featured Projects
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
          </div>
          <Row>
            {data.projects.map((project, index) => (
              <Col lg={6} key={index} className="mb-5">
                <Card className="card-3d" style={{ 
                  border: 'none', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '100%'
                }}>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: project.status === 'Live' ? '#10b981' : '#f59e0b',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {project.status}
                    </div>
                    {project.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: '#667eea',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        Featured
                      </div>
                    )}
                  </div>
                  <Card.Body style={{ padding: '2.5rem' }}>
                    <Card.Title style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '1rem'
                    }}>
                      {project.title}
                    </Card.Title>
                    <Card.Text style={{ 
                      color: '#64748b',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem'
                    }}>
                      {project.description}
                    </Card.Text>
                    
                    {/* Tech Stack */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {(Array.isArray(project.tech) ? project.tech : project.tech ? project.tech.split(',').map(t => t.trim()) : []).map((tech, techIndex) => (
                          <Badge 
                            key={techIndex}
                            style={{
                              background: '#e2e8f0',
                              color: '#475569',
                              fontSize: '0.8rem',
                              padding: '5px 10px',
                              borderRadius: '15px'
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Metrics */}
                    {project.metrics && (
                      <div style={{ 
                        background: '#f1f5f9', 
                        padding: '1rem', 
                        borderRadius: '10px',
                        marginBottom: '1.5rem'
                      }}>
                        <Row className="text-center">
                          {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                            <Col key={metricIndex}>
                              <div style={{ fontWeight: '700', color: '#1e293b' }}>{value}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'capitalize' }}>
                                {key}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}

                    {/* Project Links */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {(project.demo || project.liveLink) && (
                        <Button 
                          variant="primary"
                          href={project.demo || project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '8px 20px',
                            fontWeight: '600'
                          }}
                        >
                          🚀 Live Demo
                        </Button>
                      )}
                      {(project.github || project.githubLink) && (
                        <Button 
                          variant="outline-secondary"
                          href={project.github || project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            borderRadius: '25px',
                            padding: '8px 20px',
                            fontWeight: '600'
                          }}
                        >
                          📂 Code
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section id="certifications" style={{ padding: '100px 0', backgroundColor: 'white' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
                Certifications & Credentials
              </h2>
              <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
            </div>
            <Row>
              {data.certifications.map((cert, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="card-3d" style={{ 
                  border: 'none', 
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '100%'
                }}>
                  <Card.Body style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      fontSize: '2rem',
                      animation: 'float3d 5s ease-in-out infinite'
                    }}>
                      🏆
                    </div>
                    <h5 style={{ 
                      color: '#1e293b', 
                      fontWeight: '700',
                      marginBottom: '1rem',
                      fontSize: '1.1rem'
                    }}>
                      {cert.name}
                    </h5>
                    <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                      {cert.issuer}
                    </p>
                    <div style={{ marginBottom: '1rem' }}>
                      <Badge style={{ 
                        background: '#10b981', 
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '15px'
                      }}>
                        {cert.date}
                      </Badge>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
                      Valid until: {cert.validUntil}
                    </div>
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      href={cert.verifyLink}
                      target="_blank"
                      style={{ borderRadius: '20px' }}
                    >
                      Verify Certificate
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Education Section */}
      <section id="education" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
              Education
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
          </div>
          <Row>
            {data.education && data.education.map((edu, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card className="card-3d" style={{ 
                  border: 'none', 
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '100%'
                }}>
                  <Card.Body style={{ padding: '2rem' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      fontSize: '2rem',
                      animation: 'float3d 5s ease-in-out infinite'
                    }}>
                      🎓
                    </div>
                    <h5 style={{ 
                      color: '#1e293b', 
                      fontWeight: '700',
                      marginBottom: '0.5rem',
                      fontSize: '1.2rem'
                    }}>
                      {edu.degree}
                    </h5>
                    <h6 style={{ 
                      color: '#667eea', 
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      {edu.institution}
                    </h6>
                    <div style={{ marginBottom: '1rem' }}>
                      <Badge style={{ 
                        background: '#3b82f6', 
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '15px',
                        marginRight: '10px'
                      }}>
                        {edu.duration}
                      </Badge>
                      {edu.gpa && (
                        <Badge style={{ 
                          background: '#10b981', 
                          color: 'white',
                          padding: '5px 15px',
                          borderRadius: '15px'
                        }}>
                          GPA: {edu.gpa}
                        </Badge>
                      )}
                    </div>
                    {edu.location && (
                      <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        📍 {edu.location}
                      </p>
                    )}
                    {edu.description && (
                      <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                        {edu.description}
                      </p>
                    )}
                    {edu.field && (
                      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        <strong>Field:</strong> {edu.field}
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Internships Section */}
      {data.internships && data.internships.length > 0 && (
        <section id="internships" style={{ padding: '100px 0', backgroundColor: 'white' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 style={{ fontSize: '3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
                Internships & Early Experience
              </h2>
              <div style={{ width: '60px', height: '4px', background: '#667eea', margin: '0 auto' }}></div>
            </div>
            <Row>
              {data.internships.map((internship, index) => (
                <Col md={6} key={index} className="mb-4">
                  <Card className="card-3d" style={{ 
                    border: 'none', 
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                    height: '100%'
                  }}>
                    <Card.Body style={{ padding: '2rem' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem auto',
                        fontSize: '2rem',
                        animation: 'float3d 5s ease-in-out infinite'
                      }}>
                        🚀
                      </div>
                      <h5 style={{ 
                        color: '#1e293b', 
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        fontSize: '1.2rem'
                      }}>
                        {internship.position}
                      </h5>
                      <h6 style={{ 
                        color: '#667eea', 
                        fontWeight: '600',
                        marginBottom: '1rem'
                      }}>
                        {internship.company}
                      </h6>
                      <div style={{ marginBottom: '1rem' }}>
                        <Badge style={{ 
                          background: '#8b5cf6', 
                          color: 'white',
                          padding: '5px 15px',
                          borderRadius: '15px'
                        }}>
                          {internship.duration}
                        </Badge>
                      </div>
                      {internship.location && (
                        <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
                          📍 {internship.location}
                        </p>
                      )}
                      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                        {internship.description}
                      </p>
                      {internship.achievements && internship.achievements.length > 0 && (
                        <div>
                          <h6 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Key Achievements:
                          </h6>
                          <ul style={{ color: '#64748b', paddingLeft: '1.2rem' }}>
                            {internship.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} style={{ marginBottom: '0.3rem' }}>
                                {achievement}
                              </li>
                            ))}
                          </ul>
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

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: '700',
                marginBottom: '2rem'
              }}>
                Let's Work Together
              </h2>
              <p style={{ 
                fontSize: '1.3rem',
                marginBottom: '3rem',
                opacity: 0.9
              }}>
                Ready to bring your ideas to life? Let's discuss your next project.
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '3rem',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <div className="card-3d" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{data.email}</div>
                </div>
                <div className="card-3d" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📱</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{data.phone}</div>
                </div>
                <div className="card-3d" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{data.location}</div>
                </div>
              </div>
              <Button 
                variant="light"
                size="lg"
                style={{
                  fontWeight: '600',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  fontSize: '1.1rem'
                }}
                href={`mailto:${data.email}`}
              >
                Start a Conversation
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resume Modal */}
      <Modal show={showResumeModal} onHide={() => setShowResumeModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resume - {data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h4>Resume Download</h4>
            <p>Click below to download my complete resume in PDF format.</p>
            {data.resume ? (
              <Button 
                variant="primary" 
                size="lg"
                href={data.resume}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: '1rem' }}
              >
                📄 Download PDF
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                size="lg"
                disabled
                style={{ marginRight: '1rem' }}
              >
                📄 Resume Not Available
              </Button>
            )}
            <Button 
              variant="outline-secondary" 
              size="lg"
            >
              📧 Email Resume
            </Button>
          </div>
        </Modal.Body>
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
          Preview Mode - Professional Template
        </div>
      )}
    </div>
  );
}

export default Template1;