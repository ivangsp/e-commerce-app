import React, { createContext, useState, FC } from 'react';
import { User } from 'types/user';

interface UserContextProps {
  setCurrentUser: (user: User | null) => void;
  currentUser: User | null;
}
export const UserContext = createContext<UserContextProps>({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserContextProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
