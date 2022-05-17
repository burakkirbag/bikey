import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const [loggedIn] = useState(!!localStorage.getItem("auth-token"));

  let location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
