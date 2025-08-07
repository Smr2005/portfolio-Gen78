import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, Row, Col, Card, Button, Alert, Form, Modal, Badge, 
  Spinner, Tab, Tabs, Table, ProgressBar, ListGroup 
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserNavigation from './UserNavigation';
import '../stylesheets/userprofile.css';
import M from 'materialize-css';

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Profile edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  
  // Feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: 5,
    subject: '',
    message: '',
    category: 'general'
  });
  
  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);
  
  const history = useHistory();

  useEffect(() => {
    if (!state) {
      history.push('/');
      return;
    }
    fetchProfileData();
  }, [state, history]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/user-profile/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setEditName(data.user?.name || '');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load profile data');
      }
    } catch (err) {
      console.error('Profile data fetch error:', err);
      // Fallback with mock data for now
      setProfileData({
        user: state || { name: 'User', email: 'user@example.com' },
        portfolios: [],
        feedbacks: [],
        stats: {
          totalPortfolios: 0,
          publishedPortfolios: 0,
          totalViews: 0,
          totalFeedbacks: 0
        }
      });
      setEditName(state?.name || 'User');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/user-profile/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: editName })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        setShowEditModal(false);
        
        // Update user context
        const updatedUser = { ...state, name: data.user.name };
        dispatch({ type: "USER", payload: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        fetchProfileData();
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePortfolio = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/user-profile/portfolio/${portfolioToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Portfolio deleted successfully!');
        setShowDeleteModal(false);
        setPortfolioToDelete(null);
        fetchProfileData();
      } else {
        setError(data.error || 'Failed to delete portfolio');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      setLoading(true);
      
      // Simulate feedback submission
      setTimeout(() => {
        setSuccess('Feedback submitted successfully! Thank you for your input.');
        setShowFeedbackModal(false);
        setFeedbackData({
          rating: 5,
          subject: '',
          message: '',
          category: 'general'
        });
        setLoading(false);
        
        // Show toast notification
        M.toast({html: `Feedback submitted! Rating: ${feedbackData.rating} stars`, classes: "#4caf50 green"});
      }, 1000);
      
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    dispatch({ type: "CLEAR" });
    M.toast({ html: "Logged out successfully", classes: "#4caf50 green" });
    history.push('/');
  };

  if (loading && !profileData) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Failed to load profile data</Alert>
      </Container>
    );
  }

  const { user = {}, portfolios = [], feedbacks = [], stats = {} } = profileData;

  return (
    <div>
      <UserNavigation />
      <Container className="mt-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Welcome back, {user.name || 'User'}! 👋</h2>
              <p className="text-muted">Manage your portfolios and account settings</p>
            </div>
            <div>
              <Button variant="outline-primary" className="me-2" onClick={() => history.push('/templates')}>
                Create New Portfolio
              </Button>
              <Button variant="outline-secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{stats.totalPortfolios || 0}</h3>
              <p className="mb-0">Total Portfolios</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{stats.publishedPortfolios || 0}</h3>
              <p className="mb-0">Published</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{stats.totalViews || 0}</h3>
              <p className="mb-0">Total Views</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{stats.totalFeedbacks || 0}</h3>
              <p className="mb-0">Feedbacks Given</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        
        {/* Overview Tab */}
        <Tab eventKey="overview" title="Overview">
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h5>My Portfolios</h5>
                </Card.Header>
                <Card.Body>
                  {portfolios.length === 0 ? (
                    <div className="text-center py-4">
                      <p>You haven't created any portfolios yet.</p>
                      <Button variant="primary" onClick={() => history.push('/templates')}>
                        Create Your First Portfolio
                      </Button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Template</th>
                            <th>Status</th>
                            <th>Views</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portfolios.map((portfolio) => (
                            <tr key={portfolio._id}>
                              <td>
                                <strong>{portfolio.data.name}</strong>
                                <br />
                                <small className="text-muted">{portfolio.data.title}</small>
                              </td>
                              <td>
                                <Badge bg="secondary">{portfolio.templateId}</Badge>
                              </td>
                              <td>
                                {portfolio.isPublished ? (
                                  <Badge bg="success">Published</Badge>
                                ) : (
                                  <Badge bg="warning">Draft</Badge>
                                )}
                              </td>
                              <td>{portfolio.views || 0}</td>
                              <td>
                                <div className="btn-group-sm">
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    className="me-1"
                                    onClick={() => history.push('/full-builder')}
                                  >
                                    Edit
                                  </Button>
                                  {portfolio.isPublished && (
                                    <Button 
                                      variant="outline-info" 
                                      size="sm" 
                                      className="me-1"
                                      onClick={() => window.open(`/portfolio/${portfolio.slug}`, '_blank')}
                                    >
                                      View
                                    </Button>
                                  )}
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => {
                                      setPortfolioToDelete(portfolio);
                                      setShowDeleteModal(true);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="mb-3">
                <Card.Header>
                  <h5>Account Information</h5>
                </Card.Header>
                <Card.Body>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <Button variant="outline-primary" size="sm" onClick={() => setShowEditModal(true)}>
                    Edit Profile
                  </Button>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <h5>Quick Actions</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => history.push('/templates')}>
                      Create New Portfolio
                    </Button>
                    <Button variant="outline-success" onClick={() => setShowFeedbackModal(true)}>
                      Give Feedback
                    </Button>
                    <Button variant="outline-info" onClick={() => history.push('/dashboard')}>
                      Portfolio Dashboard
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Feedback Tab */}
        <Tab eventKey="feedback" title="My Feedback">
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5>My Feedback History</h5>
                  <Button variant="primary" size="sm" onClick={() => setShowFeedbackModal(true)}>
                    Submit New Feedback
                  </Button>
                </Card.Header>
                <Card.Body>
                  {feedbacks && feedbacks.length === 0 ? (
                    <div className="text-center py-4">
                      <p>You haven't submitted any feedback yet.</p>
                      <Button variant="primary" onClick={() => setShowFeedbackModal(true)}>
                        Submit Your First Feedback
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p>Your feedback submissions will appear here.</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card>
                <Card.Header>
                  <h5>Feedback Guidelines</h5>
                </Card.Header>
                <Card.Body>
                  <p><strong>Help us improve!</strong></p>
                  <ul className="small">
                    <li>Be specific about issues or suggestions</li>
                    <li>Include steps to reproduce bugs</li>
                    <li>Rate your overall experience</li>
                    <li>Choose appropriate category</li>
                  </ul>
                  <p className="small text-muted">
                    We review all feedback and respond within 2-3 business days.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

      </Tabs>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                disabled
                className="bg-light"
              />
              <Form.Text className="text-muted">
                Email cannot be changed. Contact support if needed.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleEditProfile}
            disabled={loading || !editName || editName.length < 5}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Modal */}
      <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    value={feedbackData.rating}
                    onChange={(e) => setFeedbackData({...feedbackData, rating: parseInt(e.target.value)})}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Good</option>
                    <option value={3}>⭐⭐⭐ Average</option>
                    <option value={2}>⭐⭐ Poor</option>
                    <option value={1}>⭐ Very Poor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={feedbackData.category}
                    onChange={(e) => setFeedbackData({...feedbackData, category: e.target.value})}
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug_report">Bug Report</option>
                    <option value="feature_request">Feature Request</option>
                    <option value="template_feedback">Template Feedback</option>
                    <option value="user_experience">User Experience</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={feedbackData.subject}
                onChange={(e) => setFeedbackData({...feedbackData, subject: e.target.value})}
                placeholder="Brief description of your feedback"
                maxLength={200}
              />
              <Form.Text className="text-muted">
                {feedbackData.subject.length}/200 characters
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={feedbackData.message}
                onChange={(e) => setFeedbackData({...feedbackData, message: e.target.value})}
                placeholder="Please provide detailed feedback..."
                maxLength={1000}
              />
              <Form.Text className="text-muted">
                {feedbackData.message.length}/1000 characters
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFeedbackModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmitFeedback}
            disabled={loading || !feedbackData.subject || !feedbackData.message || 
                     feedbackData.subject.length < 5 || feedbackData.message.length < 10}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this portfolio?</p>
          {portfolioToDelete && (
            <div className="bg-light p-3 rounded">
              <strong>{portfolioToDelete.data.name}</strong>
              <br />
              <small className="text-muted">{portfolioToDelete.data.title}</small>
            </div>
          )}
          <p className="text-danger mt-2">
            <strong>This action cannot be undone!</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeletePortfolio}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Portfolio'}
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
};

export default UserProfile;