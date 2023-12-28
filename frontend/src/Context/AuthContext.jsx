import { createContext } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
