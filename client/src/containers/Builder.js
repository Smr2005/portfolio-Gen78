import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, Alert } from "react-bootstrap";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";

function Builder() {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const templateId = urlParams.get('template') || 'template1';

  const [userData, setUserData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    about: "",
    skills: [""],
    projects: [{ title: "", description: "", tech: "" }],
    experience: [{ company: "", position: "", duration: "", location: "", description: "", achievements: [""] }]
  });

  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [publishedUrl, setPublishedUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication and load existing portfolio
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
      loadExistingPortfolio(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const loadExistingPortfolio = async (token) => {
    try {
      const response = await fetch('/api/portfolio/my-portfolio', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.portfolio && data.portfolio.data) {
          setUserData(data.portfolio.data);
          console.log('Loaded existing portfolio data');
        }
      }
    } catch (err) {
      console.log('No existing portfolio found or error loading:', err);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...userData.skills];
    newSkills[index] = value;
    setUserData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setUserData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index) => {
    const newSkills = userData.skills.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...userData.projects];
    newProjects[index][field] = value;
    setUserData(prev => ({
      ...prev,
      projects: newProjects
    }));
  };

  const addProject = () => {
    setUserData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", tech: "" }]
    }));
  };

  const removeProject = (index) => {
    const newProjects = userData.projects.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      projects: newProjects
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...userData.experience];
    newExperience[index][field] = value;
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const newExperience = [...userData.experience];
    newExperience[expIndex].achievements[achIndex] = value;
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addExperience = () => {
    setUserData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", duration: "", location: "", description: "", achievements: [""] }]
    }));
  };

  const removeExperience = (index) => {
    const newExperience = userData.experience.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addAchievement = (expIndex) => {
    const newExperience = [...userData.experience];
    newExperience[expIndex].achievements.push("");
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const removeAchievement = (expIndex, achIndex) => {
    const newExperience = [...userData.experience];
    newExperience[expIndex].achievements = newExperience[expIndex].achievements.filter((_, i) => i !== achIndex);
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to save your portfolio');
        return;
      }

      const response = await fetch('/api/portfolio/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId,
          data: userData
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        // Also save to localStorage as backup
        localStorage.setItem('portfolioData', JSON.stringify({
          templateId,
          userData,
          createdAt: new Date().toISOString()
        }));
      } else {
        setError(data.error || 'Failed to save portfolio');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to publish your portfolio');
        return;
      }

      // CRITICAL FIX: Save current data BEFORE publishing to ensure preview matches published version
      console.log('🔄 Auto-saving current data before publishing...');
      
      // Save current data first - explicit save call
      const saveResponse = await fetch('/api/portfolio/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          templateId,
          userData,
          meta: {
            title: `${userData.name} - Portfolio`,
            description: userData.about || `Portfolio of ${userData.name}`,
            keywords: userData.skills?.map(skill => skill.name) || []
          }
        })
      });

      if (!saveResponse.ok) {
        const saveData = await saveResponse.json();
        setError('Failed to save current changes: ' + (saveData.error || 'Unknown error'));
        return;
      }

      console.log('✅ Current data saved successfully. Now publishing...');
      
      // Then publish the freshly saved data
      const response = await fetch('/api/portfolio/publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setPublishedUrl(data.publishedUrl);
        setSaved(true); // Show save confirmation
        setTimeout(() => setSaved(false), 3000);
        
        alert(`🎉 Portfolio published successfully! Your portfolio is now live at: ${data.publishedUrl}`);
        console.log('🎉 Portfolio published successfully:', data.publishedUrl);
      } else {
        setError(data.error || 'Failed to publish portfolio');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Publish error:', err);
    } finally {
      setPublishing(false);
    }
  };

  const renderTemplate = () => {
    switch(templateId) {
      case 'template1':
        return <Template1 userData={userData} />;
      case 'template2':
        return <Template2 userData={userData} />;
      case 'template3':
        return <Template3 userData={userData} />;
      case 'template4':
        return <Template4 userData={userData} />;
      case 'template5':
        return <Template5 userData={userData} />;
      case 'template6':
        return <Template6 userData={userData} />;
      default:
        return <Template1 userData={userData} />;
    }
  };

  if (showPreview) {
    return (
      <div>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '10px 0',
          zIndex: 10000,
          textAlign: 'center'
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={() => setShowPreview(false)}
                >
                  ← Back to Editor
                </Button>
              </div>
              <div className="col-md-4">
                <strong>Your Portfolio Preview</strong>
              </div>
              <div className="col-md-4">
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={handlePublish}
                  disabled={saving || publishing}
                >
{publishing ? '💾🚀 Saving & Publishing...' : 'Publish Portfolio'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ paddingTop: '60px' }}>
          {renderTemplate()}
        </div>
      </div>
    );
  }

  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <Navbar 
          variant="dark" 
          expand="lg" 
          style={{
            backgroundColor: '#343a40',
            padding: isMobile ? '0.5rem 1rem' : undefined
          }}
        >
          <Navbar.Brand 
            onClick={() => history.push('/')} 
            style={{
              cursor: 'pointer',
              fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.4rem' : '1.6rem'
            }}
          >
            &#8918;Portfolio Generator/&#8919;
          </Navbar.Brand>
        </Navbar>
        <Container className="mt-5" style={{
          padding: isMobile ? '0 15px' : undefined
        }}>
          <Row className="justify-content-center">
            <Col md={6} xs={12}>
              <Card>
                <Card.Body className="text-center" style={{
                  padding: isSmallMobile ? '1.5rem 1rem' : '2rem 1.5rem'
                }}>
                  <h3 style={{
                    fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.75rem' : '2rem',
                    marginBottom: '1rem'
                  }}>
                    🔒 Authentication Required
                  </h3>
                  <p style={{
                    fontSize: isSmallMobile ? '1rem' : '1.1rem',
                    marginBottom: '1.5rem'
                  }}>
                    Please login to access the portfolio builder.
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => history.push('/')}
                    style={{
                      minHeight: '44px',
                      fontSize: isSmallMobile ? '1rem' : '1.1rem',
                      padding: isSmallMobile ? '0.75rem 1.5rem' : '0.875rem 2rem',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: '300px'
                    }}
                  >
                    🏠 Go to Login
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar 
        variant="dark" 
        expand="lg" 
        style={{
          backgroundColor: '#343a40',
          padding: isMobile ? '0.5rem 1rem' : undefined
        }}
      >
        <Navbar.Brand 
          onClick={() => history.push('/')} 
          style={{
            cursor: 'pointer',
            fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.4rem' : '1.6rem'
          }}
        >
          &#8918;Portfolio Generator/&#8919;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{
            backgroundColor: isMobile ? 'rgba(52,58,64,0.95)' : 'transparent',
            borderRadius: isMobile ? '8px' : '0',
            marginTop: isMobile ? '0.5rem' : '0',
            padding: isMobile ? '0.5rem 0' : '0'
          }}>
            <Nav.Link 
              onClick={() => setShowPreview(true)}
              style={{
                padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                textAlign: isMobile ? 'center' : 'left',
                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                fontSize: isSmallMobile ? '14px' : '16px'
              }}
            >
              👁️ Preview
            </Nav.Link>
            <Nav.Link 
              onClick={() => history.push('/templates')}
              style={{
                padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                textAlign: isMobile ? 'center' : 'left',
                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                fontSize: isSmallMobile ? '14px' : '16px'
              }}
            >
              🎨 Templates
            </Nav.Link>
            <Nav.Link 
              onClick={() => history.push('/my-work')}
              style={{
                padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                textAlign: isMobile ? 'center' : 'left',
                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                fontSize: isSmallMobile ? '14px' : '16px'
              }}
            >
              💼 My Work
            </Nav.Link>
            <Nav.Link 
              onClick={() => history.push('/dashboard')}
              style={{
                padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                textAlign: isMobile ? 'center' : 'left',
                fontSize: isSmallMobile ? '14px' : '16px'
              }}
            >
              📊 Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="mt-4" style={{
        padding: isMobile ? '0 10px' : undefined
      }}>
        {saved && (
          <Alert variant="success" className="text-center" style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            padding: isSmallMobile ? '0.75rem' : '1rem',
            margin: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
            ✅ Portfolio saved successfully!
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="text-center" style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            padding: isSmallMobile ? '0.75rem' : '1rem',
            margin: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
            ❌ {error}
          </Alert>
        )}
        
        {publishedUrl && (
          <Alert variant="success" className="text-center" style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            padding: isSmallMobile ? '0.75rem' : '1rem',
            margin: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
            🎉 Portfolio published! <a href={publishedUrl} target="_blank" rel="noopener noreferrer">View Live Portfolio</a>
          </Alert>
        )}
        
        <Row>
          <Col md={6} xs={12} className={isMobile ? "mb-4" : ""}>
            <Card>
              <Card.Header style={{
                padding: isSmallMobile ? '0.75rem 1rem' : '1rem 1.25rem'
              }}>
                <h4 style={{
                  fontSize: isSmallMobile ? '1.25rem' : isMobile ? '1.4rem' : '1.5rem',
                  margin: 0
                }}>
                  ✏️ Edit Your Portfolio
                </h4>
              </Card.Header>
              <Card.Body style={{
                padding: isSmallMobile ? '1rem 0.75rem' : isMobile ? '1.25rem 1rem' : '1.5rem 1.25rem'
              }}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{
                      fontSize: isSmallMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      👤 Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      style={{
                        fontSize: '16px', // Prevent zoom on iOS
                        padding: isSmallMobile ? '0.75rem' : '0.875rem',
                        minHeight: isMobile ? '44px' : 'auto'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{
                      fontSize: isSmallMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      💼 Professional Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Full Stack Developer"
                      style={{
                        fontSize: '16px',
                        padding: isSmallMobile ? '0.75rem' : '0.875rem',
                        minHeight: isMobile ? '44px' : 'auto'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{
                      fontSize: isSmallMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      📧 Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      style={{
                        fontSize: '16px',
                        padding: isSmallMobile ? '0.75rem' : '0.875rem',
                        minHeight: isMobile ? '44px' : 'auto'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{
                      fontSize: isSmallMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      📱 Phone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      style={{
                        fontSize: '16px',
                        padding: isSmallMobile ? '0.75rem' : '0.875rem',
                        minHeight: isMobile ? '44px' : 'auto'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{
                      fontSize: isSmallMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      📝 About Me
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={userData.about}
                      onChange={(e) => handleInputChange('about', e.target.value)}
                      placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Skills</Form.Label>
                    {userData.skills.map((skill, index) => (
                      <div key={index} className="d-flex mb-2">
                        <Form.Control
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          placeholder="Enter a skill"
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ml-2"
                          onClick={() => removeSkill(index)}
                          disabled={userData.skills.length === 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline-primary" size="sm" onClick={addSkill}>
                      Add Skill
                    </Button>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Projects</Form.Label>
                    {userData.projects.map((project, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <Form.Group className="mb-2">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.title}
                              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                              placeholder="Project name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={project.description}
                              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                              placeholder="Describe your project"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Technologies Used</Form.Label>
                            <Form.Control
                              type="text"
                              value={project.tech}
                              onChange={(e) => handleProjectChange(index, 'tech', e.target.value)}
                              placeholder="e.g., React, Node.js, MongoDB"
                            />
                          </Form.Group>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeProject(index)}
                            disabled={userData.projects.length === 1}
                          >
                            Remove Project
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                    <Button variant="outline-primary" size="sm" onClick={addProject}>
                      Add Project
                    </Button>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Work Experience</Form.Label>
                    {userData.experience.map((exp, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <Form.Group className="mb-2">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                              placeholder="Company name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.position}
                              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                              placeholder="Job title"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.duration}
                              onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                              placeholder="e.g., Jan 2022 - Present"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                              type="text"
                              value={exp.location}
                              onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                              placeholder="City, State"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                              placeholder="Describe your role and responsibilities"
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Key Achievements</Form.Label>
                            {exp.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="d-flex mb-2">
                                <Form.Control
                                  type="text"
                                  value={achievement}
                                  onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                                  placeholder="Enter an achievement"
                                />
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="ml-2"
                                  onClick={() => removeAchievement(index, achIndex)}
                                  disabled={exp.achievements.length === 1}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              onClick={() => addAchievement(index)}
                              className="mb-2"
                            >
                              Add Achievement
                            </Button>
                          </Form.Group>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeExperience(index)}
                            disabled={userData.experience.length === 1}
                          >
                            Remove Experience
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                    <Button variant="outline-primary" size="sm" onClick={addExperience}>
                      Add Experience
                    </Button>
                  </Form.Group>

                  <div className="d-grid gap-2" style={{
                    marginTop: isMobile ? '1.5rem' : '1rem'
                  }}>
                    <Button 
                      variant="primary" 
                      onClick={handleSave}
                      disabled={saving || publishing}
                      style={{
                        minHeight: '44px',
                        fontSize: isSmallMobile ? '0.9rem' : '1rem',
                        padding: isSmallMobile ? '0.75rem 1rem' : '0.875rem 1.25rem',
                        fontWeight: '600'
                      }}
                    >
                      {saving ? '⏳ Saving...' : '💾 Save Portfolio'}
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={handlePublish}
                      disabled={saving || publishing}
                      style={{
                        minHeight: '44px',
                        fontSize: isSmallMobile ? '0.9rem' : '1rem',
                        padding: isSmallMobile ? '0.75rem 1rem' : '0.875rem 1.25rem',
                        fontWeight: '600'
                      }}
                    >
{publishing ? '💾🚀 Saving & Publishing...' : '🌐 Publish Portfolio'}
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowPreview(true)}
                      disabled={saving || publishing}
                      style={{
                        minHeight: '44px',
                        fontSize: isSmallMobile ? '0.9rem' : '1rem',
                        padding: isSmallMobile ? '0.75rem 1rem' : '0.875rem 1.25rem',
                        fontWeight: '600'
                      }}
                    >
                      👁️ Preview
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} xs={12}>
            <Card>
              <Card.Header style={{
                padding: isSmallMobile ? '0.75rem 1rem' : '1rem 1.25rem'
              }}>
                <h4 style={{
                  fontSize: isSmallMobile ? '1.25rem' : isMobile ? '1.4rem' : '1.5rem',
                  margin: 0
                }}>
                  👁️ Live Preview
                </h4>
              </Card.Header>
              <Card.Body style={{ 
                height: isMobile ? '400px' : '600px', 
                overflow: 'auto',
                padding: isSmallMobile ? '0.75rem' : '1rem'
              }}>
                <div style={{ 
                  transform: isMobile ? 'scale(0.3)' : 'scale(0.5)', 
                  transformOrigin: 'top left', 
                  width: isMobile ? '333%' : '200%', 
                  height: isMobile ? '333%' : '200%' 
                }}>
                  {renderTemplate()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Builder;