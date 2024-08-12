import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@app/store/store';

const PrivateRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.currentUser);
  return true ? <Outlet /> : <Navigate to={`/login`} />;
};

export default PrivateRoute;
