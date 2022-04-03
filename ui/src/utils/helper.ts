import { UserSignupDto } from './../types/user';
export function uniqueId() {
  return Date.now().toString();
}

export function checkEmailValidity(email: string) {
  if (email === '') {
    return { field: 'email', error: 'Email field can not be blank' };
  }
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = reg.test(email);

  if (!isValidEmail) {
    return { field: 'email', error: 'Please enter a valid email' };
  }
}

export function validateUserCredentials(
  user: Pick<UserSignupDto, 'email' | 'password'>,
) {
  const { email, password } = user;

  const error = checkEmailValidity(email);
  if (error) {
    return error;
  }

  if (password === '' || password.length < 6) {
    return {
      field: 'password',
      error: 'password field can not be blank or less than 6 characters',
    };
  }
}
