"use client"
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

/**
 * Admin page component that handles authentication and displays appropriate content
 */
const AdminPage: React.FC = () => {
  const { currentUser, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!currentUser) {
    return <AdminLogin />;
  }

  // Show dashboard if authenticated
  return <AdminDashboard />;
};

export default AdminPage; 