import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Modal, Badge, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const PortfolioDashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSlugModal, setShowSlugModal] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const [slugAvailable, setSlugAvailable] = useState(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/');
        return;
      }

      const response = await fetch('/api/portfolio/my-portfolio', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPortfolio(data.portfolio);
        setCustomSlug(data.portfolio.slug);
      } else if (response.status === 404) {
        // No portfolio found - this is okay
        setPortfolio(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load portfolio');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const response = await fetch('/api/portfolio/publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Portfolio published successfully! Your portfolio is now live at: ${data.publishedUrl}`);
        fetchPortfolio(); // Refresh portfolio data
      } else {
        setError(data.error || 'Failed to publish portfolio');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const response = await fetch('/api/portfolio/unpublish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Portfolio unpublished successfully');
        fetchPortfolio(); // Refresh portfolio data
      } else {
        setError(data.error || 'Failed to unpublish portfolio');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkSlugAvailability = async (slug) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null);
      return;
    }

    setCheckingSlug(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/portfolio/check-slug/${slug}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSlugAvailable(data.available);
    } catch (err) {
      console.error('Error checking slug:', err);
    } finally {
      setCheckingSlug(false);
    }
  };

  const handleSlugChange = (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setCustomSlug(slug);
    
    // Debounce slug checking
    clearTimeout(window.slugTimeout);
    window.slugTimeout = setTimeout(() => {
      if (slug !== portfolio?.slug) {
        checkSlugAvailability(slug);
      } else {
        setSlugAvailable(null);
      }
    }, 500);
  };

  const updateSlug = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');
      const response = await fetch('/api/portfolio/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: portfolio.templateId,
          data: portfolio.data,
          slug: customSlug
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Portfolio URL updated successfully!');
        setShowSlugModal(false);
        fetchPortfolio();
      } else {
        setError(data.error || 'Failed to update URL');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !portfolio) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!portfolio) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body className="text-center">
                <h3>No Portfolio Found</h3>
                <p>You haven't created a portfolio yet. Create one using our templates!</p>
                <Button variant="primary" onClick={() => history.push('/templates')}>
                  Create Portfolio
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h2>Portfolio Dashboard</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Card className="mb-4">
            <Card.Header>
              <h5>Portfolio Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Name:</strong> {portfolio.data.name}</p>
                  <p><strong>Title:</strong> {portfolio.data.title}</p>
                  <p><strong>Template:</strong> {portfolio.templateId}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Status:</strong> 
                    {portfolio.isPublished ? 
                      <Badge bg="success" className="ms-2">Published</Badge> : 
                      <Badge bg="secondary" className="ms-2">Draft</Badge>
                    }
                  </p>
                  <p><strong>Views:</strong> {portfolio.views}</p>
                  <p><strong>Last Updated:</strong> {new Date(portfolio.updatedAt).toLocaleDateString()}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Portfolio URL</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center">
                <code className="me-3">
                  {window.location.origin.replace(':3000', ':5000')}/portfolio/{portfolio.slug}
                </code>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setShowSlugModal(true)}
                >
                  Edit URL
                </Button>
              </div>
              {portfolio.isPublished && (
                <div className="mt-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => window.open(`${window.location.origin.replace(':3000', ':5000')}/portfolio/${portfolio.slug}`, '_blank')}
                  >
                    View Live Portfolio
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5>Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2 d-md-flex">
                <Button 
                  variant="outline-primary" 
                  onClick={() => history.push('/builder')}
                >
                  Edit Portfolio
                </Button>
                
                {portfolio.isPublished ? (
                  <Button 
                    variant="outline-danger" 
                    onClick={handleUnpublish}
                    disabled={loading}
                  >
                    {loading ? 'Unpublishing...' : 'Unpublish'}
                  </Button>
                ) : (
                  <Button 
                    variant="success" 
                    onClick={handlePublish}
                    disabled={loading}
                  >
                    {loading ? 'Publishing...' : 'Publish Portfolio'}
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <h3 className="text-primary">{portfolio.views}</h3>
                <p>Total Views</p>
                
                {portfolio.publishedAt && (
                  <>
                    <hr />
                    <p><strong>Published:</strong><br />
                    {new Date(portfolio.publishedAt).toLocaleDateString()}</p>
                  </>
                )}
                
                {portfolio.lastViewed && (
                  <>
                    <p><strong>Last Viewed:</strong><br />
                    {new Date(portfolio.lastViewed).toLocaleDateString()}</p>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Slug Edit Modal */}
      <Modal show={showSlugModal} onHide={() => setShowSlugModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Portfolio URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Custom URL</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  {window.location.origin.replace(':3000', ':5000')}/portfolio/
                </span>
                <Form.Control
                  type="text"
                  value={customSlug}
                  onChange={handleSlugChange}
                  placeholder="your-custom-url"
                />
              </div>
              <Form.Text className="text-muted">
                Only lowercase letters, numbers, and hyphens are allowed.
              </Form.Text>
              
              {checkingSlug && (
                <div className="mt-2">
                  <Spinner animation="border" size="sm" /> Checking availability...
                </div>
              )}
              
              {slugAvailable === true && (
                <Alert variant="success" className="mt-2 mb-0">
                  ✓ This URL is available!
                </Alert>
              )}
              
              {slugAvailable === false && (
                <Alert variant="danger" className="mt-2 mb-0">
                  ✗ This URL is already taken.
                </Alert>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSlugModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={updateSlug}
            disabled={loading || slugAvailable === false || !customSlug}
          >
            {loading ? 'Updating...' : 'Update URL'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PortfolioDashboard;