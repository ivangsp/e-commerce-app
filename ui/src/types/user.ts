export interface BaseUser {
  email: string;
}

export interface User {
  uid: string;
  accessToken?: string;
  email: string | null;
  displayName?: string | null;
}

export interface UserCreateDto extends BaseUser {
  userName: string | null;
  password: string;
  confirmPassword: string;
}

export interface CreateUserUsingAuthProviderDto extends BaseUser {
  userName: string | null;
  uid: string;
}
