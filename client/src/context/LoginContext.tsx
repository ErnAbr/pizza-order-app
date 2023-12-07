import { ReactNode, createContext, useEffect, useState } from "react";

interface LoginContextType {
  isUser: string | null;
  setIsUser: (user: string | null) => void;
}

const defaultContextValue: LoginContextType = {
  isUser: null,
  setIsUser: () => {},
};

export const LoginContext =
  createContext<LoginContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export const LoginProvider = ({ children }: Props) => {
  const [isUser, setIsUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setIsUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </LoginContext.Provider>
  );
};
