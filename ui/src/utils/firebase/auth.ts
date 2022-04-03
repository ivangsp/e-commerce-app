import { User, UserSignupDto } from './../../types/user';
import { CreateUserDto } from './../../types/user';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  NextOrObserver,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

const providers = new GoogleAuthProvider();
providers.setCustomParameters({
  prompt: 'select_account',
});

export type AuthProviders = 'googlePopup' | 'emailAndPassword';

export const auth = getAuth();

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, providers);
};

export const db = getFirestore();

export const createUser = async (userData: CreateUserDto) => {
  const userDocRef = doc(db, 'users', userData.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    return setDoc(userDocRef, { ...userData, createdAt: new Date() });
  }
};

export const createUserUsingEmailAndPassword = async (
  userData: UserSignupDto,
) => {
  const { email, password, displayName } = userData;

  let user: User | null = null;
  let error = '';

  try {
    const results = await createUserWithEmailAndPassword(auth, email, password);
    user = { ...results.user, displayName };
  } catch (err: any) {
    error = getFireBaseErrorMessage(err);
  }

  return { user, error };
};

export async function signInUserWithEmailAndPassword(
  userCredentials: Pick<UserSignupDto, 'email' | 'password'>,
) {
  const { email, password } = userCredentials;
  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginUsingFireBase(
  provider: AuthProviders,
  userCredentials?: Pick<UserSignupDto, 'email' | 'password'>,
) {
  let user: User | null = null;
  let error = '';

  try {
    switch (provider) {
      case 'googlePopup': {
        const result = await signInWithGooglePopup();
        user = result.user;
        break;
      }
      case 'emailAndPassword': {
        if (userCredentials?.email && userCredentials.password) {
          const result = await signInUserWithEmailAndPassword(userCredentials);
          user = result.user;
        }
        break;
      }
      default:
    }

    // create user if the user doesn\'t exists
    if (user && user.email !== null) {
      const userName = user.displayName ?? user.email?.split('@')[0];
      await createUser({ ...user, email: user.email, userName });
    }
  } catch (err: any) {
    error = getFireBaseErrorMessage(err);
  }
  return { user, error };
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (
  callback: NextOrObserver<User | null>,
  errorCallback: any,
) => {
  return onAuthStateChanged(auth, callback, errorCallback);
};

export const getFireBaseErrorMessage = (error: FirebaseError) => {
  let errorMessage = '';

  switch (error.code) {
    case 'auth/user-not-found':
      errorMessage = 'User not found';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Invalid email or password';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'A user with the same email already exists';
      break;

    default:
      errorMessage = 'An error occured, please try again.';
      break;
  }

  return errorMessage;
};
