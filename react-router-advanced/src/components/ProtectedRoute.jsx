import { Navigate } from "react-router-dom";
import Login from "./Login";
// import {useAuth} from "../hooks/useAuth";

const isAuthenticated = () => {
    return localStorage.getItem("authToken") === null;
    }
export default function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
  }
    return children;
}