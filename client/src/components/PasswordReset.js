import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import M from 'materialize-css';

const PasswordReset = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent! Check your inbox.');
        M.toast({html: 'Password reset email sent!', classes: '#4caf50 green'});
        setTimeout(() => {
          handleClose();
          setEmail('');
          setMessage('');
        }, 2000);
      } else {
        setError(data.error || 'Something went wrong');
        M.toast({html: data.error || 'Something went wrong', classes: '#f44336 red'});
      }
    } catch (err) {
      setError('Network error. Please try again.');
      M.toast({html: 'Network error. Please try again.', classes: '#f44336 red'});
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setEmail('');
    setMessage('');
    setError('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="resetEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll send you a link to reset your password.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={loading || !email}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordReset;