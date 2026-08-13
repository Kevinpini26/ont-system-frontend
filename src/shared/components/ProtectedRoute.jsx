import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/kernel/store/authStore';

export function ProtectedRoute({ roles, postes }) {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  if (!token || !user) {
    return <Navigate to="/connexion" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  if (postes && !postes.includes(user.poste)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
