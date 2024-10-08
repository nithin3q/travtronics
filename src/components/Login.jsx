import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import Loading from './Loading';
import '../assets/css/Login.css'; 
import logo from '../assets/images/login.jpg';
import brand from '../assets/images/brand.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Track loading state
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://travtronics.onrender.com/users?username=${username}&password=${password}`);
      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        login(user);
        if (user.role === 'admin') {
          navigate('/admin/product-management');
        } else {
          navigate('/shop');
        }
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed');
    }
  };

  // Simulate loading delay
  setTimeout(() => {
    setLoading(false);
  }, 1000); // 2 seconds delay for demonstration

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-55 d-flex flex-column align-items-center justify-content-center">
      <img 
        src={brand}
        alt="Brand Logo"
        className="brand-logo mb-4"
        style={{ width: '150px' }}
      />
      <div className="card login-card shadow-lg">
        <div className="row g-0">
          <div className="col-md-6 d-none d-md-block">
            <img 
              src={logo}
              className="img-fluid rounded-start" 
              alt="Organization"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
