export interface BaseUser {
  email: string;
}

export interface User {
  uid: string;
  accessToken?: string;
  email: string | null;
  displayName?: string | null;
}

export interface UserSignupDto extends BaseUser {
  password: string;
  confirmPassword: string;
  displayName?: string | null;
}

export interface CreateUserDto extends BaseUser {
  userName?: string | null;
  uid: string;
}
