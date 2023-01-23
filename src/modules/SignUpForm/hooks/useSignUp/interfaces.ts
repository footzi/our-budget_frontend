import { Tokens, User } from '@/interfaces';

export interface UseSignUpQueryData {
  user: User;
  tokens: Tokens;
}

export interface SignUpBody {
  login: string;
  password: string;
  password2: string;
  firstName: string;
  agreements: boolean;
}
