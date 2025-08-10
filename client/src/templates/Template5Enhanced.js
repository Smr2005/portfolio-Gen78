import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Badge, ProgressBar } from "react-bootstrap";

function Template5Enhanced({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [terminalText, setTerminalText] = useState("");
  const [currentCommand, setCurrentCommand] = useState(0);

  const defaultData = {
    name: "Alex Rodriguez",
    title: "Senior Full Stack Developer & DevOps Engineer",
    email: "alex.rodriguez@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    github: "https://github.com/alexrodriguez",
    linkedin: "https://linkedin.com/in/alexrodriguez",
    website: "https://alexrodriguez.dev",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    about: "Passionate full-stack developer with 8+ years of experience building scalable web applications and cloud infrastructure. Expert in modern JavaScript frameworks, microservices architecture, and DevOps practices. Love solving complex problems with elegant code solutions.",
    experience: [
      {
        company: "Google",
        position: "Senior Software Engineer",
        duration: "Jan 2022 - Present",
        location: "Mountain View, CA",
        description: "Lead development of cloud-native applications serving millions of users. Focus on performance optimization, scalability, and developer experience.",
        achievements: [
          "Reduced application load time by 60% through code optimization",
          "Led migration of monolithic app to microservices architecture",
          "Mentored 10+ junior developers in modern development practices",
          "Implemented CI/CD pipelines reducing deployment time by 80%"
        ],
        keyProjects: [
          "Cloud Infrastructure Modernization - Kubernetes & Docker",
          "Real-time Analytics Dashboard - React & Node.js",
          "API Gateway Implementation - GraphQL & REST"
        ],
        tech: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Kubernetes", "Docker", "GCP"]
      },
      {
        company: "Netflix",
        position: "Full Stack Developer",
        duration: "Mar 2019 - Dec 2021",
        location: "Los Gatos, CA",
        description: "Developed and maintained streaming platform features used by 200M+ subscribers worldwide.",
        achievements: [
          "Built recommendation engine improving user engagement by 25%",
          "Optimized video streaming protocols reducing bandwidth by 30%",
          "Implemented A/B testing framework for feature rollouts",
          "Contributed to open-source projects adopted by 1000+ developers"
        ],
        keyProjects: [
          "Personalization Engine - Machine Learning & Python",
          "Content Delivery Optimization - CDN & Edge Computing",
          "User Interface Redesign - React & Redux"
        ],
        tech: ["React", "Redux", "Python", "Java", "AWS", "Kafka", "Elasticsearch"]
      },
      {
        company: "Startup Inc.",
        position: "Software Development Intern",
        duration: "Jun 2018 - Aug 2018",
        location: "Palo Alto, CA",
        description: "Summer internship focusing on full-stack web development and agile methodologies.",
        achievements: [
          "Developed MVP for mobile app with 10K+ downloads",
          "Implemented automated testing suite increasing code coverage to 90%",
          "Contributed to product roadmap and technical architecture decisions"
        ],
        tech: ["React Native", "Node.js", "MongoDB", "Jest"]
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "Stanford University",
        duration: "2017 - 2019",
        location: "Stanford, CA",
        gpa: "3.9/4.0",
        honors: "Magna Cum Laude, Research Assistant",
        relevant: ["Algorithms", "Distributed Systems", "Machine Learning", "Software Engineering"],
        thesis: "Optimizing Distributed Database Performance in Cloud Environments"
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        school: "UC Berkeley",
        duration: "2013 - 2017",
        location: "Berkeley, CA",
        gpa: "3.8/4.0",
        honors: "Cum Laude, Dean's List",
        relevant: ["Data Structures", "Computer Networks", "Database Systems", "Web Development"]
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "February 2023",
        credentialId: "AWS-SA-2023-001",
        validUntil: "February 2026",
        verifyLink: "https://aws.amazon.com/verification",
        description: "Professional-level certification for designing distributed systems on AWS"
      },
      {
        name: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        date: "November 2022",
        credentialId: "CKA-2022-001",
        validUntil: "November 2025",
        verifyLink: "https://cncf.io/certification/verify",
        description: "Hands-on certification for Kubernetes cluster administration"
      },
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        date: "August 2022",
        credentialId: "GCP-PD-2022-001",
        validUntil: "August 2024",
        verifyLink: "https://cloud.google.com/certification/verify",
        description: "Professional certification for developing applications on Google Cloud"
      },
      {
        name: "MongoDB Certified Developer",
        issuer: "MongoDB Inc.",
        date: "May 2022",
        credentialId: "MDB-DEV-2022-001",
        validUntil: "Lifetime",
        verifyLink: "https://university.mongodb.com/verify",
        description: "Certification for MongoDB application development and optimization"
      }
    ],
    skills: [
      { name: "JavaScript/TypeScript", level: 95, category: "Frontend", years: 8 },
      { name: "React/Next.js", level: 92, category: "Frontend", years: 6 },
      { name: "Node.js/Express", level: 90, category: "Backend", years: 7 },
      { name: "Python/Django", level: 88, category: "Backend", years: 5 },
      { name: "AWS/GCP", level: 85, category: "Cloud", years: 4 },
      { name: "Docker/Kubernetes", level: 87, category: "DevOps", years: 4 },
      { name: "PostgreSQL/MongoDB", level: 83, category: "Database", years: 6 },
      { name: "GraphQL/REST APIs", level: 89, category: "API", years: 5 }
    ],
    projects: [
      {
        title: "CloudScale - Microservices Platform",
        description: "Enterprise-grade microservices platform with auto-scaling, monitoring, and deployment automation. Handles 1M+ requests per day.",
        category: "Full Stack Development",
        duration: "12 months",
        year: "2023",
        team: "Lead Developer + 4 Engineers",
        results: [
          "99.9% uptime with auto-scaling capabilities",
          "50% reduction in deployment time",
          "Supports 100+ microservices",
          "Used by 20+ enterprise clients"
        ],
        tech: ["React", "Node.js", "Kubernetes", "Docker", "PostgreSQL", "Redis", "AWS"],
        github: "https://github.com/alexrodriguez/cloudscale",
        liveDemo: "https://cloudscale-demo.herokuapp.com",
        documentation: "https://docs.cloudscale.dev",
        featured: true,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        testimonial: "CloudScale transformed our deployment process and significantly improved our system reliability.",
        clientRole: "CTO, TechCorp Inc."
      },
      {
        title: "DevAnalytics - Real-time Dashboard",
        description: "Real-time analytics dashboard for development teams with custom metrics, alerts, and performance insights.",
        category: "Data Visualization",
        duration: "8 months",
        year: "2023",
        team: "Solo Developer",
        results: [
          "Real-time processing of 10M+ events/day",
          "Sub-second query response times",
          "Adopted by 50+ development teams",
          "Featured in TechCrunch"
        ],
        tech: ["React", "D3.js", "Node.js", "InfluxDB", "Grafana", "WebSocket"],
        github: "https://github.com/alexrodriguez/devanalytics",
        liveDemo: "https://devanalytics.live",
        documentation: "https://docs.devanalytics.dev",
        featured: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        awards: ["Best Developer Tool 2023", "Innovation Award"]
      },
      {
        title: "SecureAPI - Authentication Service",
        description: "OAuth 2.0 and JWT-based authentication microservice with advanced security features and rate limiting.",
        category: "Backend Development",
        duration: "6 months",
        year: "2022",
        team: "Lead Developer + 2 Engineers",
        results: [
          "Handles 1M+ authentications daily",
          "Zero security breaches in production",
          "99.99% availability SLA",
          "Open-sourced with 2K+ GitHub stars"
        ],
        tech: ["Node.js", "JWT", "Redis", "PostgreSQL", "Docker", "Nginx"],
        github: "https://github.com/alexrodriguez/secureapi",
        documentation: "https://secureapi.docs.dev",
        featured: false,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
      }
    ],
    terminalCommands: [
      "whoami",
      "cat about.txt",
      "ls -la skills/",
      "git log --oneline",
      "docker ps",
      "kubectl get pods",
      "npm run build",
      "python manage.py runserver"
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
    const style = document.createElement('style');
    style.textContent = `
      @keyframes terminalBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      @keyframes matrixRain {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
      
      @keyframes codeScroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      
      @keyframes terminalGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.3); }
        50% { box-shadow: 0 0 30px rgba(0, 255, 0, 0.6); }
      }
      
      @keyframes hackingEffect {
        0% { transform: rotateY(0deg) rotateX(0deg); }
        25% { transform: rotateY(5deg) rotateX(2deg); }
        50% { transform: rotateY(0deg) rotateX(0deg); }
        75% { transform: rotateY(-5deg) rotateX(-2deg); }
        100% { transform: rotateY(0deg) rotateX(0deg); }
      }
      
      .terminal-window {
        transform-style: preserve-3d;
        transition: all 0.3s ease;
        animation: terminalGlow 3s ease-in-out infinite;
      }
      
      .terminal-window:hover {
        transform: rotateX(5deg) rotateY(5deg) translateZ(10px);
        box-shadow: 0 20px 40px rgba(0, 255, 0, 0.4);
      }
      
      .code-card {
        transform-style: preserve-3d;
        transition: all 0.4s ease;
      }
      
      .code-card:hover {
        transform: translateZ(15px) rotateX(10deg);
        animation: hackingEffect 2s ease-in-out infinite;
      }
      
      .skill-bar {
        transform-style: preserve-3d;
        transition: all 0.3s ease;
      }
      
      .skill-bar:hover {
        transform: translateZ(5px) scale(1.05);
      }
      
      .matrix-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      }
      
      .matrix-char {
        position: absolute;
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        animation: matrixRain 3s linear infinite;
        opacity: 0.3;
      }
      
      .terminal-cursor {
        animation: terminalBlink 1s infinite;
      }
      
      .code-snippet {
        animation: codeScroll 20s linear infinite;
        white-space: nowrap;
      }
      
      /* Mobile Responsive Styles */
      @media (max-width: 768px) {
        .terminal-window,
        .terminal-window:hover,
        .code-card,
        .code-card:hover,
        .skill-bar:hover {
          animation: none !important;
          transform: none !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
        }
        
        .matrix-bg,
        .matrix-char,
        .code-snippet {
          display: none !important;
        }
        
        .terminal-cursor {
          animation: none !important;
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
        
        .container {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }
        
        .btn {
          width: 100% !important;
          margin-bottom: 0.5rem !important;
          min-height: 44px !important;
        }
        
        nav {
          padding: 0.5rem 1rem !important;
        }
        
        nav a {
          display: block !important;
          text-align: center !important;
          padding: 0.75rem !important;
          border-bottom: 1px solid rgba(0,255,0,0.2) !important;
        }
        
        section {
          padding: 60px 0 !important;
        }
        
        .terminal-window {
          margin: 1rem 0 !important;
          padding: 1rem !important;
        }
        
        .code-card {
          margin-bottom: 1rem !important;
        }
        
        .skill-bar {
          margin-bottom: 0.5rem !important;
        }
      }
      
      @media (max-width: 480px) {
        h1 {
          font-size: 1.75rem !important;
        }
        
        h2 {
          font-size: 1.25rem !important;
        }
        
        h3 {
          font-size: 1.1rem !important;
        }
        
        .container {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
        
        .btn {
          font-size: 0.9rem !important;
          padding: 0.75rem 1rem !important;
        }
        
        .terminal-window {
          padding: 0.75rem !important;
          font-size: 0.8rem !important;
        }
        
        section {
          padding: 40px 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const createMatrixRain = () => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const matrixContainer = document.querySelector('.matrix-bg');
      
      if (matrixContainer) {
        for (let i = 0; i < 50; i++) {
          const char = document.createElement('div');
          char.className = 'matrix-char';
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          char.style.left = Math.random() * 100 + '%';
          char.style.animationDelay = Math.random() * 3 + 's';
          char.style.animationDuration = (Math.random() * 3 + 2) + 's';
          matrixContainer.appendChild(char);
        }
      }
    };

    createMatrixRain();
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const commands = [
      "$ whoami",
      "alex.rodriguez",
      "$ cat skills.json",
      '{"frontend": ["React", "TypeScript"], "backend": ["Node.js", "Python"]}',
      "$ git status",
      "On branch main. Your branch is up to date.",
      "$ docker ps",
      "CONTAINER ID   IMAGE     STATUS     PORTS",
      "$ kubectl get pods",
      "NAME           READY   STATUS    RESTARTS",
      "$ npm run build",
      "✓ Build completed successfully"
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let currentText = "";

    const typeCommand = () => {
      if (commandIndex < commands.length) {
        const command = commands[commandIndex];
        if (charIndex < command.length) {
          currentText += command[charIndex];
          setTerminalText(currentText + "_");
          charIndex++;
          setTimeout(typeCommand, 50);
        } else {
          currentText += "\n";
          setTerminalText(currentText);
          commandIndex++;
          charIndex = 0;
          setTimeout(typeCommand, 1000);
        }
      } else {
        // Reset and start over
        setTimeout(() => {
          commandIndex = 0;
          charIndex = 0;
          currentText = "";
          setTerminalText("");
          typeCommand();
        }, 3000);
      }
    };

    typeCommand();
  }, []);

  return (
    <div style={{ 
      fontFamily: "'Courier New', monospace", 
      backgroundColor: '#0a0a0a',
      color: '#00ff00',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Matrix Background */}
      <div className="matrix-bg"></div>

      {/* Terminal Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #00ff00',
        zIndex: 1000,
        padding: '1rem 0'
      }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              color: '#00ff00'
            }}>
              {data.name}@portfolio:~$
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="#about" style={{ color: '#00ff00', textDecoration: 'none' }}>./about</a>
              <a href="#experience" style={{ color: '#00ff00', textDecoration: 'none' }}>./experience</a>
              <a href="#projects" style={{ color: '#00ff00', textDecoration: 'none' }}>./projects</a>
              <a href="#skills" style={{ color: '#00ff00', textDecoration: 'none' }}>./skills</a>
              <a href="#contact" style={{ color: '#00ff00', textDecoration: 'none' }}>./contact</a>
              <Button 
                onClick={() => setShowResumeModal(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid #00ff00',
                  color: '#00ff00',
                  padding: '5px 15px',
                  fontSize: '0.9rem',
                  fontFamily: "'Courier New', monospace"
                }}
              >
                cat resume.pdf
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Terminal Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px'
      }}>
        <Container>
          <Row>
            <Col lg={8}>
              <div className="terminal-window" style={{
                background: '#000000',
                border: '2px solid #00ff00',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
              }}>
                {/* Terminal Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #00ff00'
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
                  </div>
                  <div style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>
                    {data.name}@portfolio: ~
                  </div>
                </div>

                {/* Terminal Content */}
                <div style={{ minHeight: '400px' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ color: '#ffff00', marginBottom: '1rem' }}>
                      $ figlet "{data.name}"
                    </div>
                    <pre style={{ 
                      color: '#00ff00', 
                      fontSize: '1.2rem',
                      marginBottom: '2rem',
                      fontFamily: 'monospace'
                    }}>
{`
 █████╗ ██╗     ███████╗██╗  ██╗
██╔══██╗██║     ██╔════╝╚██╗██╔╝
███████║██║     █████╗   ╚███╔╝ 
██╔══██║██║     ██╔══╝   ██╔██╗ 
██║  ██║███████╗███████╗██╔╝ ██╗
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
`}
                    </pre>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ color: '#ffff00' }}>$ cat profile.json</div>
                    <pre style={{ color: '#00ff00', fontSize: '0.9rem' }}>
{`{
  "name": "${data.name}",
  "title": "${data.title}",
  "location": "${data.location}",
  "experience": "8+ years",
  "specialization": ["Full Stack", "DevOps", "Cloud"],
  "status": "Available for hire",
  "passion": "Building scalable solutions"
}`}
                    </pre>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ color: '#ffff00' }}>$ echo "${data.about}"</div>
                    <div style={{ color: '#00ff00', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {data.about}
                    </div>
                  </div>

                  <div>
                    <pre style={{ color: '#00ff00', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                      {terminalText}
                    </pre>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '250px',
                  height: '250px',
                  margin: '0 auto 2rem auto',
                  position: 'relative',
                  border: '2px solid #00ff00',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
                }}>
                  <img 
                    src={data.profileImage}
                    alt={data.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'sepia(100%) hue-rotate(90deg) saturate(200%)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: '#00ff00',
                    color: '#000000',
                    padding: '5px 10px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    ONLINE
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="code-card" style={{
                  background: '#111111',
                  border: '1px solid #00ff00',
                  borderRadius: '5px',
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ color: '#ffff00', marginBottom: '1rem' }}>$ system_stats</div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <div>Years of Experience: 8+</div>
                    <div>Projects Completed: 50+</div>
                    <div>Lines of Code: 1M+</div>
                    <div>Coffee Consumed: ∞</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="code-card" style={{
                  background: '#111111',
                  border: '1px solid #00ff00',
                  borderRadius: '5px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#ffff00', marginBottom: '1rem' }}>$ ls -la social/</div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <div><a href={data.github} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>./github</a></div>
                    <div><a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>./linkedin</a></div>
                    <div><a href={data.website} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>./website</a></div>
                    <div><a href={`mailto:${data.email}`} style={{ color: '#00ff00' }}>./email</a></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '100px 0', backgroundColor: '#0f0f0f' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#ffff00',
              marginBottom: '1rem',
              fontFamily: "'Courier New', monospace"
            }}>
              $ cat experience.log
            </h2>
            <div style={{
              width: '100px',
              height: '2px',
              background: '#00ff00',
              margin: '0 auto'
            }}></div>
          </div>

          {data.experience.map((exp, index) => (
            <div key={index} className="code-card" style={{
              background: '#000000',
              border: '1px solid #00ff00',
              borderRadius: '10px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 5px 15px rgba(0, 255, 0, 0.2)'
            }}>
              <Row>
                <Col md={3}>
                  <div style={{
                    color: '#ffff00',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    {exp.duration}
                  </div>
                  <div style={{
                    color: '#00ff00',
                    fontSize: '0.8rem'
                  }}>
                    {exp.location}
                  </div>
                </Col>
                <Col md={9}>
                  <h4 style={{ 
                    color: '#00ff00', 
                    marginBottom: '0.5rem',
                    fontSize: '1.3rem'
                  }}>
                    {exp.position}
                  </h4>
                  <h5 style={{ 
                    color: '#ffff00', 
                    marginBottom: '1rem',
                    fontSize: '1rem'
                  }}>
                    {exp.company}
                  </h5>
                  <p style={{ 
                    color: '#cccccc',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {exp.description}
                  </p>
                  
                  {exp.achievements && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ color: '#ffff00', marginBottom: '0.5rem' }}>
                        $ grep -i "achievements" {exp.company.toLowerCase().replace(/\s+/g, '_')}.log
                      </div>
                      <ul style={{ color: '#00ff00', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} style={{ marginBottom: '0.3rem' }}>
                            ✓ {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.tech && (
                    <div>
                      <div style={{ color: '#ffff00', marginBottom: '0.5rem' }}>
                        $ ls tech_stack/
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {exp.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} style={{
                            background: '#00ff00',
                            color: '#000000',
                            fontSize: '0.8rem',
                            padding: '3px 8px',
                            fontFamily: "'Courier New', monospace"
                          }}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ padding: '100px 0', backgroundColor: '#0a0a0a' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#ffff00',
              marginBottom: '1rem'
            }}>
              $ ./skills --list --verbose
            </h2>
            <div style={{
              width: '100px',
              height: '2px',
              background: '#00ff00',
              margin: '0 auto'
            }}></div>
          </div>

          <Row>
            {data.skills.map((skill, index) => (
              <Col md={6} key={index} className="mb-4">
                <div className="skill-bar code-card" style={{
                  background: '#111111',
                  border: '1px solid #00ff00',
                  borderRadius: '5px',
                  padding: '1.5rem'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ color: '#00ff00', fontSize: '0.9rem' }}>
                      {skill.name}
                    </span>
                    <span style={{ color: '#ffff00', fontSize: '0.8rem' }}>
                      {skill.level}% | {skill.years}y
                    </span>
                  </div>
                  <div style={{
                    background: '#333333',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(90deg, #00ff00, #ffff00)',
                      height: '100%',
                      width: `${skill.level}%`,
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                  <div style={{ 
                    color: '#888888', 
                    fontSize: '0.7rem',
                    textTransform: 'uppercase'
                  }}>
                    {skill.category}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '100px 0', backgroundColor: '#0f0f0f' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#ffff00',
              marginBottom: '1rem'
            }}>
              $ git log --oneline --graph
            </h2>
            <div style={{
              width: '100px',
              height: '2px',
              background: '#00ff00',
              margin: '0 auto'
            }}></div>
          </div>

          {data.projects.map((project, index) => (
            <div key={index} className="code-card" style={{
              background: '#000000',
              border: '2px solid #00ff00',
              borderRadius: '10px',
              padding: '2rem',
              marginBottom: '3rem',
              boxShadow: '0 10px 25px rgba(0, 255, 0, 0.2)'
            }}>
              <Row>
                <Col lg={6}>
                  <div style={{
                    background: '#111111',
                    border: '1px solid #00ff00',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                  }}>
                    <img 
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        filter: 'sepia(100%) hue-rotate(90deg) saturate(150%)'
                      }}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div style={{ color: '#ffff00', marginBottom: '1rem', fontSize: '0.8rem' }}>
                    $ cat projects/{project.title.toLowerCase().replace(/\s+/g, '_')}/README.md
                  </div>
                  
                  <h3 style={{ 
                    color: '#00ff00', 
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    {project.title}
                  </h3>
                  
                  <div style={{ 
                    color: '#ffff00', 
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    Category: {project.category} | Year: {project.year}
                  </div>
                  
                  <p style={{ 
                    color: '#cccccc',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div style={{
                    background: '#111111',
                    border: '1px solid #333333',
                    borderRadius: '5px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ color: '#ffff00', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                      $ project_stats
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#00ff00' }}>
                      Duration: {project.duration} | Team: {project.team}
                    </div>
                  </div>

                  {/* Results */}
                  {project.results && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ color: '#ffff00', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        $ grep "success" deployment.log
                      </div>
                      <ul style={{ color: '#00ff00', fontSize: '0.8rem', paddingLeft: '1rem' }}>
                        {project.results.slice(0, 3).map((result, i) => (
                          <li key={i} style={{ marginBottom: '0.2rem' }}>
                            ✓ {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ color: '#ffff00', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                      $ ls dependencies/
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {(Array.isArray(project.tech) ? project.tech : project.tech ? project.tech.split(',').map(t => t.trim()) : []).map((tech, techIndex) => (
                        <Badge key={techIndex} style={{
                          background: '#00ff00',
                          color: '#000000',
                          fontSize: '0.7rem',
                          padding: '3px 6px',
                          fontFamily: "'Courier New', monospace"
                        }}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#00ff00',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          border: '1px solid #00ff00',
                          padding: '5px 10px',
                          borderRadius: '3px'
                        }}
                      >
                        $ git clone
                      </a>
                    )}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#ffff00',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          border: '1px solid #ffff00',
                          padding: '5px 10px',
                          borderRadius: '3px'
                        }}
                      >
                        $ ./run_demo
                      </a>
                    )}
                    {project.documentation && (
                      <a 
                        href={project.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#cccccc',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          border: '1px solid #cccccc',
                          padding: '5px 10px',
                          borderRadius: '3px'
                        }}
                      >
                        $ man docs
                      </a>
                    )}
                  </div>

                  {/* Awards */}
                  {project.awards && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ color: '#ffff00', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        $ cat awards.txt
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.awards.map((award, awardIndex) => (
                          <Badge key={awardIndex} style={{
                            background: '#ffff00',
                            color: '#000000',
                            fontSize: '0.7rem',
                            padding: '3px 6px',
                            fontFamily: "'Courier New', monospace"
                          }}>
                            🏆 {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Client Testimonial */}
                  {project.testimonial && (
                    <div style={{
                      marginTop: '1.5rem',
                      background: '#111111',
                      border: '1px solid #333333',
                      borderRadius: '5px',
                      padding: '1rem'
                    }}>
                      <div style={{ color: '#ffff00', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        $ cat client_feedback.txt
                      </div>
                      <blockquote style={{ 
                        color: '#cccccc', 
                        fontStyle: 'italic',
                        marginBottom: '0.5rem',
                        fontSize: '0.8rem'
                      }}>
                        "{project.testimonial}"
                      </blockquote>
                      <div style={{ 
                        color: '#00ff00', 
                        fontSize: '0.7rem'
                      }}>
                        — {project.clientRole}
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </Container>
      </section>

      {/* Certifications Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#0a0a0a' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              color: '#ffff00',
              marginBottom: '1rem'
            }}>
              $ ls -la certifications/
            </h2>
            <div style={{
              width: '100px',
              height: '2px',
              background: '#00ff00',
              margin: '0 auto'
            }}></div>
          </div>

          <Row>
            {data.certifications.map((cert, index) => (
              <Col md={6} key={index} className="mb-4">
                <div 
                  className="code-card"
                  style={{
                    background: '#111111',
                    border: '1px solid #00ff00',
                    borderRadius: '5px',
                    padding: '1.5rem',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedCert(cert);
                    setShowCertModal(true);
                  }}
                >
                  <div style={{ color: '#ffff00', marginBottom: '1rem', fontSize: '0.8rem' }}>
                    $ cat {cert.name.toLowerCase().replace(/\s+/g, '_')}.cert
                  </div>
                  <h5 style={{ 
                    color: '#00ff00', 
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}>
                    {cert.name}
                  </h5>
                  <div style={{ color: '#cccccc', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Issuer: {cert.issuer}
                  </div>
                  <p style={{ 
                    color: '#888888', 
                    fontSize: '0.8rem',
                    marginBottom: '1rem'
                  }}>
                    {cert.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ color: '#00ff00' }}>
                      Issued: {cert.date}
                    </div>
                    <div style={{ color: '#ffff00' }}>
                      Valid: {cert.validUntil}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '100px 0',
        backgroundColor: '#000000'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="terminal-window" style={{
                background: '#111111',
                border: '2px solid #00ff00',
                borderRadius: '10px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  color: '#ffff00',
                  marginBottom: '2rem'
                }}>
                  $ ./contact --init
                </h2>
                
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ color: '#ffff00', marginBottom: '1rem' }}>
                    $ echo "Let's build something amazing together!"
                  </div>
                  <div style={{ color: '#00ff00', fontSize: '1.1rem' }}>
                    Ready to collaborate on your next project?
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '3rem',
                  flexWrap: 'wrap',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <div style={{ color: '#ffff00', fontSize: '0.8rem' }}>$ cat email.txt</div>
                    <div style={{ color: '#00ff00' }}>{data.email}</div>
                  </div>
                  <div>
                    <div style={{ color: '#ffff00', fontSize: '0.8rem' }}>$ cat phone.txt</div>
                    <div style={{ color: '#00ff00' }}>{data.phone}</div>
                  </div>
                  <div>
                    <div style={{ color: '#ffff00', fontSize: '0.8rem' }}>$ pwd</div>
                    <div style={{ color: '#00ff00' }}>{data.location}</div>
                  </div>
                </div>
                
                <Button 
                  style={{
                    background: 'transparent',
                    border: '2px solid #00ff00',
                    color: '#00ff00',
                    padding: '10px 30px',
                    fontSize: '1rem',
                    fontFamily: "'Courier New', monospace"
                  }}
                  href={`mailto:${data.email}`}
                >
                  $ send_message
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resume Modal */}
      <Modal show={showResumeModal} onHide={() => setShowResumeModal(false)} size="lg">
        <Modal.Header closeButton style={{ background: '#000000', color: '#00ff00', border: '1px solid #00ff00' }}>
          <Modal.Title style={{ fontFamily: "'Courier New', monospace" }}>
            $ cat {data.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          background: '#111111',
          color: '#00ff00',
          fontFamily: "'Courier New', monospace"
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
          <h4 style={{ marginBottom: '1rem', color: '#ffff00' }}>
            Download Complete Resume
          </h4>
          <p style={{ color: '#cccccc', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Comprehensive technical resume including detailed work history, projects, and certifications.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              style={{
                background: '#00ff00',
                border: '1px solid #00ff00',
                color: '#000000',
                padding: '10px 20px',
                fontFamily: "'Courier New', monospace",
                fontSize: '0.9rem'
              }}
            >
              $ wget resume.pdf
            </Button>
            <Button 
              style={{
                background: 'transparent',
                border: '1px solid #ffff00',
                color: '#ffff00',
                padding: '10px 20px',
                fontFamily: "'Courier New', monospace",
                fontSize: '0.9rem'
              }}
            >
              $ mail resume
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Certification Modal */}
      <Modal show={showCertModal} onHide={() => setShowCertModal(false)} size="lg">
        <Modal.Header closeButton style={{ background: '#000000', color: '#00ff00', border: '1px solid #00ff00' }}>
          <Modal.Title style={{ fontFamily: "'Courier New', monospace" }}>
            $ cat certification_details.json
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          padding: '2rem', 
          background: '#111111',
          color: '#00ff00',
          fontFamily: "'Courier New', monospace"
        }}>
          {selectedCert && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h4 style={{ color: '#ffff00', marginBottom: '1rem' }}>
                  {selectedCert.name}
                </h4>
                <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                  {selectedCert.description}
                </p>
              </div>
              
              <div style={{
                background: '#000000',
                border: '1px solid #333333',
                borderRadius: '5px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <pre style={{ color: '#00ff00', fontSize: '0.8rem', margin: 0 }}>
{`{
  "certification": "${selectedCert.name}",
  "issuer": "${selectedCert.issuer}",
  "issue_date": "${selectedCert.date}",
  "valid_until": "${selectedCert.validUntil}",
  "credential_id": "${selectedCert.credentialId}",
  "verification_url": "${selectedCert.verifyLink}"
}`}
                </pre>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <Button 
                  href={selectedCert.verifyLink}
                  target="_blank"
                  style={{
                    background: '#00ff00',
                    border: '1px solid #00ff00',
                    color: '#000000',
                    padding: '10px 20px',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.9rem'
                  }}
                >
                  $ verify_certificate
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {isPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          background: 'rgba(0,0,0,0.9)',
          color: '#00ff00',
          padding: '10px 20px',
          zIndex: 9999,
          fontFamily: "'Courier New', monospace",
          fontSize: '0.8rem',
          border: '1px solid #00ff00'
        }}>
          [PREVIEW MODE] - Developer Terminal Template
        </div>
      )}
    </div>
  );
}

export default Template5Enhanced;