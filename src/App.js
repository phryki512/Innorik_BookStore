import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BooksPage from './pages/BooksPage'; // Placeholder
import PrivateRoute from './components/PrivateRoute'; // We'll create this later
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books" element={
          <PrivateRoute>
            <BooksPage />
          </PrivateRoute>
        } />
        <Route path="/edit-book/:id" element={
          <PrivateRoute>
            <EditBookPage />
          </PrivateRoute>
        } />
        <Route path="/add-book" element={
          <PrivateRoute>
            <AddBookPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
