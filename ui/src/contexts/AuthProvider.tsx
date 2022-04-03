import React, { createContext, FC, useEffect, useState } from 'react';
import { User } from 'types/user';
import { onAuthStateChangeListener } from 'utils/firebase';

export type AuthContextProps = {
  auth: User | null;
  setAuth: (auth: User | null) => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChangeListener(
      auth => {
        console.log('onAuthStateChangeListener', auth);
        setAuth(auth);
      },
      (err: any) => {
        console.log('ERROR', err);
      },
    );
    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
