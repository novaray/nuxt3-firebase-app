export interface SignUp {
  nickname: string;
  email: string;
  password: string;
}

export interface SignIn extends Omit<SignUp, 'nickname'> {}
