import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

const EditBookPage = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch book by ID
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5074/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBook(res.data);
      } catch (err) {
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5074/api/books/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Book updated successfully!');
      setTimeout(() => navigate('/books'), 1500);
    } catch (err) {
      setError('Failed to update book.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Edit Book</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

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
            <Form.Control as="textarea" name="description" value={book.description} onChange={handleChange} rows={3} />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate('/books')}>Cancel</Button>
            <Button variant="primary" type="submit">Update Book</Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default EditBookPage;
