import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HelloPage from '../pages/HelloPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import MyBookings from '../pages/MyBookings';
import MyHalls from '../pages/MyHalls';
import AdminPanel from '../pages/AdminPanel';
import NotFound from '../pages/NotFound';
import { useAuth } from '../context/AuthContext'; // или '../hooks/useAuth'

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HelloPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path="/my-bookings" element={
                <ProtectedRoute roles={['user', 'owner']}>
                    <MyBookings />
                </ProtectedRoute>
            } />

            <Route path="/my-halls" element={
                <ProtectedRoute roles={['owner']}>
                    <MyHalls />
                </ProtectedRoute>
            } />

            <Route path="/admin-panel" element={
                <ProtectedRoute roles={['admin']}>
                    <AdminPanel />
                </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
