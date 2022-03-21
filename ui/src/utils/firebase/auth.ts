import { User, UserCreateDto } from './../../types/user';
import { CreateUserUsingAuthProviderDto } from './../../types/user';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

const providers = new GoogleAuthProvider();
providers.setCustomParameters({
  prompt: 'select_account',
});

export type AuthProviders = 'googlePopup' | 'emailAndPassword';

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
  const { user } = await signInWithPopup(auth, providers);
  return user;
};

export const db = getFirestore();

export const createUserFromAuth = async (
  user: CreateUserUsingAuthProviderDto,
) => {
  const userDocRef = doc(db, 'users', user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { userName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        userName,
        email,
        createdAt,
      });
    } catch (error: any) {
      console.log('error creating the user', error?.message);
    }
  }

  return userDocRef;
};

export const createUserUsingEmailAndPassword = async (
  userData: UserCreateDto,
) => {
  const { email, password, userName } = userData;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await createUserFromAuth({ email, userName, uid: user.uid });
    return { user };
  } catch (err: any) {
    return { error: getFireBaseErrorMessage(err) };
  }
};

export async function signInUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  let user: User | null = null;
  let error = '';

  await signInWithEmailAndPassword(auth, email, password)
    .then(response => {
      user = response.user;
    })
    .catch((err: FirebaseError) => {
      error = getFireBaseErrorMessage(err);
    });

  return { user, error };
}

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
