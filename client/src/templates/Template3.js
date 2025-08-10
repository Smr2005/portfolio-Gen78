import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Modal, Badge, Table } from "react-bootstrap";

function Template3({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

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
        ],
        keyProjects: [
          "Global Supply Chain Optimization - $2B Manufacturing Company",
          "Digital Banking Transformation - Top 5 US Bank",
          "Merger Integration Strategy - $5B Healthcare Acquisition"
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
        ],
        keyProjects: [
          "ERP Implementation - $500M Retail Chain",
          "Operational Excellence Program - Manufacturing Conglomerate",
          "Change Management - Financial Services Merger"
        ]
      },
      {
        company: "Boston Consulting Group",
        position: "Business Analyst (Internship)",
        duration: "Jun 2016 - Aug 2016",
        location: "Boston, MA",
        description: "Summer internship focusing on market analysis and competitive intelligence for technology sector clients.",
        achievements: [
          "Conducted comprehensive market analysis for $1B tech IPO",
          "Developed financial models for strategic planning",
          "Presented findings to C-level executives"
        ]
      }
    ],
    internships: [
      {
        company: "McKinsey & Company",
        position: "Business Analyst Intern",
        duration: "Jun 2016 - Aug 2016",
        location: "Chicago, IL",
        description: "Summer internship program focusing on strategic consulting methodologies and client engagement best practices.",
        achievements: [
          "Contributed to $10M cost reduction analysis for Fortune 100 client",
          "Developed data visualization dashboards for executive presentations",
          "Completed intensive training in consulting frameworks and methodologies",
          "Received offer for full-time position upon graduation"
        ]
      },
      {
        company: "Bain & Company",
        position: "Associate Consultant Intern",
        duration: "Jun 2015 - Aug 2015",
        location: "Boston, MA",
        description: "Undergraduate internship focusing on market research and competitive analysis for private equity clients.",
        achievements: [
          "Conducted due diligence analysis for $500M acquisition",
          "Built financial models for investment decision-making",
          "Presented findings to partner-level stakeholders"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Business Administration (MBA)",
        school: "Wharton School, University of Pennsylvania",
        duration: "2015 - 2017",
        location: "Philadelphia, PA",
        gpa: "3.9/4.0",
        honors: "Summa Cum Laude, Beta Gamma Sigma",
        relevant: ["Strategic Management", "Operations Management", "Finance", "Leadership"],
        activities: ["MBA Consulting Club President", "Case Competition Winner"]
      },
      {
        degree: "Bachelor of Science in Industrial Engineering",
        school: "Northwestern University",
        duration: "2011 - 2015",
        location: "Evanston, IL",
        gpa: "3.8/4.0",
        honors: "Magna Cum Laude, Tau Beta Pi",
        relevant: ["Operations Research", "Statistics", "Economics", "Project Management"]
      }
    ],
    certifications: [
      {
        name: "Certified Management Consultant (CMC)",
        issuer: "Institute of Management Consultants",
        date: "January 2023",
        credentialId: "CMC-2023-001",
        validUntil: "January 2026",
        verifyLink: "https://imcusa.org/verify",
        description: "Premier certification for management consulting professionals"
      },
      {
        name: "Lean Six Sigma Black Belt",
        issuer: "American Society for Quality",
        date: "September 2022",
        credentialId: "LSS-BB-2022-001",
        validUntil: "Lifetime",
        verifyLink: "https://asq.org/verify",
        description: "Advanced certification in process improvement methodologies"
      },
      {
        name: "Project Management Professional (PMP)",
        issuer: "Project Management Institute",
        date: "March 2021",
        credentialId: "PMP-2021-001",
        validUntil: "March 2024",
        verifyLink: "https://pmi.org/verify",
        description: "Global standard for project management excellence"
      },
      {
        name: "Certified Business Analysis Professional",
        issuer: "International Institute of Business Analysis",
        date: "November 2020",
        credentialId: "CBAP-2020-001",
        validUntil: "November 2023",
        verifyLink: "https://iiba.org/verify",
        description: "Advanced certification in business analysis practices"
      }
    ],
    skills: [
      { name: "Strategic Planning", level: 98, category: "Strategy" },
      { name: "Operations Management", level: 95, category: "Operations" },
      { name: "Change Management", level: 92, category: "Leadership" },
      { name: "Financial Analysis", level: 90, category: "Finance" },
      { name: "Data Analytics", level: 88, category: "Analytics" },
      { name: "Project Management", level: 94, category: "Management" },
      { name: "Process Improvement", level: 96, category: "Operations" },
      { name: "Digital Transformation", level: 89, category: "Technology" }
    ],
    projects: [
      {
        title: "Global Digital Transformation Initiative",
        client: "Fortune 100 Manufacturing Company",
        description: "Led comprehensive digital transformation across 15 countries, implementing new ERP systems, automating processes, and establishing data analytics capabilities.",
        duration: "18 months",
        teamSize: "25 consultants",
        budget: "$50M",
        results: [
          "35% reduction in operational costs",
          "60% improvement in process efficiency",
          "ROI of 280% within first year",
          "Successful deployment across 50+ facilities"
        ],
        tech: ["SAP S/4HANA", "Power BI", "Tableau", "Python", "SQL"],
        industry: "Manufacturing",
        year: "2023",
        featured: true,
        testimonial: "Michael's leadership was instrumental in our successful transformation. His strategic vision and execution excellence delivered results beyond our expectations.",
        clientRole: "Chief Operating Officer"
      },
      {
        title: "Merger Integration Strategy",
        client: "Top 5 Healthcare System",
        description: "Developed and executed integration strategy for $5B healthcare merger, focusing on operational synergies, cultural alignment, and technology consolidation.",
        duration: "12 months",
        teamSize: "18 consultants",
        budget: "$15M",
        results: [
          "$200M in identified synergies",
          "95% employee retention rate",
          "Seamless technology integration",
          "6 months ahead of schedule"
        ],
        tech: ["Epic EHR", "Workday", "Salesforce", "Microsoft 365"],
        industry: "Healthcare",
        year: "2022",
        featured: true,
        testimonial: "The merger integration was flawless thanks to Michael's meticulous planning and exceptional execution.",
        clientRole: "Chief Executive Officer"
      },
      {
        title: "Supply Chain Optimization Program",
        client: "$2B Consumer Goods Company",
        description: "Redesigned global supply chain network, optimized inventory management, and implemented demand forecasting analytics.",
        duration: "10 months",
        teamSize: "12 consultants",
        budget: "$8M",
        results: [
          "25% reduction in inventory costs",
          "40% improvement in forecast accuracy",
          "15% faster delivery times",
          "$30M annual cost savings"
        ],
        tech: ["Oracle SCM", "R", "Advanced Analytics", "IoT Sensors"],
        industry: "Consumer Goods",
        year: "2021",
        featured: false
      }
    ],
    awards: [
      {
        name: "Consultant of the Year 2023",
        organization: "Management Consulting Association",
        description: "Recognized for outstanding client impact and innovation in consulting methodologies"
      },
      {
        name: "Digital Transformation Excellence Award",
        organization: "Business Transformation Institute",
        description: "Awarded for leading successful large-scale digital transformation initiative"
      }
    ],
    publications: [
      {
        title: "The Future of Digital Transformation in Manufacturing",
        publication: "Harvard Business Review",
        date: "March 2023",
        url: "https://hbr.org/digital-transformation-manufacturing"
      },
      {
        title: "Operational Excellence in the Post-Pandemic Era",
        publication: "McKinsey Quarterly",
        date: "September 2022",
        url: "https://mckinsey.com/operational-excellence-pandemic"
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
    const style = document.createElement('style');
    style.textContent = `
      @keyframes professionalSlide {
        0% { transform: translateX(-50px) rotateY(-15deg); opacity: 0; }
        100% { transform: translateX(0) rotateY(0deg); opacity: 1; }
      }
      
      @keyframes businessFloat {
        0%, 100% { transform: translateY(0px) rotateX(0deg); }
        50% { transform: translateY(-10px) rotateX(2deg); }
      }
      
      @keyframes dataVisualization {
        0% { transform: scaleY(0.3); }
        50% { transform: scaleY(1); }
        100% { transform: scaleY(0.8); }
      }
      
      @keyframes professionalGlow {
        0%, 100% { box-shadow: 0 5px 15px rgba(30,60,114,0.2); }
        50% { box-shadow: 0 10px 30px rgba(30,60,114,0.4); }
      }
      
      .business-card {
        transform-style: preserve-3d;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: professionalGlow 3s ease-in-out infinite;
      }
      
      .business-card:hover {
        transform: rotateY(8deg) rotateX(4deg) translateZ(15px) scale(1.02);
        box-shadow: 0 25px 50px rgba(30,60,114,0.3);
      }
      
      .metric-card {
        transform-style: preserve-3d;
        transition: all 0.3s ease;
      }
      
      .metric-card:hover {
        transform: translateZ(10px) rotateX(5deg);
      }
      
      .skill-progress {
        transform-style: preserve-3d;
        transition: all 0.3s ease;
      }
      
      .skill-progress:hover {
        transform: translateZ(5px) scale(1.05);
      }
      
      .project-showcase {
        transform-style: preserve-3d;
        transition: all 0.5s ease;
      }
      
      .project-showcase:hover {
        transform: perspective(1000px) rotateX(5deg) rotateY(3deg) translateZ(10px);
      }
      
      /* Mobile Responsive Styles */
      @media (max-width: 768px) {
        .business-card:hover,
        .metric-card:hover,
        .skill-progress:hover,
        .project-showcase:hover {
          transform: none !important;
        }
        
        .business-card {
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
        }
        
        nav {
          padding: 0.5rem 0 !important;
        }
        
        section {
          padding: 60px 0 !important;
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
          padding: 0.6rem 1rem !important;
        }
        
        .card {
          padding: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', color: '#1e293b' }}>
      {/* Professional Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(30, 60, 114, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 1000,
        padding: '1rem 0'
      }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ 
              fontSize: '1.8rem', 
              fontWeight: '700',
              color: 'white'
            }}>
              {data.name}
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="#about" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>About</a>
              <a href="#experience" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>Experience</a>
              <a href="#projects" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>Projects</a>
              <a href="#skills" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>Expertise</a>
              <a href="#contact" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>Contact</a>
              <Button 
                onClick={() => setShowResumeModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #64b5f6, #42a5f5)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 20px',
                  fontWeight: '600'
                }}
              >
                Resume
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Professional Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        minHeight: '100vh',
        position: 'relative',
        paddingTop: '100px'
      }}>
        {/* Professional Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}></div>
        
        <Container className="h-100 d-flex align-items-center position-relative">
          <Row className="w-100 align-items-center">
            <Col lg={7}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '4rem',
                borderRadius: '15px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                animation: 'professionalSlide 1s ease-out'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(100,181,246,0.2)',
                  color: '#64b5f6',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '1px solid rgba(100,181,246,0.3)'
                }}>
                  Senior Business Consultant
                </div>
                <h1 style={{ 
                  fontSize: '4rem', 
                  fontWeight: '300',
                  marginBottom: '1rem',
                  letterSpacing: '-1px',
                  lineHeight: '1.1'
                }}>
                  {data.name}
                </h1>
                <h2 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '400',
                  marginBottom: '2rem',
                  color: '#64b5f6',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {data.title}
                </h2>
                <p style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '1.8',
                  marginBottom: '3rem',
                  opacity: 0.9,
                  maxWidth: '600px'
                }}>
                  {data.about}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <Button 
                    style={{
                      background: 'transparent',
                      border: '2px solid #64b5f6',
                      color: '#64b5f6',
                      padding: '12px 30px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderRadius: '6px'
                    }}
                    href="#projects"
                  >
                    View Case Studies
                  </Button>
                  <Button 
                    style={{
                      background: '#64b5f6',
                      border: '2px solid #64b5f6',
                      color: 'white',
                      padding: '12px 30px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderRadius: '6px'
                    }}
                    href="#contact"
                  >
                    Schedule Consultation
                  </Button>
                </div>
                {/* Professional Links */}
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer" 
                     style={{ color: '#64b5f6', fontSize: '1.5rem', opacity: 0.8 }}>
                    💼
                  </a>
                  <a href={data.website} target="_blank" rel="noopener noreferrer"
                     style={{ color: '#64b5f6', fontSize: '1.5rem', opacity: 0.8 }}>
                    🌐
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div style={{
                position: 'relative',
                width: '350px',
                height: '350px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '300px',
                  height: '300px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  animation: 'businessFloat 6s ease-in-out infinite'
                }}></div>
                <img 
                  src={data.profileImage}
                  alt={data.name}
                  style={{
                    position: 'relative',
                    width: '280px',
                    height: '280px',
                    borderRadius: '15px',
                    objectFit: 'cover',
                    border: '4px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                    zIndex: 2
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  border: '3px solid white',
                  animation: 'businessFloat 4s ease-in-out infinite reverse',
                  zIndex: 3
                }}>
                  ✓
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Metrics Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '300',
              marginBottom: '2rem'
            }}>
              Proven Results
            </h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
              Numbers that demonstrate impact and value delivery
            </p>
          </div>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="metric-card" style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '3rem 2rem',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📈</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>$500M+</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Value Created</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="metric-card" style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '3rem 2rem',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏢</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>50+</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Fortune 500 Clients</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="metric-card" style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '3rem 2rem',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>98%</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Client Satisfaction</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="metric-card" style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '3rem 2rem',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>12+</div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Years Experience</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <Row>
            <Col lg={6}>
              <h2 style={{ 
                fontSize: '3rem', 
                color: '#1e3c72',
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                About Me
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#64748b',
                lineHeight: '1.8',
                marginBottom: '3rem'
              }}>
                {data.about}
              </p>
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ color: '#1e3c72', marginBottom: '1.5rem' }}>Education</h4>
                {data.education.map((edu, index) => (
                  <Card key={index} className="business-card mb-3" style={{
                    border: 'none',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid #1e3c72'
                  }}>
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <h6 style={{ color: '#1e3c72', fontWeight: '700' }}>{edu.degree}</h6>
                      <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                        {edu.institution} • {edu.duration}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {edu.gpa && `GPA: ${edu.gpa}`} {edu.field && `• ${edu.field}`}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <h4 style={{ color: '#1e3c72', marginBottom: '2rem' }}>Core Competencies</h4>
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-progress mb-4">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ fontWeight: '600', color: '#1e3c72' }}>{skill.name}</span>
                    <span style={{ color: '#64748b' }}>{skill.level}%</span>
                  </div>
                  <ProgressBar 
                    now={skill.level} 
                    style={{ height: '8px', borderRadius: '4px' }}
                  >
                    <ProgressBar 
                      now={skill.level} 
                      style={{
                        background: 'linear-gradient(90deg, #1e3c72, #2a5298)'
                      }}
                    />
                  </ProgressBar>
                  <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    {skill.category}
                  </small>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '120px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              color: '#1e3c72',
              marginBottom: '1rem',
              fontWeight: '300'
            }}>
              Professional Experience
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
              margin: '0 auto'
            }}></div>
          </div>
          <Row>
            <Col lg={10} className="mx-auto">
              {data.experience.map((exp, index) => (
                <Card key={index} className="business-card mb-5" style={{
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  borderRadius: '15px'
                }}>
                  <Card.Body style={{ padding: '3rem' }}>
                    <Row>
                      <Col md={8}>
                        <div style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                          color: 'white',
                          padding: '6px 15px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          textTransform: 'uppercase'
                        }}>
                          {exp.duration}
                        </div>
                        <h4 style={{ 
                          color: '#1e3c72', 
                          fontWeight: '700', 
                          marginBottom: '0.5rem',
                          fontSize: '1.5rem'
                        }}>
                          {exp.position}
                        </h4>
                        <h5 style={{ 
                          color: '#64748b', 
                          fontWeight: '600', 
                          marginBottom: '1.5rem'
                        }}>
                          {exp.company} • {exp.location}
                        </h5>
                        <p style={{ 
                          color: '#64748b', 
                          lineHeight: '1.7', 
                          marginBottom: '2rem'
                        }}>
                          {exp.description}
                        </p>
                        
                        {exp.achievements && (
                          <div style={{ marginBottom: '2rem' }}>
                            <h6 style={{ 
                              color: '#1e3c72', 
                              fontWeight: '700', 
                              marginBottom: '1rem'
                            }}>
                              🎯 Key Achievements:
                            </h6>
                            <ul style={{ color: '#64748b', paddingLeft: '1.5rem' }}>
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {exp.keyProjects && (
                          <div>
                            <h6 style={{ 
                              color: '#1e3c72', 
                              fontWeight: '700', 
                              marginBottom: '1rem'
                            }}>
                              📊 Notable Projects:
                            </h6>
                            <ul style={{ color: '#64748b', paddingLeft: '1.5rem' }}>
                              {exp.keyProjects.map((project, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>
                                  {project}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Col>
                      <Col md={4} className="text-center">
                        <div style={{
                          width: '100px',
                          height: '100px',
                          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          fontSize: '3rem',
                          color: 'white',
                          animation: 'businessFloat 5s ease-in-out infinite'
                        }}>
                          {index === 0 ? '🏢' : index === 1 ? '📊' : '🎯'}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Case Studies Section */}
      <section id="projects" style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              color: '#1e3c72',
              marginBottom: '1rem',
              fontWeight: '300'
            }}>
              Featured Case Studies
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
              margin: '0 auto'
            }}></div>
          </div>
          <Row>
            {data.projects.map((project, index) => (
              <Col lg={6} key={index} className="mb-5">
                <Card className="business-card project-showcase" style={{
                  border: 'none',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '100%'
                }}>
                  <Card.Body style={{ padding: '3rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Badge style={{
                          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                          color: 'white',
                          fontSize: '0.8rem',
                          padding: '8px 15px',
                          borderRadius: '6px'
                        }}>
                          {project.industry}
                        </Badge>
                        <Badge style={{
                          background: '#e2e8f0',
                          color: '#475569',
                          fontSize: '0.8rem',
                          padding: '8px 15px',
                          borderRadius: '6px'
                        }}>
                          {project.year}
                        </Badge>
                      </div>
                      {project.featured && (
                        <Badge style={{
                          background: '#fbbf24',
                          color: 'white',
                          fontSize: '0.8rem',
                          padding: '5px 12px',
                          borderRadius: '6px'
                        }}>
                          ⭐ Featured Case Study
                        </Badge>
                      )}
                    </div>

                    <Card.Title style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      color: '#1e3c72',
                      marginBottom: '1rem'
                    }}>
                      {project.title}
                    </Card.Title>
                    
                    <div style={{ color: '#64748b', marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                      Client: {project.client}
                    </div>

                    <Card.Text style={{ 
                      color: '#64748b',
                      lineHeight: '1.7',
                      marginBottom: '2rem'
                    }}>
                      {project.description}
                    </Card.Text>

                    {/* Project Details */}
                    <div style={{ 
                      background: '#f8fafc', 
                      padding: '1.5rem', 
                      borderRadius: '10px',
                      marginBottom: '2rem'
                    }}>
                      <Row>
                        <Col md={6}>
                          <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#1e3c72' }}>Duration:</strong> {project.duration}
                          </div>
                          <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#1e3c72' }}>Team Size:</strong> {project.teamSize}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#1e3c72' }}>Budget:</strong> {project.budget}
                          </div>
                          <div>
                            <strong style={{ color: '#1e3c72' }}>Industry:</strong> {project.industry}
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Results */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h6 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '1rem' }}>
                        📈 Key Results:
                      </h6>
                      <ul style={{ color: '#64748b', paddingLeft: '1.5rem' }}>
                        {project.results.map((result, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem' }}>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h6 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '1rem' }}>
                        🛠️ Technologies & Tools:
                      </h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {(Array.isArray(project.tech) ? project.tech : project.tech ? project.tech.split(',').map(t => t.trim()) : []).map((tech, techIndex) => (
                          <Badge key={techIndex} style={{
                            background: '#e2e8f0',
                            color: '#475569',
                            fontSize: '0.8rem',
                            padding: '5px 10px',
                            borderRadius: '6px'
                          }}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    {project.testimonial && (
                      <div style={{
                        background: '#f1f5f9',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        borderLeft: '4px solid #1e3c72'
                      }}>
                        <p style={{ 
                          color: '#64748b', 
                          fontStyle: 'italic',
                          marginBottom: '1rem',
                          fontSize: '0.95rem'
                        }}>
                          "{project.testimonial}"
                        </p>
                        <div style={{ color: '#1e3c72', fontWeight: '600', fontSize: '0.9rem' }}>
                          — {project.clientRole}, {project.client}
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Certifications Section */}
      <section style={{ padding: '120px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              color: '#1e3c72',
              marginBottom: '1rem',
              fontWeight: '300'
            }}>
              Professional Certifications
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
              margin: '0 auto'
            }}></div>
          </div>
          <Row>
            {data.certifications.map((cert, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card 
                  className="business-card" 
                  style={{
                    border: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    borderRadius: '15px',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedCert(cert);
                    setShowCertModal(true);
                  }}
                >
                  <Card.Body style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      fontSize: '2rem',
                      color: 'white',
                      animation: 'businessFloat 6s ease-in-out infinite'
                    }}>
                      🏆
                    </div>
                    <h6 style={{ 
                      color: '#1e3c72', 
                      fontWeight: '700',
                      marginBottom: '1rem',
                      fontSize: '1rem'
                    }}>
                      {cert.name}
                    </h6>
                    <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {cert.issuer}
                    </p>
                    <Badge style={{
                      background: '#10b981',
                      color: 'white',
                      fontSize: '0.8rem',
                      padding: '6px 12px',
                      borderRadius: '6px'
                    }}>
                      {cert.date}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Publications Section */}
      {data.publications && (
        <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 style={{ 
                fontSize: '3rem', 
                color: '#1e3c72',
                marginBottom: '1rem',
                fontWeight: '300'
              }}>
                Publications & Thought Leadership
              </h2>
              <div style={{
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
                margin: '0 auto'
              }}></div>
            </div>
            <Row>
              <Col lg={8} className="mx-auto">
                {data.publications.map((pub, index) => (
                  <Card key={index} className="business-card mb-4" style={{
                    border: 'none',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    borderRadius: '15px'
                  }}>
                    <Card.Body style={{ padding: '2rem' }}>
                      <Row>
                        <Col md={8}>
                          <h5 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '1rem' }}>
                            {pub.title}
                          </h5>
                          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                            <strong>{pub.publication}</strong> • {pub.date}
                          </div>
                        </Col>
                        <Col md={4} className="text-right">
                          <Button 
                            href={pub.url}
                            target="_blank"
                            style={{
                              background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px 20px',
                              fontWeight: '600'
                            }}
                          >
                            📖 Read Article
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section id="certifications" style={{ padding: '120px 0', backgroundColor: '#f8fafc' }}>
          <Container>
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="text-center mb-5">
                  <h2 style={{ 
                    fontSize: '3rem', 
                    fontWeight: '300', 
                    color: '#1e3c72',
                    marginBottom: '1rem'
                  }}>
                    Professional Certifications
                  </h2>
                  <div style={{ width: '60px', height: '3px', background: '#1e3c72', margin: '0 auto' }}></div>
                </div>
                <Row>
                  {data.certifications.map((cert, index) => (
                    <Col md={6} key={index} className="mb-4">
                      <Card className="business-card" style={{
                        border: 'none',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                        borderRadius: '15px',
                        height: '100%'
                      }}>
                        <Card.Body style={{ padding: '2rem', textAlign: 'center' }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto',
                            fontSize: '2rem'
                          }}>
                            🏆
                          </div>
                          <h5 style={{ 
                            color: '#1e3c72', 
                            fontWeight: '700',
                            marginBottom: '1rem'
                          }}>
                            {cert.name}
                          </h5>
                          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                            {cert.issuer}
                          </p>
                          <div style={{ marginBottom: '1rem' }}>
                            <Badge style={{ 
                              background: '#1e3c72', 
                              color: 'white',
                              padding: '8px 16px',
                              borderRadius: '6px'
                            }}>
                              {cert.date}
                            </Badge>
                          </div>
                          {cert.url && (
                            <Button 
                              href={cert.url}
                              target="_blank"
                              variant="outline-primary"
                              size="sm"
                              style={{ borderRadius: '6px' }}
                            >
                              View Certificate
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Internships Section */}
      {data.internships && data.internships.length > 0 && (
        <section id="internships" style={{ padding: '120px 0', backgroundColor: 'white' }}>
          <Container>
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="text-center mb-5">
                  <h2 style={{ 
                    fontSize: '3rem', 
                    fontWeight: '300', 
                    color: '#1e3c72',
                    marginBottom: '1rem'
                  }}>
                    Internships & Early Experience
                  </h2>
                  <div style={{ width: '60px', height: '3px', background: '#1e3c72', margin: '0 auto' }}></div>
                </div>
                {data.internships.map((internship, index) => (
                  <Card key={index} className="business-card mb-4" style={{
                    border: 'none',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    borderRadius: '15px'
                  }}>
                    <Card.Body style={{ padding: '2rem' }}>
                      <Row>
                        <Col md={8}>
                          <h5 style={{ color: '#1e3c72', fontWeight: '700', marginBottom: '0.5rem' }}>
                            {internship.position}
                          </h5>
                          <h6 style={{ color: '#2a5298', fontWeight: '600', marginBottom: '1rem' }}>
                            {internship.company}
                          </h6>
                          <div style={{ color: '#64748b', marginBottom: '1rem' }}>
                            {internship.duration} • {internship.location}
                          </div>
                          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                            {internship.description}
                          </p>
                          {internship.achievements && internship.achievements.length > 0 && (
                            <div>
                              <h6 style={{ color: '#1e3c72', fontWeight: '600', marginBottom: '0.5rem' }}>
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
                        </Col>
                        <Col md={4} className="text-right">
                          <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            fontSize: '2rem'
                          }}>
                            🚀
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white'
      }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: '300',
                marginBottom: '2rem'
              }}>
                Ready to Transform Your Business?
              </h2>
              <p style={{ 
                fontSize: '1.3rem',
                marginBottom: '3rem',
                opacity: 0.9
              }}>
                Let's discuss how strategic consulting can drive growth and efficiency in your organization.
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '4rem',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <div className="metric-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                  <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>{data.email}</div>
                </div>
                <div className="metric-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                  <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>{data.phone}</div>
                </div>
                <div className="metric-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
                  <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>{data.location}</div>
                </div>
              </div>
              <Button 
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid white',
                  color: 'white',
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '6px',
                  backdropFilter: 'blur(10px)'
                }}
                href={`mailto:${data.email}`}
              >
                Schedule Consultation
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resume Modal */}
      <Modal show={showResumeModal} onHide={() => setShowResumeModal(false)} size="lg">
        <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
          <Modal.Title>Professional Resume - {data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📄</div>
          <h4 style={{ marginBottom: '2rem', color: '#1e3c72' }}>Download Complete Professional Resume</h4>
          <p style={{ color: '#64748b', marginBottom: '3rem' }}>
            Comprehensive resume including detailed work history, education, certifications, and case studies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              style={{
                background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              📄 Download PDF Resume
            </Button>
            <Button 
              variant="outline-secondary"
              style={{
                padding: '12px 30px',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              📧 Email Resume
            </Button>
            <Button 
              variant="outline-primary"
              style={{
                padding: '12px 30px',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              💼 LinkedIn Profile
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Certification Modal */}
      <Modal show={showCertModal} onHide={() => setShowCertModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Certification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '3rem' }}>
          {selectedCert && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                <h4 style={{ color: '#1e3c72', marginBottom: '1rem' }}>{selectedCert.name}</h4>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>{selectedCert.description}</p>
              </div>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td><strong>Issuing Organization</strong></td>
                    <td>{selectedCert.issuer}</td>
                  </tr>
                  <tr>
                    <td><strong>Issue Date</strong></td>
                    <td>{selectedCert.date}</td>
                  </tr>
                  <tr>
                    <td><strong>Valid Until</strong></td>
                    <td>{selectedCert.validUntil}</td>
                  </tr>
                  <tr>
                    <td><strong>Credential ID</strong></td>
                    <td>{selectedCert.credentialId}</td>
                  </tr>
                </tbody>
              </Table>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Button 
                  href={selectedCert.verifyLink}
                  target="_blank"
                  style={{
                    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '6px',
                    fontWeight: '600'
                  }}
                >
                  🔗 Verify Certification
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

export default Template3;