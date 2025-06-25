import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCog,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: <FaBox />, label: 'Products', to: '/products' },
    { icon: <FaShoppingCart />, label: 'Orders', to: '/orders' },
    { icon: <FaShoppingCart />, label: 'Categories', to: '/categories' },
    { icon: <FaUsers />, label: 'Users', to: '/users' },
    { icon: <FaCog />, label: 'Settings', to: '/settings' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 h-screen bg-blue-800 text-white transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        } flex flex-col shadow-xl`}
      >
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-xl font-bold transition-opacity duration-300 ${
              isCollapsed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Admin
          </h2>
          <button onClick={toggleSidebar}>
            <FaBars className="text-white text-lg" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 mt-4 px-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-700 transition ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span className="text-base">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer Info */}
        {!isCollapsed && (
          <div className="mt-auto px-4 py-4 text-sm text-center text-white/70">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user?.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Products</h2>
            <p className="text-4xl font-bold text-blue-600">120</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">New Orders</h2>
            <p className="text-4xl font-bold text-green-600">35</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Users</h2>
            <p className="text-4xl font-bold text-purple-600">87</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
