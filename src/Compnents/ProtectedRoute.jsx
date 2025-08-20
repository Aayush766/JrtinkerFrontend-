// import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const {isAuthenticated ,loading} = useAuth()
    console.log("isAuthenticated is: ",isAuthenticated)
    if (loading) return <p>Loading...</p>;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  
}

export default ProtectedRoute