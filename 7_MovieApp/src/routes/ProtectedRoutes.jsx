import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const { auth, dispatch } = useContext(AuthContext);
  const authorized = JSON.parse(localStorage.getItem("auth"));

  if (!authorized || !auth) {
    return <Navigate to={"/"} />;
  }
  dispatch({ type: "login" });

  return (
    <div>
      <Outlet />
    </div>
  );
};
