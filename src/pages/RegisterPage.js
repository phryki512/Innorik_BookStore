import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:5074/api/auth/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Blurred background image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1470&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
          zIndex: -1,
        }}
      />

      {/* Foreground container */}
      <Container
        fluid
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}
      >
        <Card
          style={{
            width: '24rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px'
          }}
          className="shadow-sm p-4"
        >
          <h2 className="text-center mb-4">Register</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Button variant="link" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
