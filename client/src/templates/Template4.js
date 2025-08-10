import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Badge, ProgressBar } from "react-bootstrap";

function Template4({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeProject, setActiveProject] = useState(0);

  const defaultData = {
    name: "Emma Johnson",
    title: "Senior Minimalist Designer & Creative Director",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 321-9876",
    location: "Los Angeles, CA",
    linkedin: "https://linkedin.com/in/emmajohnson",
    behance: "https://behance.net/emmajohnson",
    website: "https://emmajohnson.design",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    about: "Award-winning minimalist designer with 10+ years of experience creating clean, functional design solutions that communicate effectively without unnecessary complexity. Specialized in brand identity, typography, and user experience design with a philosophy centered on 'less is more'.",
    experience: [
      {
        company: "Apple Inc.",
        position: "Senior Design Director",
        duration: "Jan 2021 - Present",
        location: "Cupertino, CA",
        description: "Lead design direction for consumer products and digital experiences, focusing on minimalist design principles and user-centered solutions.",
        achievements: [
          "Led design team of 20+ designers across multiple product lines",
          "Redesigned core product interfaces resulting in 40% improved usability",
          "Established design system adopted across 15+ product teams",
          "Won 5 international design awards for minimalist approach"
        ],
        keyProjects: [
          "iOS Interface Redesign - Simplified user experience",
          "Product Packaging Evolution - Sustainable minimalist approach",
          "Brand Guidelines Refresh - Clean typography system"
        ]
      },
      {
        company: "Muji Design Studio",
        position: "Creative Director",
        duration: "Mar 2018 - Dec 2020",
        location: "New York, NY",
        description: "Oversaw creative direction for retail and digital experiences, maintaining brand's minimalist philosophy while expanding market presence.",
        achievements: [
          "Increased brand recognition by 60% through consistent design language",
          "Led successful US market expansion with localized design approach",
          "Developed award-winning retail experience design",
          "Mentored 15+ junior designers in minimalist design principles"
        ],
        keyProjects: [
          "US Retail Store Concept - Minimalist retail experience",
          "Digital Platform Redesign - Clean e-commerce interface",
          "Brand Identity Evolution - Refined minimalist approach"
        ]
      },
      {
        company: "Design Studio Minimal",
        position: "Design Intern",
        duration: "Jun 2017 - Aug 2017",
        location: "San Francisco, CA",
        description: "Summer internship focusing on typography, layout design, and minimalist brand identity development.",
        achievements: [
          "Contributed to 10+ client brand identity projects",
          "Developed typography guidelines for major tech client",
          "Created award-winning poster series on minimalism"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Fine Arts in Graphic Design",
        school: "Rhode Island School of Design",
        duration: "2015 - 2017",
        location: "Providence, RI",
        gpa: "4.0/4.0",
        honors: "Summa Cum Laude, Outstanding Graduate Award",
        relevant: ["Typography", "Minimalist Design Theory", "Brand Identity", "User Experience"],
        thesis: "The Psychology of Minimalism in Digital Interfaces"
      },
      {
        degree: "Bachelor of Arts in Visual Design",
        school: "California Institute of the Arts",
        duration: "2011 - 2015",
        location: "Valencia, CA",
        gpa: "3.9/4.0",
        honors: "Magna Cum Laude, Dean's List",
        relevant: ["Design Fundamentals", "Color Theory", "Layout Design", "Digital Media"]
      }
    ],
    certifications: [
      {
        name: "Adobe Certified Expert - InDesign",
        issuer: "Adobe Inc.",
        date: "March 2023",
        credentialId: "ACE-ID-2023-001",
        validUntil: "March 2025",
        verifyLink: "https://adobe.com/verify",
        description: "Advanced certification in professional layout and typography"
      },
      {
        name: "UX Design Professional Certificate",
        issuer: "Google",
        date: "January 2023",
        credentialId: "GOOGLE-UX-2023-001",
        validUntil: "Lifetime",
        verifyLink: "https://coursera.org/verify",
        description: "Comprehensive user experience design methodology"
      },
      {
        name: "Design Thinking Certification",
        issuer: "IDEO",
        date: "September 2022",
        credentialId: "IDEO-DT-2022-001",
        validUntil: "September 2024",
        verifyLink: "https://ideo.com/verify",
        description: "Human-centered design thinking methodology"
      },
      {
        name: "Typography Specialist Certification",
        issuer: "Type Directors Club",
        date: "June 2022",
        credentialId: "TDC-TS-2022-001",
        validUntil: "Lifetime",
        verifyLink: "https://tdc.org/verify",
        description: "Advanced typography and type design principles"
      }
    ],
    skills: [
      { name: "Typography", level: 98, category: "Design Fundamentals" },
      { name: "Layout Design", level: 96, category: "Design Fundamentals" },
      { name: "Brand Identity", level: 94, category: "Branding" },
      { name: "User Experience", level: 92, category: "Digital Design" },
      { name: "Adobe Creative Suite", level: 95, category: "Software" },
      { name: "Figma", level: 90, category: "Software" },
      { name: "Design Systems", level: 88, category: "Methodology" },
      { name: "Print Design", level: 85, category: "Traditional Media" }
    ],
    projects: [
      {
        title: "Zen Banking App",
        client: "Minimalist Financial Services",
        description: "Complete UI/UX design for a minimalist banking application focusing on essential functions with maximum clarity and ease of use.",
        category: "Digital Product Design",
        duration: "8 months",
        year: "2023",
        team: "Solo Designer",
        results: [
          "4.9/5 App Store rating for design",
          "60% reduction in user support tickets",
          "40% increase in user engagement",
          "Featured in Apple's Best Design Apps"
        ],
        tech: ["Figma", "Principle", "Adobe XD", "Sketch"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        liveLink: "https://zenbanking.app",
        behanceLink: "https://behance.net/gallery/zenbanking",
        featured: true,
        awards: ["Best Mobile Design 2023", "Minimalist Design Award"],
        testimonial: "Emma's design transformed our complex banking processes into an elegant, intuitive experience.",
        clientRole: "Product Director"
      },
      {
        title: "Pure Brand Identity",
        client: "Sustainable Fashion Brand",
        description: "Minimal brand identity system emphasizing sustainability and clean aesthetics through typography and negative space.",
        category: "Brand Identity",
        duration: "4 months",
        year: "2023",
        team: "Lead Designer + 1 Junior",
        results: [
          "300% increase in brand recognition",
          "85% improvement in brand recall",
          "Featured in 20+ design publications",
          "Increased sales by 150% post-rebrand"
        ],
        tech: ["Illustrator", "InDesign", "Photoshop"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
        liveLink: "https://purebrand.com",
        behanceLink: "https://behance.net/gallery/purebrand",
        featured: true,
        awards: ["Brand Identity Excellence 2023"],
        testimonial: "The minimalist approach perfectly captured our brand essence and values.",
        clientRole: "Creative Director"
      },
      {
        title: "Minimal Magazine Layout",
        client: "Architecture Quarterly",
        description: "Editorial design for architecture magazine emphasizing white space, typography hierarchy, and image-text balance.",
        category: "Editorial Design",
        duration: "6 months",
        year: "2022",
        team: "Solo Designer",
        results: [
          "50% increase in readership",
          "Award for Best Editorial Design",
          "Adopted as template for 12 issues",
          "Featured in design education curricula"
        ],
        tech: ["InDesign", "Photoshop", "Illustrator"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        behanceLink: "https://behance.net/gallery/minimal-magazine",
        featured: false,
        awards: ["Editorial Design Award 2022"]
      }
    ],
    awards: [
      {
        name: "Designer of the Year 2023",
        organization: "Minimalist Design Awards",
        description: "Recognized for outstanding contribution to minimalist design principles"
      },
      {
        name: "Typography Excellence Award",
        organization: "Type Directors Club",
        description: "Awarded for innovative use of typography in digital interfaces"
      }
    ],
    philosophy: "I believe in the power of simplicity. Every element should serve a purpose, every space should breathe, and every design should communicate its message with clarity and elegance. Less is not just more—it's everything."
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
      @keyframes minimalFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      
      @keyframes fadeInUp {
        0% { transform: translateY(30px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes slideInMinimal {
        0% { transform: translateX(-20px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes minimalPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      .minimal-card {
        transform-style: preserve-3d;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .minimal-card:hover {
        transform: translateY(-5px) rotateX(2deg);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      
      .skill-minimal {
        transition: all 0.3s ease;
      }
      
      .skill-minimal:hover {
        transform: translateX(10px);
      }
      
      .project-minimal {
        transform-style: preserve-3d;
        transition: all 0.4s ease;
      }
      
      .project-minimal:hover {
        transform: translateZ(10px) rotateY(2deg);
      }
      
      .typography-element {
        animation: fadeInUp 0.8s ease-out;
      }
      
      .minimal-button {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .minimal-button:hover {
        transform: translateY(-2px);
      }
      
      .minimal-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      
      .minimal-button:hover::before {
        left: 100%;
      }
      
      /* Mobile Responsive Styles */
      @media (max-width: 768px) {
        .minimal-card:hover,
        .skill-minimal:hover,
        .project-minimal:hover,
        .minimal-button:hover {
          transform: none !important;
        }
        
        .typography-element {
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
    <div style={{ 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', 
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: '1.6'
    }}>
      {/* Minimal Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1000,
        padding: '1.5rem 0'
      }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '300',
              color: '#000000',
              letterSpacing: '-0.5px'
            }}>
              {data.name}
            </div>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
              <a href="#about" style={{ 
                color: '#666666', 
                textDecoration: 'none', 
                fontWeight: '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'color 0.3s ease'
              }}>About</a>
              <a href="#work" style={{ 
                color: '#666666', 
                textDecoration: 'none', 
                fontWeight: '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Work</a>
              <a href="#experience" style={{ 
                color: '#666666', 
                textDecoration: 'none', 
                fontWeight: '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Experience</a>
              <a href="#contact" style={{ 
                color: '#666666', 
                textDecoration: 'none', 
                fontWeight: '400',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Contact</a>
              <Button 
                onClick={() => setShowResumeModal(true)}
                className="minimal-button"
                style={{
                  background: 'transparent',
                  border: '1px solid #000000',
                  color: '#000000',
                  padding: '8px 20px',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '0'
                }}
              >
                Resume
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Minimal Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingTop: '100px'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto 3rem auto',
                  position: 'relative'
                }}>
                  <img 
                    src={data.profileImage}
                    alt={data.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '0',
                      filter: 'grayscale(100%)',
                      transition: 'filter 0.3s ease',
                      animation: 'minimalFloat 6s ease-in-out infinite'
                    }}
                    onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                    onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    right: '-10px',
                    width: '30px',
                    height: '30px',
                    background: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.8rem'
                  }}>
                    ✓
                  </div>
                </div>

                <div className="typography-element">
                  <h1 style={{ 
                    fontSize: '4rem', 
                    fontWeight: '100',
                    marginBottom: '1rem',
                    letterSpacing: '-3px',
                    color: '#000000',
                    lineHeight: '0.9'
                  }}>
                    {data.name}
                  </h1>
                  <div style={{
                    width: '80px',
                    height: '1px',
                    background: '#000000',
                    margin: '2rem auto',
                  }}></div>
                  <h2 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '300',
                    marginBottom: '3rem',
                    color: '#666666',
                    textTransform: 'uppercase',
                    letterSpacing: '3px'
                  }}>
                    {data.title}
                  </h2>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '300',
                    lineHeight: '1.8',
                    marginBottom: '3rem',
                    color: '#666666',
                    maxWidth: '600px',
                    margin: '0 auto 3rem auto'
                  }}>
                    {data.about}
                  </p>
                  <Button 
                    className="minimal-button"
                    style={{
                      background: 'transparent',
                      border: '1px solid #000000',
                      color: '#000000',
                      padding: '15px 40px',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      borderRadius: '0',
                      marginBottom: '3rem'
                    }}
                    href="#work"
                  >
                    View Selected Work
                  </Button>
                </div>

                {/* Philosophy Quote */}
                <div style={{
                  borderTop: '1px solid #e5e5e5',
                  paddingTop: '3rem',
                  marginTop: '3rem'
                }}>
                  <blockquote style={{
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: '#999999',
                    fontWeight: '300',
                    lineHeight: '1.8',
                    maxWidth: '500px',
                    margin: '0 auto',
                    position: 'relative'
                  }}>
                    "{data.philosophy}"
                  </blockquote>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" style={{ 
        padding: '120px 0', 
        backgroundColor: '#fafafa'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '100',
                  marginBottom: '1rem',
                  color: '#000000',
                  letterSpacing: '-1px'
                }}>
                  About
                </h2>
                <div style={{
                  width: '40px',
                  height: '1px',
                  background: '#000000',
                  margin: '2rem auto',
                }}></div>
              </div>
              
              <div style={{ marginBottom: '4rem' }}>
                <p style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  color: '#666666',
                  fontWeight: '300',
                  textAlign: 'center',
                  marginBottom: '3rem'
                }}>
                  {data.about}
                </p>
              </div>

              {/* Education */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  color: '#000000',
                  marginBottom: '2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textAlign: 'center'
                }}>
                  Education
                </h3>
                {data.education.map((edu, index) => (
                  <div key={index} className="minimal-card" style={{
                    background: 'white',
                    padding: '2rem',
                    marginBottom: '1rem',
                    border: '1px solid #e5e5e5'
                  }}>
                    <Row>
                      <Col md={8}>
                        <h5 style={{ 
                          color: '#000000', 
                          fontWeight: '400',
                          marginBottom: '0.5rem',
                          fontSize: '1rem'
                        }}>
                          {edu.degree}
                        </h5>
                        <div style={{ 
                          color: '#666666', 
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          {edu.school} • {edu.location}
                        </div>
                        <div style={{ 
                          color: '#999999', 
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {edu.duration} • GPA: {edu.gpa}
                        </div>
                        {edu.thesis && (
                          <div style={{ 
                            marginTop: '1rem',
                            fontSize: '0.9rem',
                            color: '#666666',
                            fontStyle: 'italic'
                          }}>
                            Thesis: "{edu.thesis}"
                          </div>
                        )}
                      </Col>
                      <Col md={4} className="text-right">
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#999999',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {edu.honors}
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  color: '#000000',
                  marginBottom: '2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textAlign: 'center'
                }}>
                  Expertise
                </h3>
                <Row>
                  {data.skills.map((skill, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <div className="skill-minimal" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <div>
                          <div style={{ 
                            fontSize: '0.9rem',
                            fontWeight: '400',
                            color: '#000000',
                            marginBottom: '0.2rem'
                          }}>
                            {skill.name}
                          </div>
                          <div style={{ 
                            fontSize: '0.7rem',
                            color: '#999999',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {skill.category}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#666666',
                          fontWeight: '300'
                        }}>
                          {skill.level}%
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '100',
                  marginBottom: '1rem',
                  color: '#000000',
                  letterSpacing: '-1px'
                }}>
                  Experience
                </h2>
                <div style={{
                  width: '40px',
                  height: '1px',
                  background: '#000000',
                  margin: '2rem auto 4rem auto',
                }}></div>
              </div>
              
              {data.experience.map((exp, index) => (
                <div key={index} className="minimal-card" style={{
                  marginBottom: '4rem',
                  paddingBottom: index < data.experience.length - 1 ? '4rem' : '0',
                  borderBottom: index < data.experience.length - 1 ? '1px solid #e5e5e5' : 'none'
                }}>
                  <Row>
                    <Col md={3}>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#999999',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.5rem'
                      }}>
                        {exp.duration}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#666666'
                      }}>
                        {exp.location}
                      </div>
                    </Col>
                    <Col md={9}>
                      <h4 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '300',
                        marginBottom: '0.5rem',
                        color: '#000000',
                        letterSpacing: '-0.5px'
                      }}>
                        {exp.position}
                      </h4>
                      <h5 style={{ 
                        fontSize: '1rem',
                        fontWeight: '400',
                        marginBottom: '2rem',
                        color: '#666666'
                      }}>
                        {exp.company}
                      </h5>
                      <p style={{ 
                        fontSize: '1rem',
                        fontWeight: '300',
                        lineHeight: '1.8',
                        color: '#666666',
                        marginBottom: '2rem'
                      }}>
                        {exp.description}
                      </p>
                      
                      {exp.achievements && (
                        <div style={{ marginBottom: '2rem' }}>
                          <h6 style={{ 
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: '#000000',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            Key Achievements
                          </h6>
                          <ul style={{ 
                            listStyle: 'none', 
                            padding: 0,
                            color: '#666666'
                          }}>
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} style={{ 
                                marginBottom: '0.8rem',
                                fontSize: '0.9rem',
                                fontWeight: '300',
                                paddingLeft: '1rem',
                                position: 'relative'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: '0',
                                  top: '0.5rem',
                                  width: '2px',
                                  height: '2px',
                                  background: '#000000'
                                }}></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.keyProjects && (
                        <div>
                          <h6 style={{ 
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: '#000000',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            Notable Projects
                          </h6>
                          <ul style={{ 
                            listStyle: 'none', 
                            padding: 0,
                            color: '#666666'
                          }}>
                            {exp.keyProjects.map((project, i) => (
                              <li key={i} style={{ 
                                marginBottom: '0.8rem',
                                fontSize: '0.9rem',
                                fontWeight: '300',
                                paddingLeft: '1rem',
                                position: 'relative'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: '0',
                                  top: '0.5rem',
                                  width: '2px',
                                  height: '2px',
                                  background: '#000000'
                                }}></span>
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Selected Work Section */}
      <section id="work" style={{ 
        padding: '120px 0',
        backgroundColor: '#fafafa'
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '100',
              marginBottom: '1rem',
              color: '#000000',
              letterSpacing: '-1px'
            }}>
              Selected Work
            </h2>
            <div style={{
              width: '40px',
              height: '1px',
              background: '#000000',
              margin: '2rem auto 4rem auto',
            }}></div>
          </div>
          
          {data.projects.map((project, index) => (
            <div key={index} className="project-minimal" style={{
              marginBottom: '8rem',
              paddingBottom: index < data.projects.length - 1 ? '8rem' : '0',
              borderBottom: index < data.projects.length - 1 ? '1px solid #e5e5e5' : 'none'
            }}>
              <Row className="align-items-center">
                <Col lg={6} className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                  <div style={{
                    background: 'white',
                    padding: '0',
                    border: '1px solid #e5e5e5'
                  }}>
                    <img 
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        transition: 'filter 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                      onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                    />
                  </div>
                </Col>
                <Col lg={6} className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                  <div style={{ padding: '3rem' }}>
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: '400',
                      color: '#999999',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      marginBottom: '1rem'
                    }}>
                      {String(index + 1).padStart(2, '0')} / {project.category}
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '2rem', 
                      fontWeight: '300',
                      marginBottom: '1rem',
                      color: '#000000',
                      letterSpacing: '-1px'
                    }}>
                      {project.title}
                    </h3>
                    
                    <div style={{ 
                      color: '#666666', 
                      marginBottom: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '400'
                    }}>
                      Client: {project.client} • {project.year}
                    </div>
                    
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: '300',
                      lineHeight: '1.8',
                      color: '#666666',
                      marginBottom: '2rem'
                    }}>
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ 
                            fontSize: '0.7rem',
                            color: '#999999',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '0.3rem'
                          }}>
                            Duration
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#666666' }}>
                            {project.duration}
                          </div>
                        </div>
                        <div>
                          <div style={{ 
                            fontSize: '0.7rem',
                            color: '#999999',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '0.3rem'
                          }}>
                            Team
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#666666' }}>
                            {project.team}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    {project.results && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h6 style={{ 
                          fontSize: '0.7rem',
                          fontWeight: '400',
                          color: '#000000',
                          marginBottom: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          Results
                        </h6>
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: 0,
                          color: '#666666'
                        }}>
                          {project.results.slice(0, 3).map((result, i) => (
                            <li key={i} style={{ 
                              marginBottom: '0.5rem',
                              fontSize: '0.9rem',
                              fontWeight: '300',
                              paddingLeft: '1rem',
                              position: 'relative'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: '0',
                                top: '0.5rem',
                                width: '2px',
                                height: '2px',
                                background: '#000000'
                              }}></span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Awards */}
                    {project.awards && (
                      <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {project.awards.map((award, awardIndex) => (
                            <Badge key={awardIndex} style={{
                              background: '#000000',
                              color: 'white',
                              fontSize: '0.7rem',
                              padding: '4px 8px',
                              borderRadius: '0',
                              fontWeight: '300',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}>
                              {award}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '2rem' }}>
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#000000',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderBottom: '1px solid #000000',
                            paddingBottom: '2px',
                            transition: 'opacity 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.6'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                          View Live
                        </a>
                      )}
                      {project.behanceLink && (
                        <a 
                          href={project.behanceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#666666',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderBottom: '1px solid #666666',
                            paddingBottom: '2px',
                            transition: 'opacity 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.6'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                          Case Study
                        </a>
                      )}
                    </div>

                    {/* Client Testimonial */}
                    {project.testimonial && (
                      <div style={{
                        marginTop: '3rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid #f0f0f0'
                      }}>
                        <blockquote style={{ 
                          color: '#666666', 
                          fontStyle: 'italic',
                          marginBottom: '1rem',
                          fontSize: '0.9rem',
                          fontWeight: '300'
                        }}>
                          "{project.testimonial}"
                        </blockquote>
                        <div style={{ 
                          color: '#999999', 
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {project.clientRole}, {project.client}
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </Container>
      </section>

      {/* Certifications Section */}
      <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '100',
              marginBottom: '1rem',
              color: '#000000',
              letterSpacing: '-1px'
            }}>
              Certifications
            </h2>
            <div style={{
              width: '40px',
              height: '1px',
              background: '#000000',
              margin: '2rem auto 4rem auto',
            }}></div>
          </div>
          <Row>
            {data.certifications.map((cert, index) => (
              <Col md={6} key={index} className="mb-4">
                <div 
                  className="minimal-card"
                  style={{
                    background: '#fafafa',
                    padding: '2rem',
                    border: '1px solid #e5e5e5',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedCert(cert);
                    setShowCertModal(true);
                  }}
                >
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#999999',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.5rem'
                    }}>
                      {cert.issuer}
                    </div>
                    <h5 style={{ 
                      color: '#000000', 
                      fontWeight: '400',
                      marginBottom: '1rem',
                      fontSize: '1rem'
                    }}>
                      {cert.name}
                    </h5>
                    <p style={{ 
                      color: '#666666', 
                      fontSize: '0.9rem',
                      fontWeight: '300',
                      marginBottom: '1rem'
                    }}>
                      {cert.description}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#666666'
                    }}>
                      {cert.date}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#999999',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Valid until {cert.validUntil}
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
        padding: '120px 0',
        backgroundColor: '#000000',
        color: 'white'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} className="text-center">
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '100',
                marginBottom: '1rem',
                letterSpacing: '-1px'
              }}>
                Let's Work Together
              </h2>
              <div style={{
                width: '40px',
                height: '1px',
                background: '#ffffff',
                margin: '2rem auto 3rem auto',
              }}></div>
              <p style={{ 
                fontSize: '1rem',
                fontWeight: '300',
                lineHeight: '1.8',
                marginBottom: '3rem',
                color: '#cccccc'
              }}>
                Interested in collaborating on a project that values simplicity, clarity, and purposeful design?
              </p>
              
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ 
                  fontSize: '0.8rem',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  color: '#cccccc',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Email
                </div>
                <div style={{ 
                  fontSize: '1.2rem',
                  fontWeight: '300',
                  marginBottom: '2rem'
                }}>
                  {data.email}
                </div>
                
                <div style={{ 
                  fontSize: '0.8rem',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  color: '#cccccc',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Phone
                </div>
                <div style={{ 
                  fontSize: '1.2rem',
                  fontWeight: '300',
                  marginBottom: '2rem'
                }}>
                  {data.phone}
                </div>

                <div style={{ 
                  fontSize: '0.8rem',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  color: '#cccccc',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Location
                </div>
                <div style={{ 
                  fontSize: '1.2rem',
                  fontWeight: '300'
                }}>
                  {data.location}
                </div>
              </div>
              
              <Button 
                className="minimal-button"
                style={{
                  background: 'transparent',
                  border: '1px solid #ffffff',
                  color: '#ffffff',
                  padding: '15px 40px',
                  fontSize: '0.8rem',
                  fontWeight: '300',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderRadius: '0'
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
        <Modal.Header closeButton style={{ background: '#000000', color: 'white', border: 'none' }}>
          <Modal.Title style={{ fontWeight: '300' }}>Resume — {data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '3rem', textAlign: 'center', background: '#fafafa' }}>
          <h4 style={{ marginBottom: '2rem', color: '#000000', fontWeight: '300' }}>
            Download Complete Resume
          </h4>
          <p style={{ color: '#666666', marginBottom: '3rem', fontWeight: '300' }}>
            Comprehensive resume including detailed work history, education, and project portfolio.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              className="minimal-button"
              style={{
                background: '#000000',
                border: '1px solid #000000',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '0',
                fontWeight: '300',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.8rem'
              }}
            >
              Download PDF
            </Button>
            <Button 
              className="minimal-button"
              style={{
                background: 'transparent',
                border: '1px solid #666666',
                color: '#666666',
                padding: '12px 30px',
                borderRadius: '0',
                fontWeight: '300',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.8rem'
              }}
            >
              Email Resume
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Certification Modal */}
      <Modal show={showCertModal} onHide={() => setShowCertModal(false)} size="lg">
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title style={{ fontWeight: '300' }}>Certification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '3rem' }}>
          {selectedCert && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h4 style={{ color: '#000000', marginBottom: '1rem', fontWeight: '300' }}>
                  {selectedCert.name}
                </h4>
                <p style={{ color: '#666666', fontSize: '1rem', fontWeight: '300' }}>
                  {selectedCert.description}
                </p>
              </div>
              <div style={{ 
                background: '#fafafa', 
                padding: '2rem',
                border: '1px solid #e5e5e5'
              }}>
                <Row>
                  <Col md={6}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#999999',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.3rem'
                      }}>
                        Issuing Organization
                      </div>
                      <div style={{ color: '#000000' }}>{selectedCert.issuer}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#999999',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.3rem'
                      }}>
                        Issue Date
                      </div>
                      <div style={{ color: '#000000' }}>{selectedCert.date}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#999999',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.3rem'
                      }}>
                        Valid Until
                      </div>
                      <div style={{ color: '#000000' }}>{selectedCert.validUntil}</div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#999999',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.3rem'
                      }}>
                        Credential ID
                      </div>
                      <div style={{ color: '#000000', fontSize: '0.9rem' }}>{selectedCert.credentialId}</div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Button 
                  href={selectedCert.verifyLink}
                  target="_blank"
                  className="minimal-button"
                  style={{
                    background: '#000000',
                    border: '1px solid #000000',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '0',
                    fontWeight: '300',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.8rem'
                  }}
                >
                  Verify Certificate
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
          Preview Mode - Minimalist Template
        </div>
      )}
    </div>
  );
}

export default Template4;