import { Navigate } from "react-router-dom";
import Login from "./Login";

const isAuthenticated = () => {
    return localStorage.getItem("authToken") === null;
    }
export default function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
  }
    return children;
}