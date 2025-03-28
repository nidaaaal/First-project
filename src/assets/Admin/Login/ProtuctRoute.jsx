import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const admin = localStorage.getItem("admininfo");

  return admin ? children : <Navigate to="/login" replace />;
}