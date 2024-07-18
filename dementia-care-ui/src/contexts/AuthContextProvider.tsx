import React, { useState } from "react";

const AuthContext = React.createContext<any>({});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth can be used only under AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
