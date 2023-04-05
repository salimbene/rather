import { createContext, useState } from "react";

const AuthContext = createContext({ isAdmin: false, token: "" }, () => {});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({ isAdmin: false, token: "" });
  return (
    <AuthContext.Provider value={[session, setSession]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
