import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Badge, ProgressBar } from "react-bootstrap";

function Template2({ isPreview = false, userData = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const defaultData = {
    name: "Sarah Wilson",
    title: "Senior Creative Designer & Art Director",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    linkedin: "https://linkedin.com/in/sarahwilson",
    behance: "https://behance.net/sarahwilson",
    dribbble: "https://dribbble.com/sarahwilson",
    website: "https://sarahwilson.design",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    about: "Award-winning creative designer with 8+ years of experience in brand identity, digital design, and creative direction. Passionate about creating meaningful visual experiences that connect brands with their audiences through innovative design solutions.",
    experience: [
      {
        company: "Creative Agency Pro",
        position: "Senior Art Director",
        duration: "Jan 2021 - Present",
        location: "New York, NY",
        description: "Lead creative direction for Fortune 500 clients, managing design teams and overseeing brand campaigns with budgets exceeding $2M.",
        achievements: [
          "Increased client retention by 85% through innovative design solutions",
          "Led rebranding projects for 15+ major clients",
          "Managed creative team of 12 designers and developers",
          "Won 3 industry awards for outstanding creative work"
        ]
      },
      {
        company: "Design Studio X",
        position: "Senior Graphic Designer",
        duration: "Mar 2019 - Dec 2020",
        location: "Brooklyn, NY",
        description: "Specialized in brand identity design and digital marketing materials for startups and established businesses.",
        achievements: [
          "Created brand identities for 50+ companies",
          "Increased social media engagement by 300% through visual content",
          "Developed design system used across 20+ projects"
        ]
      },
      {
        company: "Freelance Creative",
        position: "Graphic Design Intern",
        duration: "Jun 2018 - Aug 2018",
        location: "Remote",
        description: "Summer internship focusing on logo design, print materials, and social media graphics.",
        achievements: [
          "Completed 25+ design projects",
          "Learned advanced Adobe Creative Suite techniques",
          "Built portfolio of diverse design work"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Fine Arts in Graphic Design",
        school: "Parsons School of Design",
        duration: "2017 - 2019",
        location: "New York, NY",
        gpa: "3.9/4.0",
        relevant: ["Typography", "Brand Identity", "Digital Design", "Design Theory"]
      },
      {
        degree: "Bachelor of Arts in Visual Communications",
        school: "Art Institute of Chicago",
        duration: "2013 - 2017",
        location: "Chicago, IL",
        gpa: "3.7/4.0",
        relevant: ["Illustration", "Photography", "Web Design", "Print Design"]
      }
    ],
    certifications: [
      {
        name: "Adobe Certified Expert - Photoshop",
        issuer: "Adobe Inc.",
        date: "February 2023",
        credentialId: "ACE-PS-2023-001",
        validUntil: "February 2025",
        verifyLink: "https://adobe.com/verify",
        logo: "🎨"
      },
      {
        name: "Google UX Design Professional Certificate",
        issuer: "Google",
        date: "November 2022",
        credentialId: "GOOGLE-UX-2022-001",
        validUntil: "Lifetime",
        verifyLink: "https://coursera.org/verify",
        logo: "🎯"
      },
      {
        name: "Figma Advanced Certification",
        issuer: "Figma Inc.",
        date: "September 2022",
        credentialId: "FIGMA-ADV-2022-001",
        validUntil: "September 2024",
        verifyLink: "https://figma.com/verify",
        logo: "🔧"
      }
    ],
    skills: [
      { name: "Adobe Photoshop", level: 98, category: "Design Software" },
      { name: "Adobe Illustrator", level: 95, category: "Design Software" },
      { name: "Figma", level: 92, category: "Design Software" },
      { name: "After Effects", level: 88, category: "Motion Graphics" },
      { name: "Brand Identity", level: 96, category: "Specialization" },
      { name: "Typography", level: 94, category: "Design Theory" },
      { name: "UI/UX Design", level: 90, category: "Digital Design" },
      { name: "Print Design", level: 85, category: "Traditional Media" }
    ],
    projects: [
      {
        title: "TechStart Brand Identity",
        description: "Complete brand identity design for a fintech startup, including logo, color palette, typography, and brand guidelines. The project resulted in 40% increase in brand recognition.",
        tech: ["Illustrator", "Photoshop", "InDesign", "Brand Strategy"],
        category: "Brand Identity",
        client: "TechStart Inc.",
        year: "2023",
        liveLink: "https://techstart.com",
        behanceLink: "https://behance.net/gallery/techstart",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        featured: true,
        awards: ["Best Brand Identity 2023", "Design Excellence Award"],
        metrics: {
          "Brand Recognition": "+40%",
          "Client Satisfaction": "98%",
          "Project Duration": "3 months"
        }
      },
      {
        title: "EcoLife Mobile App Design",
        description: "Complete UI/UX design for a sustainability-focused mobile application. Designed user flows, wireframes, and high-fidelity prototypes resulting in 4.8 app store rating.",
        tech: ["Figma", "Principle", "Sketch", "Prototyping"],
        category: "Mobile App Design",
        client: "EcoLife Solutions",
        year: "2023",
        liveLink: "https://apps.apple.com/ecolife",
        behanceLink: "https://behance.net/gallery/ecolife",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        featured: true,
        awards: ["Mobile Design Award 2023"],
        metrics: {
          "App Store Rating": "4.8/5",
          "Downloads": "100K+",
          "User Retention": "85%"
        }
      },
      {
        title: "Fashion Week Campaign",
        description: "Creative direction and design for New York Fashion Week campaign, including digital assets, print materials, and social media content.",
        tech: ["Photoshop", "After Effects", "InDesign", "Creative Direction"],
        category: "Campaign Design",
        client: "Fashion Forward NYC",
        year: "2022",
        liveLink: "https://fashionweeknyc.com",
        behanceLink: "https://behance.net/gallery/fashionweek",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
        featured: false,
        metrics: {
          "Social Engagement": "+250%",
          "Media Coverage": "50+ outlets",
          "Event Attendance": "10K+"
        }
      }
    ],
    awards: [
      {
        name: "Designer of the Year 2023",
        organization: "Creative Design Awards",
        year: "2023",
        description: "Recognized for outstanding contribution to brand identity design"
      },
      {
        name: "Best Mobile App Design",
        organization: "UX Design Awards",
        year: "2023",
        description: "EcoLife app design recognized for exceptional user experience"
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
      @keyframes creativeFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-15px) rotate(2deg) scale(1.05); }
        50% { transform: translateY(-25px) rotate(-1deg) scale(1.1); }
        75% { transform: translateY(-10px) rotate(1deg) scale(1.05); }
      }
      
      @keyframes colorShift {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      
      @keyframes morphShape {
        0%, 100% { border-radius: 50% 30% 70% 40%; transform: rotate(0deg); }
        25% { border-radius: 30% 70% 40% 50%; transform: rotate(90deg); }
        50% { border-radius: 70% 40% 50% 30%; transform: rotate(180deg); }
        75% { border-radius: 40% 50% 30% 70%; transform: rotate(270deg); }
      }
      
      @keyframes slideInCreative {
        0% { transform: translateX(-100px) rotateY(-45deg) scale(0.8); opacity: 0; }
        100% { transform: translateX(0) rotateY(0deg) scale(1); opacity: 1; }
      }
      
      .creative-card {
        transform-style: preserve-3d;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .creative-card:hover {
        transform: rotateY(15deg) rotateX(10deg) translateZ(30px) scale(1.05);
        box-shadow: 0 30px 60px rgba(0,0,0,0.2);
      }
      
      .skill-orb {
        transform-style: preserve-3d;
        transition: all 0.3s ease;
        animation: creativeFloat 6s ease-in-out infinite;
      }
      
      .skill-orb:hover {
        transform: translateZ(20px) rotateY(180deg) scale(1.2);
        animation-play-state: paused;
      }
      
      .project-showcase {
        transform-style: preserve-3d;
        transition: all 0.5s ease;
      }
      
      .project-showcase:hover {
        transform: perspective(1000px) rotateX(10deg) rotateY(5deg) translateZ(20px);
      }
      
      /* Mobile Responsive Styles */
      @media (max-width: 768px) {
        .creative-card:hover,
        .skill-orb:hover,
        .project-showcase:hover {
          transform: none !important;
        }
        
        .skill-orb {
          animation: none !important;
        }
        
        h1 {
          font-size: 2rem !important;
        }
        
        h2 {
          font-size: 1.5rem !important;
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
        
        nav .container {
          padding: 0 1rem !important;
        }
      }
      
      @media (max-width: 480px) {
        h1 {
          font-size: 1.75rem !important;
        }
        
        h2 {
          font-size: 1.25rem !important;
        }
        
        .container {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
        
        .btn {
          font-size: 0.9rem !important;
          padding: 0.6rem 1rem !important;
        }
        
        section {
          padding: 60px 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#fdf6e3', overflow: 'hidden' }}>
      {/* Creative Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,107,107,0.2)',
        zIndex: 1000,
        padding: '1rem 0'
      }}>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ 
              fontSize: window.innerWidth < 480 ? '1.2rem' : window.innerWidth < 768 ? '1.5rem' : '1.8rem', 
              fontWeight: '700',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {data.name}
            </div>
            <div style={{ 
              display: 'flex', 
              gap: window.innerWidth < 768 ? '0.5rem' : '2rem', 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: window.innerWidth < 768 ? 'center' : 'flex-end',
              width: window.innerWidth < 768 ? '100%' : 'auto'
            }}>
              {window.innerWidth < 768 ? (
                <>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '100%'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      justifyContent: 'center'
                    }}>
                      <a href="#about" style={{ 
                        color: '#2c3e50', 
                        textDecoration: 'none', 
                        fontWeight: '500',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}>About</a>
                      <a href="#experience" style={{ 
                        color: '#2c3e50', 
                        textDecoration: 'none', 
                        fontWeight: '500',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}>Experience</a>
                      <a href="#portfolio" style={{ 
                        color: '#2c3e50', 
                        textDecoration: 'none', 
                        fontWeight: '500',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}>Portfolio</a>
                      <a href="#skills" style={{ 
                        color: '#2c3e50', 
                        textDecoration: 'none', 
                        fontWeight: '500',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}>Skills</a>
                      <a href="#contact" style={{ 
                        color: '#2c3e50', 
                        textDecoration: 'none', 
                        fontWeight: '500',
                        padding: '0.5rem',
                        fontSize: '0.9rem'
                      }}>Contact</a>
                    </div>
                    <Button 
                      onClick={() => setShowResumeModal(true)}
                      style={{
                        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                        border: 'none',
                        borderRadius: '25px',
                        padding: window.innerWidth < 480 ? '6px 16px' : '8px 20px',
                        fontWeight: '600',
                        fontSize: window.innerWidth < 480 ? '0.8rem' : '0.9rem',
                        alignSelf: 'center',
                        minWidth: '120px'
                      }}
                    >
                      Resume
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <a href="#about" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>About</a>
                  <a href="#experience" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Experience</a>
                  <a href="#portfolio" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Portfolio</a>
                  <a href="#skills" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Skills</a>
                  <a href="#contact" style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: '500' }}>Contact</a>
                  <Button 
                    onClick={() => setShowResumeModal(true)}
                    style={{
                      background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '8px 20px',
                      fontWeight: '600'
                    }}
                  >
                    Resume
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>

      {/* Creative Hero Section */}
      <section style={{
        background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px'
      }}>
        {/* Animated Background Shapes */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.15)',
          animation: 'morphShape 8s ease-in-out infinite, colorShift 12s linear infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.1)',
          animation: 'morphShape 6s ease-in-out infinite reverse, colorShift 10s linear infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.12)',
          animation: 'morphShape 10s ease-in-out infinite, colorShift 8s linear infinite'
        }}></div>

        <Container className="h-100 d-flex align-items-center">
          <Row className="w-100 align-items-center">
            <Col lg={6} className={window.innerWidth < 768 ? 'order-2' : ''}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                padding: window.innerWidth < 480 ? '1.5rem' : window.innerWidth < 768 ? '2.5rem' : '4rem',
                borderRadius: window.innerWidth < 768 ? '20px' : '30px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(20px)',
                animation: window.innerWidth < 768 ? 'none' : 'slideInCreative 1.2s ease-out',
                margin: window.innerWidth < 768 ? '1rem' : '0'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                  color: 'white',
                  padding: window.innerWidth < 480 ? '6px 16px' : '8px 20px',
                  borderRadius: '20px',
                  fontSize: window.innerWidth < 480 ? '0.8rem' : '0.9rem',
                  fontWeight: '600',
                  marginBottom: window.innerWidth < 768 ? '1rem' : '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Creative Professional
                </div>
                <h1 style={{ 
                  fontSize: window.innerWidth < 480 ? '2rem' : window.innerWidth < 768 ? '2.5rem' : '4rem', 
                  fontWeight: '800', 
                  color: '#2c3e50',
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  lineHeight: '1.1',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left'
                }}>
                  {data.name}
                </h1>
                <h2 style={{ 
                  fontSize: window.innerWidth < 480 ? '1.2rem' : window.innerWidth < 768 ? '1.4rem' : '1.8rem', 
                  color: '#e74c3c',
                  marginBottom: window.innerWidth < 768 ? '1.5rem' : '2rem',
                  fontStyle: 'italic',
                  fontWeight: '400',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left'
                }}>
                  {data.title}
                </h2>
                <p style={{ 
                  fontSize: window.innerWidth < 480 ? '0.9rem' : window.innerWidth < 768 ? '1rem' : '1.2rem', 
                  color: '#34495e',
                  lineHeight: window.innerWidth < 768 ? '1.6' : '1.8',
                  marginBottom: window.innerWidth < 768 ? '2rem' : '2.5rem',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left'
                }}>
                  {data.about}
                </p>
                <div style={{ 
                  display: 'flex', 
                  gap: window.innerWidth < 768 ? '0.5rem' : '1rem', 
                  flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                  flexWrap: 'wrap', 
                  marginBottom: window.innerWidth < 768 ? '1.5rem' : '2rem',
                  alignItems: 'center'
                }}>
                  <Button 
                    style={{
                      background: 'linear-gradient(45deg, #e74c3c, #f39c12)',
                      border: 'none',
                      padding: window.innerWidth < 480 ? '12px 25px' : window.innerWidth < 768 ? '13px 30px' : '15px 35px',
                      fontSize: window.innerWidth < 480 ? '0.9rem' : window.innerWidth < 768 ? '1rem' : '1.1rem',
                      borderRadius: '30px',
                      boxShadow: '0 8px 25px rgba(231,76,60,0.3)',
                      fontWeight: '600',
                      width: window.innerWidth < 768 ? '100%' : 'auto',
                      maxWidth: window.innerWidth < 768 ? '300px' : 'none'
                    }}
                    href="#portfolio"
                  >
                    🎨 View Portfolio
                  </Button>
                  <Button 
                    style={{
                      background: 'transparent',
                      border: '2px solid #e74c3c',
                      color: '#e74c3c',
                      padding: window.innerWidth < 480 ? '10px 23px' : window.innerWidth < 768 ? '11px 28px' : '13px 33px',
                      fontSize: window.innerWidth < 480 ? '0.9rem' : window.innerWidth < 768 ? '1rem' : '1.1rem',
                      borderRadius: '30px',
                      fontWeight: '600',
                      width: window.innerWidth < 768 ? '100%' : 'auto',
                      maxWidth: window.innerWidth < 768 ? '300px' : 'none'
                    }}
                    href="#contact"
                  >
                    💬 Let's Talk
                  </Button>
                </div>
                {/* Social Links */}
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href={data.behance} target="_blank" rel="noopener noreferrer" 
                     style={{ 
                       color: '#e74c3c', 
                       fontSize: '1.8rem',
                       transition: 'transform 0.3s ease'
                     }}
                     onMouseEnter={(e) => e.target.style.transform = 'scale(1.2) rotate(10deg)'}
                     onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                  >
                    🎨
                  </a>
                  <a href={data.dribbble} target="_blank" rel="noopener noreferrer"
                     style={{ 
                       color: '#e74c3c', 
                       fontSize: '1.8rem',
                       transition: 'transform 0.3s ease'
                     }}
                     onMouseEnter={(e) => e.target.style.transform = 'scale(1.2) rotate(10deg)'}
                     onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                  >
                    🏀
                  </a>
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                     style={{ 
                       color: '#e74c3c', 
                       fontSize: '1.8rem',
                       transition: 'transform 0.3s ease'
                     }}
                     onMouseEnter={(e) => e.target.style.transform = 'scale(1.2) rotate(10deg)'}
                     onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                  >
                    💼
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={6} className={`text-center ${window.innerWidth < 768 ? 'order-1 mb-4' : ''}`}>
              <div style={{
                position: 'relative',
                width: window.innerWidth < 480 ? '250px' : window.innerWidth < 768 ? '300px' : '400px',
                height: window.innerWidth < 480 ? '250px' : window.innerWidth < 768 ? '300px' : '400px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: window.innerWidth < 480 ? '220px' : window.innerWidth < 768 ? '270px' : '350px',
                  height: window.innerWidth < 480 ? '220px' : window.innerWidth < 768 ? '270px' : '350px',
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '50%',
                  animation: window.innerWidth < 768 ? 'none' : 'creativeFloat 8s ease-in-out infinite'
                }}></div>
                <img 
                  src={data.profileImage}
                  alt={data.name}
                  style={{
                    position: 'relative',
                    width: window.innerWidth < 480 ? '180px' : window.innerWidth < 768 ? '220px' : '300px',
                    height: window.innerWidth < 480 ? '180px' : window.innerWidth < 768 ? '220px' : '300px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: window.innerWidth < 768 ? '5px solid rgba(255,255,255,0.3)' : '8px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                    zIndex: 2,
                    animation: window.innerWidth < 768 ? 'none' : 'creativeFloat 6s ease-in-out infinite reverse'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: window.innerWidth < 480 ? '20px' : '30px',
                  right: window.innerWidth < 480 ? '20px' : '30px',
                  background: 'linear-gradient(45deg, #10b981, #34d399)',
                  width: window.innerWidth < 480 ? '35px' : '50px',
                  height: window.innerWidth < 480 ? '35px' : '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: window.innerWidth < 480 ? '1rem' : '1.5rem',
                  border: window.innerWidth < 768 ? '3px solid white' : '4px solid white',
                  animation: window.innerWidth < 768 ? 'none' : 'creativeFloat 4s ease-in-out infinite',
                  zIndex: 3
                }}>
                  ✨
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              About Me
            </h2>
            <div style={{
              width: '80px',
              height: '6px',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              margin: '0 auto',
              borderRadius: '3px'
            }}></div>
          </div>
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="creative-card" style={{
                border: 'none',
                borderRadius: '25px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <Card.Body style={{ padding: '4rem' }}>
                  <p style={{ 
                    fontSize: '1.3rem', 
                    lineHeight: '1.8', 
                    color: '#64748b', 
                    textAlign: 'center',
                    marginBottom: '3rem'
                  }}>
                    {data.about}
                  </p>
                  <Row className="text-center">
                    <Col md={3} className="mb-3">
                      <div className="skill-orb" style={{
                        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        fontSize: '2rem'
                      }}>
                        📍
                      </div>
                      <div style={{ fontWeight: '700', color: '#2c3e50', fontSize: '1.1rem' }}>
                        {data.location}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Location</div>
                    </Col>
                    <Col md={3} className="mb-3">
                      <div className="skill-orb" style={{
                        background: 'linear-gradient(45deg, #48dbfb, #ff9ff3)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        fontSize: '2rem'
                      }}>
                        🎯
                      </div>
                      <div style={{ fontWeight: '700', color: '#2c3e50', fontSize: '1.1rem' }}>
                        8+ Years
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Experience</div>
                    </Col>
                    <Col md={3} className="mb-3">
                      <div className="skill-orb" style={{
                        background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        fontSize: '2rem'
                      }}>
                        🏆
                      </div>
                      <div style={{ fontWeight: '700', color: '#2c3e50', fontSize: '1.1rem' }}>
                        15+ Awards
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Recognition</div>
                    </Col>
                    <Col md={3} className="mb-3">
                      <div className="skill-orb" style={{
                        background: 'linear-gradient(45deg, #ff9ff3, #48dbfb)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        fontSize: '2rem'
                      }}>
                        👥
                      </div>
                      <div style={{ fontWeight: '700', color: '#2c3e50', fontSize: '1.1rem' }}>
                        100+ Clients
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Happy Clients</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '120px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Professional Journey
            </h2>
            <div style={{
              width: '80px',
              height: '6px',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              margin: '0 auto',
              borderRadius: '3px'
            }}></div>
          </div>
          <Row>
            <Col lg={10} className="mx-auto">
              {data.experience.map((exp, index) => (
                <Card key={index} className="creative-card mb-5" style={{
                  border: 'none',
                  borderRadius: '25px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  <Card.Body style={{ padding: '3rem' }}>
                    <Row>
                      <Col md={8}>
                        <div style={{
                          display: 'inline-block',
                          background: `linear-gradient(45deg, ${index % 2 === 0 ? '#ff6b6b, #feca57' : '#48dbfb, #ff9ff3'})`,
                          color: 'white',
                          padding: '6px 15px',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          textTransform: 'uppercase'
                        }}>
                          {exp.duration}
                        </div>
                        <h4 style={{ 
                          color: '#2c3e50', 
                          fontWeight: '800', 
                          marginBottom: '0.5rem',
                          fontSize: '1.5rem'
                        }}>
                          {exp.position}
                        </h4>
                        <h5 style={{ 
                          color: '#e74c3c', 
                          fontWeight: '600', 
                          marginBottom: '1.5rem',
                          fontSize: '1.2rem'
                        }}>
                          {exp.company} • {exp.location}
                        </h5>
                        <p style={{ 
                          color: '#64748b', 
                          lineHeight: '1.7', 
                          marginBottom: '2rem',
                          fontSize: '1.1rem'
                        }}>
                          {exp.description}
                        </p>
                        {exp.achievements && (
                          <div>
                            <h6 style={{ 
                              color: '#2c3e50', 
                              fontWeight: '700', 
                              marginBottom: '1rem',
                              fontSize: '1.1rem'
                            }}>
                              🎯 Key Achievements:
                            </h6>
                            <ul style={{ color: '#64748b', paddingLeft: '1.5rem' }}>
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} style={{ 
                                  marginBottom: '0.8rem',
                                  fontSize: '1rem',
                                  lineHeight: '1.6'
                                }}>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Col>
                      <Col md={4} className="text-center">
                        <div className="skill-orb" style={{
                          background: `linear-gradient(45deg, ${index % 2 === 0 ? '#ff6b6b, #feca57' : '#48dbfb, #ff9ff3'})`,
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          fontSize: '3rem',
                          color: 'white'
                        }}>
                          {index === 0 ? '🎨' : index === 1 ? '✨' : '🚀'}
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

      {/* Skills Section */}
      <section id="skills" style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Creative Skills
            </h2>
            <div style={{
              width: '80px',
              height: '6px',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              margin: '0 auto',
              borderRadius: '3px'
            }}></div>
          </div>
          <Row>
            {data.skills.map((skill, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="creative-card skill-orb" style={{
                  border: 'none',
                  borderRadius: '20px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  height: '100%',
                  background: 'white'
                }}>
                  <Card.Body className="text-center" style={{ padding: '2.5rem 1.5rem' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(45deg, ${
                        index % 4 === 0 ? '#ff6b6b, #feca57' :
                        index % 4 === 1 ? '#48dbfb, #ff9ff3' :
                        index % 4 === 2 ? '#feca57, #ff6b6b' :
                        '#ff9ff3, #48dbfb'
                      })`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      fontSize: '2rem',
                      animation: 'creativeFloat 5s ease-in-out infinite'
                    }}>
                      {skill.category === 'Design Software' ? '🎨' :
                       skill.category === 'Motion Graphics' ? '🎬' :
                       skill.category === 'Specialization' ? '⭐' :
                       skill.category === 'Design Theory' ? '📚' :
                       skill.category === 'Digital Design' ? '💻' : '🖨️'}
                    </div>
                    <h5 style={{ 
                      color: '#2c3e50', 
                      fontWeight: '700', 
                      marginBottom: '1rem',
                      fontSize: '1.1rem'
                    }}>
                      {skill.name}
                    </h5>
                    <div style={{ marginBottom: '1rem' }}>
                      <ProgressBar 
                        now={skill.level} 
                        style={{ 
                          height: '8px', 
                          borderRadius: '4px',
                          backgroundColor: '#f1f5f9'
                        }}
                      >
                        <ProgressBar 
                          now={skill.level} 
                          style={{
                            background: `linear-gradient(90deg, ${
                              index % 4 === 0 ? '#ff6b6b, #feca57' :
                              index % 4 === 1 ? '#48dbfb, #ff9ff3' :
                              index % 4 === 2 ? '#feca57, #ff6b6b' :
                              '#ff9ff3, #48dbfb'
                            })`
                          }}
                        />
                      </ProgressBar>
                    </div>
                    <div style={{ 
                      fontWeight: '700', 
                      color: '#2c3e50',
                      fontSize: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      {skill.level}%
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
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

      {/* Portfolio Section */}
      <section id="portfolio" style={{ padding: '120px 0', backgroundColor: '#f8fafc' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Featured Projects
            </h2>
            <div style={{
              width: '80px',
              height: '6px',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              margin: '0 auto',
              borderRadius: '3px'
            }}></div>
          </div>
          <Row>
            {data.projects.map((project, index) => (
              <Col lg={6} key={index} className="mb-5">
                <Card className="creative-card project-showcase" style={{
                  border: 'none',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  height: '100%'
                }}>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: `linear-gradient(45deg, ${index % 2 === 0 ? '#ff6b6b, #feca57' : '#48dbfb, #ff9ff3'})`,
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      {project.category}
                    </div>
                    {project.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '700'
                      }}>
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                  <Card.Body style={{ padding: '3rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <Badge style={{
                        background: '#e2e8f0',
                        color: '#475569',
                        fontSize: '0.8rem',
                        padding: '5px 12px',
                        borderRadius: '15px',
                        marginRight: '0.5rem'
                      }}>
                        {project.client}
                      </Badge>
                      <Badge style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        fontSize: '0.8rem',
                        padding: '5px 12px',
                        borderRadius: '15px'
                      }}>
                        {project.year}
                      </Badge>
                    </div>
                    <Card.Title style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: '800',
                      color: '#2c3e50',
                      marginBottom: '1rem'
                    }}>
                      {project.title}
                    </Card.Title>
                    <Card.Text style={{ 
                      color: '#64748b',
                      lineHeight: '1.7',
                      marginBottom: '2rem',
                      fontSize: '1rem'
                    }}>
                      {project.description}
                    </Card.Text>

                    {/* Awards */}
                    {project.awards && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h6 style={{ color: '#2c3e50', fontWeight: '700', marginBottom: '1rem' }}>
                          🏆 Awards:
                        </h6>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {project.awards.map((award, awardIndex) => (
                            <Badge key={awardIndex} style={{
                              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                              color: 'white',
                              fontSize: '0.8rem',
                              padding: '5px 12px',
                              borderRadius: '15px'
                            }}>
                              {award}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metrics */}
                    {project.metrics && (
                      <div style={{ 
                        background: '#f1f5f9', 
                        padding: '1.5rem', 
                        borderRadius: '15px',
                        marginBottom: '2rem'
                      }}>
                        <Row className="text-center">
                          {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                            <Col key={metricIndex}>
                              <div style={{ 
                                fontWeight: '800', 
                                color: '#2c3e50',
                                fontSize: '1.2rem'
                              }}>
                                {value}
                              </div>
                              <div style={{ 
                                fontSize: '0.8rem', 
                                color: '#64748b',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                              }}>
                                {key}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {(Array.isArray(project.tech) ? project.tech : project.tech ? project.tech.split(',').map(t => t.trim()) : []).map((tech, techIndex) => (
                          <Badge key={techIndex} style={{
                            background: '#e2e8f0',
                            color: '#475569',
                            fontSize: '0.8rem',
                            padding: '5px 12px',
                            borderRadius: '15px'
                          }}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {project.liveLink && (
                        <Button 
                          href={project.liveLink}
                          target="_blank"
                          style={{
                            background: `linear-gradient(45deg, ${index % 2 === 0 ? '#ff6b6b, #feca57' : '#48dbfb, #ff9ff3'})`,
                            border: 'none',
                            borderRadius: '25px',
                            padding: '10px 25px',
                            fontWeight: '600'
                          }}
                        >
                          🚀 Live Project
                        </Button>
                      )}
                      {project.behanceLink && (
                        <Button 
                          variant="outline-secondary"
                          href={project.behanceLink}
                          target="_blank"
                          style={{
                            borderRadius: '25px',
                            padding: '10px 25px',
                            fontWeight: '600'
                          }}
                        >
                          🎨 Behance
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
      <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Certifications
            </h2>
            <div style={{
              width: '80px',
              height: '6px',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              margin: '0 auto',
              borderRadius: '3px'
            }}></div>
          </div>
          <Row>
            {data.certifications.map((cert, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card 
                  className="creative-card" 
                  style={{
                    border: 'none',
                    borderRadius: '20px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedCert(cert);
                    setShowCertModal(true);
                  }}
                >
                  <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{
                      fontSize: '4rem',
                      marginBottom: '1.5rem',
                      animation: 'creativeFloat 6s ease-in-out infinite'
                    }}>
                      {cert.logo}
                    </div>
                    <h5 style={{ 
                      color: '#2c3e50', 
                      fontWeight: '700',
                      marginBottom: '1rem',
                      fontSize: '1.1rem'
                    }}>
                      {cert.name}
                    </h5>
                    <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                      {cert.issuer}
                    </p>
                    <Badge style={{
                      background: `linear-gradient(45deg, ${
                        index % 3 === 0 ? '#ff6b6b, #feca57' :
                        index % 3 === 1 ? '#48dbfb, #ff9ff3' :
                        '#feca57, #ff6b6b'
                      })`,
                      color: 'white',
                      fontSize: '0.8rem',
                      padding: '8px 15px',
                      borderRadius: '15px'
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

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Animation */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          animation: 'morphShape 10s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.08)',
          animation: 'morphShape 8s ease-in-out infinite reverse'
        }}></div>

        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>💌</div>
              <h2 style={{ 
                fontSize: '3.5rem', 
                fontWeight: '800',
                marginBottom: '2rem'
              }}>
                Let's Create Something Amazing
              </h2>
              <p style={{ 
                fontSize: '1.4rem',
                marginBottom: '3rem',
                opacity: 0.9
              }}>
                Ready to bring your creative vision to life? Let's collaborate and make magic happen!
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '4rem',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <div className="creative-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                  <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>{data.email}</div>
                </div>
                <div className="creative-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                  <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>{data.phone}</div>
                </div>
                <div className="creative-card" style={{ textAlign: 'center' }}>
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
                  fontSize: '1.2rem',
                  borderRadius: '30px',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '600'
                }}
                href={`mailto:${data.email}`}
              >
                🚀 Start a Project
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resume Modal */}
      <Modal show={showResumeModal} onHide={() => setShowResumeModal(false)} size="lg">
        <Modal.Header closeButton style={{ background: 'linear-gradient(45deg, #ff6b6b, #feca57)', color: 'white' }}>
          <Modal.Title>Resume - {data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📄</div>
          <h4 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Download My Complete Resume</h4>
          <p style={{ color: '#64748b', marginBottom: '3rem' }}>
            Get my detailed resume with complete work history, education, and project details.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              style={{
                background: 'linear-gradient(45ff, #ff6b6b, #feca57)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px',
                fontWeight: '600'
              }}
            >
              📄 Download PDF
            </Button>
            <Button 
              variant="outline-secondary"
              style={{
                padding: '12px 30px',
                borderRadius: '25px',
                fontWeight: '600'
              }}
            >
              📧 Email Resume
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
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>{selectedCert.logo}</div>
              <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>{selectedCert.name}</h4>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>{selectedCert.issuer}</p>
              <Row>
                <Col md={6}>
                  <strong>Issue Date:</strong> {selectedCert.date}
                </Col>
                <Col md={6}>
                  <strong>Valid Until:</strong> {selectedCert.validUntil}
                </Col>
              </Row>
              <div style={{ marginTop: '2rem' }}>
                <strong>Credential ID:</strong> {selectedCert.credentialId}
              </div>
              <Button 
                href={selectedCert.verifyLink}
                target="_blank"
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  fontWeight: '600',
                  marginTop: '2rem'
                }}
              >
                🔗 Verify Certificate
              </Button>
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
          Preview Mode - Creative Designer Template
        </div>
      )}
    </div>
  );
}

export default Template2;