import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome to your user Dashboard</h1>
        <p className="text-lg text-gray-700">Logged in as <strong>{user?.name}</strong> ({user?.email})</p>
      </div>
    </div>
  );
};

export default Dashboard;
