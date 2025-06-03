import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth} from './context/AuthContext';
import AdminLogin from './components/Admin/AdminLogin';
import Footer from './components/Footer';
const Layouts = () => {
  const { user } = useAuth();
  const role = user ? user.role : null;
  return (
    <>
    <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={role === 'admin' ? '/admin/dashboard' : '/dashboard'} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
       
    </>
  )
}
function App() {
  return (
    <AuthProvider>
        <Layouts />
    </AuthProvider>
  );
}

export default App;
