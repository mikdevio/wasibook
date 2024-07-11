// ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../services/auth';

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
    };

    authenticate();
  }, []);

  if (isAuthenticated === null) {
    // Puedes mostrar un spinner o algún indicador de carga mientras se verifica la autenticación
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;