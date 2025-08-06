import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal, ProgressBar, Navbar, Nav } from "react-bootstrap";

function Template6({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeSection, setActiveSection] = useState('about');
  const [animatedStats, setAnimatedStats] = useState({});

  const defaultData = {
    name: "Alex Thompson",
    title: "Senior Digital Marketing Strategist & Growth Hacker",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 789-0123",
    location: "Los Angeles, CA",
    linkedin: "https://linkedin.com/in/alexthompson",
    github: "https://github.com/alexthompson",
    website: "https://alexthompson.marketing",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    about: "Results-driven digital marketing strategist with 6+ years of experience driving brand growth through data-driven campaigns. Expert in social media marketing, content strategy, SEO/SEM, and conversion optimization. Passionate about leveraging emerging technologies and analytics to maximize ROI and build meaningful customer relationships.",
    experience: [
      {
        company: "GrowthTech Marketing",
        position: "Senior Digital Marketing Strategist",
        duration: "Jan 2022 - Present",
        location: "Los Angeles, CA",
        description: "Lead comprehensive digital marketing strategies for 15+ clients, managing budgets exceeding $2M annually. Specialize in multi-channel campaigns and growth hacking techniques.",
        achievements: [
          "Increased client revenue by average of 180% through optimized campaigns",
          "Reduced customer acquisition cost by 45% across all channels",
          "Led team of 6 marketing specialists and 3 content creators",
          "Implemented marketing automation increasing lead quality by 60%"
        ]
      },
      {
        company: "Digital Boost Agency",
        position: "Digital Marketing Manager",
        duration: "Mar 2020 - Dec 2021",
        location: "Remote",
        description: "Managed end-to-end digital marketing campaigns for e-commerce and SaaS clients. Focused on performance marketing and conversion optimization.",
        achievements: [
          "Scaled client businesses from $100K to $1M+ annual revenue",
          "Achieved 4.2x average ROAS across paid advertising campaigns",
          "Built and optimized sales funnels with 25% conversion rates",
          "Created content strategies generating 500K+ monthly impressions"
        ]
      },
      {
        company: "StartupLab",
        position: "Marketing Coordinator (Internship)",
        duration: "Jun 2019 - Feb 2020",
        location: "Los Angeles, CA",
        description: "Internship focused on social media marketing, content creation, and campaign analytics for tech startups.",
        achievements: [
          "Grew social media following by 300% across all platforms",
          "Created viral content reaching 2M+ organic impressions",
          "Assisted in launching 5 successful product campaigns"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Marketing",
        school: "University of California, Los Angeles",
        duration: "2016 - 2020",
        location: "Los Angeles, CA",
        gpa: "3.8/4.0",
        relevant: ["Digital Marketing", "Consumer Psychology", "Data Analytics", "Brand Management", "Marketing Research"]
      }
    ],
    certifications: [
      {
        name: "Google Ads Certified Professional",
        issuer: "Google",
        date: "January 2023",
        credentialId: "GOOGLE-ADS-2023-001",
        validUntil: "January 2024",
        verifyLink: "https://skillshop.exceedlms.com/student/award"
      },
      {
        name: "Facebook Blueprint Certified",
        issuer: "Meta",
        date: "November 2022",
        credentialId: "META-BP-2022-001",
        validUntil: "November 2024",
        verifyLink: "https://www.facebook.com/business/learn/certification"
      },
      {
        name: "HubSpot Content Marketing Certified",
        issuer: "HubSpot Academy",
        date: "September 2022",
        credentialId: "HUBSPOT-CM-2022-001",
        validUntil: "September 2025",
        verifyLink: "https://academy.hubspot.com/certification"
      },
      {
        name: "Google Analytics 4 Certified",
        issuer: "Google",
        date: "August 2022",
        credentialId: "GA4-2022-001",
        validUntil: "August 2024",
        verifyLink: "https://skillshop.exceedlms.com/student/award"
      }
    ],
    skills: [
      { name: "Google Ads", level: 95, category: "Paid Advertising" },
      { name: "Facebook Ads", level: 92, category: "Paid Advertising" },
      { name: "SEO/SEM", level: 88, category: "Search Marketing" },
      { name: "Content Strategy", level: 90, category: "Content Marketing" },
      { name: "Social Media Marketing", level: 94, category: "Social Media" },
      { name: "Email Marketing", level: 85, category: "Email Marketing" },
      { name: "Marketing Automation", level: 82, category: "MarTech" },
      { name: "Google Analytics", level: 90, category: "Analytics" },
      { name: "Conversion Optimization", level: 87, category: "CRO" },
      { name: "Influencer Marketing", level: 80, category: "Influencer" }
    ],
    projects: [
      {
        title: "E-commerce Growth Campaign",
        description: "Comprehensive digital marketing strategy for fashion e-commerce brand, resulting in 300% revenue growth and 45% reduction in customer acquisition cost through multi-channel approach.",
        tech: ["Google Ads", "Facebook Ads", "Instagram Shopping", "Email Marketing", "Influencer Partnerships"],
        liveLink: "https://case-study.alexthompson.marketing/ecommerce",
        githubLink: "https://github.com/alexthompson/marketing-analytics",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        featured: true,
        status: "Live Campaign",
        metrics: {
          revenue: "+300%",
          roas: "4.8x",
          cac: "-45%"
        }
      },
      {
        title: "SaaS Lead Generation Funnel",
        description: "Built complete lead generation and nurturing system for B2B SaaS company, implementing marketing automation and content marketing strategies that generated 500+ qualified leads monthly.",
        tech: ["HubSpot", "LinkedIn Ads", "Content Marketing", "Marketing Automation", "Lead Scoring"],
        liveLink: "https://case-study.alexthompson.marketing/saas",
        githubLink: "https://github.com/alexthompson/saas-funnel",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        featured: true,
        status: "Active",
        metrics: {
          leads: "500+/mo",
          conversion: "25%",
          ltv: "$15K"
        }
      },
      {
        title: "Viral Social Media Campaign",
        description: "Created and executed viral social media campaign for tech startup that reached 5M+ people organically, generated 50K+ website visits, and resulted in 1,200+ app downloads in first week.",
        tech: ["TikTok", "Instagram Reels", "Twitter", "Influencer Network", "User-Generated Content"],
        liveLink: "https://case-study.alexthompson.marketing/viral",
        githubLink: "https://github.com/alexthompson/social-campaigns",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
        featured: false,
        status: "Completed",
        metrics: {
          reach: "5M+",
          engagement: "12%",
          downloads: "1.2K"
        }
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

  // Animated counter effect for stats
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setAnimatedStats(prev => ({ ...prev, [key]: value }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Animate different stats
    animateValue(0, 180, 2000, 'revenue');
    animateValue(0, 45, 2000, 'cac');
    animateValue(0, 500, 2000, 'leads');
    animateValue(0, 15, 2000, 'clients');
  }, []);

  // Add modern animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      
      @keyframes slideInUp {
        0% { transform: translateY(50px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .float-animation {
        animation: float 6s ease-in-out infinite;
      }
      
      .pulse-animation {
        animation: pulse 4s ease-in-out infinite;
      }
      
      .slide-up {
        animation: slideInUp 0.8s ease-out;
      }
      
      .gradient-bg {
        background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
      }
      
      .marketing-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      
      .marketing-card {
        transition: all 0.3s ease;
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

CERTIFICATIONS
${data.certifications.map(cert => `${cert.name} - ${cert.issuer} (${cert.date})`).join('\n')}
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(' ', '_')}_Marketing_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      backgroundColor: '#f8f9fa',
      color: '#333',
      minHeight: '100vh'
    }}>
      {/* Navigation */}
      <Navbar expand="lg" style={{ 
        backgroundColor: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        padding: '1rem 0'
      }} fixed="top">
        <Container>
          <Navbar.Brand style={{ 
            color: '#667eea', 
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}>
            {data.name.split(' ')[0]} 📈
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {['about', 'experience', 'skills', 'projects', 'certifications', 'contact'].map((section) => (
                <Nav.Link 
                  key={section}
                  href={`#${section}`}
                  style={{ 
                    color: activeSection === section ? '#667eea' : '#666',
                    fontWeight: '500',
                    margin: '0 0.5rem',
                    textTransform: 'capitalize'
                  }}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section id="about" className="gradient-bg" style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px'
      }}>
        {/* Floating elements */}
        <div className="pulse-animation" style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          zIndex: 1
        }}></div>
        <div className="float-animation" style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 1
        }}></div>
        
        <Container className="h-100 d-flex align-items-center position-relative" style={{ zIndex: 2 }}>
          <Row className="w-100 align-items-center">
            <Col lg={8} className="slide-up">
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
              }}>
                <h1 style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}>
                  {data.name}
                </h1>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  color: '#666',
                  marginBottom: '1rem',
                  fontWeight: '300'
                }}>
                  {data.title}
                </h2>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ color: '#667eea' }}>
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {data.location}
                  </span>
                  <span style={{ color: '#667eea' }}>
                    <i className="fas fa-envelope me-2"></i>
                    {data.email}
                  </span>
                  <span style={{ color: '#667eea' }}>
                    <i className="fas fa-phone me-2"></i>
                    {data.phone}
                  </span>
                </div>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.8',
                  color: '#555',
                  marginBottom: '2rem'
                }}>
                  {data.about}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button 
                    style={{
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      border: 'none',
                      color: 'white',
                      padding: '12px 30px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '50px',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                    }}
                    href="#projects"
                  >
                    <i className="fas fa-chart-line me-2"></i>
                    View Campaigns
                  </Button>
                  <Button 
                    style={{
                      background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                      border: 'none',
                      color: 'white',
                      padding: '12px 30px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '50px',
                      boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)'
                    }}
                    onClick={() => setShowResumeModal(true)}
                  >
                    <i className="fas fa-download me-2"></i>
                    Download Resume
                  </Button>
                  <Button 
                    style={{
                      background: 'transparent',
                      border: '2px solid #667eea',
                      color: '#667eea',
                      padding: '12px 30px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '50px'
                    }}
                    href="#contact"
                  >
                    <i className="fas fa-comments me-2"></i>
                    Let's Talk
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <div className="float-animation" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50%',
                padding: '2rem',
                display: 'inline-block',
                marginBottom: '2rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={data.profileImage}
                  alt={data.name}
                  style={{
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '5px solid #667eea'
                  }}
                />
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '2rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '15px',
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.transform = 'scale(1)';
                  }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={data.website} target="_blank" rel="noopener noreferrer" style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '2rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '15px',
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.transform = 'scale(1)';
                  }}
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                  <a href={data.github} target="_blank" rel="noopener noreferrer" style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '2rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '15px',
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.transform = 'scale(1)';
                  }}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section style={{ 
        padding: '80px 0', 
        backgroundColor: 'white'
      }}>
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="marketing-card" style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📈</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {animatedStats.revenue || 0}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                  Average Revenue Growth
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="marketing-card" style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  -{animatedStats.cac || 0}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                  Customer Acquisition Cost Reduction
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="marketing-card" style={{
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                color: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {animatedStats.leads || 0}+
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                  Qualified Leads Generated Monthly
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="marketing-card" style={{
                background: 'linear-gradient(135deg, #fa709a, #fee140)',
                color: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(250, 112, 154, 0.3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {animatedStats.clients || 0}+
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                  Happy Clients Served
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ 
        padding: '80px 0', 
        backgroundColor: '#f8f9fa'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Professional Experience
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              My journey in digital marketing and growth hacking
            </p>
          </div>
          
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <Card className="marketing-card" style={{
                background: 'white',
                border: 'none',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <Card.Body style={{ padding: '3rem' }}>
                  <Row>
                    <Col md={8}>
                      <div style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        {exp.position}
                      </div>
                      <h5 style={{ 
                        color: '#333',
                        marginBottom: '0.5rem',
                        fontSize: '1.3rem'
                      }}>
                        {exp.company}
                      </h5>
                      <p style={{ 
                        color: '#666',
                        marginBottom: '1.5rem',
                        fontSize: '1rem'
                      }}>
                        <i className="fas fa-calendar me-2"></i>
                        {exp.duration} | 
                        <i className="fas fa-map-marker-alt ms-2 me-2"></i>
                        {exp.location}
                      </p>
                      <p style={{ 
                        color: '#555',
                        lineHeight: '1.8',
                        marginBottom: '2rem',
                        fontSize: '1.1rem'
                      }}>
                        {exp.description}
                      </p>
                      <div>
                        <h6 style={{ 
                          color: '#333', 
                          marginBottom: '1rem',
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}>
                          🎯 Key Achievements:
                        </h6>
                        <Row>
                          {exp.achievements.map((achievement, achIndex) => (
                            <Col md={6} key={achIndex} className="mb-2">
                              <div style={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '10px',
                                fontSize: '0.9rem'
                              }}>
                                <i className="fas fa-check-circle me-2"></i>
                                {achievement}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Col>
                    <Col md={4} className="text-center d-flex align-items-center justify-content-center">
                      <div style={{
                        background: index === 0 ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'linear-gradient(45deg, #f093fb, #f5576c)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        fontSize: '3rem'
                      }}>
                        {index === 0 ? '🚀' : index === 1 ? '📊' : '🌟'}
                      </div>
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
        backgroundColor: 'white'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Marketing Skills & Expertise
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Tools and strategies I use to drive growth
            </p>
          </div>
          
          <Row>
            {data.skills.map((skill, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <div className="marketing-card" style={{
                  background: 'white',
                  border: '1px solid #eee',
                  borderRadius: '20px',
                  padding: '2rem',
                  height: '100%',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h5 style={{ 
                      color: '#333',
                      margin: 0,
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {skill.name}
                    </h5>
                    <Badge 
                      style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        fontSize: '0.8rem',
                        padding: '8px 12px',
                        borderRadius: '20px'
                      }}
                    >
                      {skill.category}
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={skill.level} 
                    style={{ 
                      height: '10px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '10px'
                    }}
                    variant="custom"
                  />
                  <style jsx>{`
                    .progress-bar {
                      background: linear-gradient(45deg, #667eea, #764ba2) !important;
                      border-radius: 10px !important;
                    }
                  `}</style>
                  <div style={{ 
                    textAlign: 'right', 
                    marginTop: '0.5rem',
                    color: '#667eea',
                    fontWeight: 'bold',
                    fontSize: '1rem'
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
        backgroundColor: '#f8f9fa'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Featured Campaigns & Projects
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Successful marketing campaigns that drove real results
            </p>
          </div>
          
          <Row>
            {data.projects.map((project, index) => (
              <Col lg={6} key={index} className="mb-5">
                <Card className="marketing-card" style={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '100%',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover'
                      }}
                    />
                    <Badge 
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: project.status === 'Live Campaign' ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'linear-gradient(45deg, #f093fb, #f5576c)',
                        color: 'white',
                        fontSize: '0.9rem',
                        padding: '8px 15px',
                        borderRadius: '20px'
                      }}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <Card.Body style={{ padding: '2.5rem' }}>
                    <Card.Title style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '1rem'
                    }}>
                      {project.title}
                    </Card.Title>
                    <Card.Text style={{ 
                      color: '#666',
                      lineHeight: '1.8',
                      marginBottom: '2rem',
                      fontSize: '1rem'
                    }}>
                      {project.description}
                    </Card.Text>
                    
                    {project.metrics && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h6 style={{ color: '#333', marginBottom: '1rem', fontWeight: 'bold' }}>
                          📊 Campaign Results:
                        </h6>
                        <Row className="text-center">
                          {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                            <Col key={metricIndex}>
                              <div style={{ 
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '15px',
                                marginBottom: '0.5rem'
                              }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.9, textTransform: 'uppercase' }}>{key}</div>
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
                      marginBottom: '2rem'
                    }}>
                      {(Array.isArray(project.tech) ? project.tech : project.tech ? project.tech.split(',').map(t => t.trim()) : []).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          style={{
                            background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                            color: 'white',
                            fontSize: '0.8rem',
                            padding: '8px 12px',
                            borderRadius: '20px'
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
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          border: 'none',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '25px',
                          padding: '10px 20px',
                          flex: 1
                        }}
                      >
                        <i className="fas fa-external-link-alt me-2"></i>
                        View Case Study
                      </Button>
                      <Button 
                        href={project.githubLink}
                        target="_blank"
                        style={{
                          background: 'transparent',
                          border: '2px solid #667eea',
                          color: '#667eea',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '25px',
                          padding: '10px 20px',
                          flex: 1
                        }}
                      >
                        <i className="fab fa-github me-2"></i>
                        Analytics
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
        backgroundColor: 'white'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Professional Certifications
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Validated expertise in digital marketing platforms
            </p>
          </div>
          
          <Row>
            {data.certifications.map((cert, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card 
                  className="marketing-card"
                  style={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    height: '100%',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => handleCertClick(cert)}
                >
                  <Card.Body style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '4rem',
                      marginBottom: '1rem'
                    }}>
                      {index === 0 ? '🎯' : index === 1 ? '📘' : index === 2 ? '🚀' : '📊'}
                    </div>
                    <Card.Title style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '1rem',
                      lineHeight: '1.4'
                    }}>
                      {cert.name}
                    </Card.Title>
                    <div>
                      <p style={{ 
                        color: '#667eea',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}>
                        {cert.issuer}
                      </p>
                      <p style={{ 
                        color: '#666',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem'
                      }}>
                        Issued: {cert.date}
                      </p>
                      <p style={{ 
                        color: '#666',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                      }}>
                        Valid until: {cert.validUntil}
                      </p>
                      <Badge 
                        style={{
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          color: 'white',
                          fontSize: '0.8rem',
                          padding: '8px 15px',
                          borderRadius: '20px'
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
      <section id="contact" className="gradient-bg" style={{
        padding: '80px 0',
        color: 'white'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '3rem',
                color: '#333'
              }}>
                <div className="text-center">
                  <h2 style={{ 
                    fontSize: '3rem', 
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                  }}>
                    Let's Grow Your Business Together! 🚀
                  </h2>
                  <p style={{ 
                    color: '#666',
                    marginBottom: '3rem',
                    fontSize: '1.2rem',
                    lineHeight: '1.8'
                  }}>
                    Ready to take your marketing to the next level? Let's discuss how we can drive growth, 
                    increase conversions, and maximize your ROI through strategic digital marketing.
                  </p>
                  
                  <Row className="mb-4">
                    <Col md={4} className="mb-3">
                      <div style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                          <i className="fas fa-envelope"></i>
                        </div>
                        <h6 style={{ marginBottom: '0.5rem' }}>Email Me</h6>
                        <a href={`mailto:${data.email}`} style={{ 
                          color: 'white', 
                          textDecoration: 'none',
                          fontSize: '0.9rem'
                        }}>
                          {data.email}
                        </a>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div style={{
                        background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                          <i className="fas fa-phone"></i>
                        </div>
                        <h6 style={{ marginBottom: '0.5rem' }}>Call Me</h6>
                        <a href={`tel:${data.phone}`} style={{ 
                          color: 'white', 
                          textDecoration: 'none',
                          fontSize: '0.9rem'
                        }}>
                          {data.phone}
                        </a>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div style={{
                        background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h6 style={{ marginBottom: '0.5rem' }}>Location</h6>
                        <span style={{ fontSize: '0.9rem' }}>
                          {data.location}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button 
                      href={`mailto:${data.email}`}
                      style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        border: 'none',
                        color: 'white',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '50px',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      <i className="fas fa-envelope me-2"></i>
                      Start a Project
                    </Button>
                    <Button 
                      onClick={downloadResume}
                      style={{
                        background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                        border: 'none',
                        color: 'white',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '50px',
                        boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)'
                      }}
                    >
                      <i className="fas fa-download me-2"></i>
                      Download Resume
                    </Button>
                    <Button 
                      href={data.linkedin}
                      target="_blank"
                      style={{
                        background: 'transparent',
                        border: '2px solid #667eea',
                        color: '#667eea',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '50px'
                      }}
                    >
                      <i className="fab fa-linkedin me-2"></i>
                      Connect on LinkedIn
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
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
          <Modal.Title style={{ 
            color: '#333',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Marketing Resume Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'white', color: '#333', maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ lineHeight: '1.6' }}>
            <div className="text-center mb-4">
              <h3 style={{ 
                color: '#333',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {data.name}
              </h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>{data.title}</p>
              <p style={{ color: '#666' }}>{data.email} | {data.phone} | {data.location}</p>
            </div>
            
            <div className="mb-4">
              <h5 style={{ 
                color: '#333', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                About
              </h5>
              <p>{data.about}</p>
            </div>
            
            <div className="mb-4">
              <h5 style={{ 
                color: '#333', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                Experience
              </h5>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <h6 style={{ color: '#667eea', fontWeight: 'bold' }}>
                    {exp.position} - {exp.company}
                  </h6>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {exp.duration} | {exp.location}
                  </p>
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
              <h5 style={{ 
                color: '#333', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                Skills
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {data.skills.map((skill, index) => (
                  <Badge key={index} style={{ 
                    background: 'linear-gradient(45deg, #667eea, #764ba2)', 
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px'
                  }}>
                    {skill.name} ({skill.level}%)
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowResumeModal(false)}
          >
            Close
          </Button>
          <Button 
            onClick={downloadResume}
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: 'none'
            }}
          >
            Download Resume
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Certification Modal */}
      <Modal show={showCertModal} onHide={() => setShowCertModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
          <Modal.Title style={{ 
            color: '#333',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Certification Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'white', color: '#333' }}>
          {selectedCert && (
            <div className="text-center">
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
              <h4 style={{ 
                color: '#333',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
              }}>
                {selectedCert.name}
              </h4>
              <p style={{ color: '#667eea', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {selectedCert.issuer}
              </p>
              <p style={{ color: '#666' }}>Issued: {selectedCert.date}</p>
              <p style={{ color: '#666' }}>Valid until: {selectedCert.validUntil}</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Credential ID: {selectedCert.credentialId}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowCertModal(false)}
          >
            Close
          </Button>
          {selectedCert && (
            <Button 
              href={selectedCert.verifyLink}
              target="_blank"
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                border: 'none'
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
          Preview Mode - Digital Marketing Template
        </div>
      )}
    </div>
  );
}

export default Template6;