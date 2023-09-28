import { useContext, useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { auth, dispatch } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth")) || false;
    if (storedAuth) dispatch({ type: "login" });
    setAuthorized(storedAuth || auth);
  }, [auth]);

  return !authorized ? <LoginPage /> : <HomePage />;
}

export default App;
