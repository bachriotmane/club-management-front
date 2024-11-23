import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../auth/auth';

const PrivateRoute = () => {
    const location = useLocation(); // Capture the current location

    if (!isAuthenticated()) {
        // Pass the current location to the login page
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
        return <Outlet />;

};

export default PrivateRoute;
