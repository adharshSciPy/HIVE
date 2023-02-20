import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CheckAuth({ children }) {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenticated && location.pathname.includes(auth.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
