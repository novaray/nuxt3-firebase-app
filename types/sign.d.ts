export interface SignUp {
  email: string;
  password: string;
}

export interface SignIn extends Omit<SignUp, 'nickname'> {}
