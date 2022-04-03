import AuthContext, { AuthContextProps } from 'contexts/AuthProvider';
import { useContext } from 'react';
import { UserSignupDto } from 'types/user';
import { AuthProviders, loginUsingFireBase, signOutUser } from 'utils/firebase';

export default function useAuth() {
  const { auth } = useContext(AuthContext) as AuthContextProps;

  const login = async (
    provider: AuthProviders,
    userCredentials?: Pick<UserSignupDto, 'email' | 'password'>,
  ) => {
    await loginUsingFireBase(provider, userCredentials);
  };

  const logout = async () => {
    await signOutUser();
  };

  let isLoggedIn = auth !== null;

  return {
    auth,
    isLoggedIn,
    login,
    logout,
  };
}
