import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, Alert, Tab, Tabs } from "react-bootstrap";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";

function EnhancedBuilder() {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const templateId = urlParams.get('template') || 'template1';

  // Debug logging
  console.log('EnhancedBuilder mounted');
  console.log('Template ID:', templateId);
  console.log('Location:', location);

  const [userData, setUserData] = useState({
    // Personal Information
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    profileImage: "",
    about: "",
    
    // Skills with proper structure
    skills: [{ name: "", level: 50, category: "Technical" }],
    
    // Projects with proper structure
    projects: [{ 
      title: "", 
      description: "", 
      tech: [""], 
      github: "", 
      demo: "", 
      image: "",
      featured: false,
      metrics: { users: "", performance: "", impact: "" }
    }],
    
    // Experience
    experience: [{ 
      company: "", 
      position: "", 
      duration: "", 
      location: "", 
      description: "", 
      achievements: [""] 
    }],
    
    // Education
    education: [{ 
      institution: "", 
      degree: "", 
      field: "", 
      duration: "", 
      location: "", 
      gpa: "", 
      description: "" 
    }],
    
    // Certifications
    certifications: [{ 
      name: "", 
      issuer: "", 
      date: "", 
      url: "", 
      image: "" 
    }],
    
    // Additional fields
    languages: [""],
    interests: [""],
    achievements: [""]
  });

  const [activeTab, setActiveTab] = useState('personal');
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

  // Handle input changes for simple fields
  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle skill changes
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...userData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setUserData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setUserData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: "", level: 50, category: "Technical" }]
    }));
  };

  const removeSkill = (index) => {
    const newSkills = userData.skills.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  // Handle project changes
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...userData.projects];
    if (field === 'tech') {
      newProjects[index] = { ...newProjects[index], [field]: value.split(',').map(t => t.trim()) };
    } else if (field.startsWith('metrics.')) {
      const metricField = field.split('.')[1];
      newProjects[index] = { 
        ...newProjects[index], 
        metrics: { ...newProjects[index].metrics, [metricField]: value }
      };
    } else {
      newProjects[index] = { ...newProjects[index], [field]: value };
    }
    setUserData(prev => ({
      ...prev,
      projects: newProjects
    }));
  };

  const addProject = () => {
    setUserData(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        title: "", 
        description: "", 
        tech: [""], 
        github: "", 
        demo: "", 
        image: "",
        featured: false,
        metrics: { users: "", performance: "", impact: "" }
      }]
    }));
  };

  const removeProject = (index) => {
    const newProjects = userData.projects.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      projects: newProjects
    }));
  };

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...userData.experience];
    if (field === 'achievements') {
      newExperience[index] = { ...newExperience[index], [field]: value.split('\n').filter(a => a.trim()) };
    } else {
      newExperience[index] = { ...newExperience[index], [field]: value };
    }
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addExperience = () => {
    setUserData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        company: "", 
        position: "", 
        duration: "", 
        location: "", 
        description: "", 
        achievements: [""] 
      }]
    }));
  };

  const removeExperience = (index) => {
    const newExperience = userData.experience.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...userData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setUserData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setUserData(prev => ({
      ...prev,
      education: [...prev.education, { 
        institution: "", 
        degree: "", 
        field: "", 
        duration: "", 
        location: "", 
        gpa: "", 
        description: "" 
      }]
    }));
  };

  const removeEducation = (index) => {
    const newEducation = userData.education.filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  // Handle array fields (languages, interests, achievements)
  const handleArrayChange = (field, index, value) => {
    const newArray = [...userData[field]];
    newArray[index] = value;
    setUserData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setUserData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = userData[field].filter((_, i) => i !== index);
    setUserData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  // File upload handler
  const handleFileUpload = async (field, file) => {
    if (!file) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to upload files');
        return;
      }

      const formData = new FormData();
      let endpoint = '';
      
      // Get API base URL
      const getApiUrl = () => {
        if (process.env.REACT_APP_API_URL) {
          return process.env.REACT_APP_API_URL;
        }
        if (process.env.NODE_ENV === 'production') {
          return window.location.origin;
        }
        return 'http://localhost:5000';
      };
      const API_BASE_URL = getApiUrl();
      
      if (field === 'profileImage') {
        formData.append('profileImage', file);
        endpoint = `${API_BASE_URL}/api/upload/profile-image`;
      } else if (field === 'resume') {
        formData.append('resume', file);
        endpoint = `${API_BASE_URL}/api/upload/resume`;
      } else if (field.startsWith('projectImage')) {
        formData.append('projectImage', file);
        endpoint = `${API_BASE_URL}/api/upload/project-image`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        if (field.startsWith('projectImage')) {
          const projectIndex = parseInt(field.replace('projectImage', ''));
          const newProjects = [...userData.projects];
          newProjects[projectIndex] = { ...newProjects[projectIndex], image: data.fileUrl };
          setUserData(prev => ({
            ...prev,
            projects: newProjects
          }));
        } else {
          setUserData(prev => ({
            ...prev,
            [field]: data.fileUrl
          }));
        }
      } else {
        setError(data.error || 'Failed to upload file');
      }
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error('File upload error:', err);
    }
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

      // Validate required fields
      if (!userData.name || !userData.title || !userData.email) {
        setError('Please fill in all required fields (Name, Title, Email)');
        return;
      }

      // Get API base URL
      const getApiUrl = () => {
        if (process.env.REACT_APP_API_URL) {
          return process.env.REACT_APP_API_URL;
        }
        if (process.env.NODE_ENV === 'production') {
          return window.location.origin;
        }
        return 'http://localhost:5000';
      };
      const API_BASE_URL = getApiUrl();
      
      const response = await fetch(`${API_BASE_URL}/api/portfolio/save`, {
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
      console.error('Save error:', err);
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
      
      // Save current data first (use correct API base and payload shape)
      const API_BASE_URL_SAVE = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5000');
      const saveResponse = await fetch(`${API_BASE_URL_SAVE}/api/portfolio/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          templateId,
          data: userData, // backend expects 'data'
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

      // Now publish the freshly saved data
      const getApiUrl = () => {
        if (process.env.REACT_APP_API_URL) {
          return process.env.REACT_APP_API_URL;
        }
        if (process.env.NODE_ENV === 'production') {
          return window.location.origin;
        }
        return 'http://localhost:5000';
      };
      const API_BASE_URL = getApiUrl();
      
      const response = await fetch(`${API_BASE_URL}/api/portfolio/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const reactUrl = data.publishedUrl || `${window.location.origin}/portfolio/${data.slug}`;
        setPublishedUrl(reactUrl);
        try { if (navigator.clipboard && reactUrl) { navigator.clipboard.writeText(reactUrl); } } catch (e) { /* ignore */ }
        setSaved(true); // Show save confirmation too
        setTimeout(() => setSaved(false), 3000);
        
        console.log('🎉 Portfolio published successfully:', reactUrl);
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

  // Add error boundary
  try {
    if (!isAuthenticated) {
      return (
        <Container className="mt-5">
          <Alert variant="warning">
            <h4>Authentication Required</h4>
            <p>Please login to access the portfolio builder.</p>
            <Button variant="primary" onClick={() => history.push('/')}>
              Go to Login
            </Button>
          </Alert>
        </Container>
      );
    }

  const renderTemplate = () => {
    const templates = {
      template1: Template1,
      template2: Template2,
      template3: Template3,
      template4: Template4,
      template5: Template5,
      template6: Template6
    };
    
    const TemplateComponent = templates[templateId] || Template1;
    return <TemplateComponent userData={userData} />;
  };

  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  return (
    <div>
      <Navbar 
        bg="dark" 
        variant="dark" 
        expand="lg" 
        className="mb-4"
        style={{
          padding: isMobile ? '0.5rem 1rem' : undefined
        }}
      >
        <Navbar.Brand style={{
          fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.4rem' : '1.6rem'
        }}>
          🎨 Portfolio Builder
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto" style={{
            backgroundColor: isMobile ? 'rgba(52,58,64,0.95)' : 'transparent',
            borderRadius: isMobile ? '8px' : '0',
            marginTop: isMobile ? '0.5rem' : '0',
            padding: isMobile ? '0.5rem' : '0',
            gap: isMobile ? '0.5rem' : '0.75rem'
          }}>
            <Button 
              variant="outline-light" 
              className={isMobile ? "mb-2" : "mr-2"}
              onClick={() => setShowPreview(!showPreview)}
              style={{
                minHeight: isMobile ? '44px' : 'auto',
                fontSize: isSmallMobile ? '0.9rem' : '1rem',
                padding: isSmallMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {showPreview ? (isSmallMobile ? 'Edit' : '✏️ Edit') : (isSmallMobile ? 'Preview' : '👁️ Preview')}
            </Button>
            <Button 
              variant="success" 
              className={isMobile ? "mb-2" : "mr-2"}
              onClick={handleSave}
              disabled={saving}
              style={{
                minHeight: isMobile ? '44px' : 'auto',
                fontSize: isSmallMobile ? '0.9rem' : '1rem',
                padding: isSmallMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {saving ? (isSmallMobile ? 'Saving...' : '💾 Saving...') : (isSmallMobile ? 'Save' : '💾 Save')}
            </Button>
            <Button 
              variant="primary"
              onClick={handlePublish}
              disabled={publishing}
              style={{
                minHeight: isMobile ? '44px' : 'auto',
                fontSize: isSmallMobile ? '0.9rem' : '1rem',
                padding: isSmallMobile ? '0.75rem 1rem' : '0.5rem 1rem',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {publishing 
                ? (isSmallMobile ? 'Publishing...' : '🚀 Publishing...') 
                : (isSmallMobile ? 'Publish' : '🚀 Publish')
              }
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid style={{
        padding: isMobile ? '0 10px' : undefined
      }}>
        {error && (
          <Alert variant="danger" style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            padding: isSmallMobile ? '0.75rem' : '1rem',
            margin: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
            ❌ {error}
          </Alert>
        )}
        {saved && (
          <Alert variant="success" style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            padding: isSmallMobile ? '0.75rem' : '1rem',
            margin: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
{isSmallMobile ? '✅ Saved!' : '✅ Portfolio saved successfully!'}
          </Alert>
        )}
{publishedUrl && (
          <Alert variant="success" style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            padding: isSmallMobile ? '0.75rem' : '1rem',
            margin: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
{isSmallMobile 
              ? <>🎉 Published! <a href={publishedUrl} target="_blank" rel="noopener noreferrer">View →</a></>
              : <>🎉 Portfolio published successfully! <a href={publishedUrl} target="_blank" rel="noopener noreferrer">View Live Portfolio →</a></>
            }
          </Alert>
        )}

        <Row>
          {!showPreview && (
            <Col md={6} xs={12} className={isMobile ? "mb-4" : ""}>
              <Card>
                <Card.Header style={{
                  padding: isSmallMobile ? '0.75rem 1rem' : '1rem 1.25rem'
                }}>
                  <h5 style={{
                    fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.3rem' : '1.4rem',
                    margin: 0
                  }}>
                    📝 Portfolio Information
                  </h5>
                </Card.Header>
                <Card.Body style={{
                  padding: isSmallMobile ? '1rem 0.75rem' : isMobile ? '1.25rem 1rem' : '1.5rem 1.25rem'
                }}>
                  <Tabs 
                    activeKey={activeTab} 
                    onSelect={setActiveTab}
                    className="mb-3"
                    variant={isMobile ? "pills" : "tabs"}
                    justify={isMobile}
                  >
                    
                    {/* Personal Information Tab */}
                    <Tab 
                      eventKey="personal" 
                      title={isMobile ? "👤" : "👤 Personal"}
                    >
                      <div className="mt-3">
                        <Form.Group className="mb-3">
                          <Form.Label style={{
                            fontSize: isSmallMobile ? '0.9rem' : '1rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem'
                          }}>
                            📸 Profile Picture
                          </Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('profileImage', e.target.files[0])}
                            style={{
                              fontSize: '16px', // Prevent zoom on iOS
                              padding: isSmallMobile ? '0.75rem' : '0.875rem',
                              minHeight: isMobile ? '44px' : 'auto'
                            }}
                          />
                          {userData.profileImage && (
                            <img 
                              src={userData.profileImage} 
                              alt="Profile" 
                              style={{
                                width: isSmallMobile ? '80px' : '100px', 
                                height: isSmallMobile ? '80px' : '100px', 
                                objectFit: 'cover', 
                                marginTop: '10px',
                                borderRadius: '50%',
                                border: '3px solid #007bff'
                              }}
                            />
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            value={userData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Professional Title *</Form.Label>
                          <Form.Control
                            type="text"
                            value={userData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Full Stack Developer"
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            value={userData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            type="text"
                            value={userData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="City, Country"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>LinkedIn URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={userData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>GitHub URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={userData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            placeholder="https://github.com/yourusername"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Website URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={userData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            placeholder="https://yourwebsite.com"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Resume (PDF)</Form.Label>
                          <Form.Control
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload('resume', e.target.files[0])}
                          />
                          {userData.resume && (
                            <div className="mt-2">
                              <a href={userData.resume} target="_blank" rel="noopener noreferrer">
                                📄 View Resume
                              </a>
                            </div>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>About Me</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={userData.about}
                            onChange={(e) => handleInputChange('about', e.target.value)}
                            placeholder="Tell us about yourself..."
                          />
                        </Form.Group>
                      </div>
                    </Tab>

                    {/* Skills Tab */}
                    <Tab eventKey="skills" title="Skills">
                      <div className="mt-3">
                        {userData.skills.map((skill, index) => (
                          <Card key={index} className="mb-3">
                            <Card.Body>
                              <Row>
                                <Col md={4}>
                                  <Form.Group>
                                    <Form.Label>Skill Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={skill.name}
                                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                      placeholder="e.g., JavaScript"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>Proficiency Level</Form.Label>
                                    <Form.Control
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={skill.level}
                                      onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                                    />
                                    <small>{skill.level}%</small>
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={skill.category}
                                      onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                    >
                                      <option value="Technical">Technical</option>
                                      <option value="Soft Skills">Soft Skills</option>
                                      <option value="Languages">Languages</option>
                                      <option value="Tools">Tools</option>
                                    </Form.Control>
                                  </Form.Group>
                                </Col>
                                <Col md={2}>
                                  <Form.Label>&nbsp;</Form.Label>
                                  <Button 
                                    variant="danger" 
                                    size="sm" 
                                    className="d-block"
                                    onClick={() => removeSkill(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))}
                        <Button variant="outline-primary" onClick={addSkill}>
                          Add Skill
                        </Button>
                      </div>
                    </Tab>

                    {/* Projects Tab */}
                    <Tab eventKey="projects" title="Projects">
                      <div className="mt-3">
                        {userData.projects.map((project, index) => (
                          <Card key={index} className="mb-3">
                            <Card.Body>
                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Project Title</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={project.title}
                                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Technologies (comma-separated)</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}
                                      onChange={(e) => handleProjectChange(index, 'tech', e.target.value)}
                                      placeholder="React, Node.js, MongoDB"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={project.description}
                                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                />
                              </Form.Group>

                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>GitHub URL</Form.Label>
                                    <Form.Control
                                      type="url"
                                      value={project.github}
                                      onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                                      placeholder="https://github.com/user/repo"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Live Demo URL</Form.Label>
                                    <Form.Control
                                      type="url"
                                      value={project.demo}
                                      onChange={(e) => handleProjectChange(index, 'demo', e.target.value)}
                                      placeholder="https://yourproject.com"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group className="mb-3">
                                <Form.Label>Project Image</Form.Label>
                                <Form.Control
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(`projectImage${index}`, e.target.files[0])}
                                />
                                {project.image && (
                                  <img 
                                    src={project.image} 
                                    alt="Project" 
                                    style={{width: '100px', height: '60px', objectFit: 'cover', marginTop: '10px'}}
                                  />
                                )}
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Check
                                  type="checkbox"
                                  label="Featured Project"
                                  checked={project.featured}
                                  onChange={(e) => handleProjectChange(index, 'featured', e.target.checked)}
                                />
                              </Form.Group>

                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => removeProject(index)}
                              >
                                Remove Project
                              </Button>
                            </Card.Body>
                          </Card>
                        ))}
                        <Button variant="outline-primary" onClick={addProject}>
                          Add Project
                        </Button>
                      </div>
                    </Tab>

                    {/* Experience Tab */}
                    <Tab eventKey="experience" title="Experience">
                      <div className="mt-3">
                        {userData.experience.map((exp, index) => (
                          <Card key={index} className="mb-3">
                            <Card.Body>
                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={exp.company}
                                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={exp.position}
                                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={exp.duration}
                                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                                      placeholder="Jan 2020 - Present"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={exp.location}
                                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={exp.description}
                                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                />
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>Key Achievements (one per line)</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={Array.isArray(exp.achievements) ? exp.achievements.join('\n') : ''}
                                  onChange={(e) => handleExperienceChange(index, 'achievements', e.target.value)}
                                  placeholder="• Increased performance by 50%&#10;• Led a team of 5 developers"
                                />
                              </Form.Group>

                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => removeExperience(index)}
                              >
                                Remove Experience
                              </Button>
                            </Card.Body>
                          </Card>
                        ))}
                        <Button variant="outline-primary" onClick={addExperience}>
                          Add Experience
                        </Button>
                      </div>
                    </Tab>

                    {/* Education Tab */}
                    <Tab eventKey="education" title="Education">
                      <div className="mt-3">
                        {userData.education.map((edu, index) => (
                          <Card key={index} className="mb-3">
                            <Card.Body>
                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Institution</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={edu.institution}
                                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Degree</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={edu.degree}
                                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={4}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Field of Study</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={edu.field}
                                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={edu.duration}
                                      onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                                      placeholder="2018-2022"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>GPA</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={edu.gpa}
                                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                                      placeholder="3.8/4.0"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => removeEducation(index)}
                              >
                                Remove Education
                              </Button>
                            </Card.Body>
                          </Card>
                        ))}
                        <Button variant="outline-primary" onClick={addEducation}>
                          Add Education
                        </Button>
                      </div>
                    </Tab>

                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          )}
          
          <Col md={showPreview ? 12 : 6} xs={12}>
            <Card>
              <Card.Header style={{
                padding: isSmallMobile ? '0.75rem 1rem' : '1rem 1.25rem'
              }}>
                <h5 style={{
                  fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.3rem' : '1.4rem',
                  margin: 0
                }}>
                  👁️ Portfolio Preview
                </h5>
              </Card.Header>
              <Card.Body style={{ 
                maxHeight: isMobile ? '50vh' : '80vh', 
                overflow: 'auto',
                padding: isSmallMobile ? '0.75rem' : '1rem'
              }}>
                <div style={{
                  transform: isMobile ? 'scale(0.4)' : showPreview ? 'scale(0.8)' : 'scale(0.6)',
                  transformOrigin: 'top left',
                  width: isMobile ? '250%' : showPreview ? '125%' : '167%',
                  height: isMobile ? '250%' : showPreview ? '125%' : '167%'
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
  } catch (error) {
    console.error('EnhancedBuilder error:', error);
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    
    return (
      <Container className="mt-5" style={{
        padding: isMobile ? '0 15px' : undefined
      }}>
        <Alert variant="danger" style={{
          padding: isSmallMobile ? '1.5rem 1rem' : '2rem',
          textAlign: 'center'
        }}>
          <h4 style={{
            fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.75rem' : '2rem',
            marginBottom: '1rem'
          }}>
            ⚠️ Error Loading Portfolio Builder
          </h4>
          <p style={{
            fontSize: isSmallMobile ? '1rem' : '1.1rem',
            marginBottom: '1rem'
          }}>
            There was an error loading the portfolio builder. Please try refreshing the page.
          </p>
          <p style={{
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            marginBottom: '1.5rem'
          }}>
            <strong>Error:</strong> {error.message}
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
            🏠 Go to Home
          </Button>
        </Alert>
      </Container>
    );
  }
}

export default EnhancedBuilder;