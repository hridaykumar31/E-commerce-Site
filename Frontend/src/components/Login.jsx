import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../Api/e-commerceApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(formData);
      if (response.data.token) {
        const user = response.data.user;
        login(response.data.token, user);
        const user_role = response.data.user.role;
        if(user_role === 'user') {
          //console.log("User logged in sucessfully");
          navigate('/dashboard');
        }
        else {
          //console.log("Admin logged in successfully");
          navigate('/admin/dashboard');
        }
        
      }
    } catch (err) {
      console.error(err);
      setError('Login failed');
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;
