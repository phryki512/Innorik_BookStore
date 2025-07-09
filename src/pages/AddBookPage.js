import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const navigate = useNavigate(); 

  const [book, setBook] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5074/api/books', book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Book added successfully!');
      setBook({ name: '', category: '', price: '', description: '' });
      navigate('/books')
    } catch (err) {
      setError('Failed to add book. Please check your inputs or login.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add New Book</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={book.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" value={book.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={book.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={book.description} onChange={handleChange} as="textarea" rows={3} />
        </Form.Group>

        <Button type="submit" variant="primary">Add Book</Button>
      </Form>
    </Container>
  );
};

export default AddBookPage;
