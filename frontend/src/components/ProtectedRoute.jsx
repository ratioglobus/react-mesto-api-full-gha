import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, ...props }) {
  return props.loggedIn ? children : <Navigate to='/signin' replace />;
}
