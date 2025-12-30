import {Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './components/Home';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/profile">Profile</Link> |{' '}
        <Link to="/blog/1">Blog Post 1</Link> |{' '}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
