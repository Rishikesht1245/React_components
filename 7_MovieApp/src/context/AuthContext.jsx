import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "login":
        console.log("reached login");
        localStorage.setItem("auth", "true");
        //   what else we return it will be the updated state
        return true;
      case "logout":
        console.log("reached logout");
        localStorage.setItem("auth", false);
        return false;
      default:
        return state;
    }
  };
  const [auth, dispatch] = useReducer(authReducer, false);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
