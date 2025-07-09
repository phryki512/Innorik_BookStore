import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Spinner, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5074/api/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch books. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5074/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      alert("Failed to delete book.");
    }
  };

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Books</h2>
        <Button onClick={() => navigate('/add-book')} variant="success">Add New Book</Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by name or category..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading books...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <Alert variant="info">No books found. Try adding a new one.</Alert>
      ) : (
        filteredBooks.map((book) => (
          <div key={book.id} className="p-3 border rounded my-2 bg-white shadow-sm">
            <Row>
              <Col>
                <h5>{book.name || 'Untitled Book'}</h5>
                <p className="mb-1"><strong>Category:</strong> {book.category || 'Unknown'}</p>
                <p className="mb-1"><strong>Price:</strong> ${book.price ?? 'N/A'}</p>
                <p><strong>Description:</strong> {book.description || 'No description provided.'}</p>
                <small className="text-muted">Book ID: {book.id}</small>
              </Col>
              <Col md="auto" className="d-flex align-items-start flex-column gap-2">
                <Button variant="warning" size="sm" onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(book.id)}>Delete</Button>
              </Col>
            </Row>
          </div>
        ))
      )}
    </Container>
  );
};

export default BooksPage;
