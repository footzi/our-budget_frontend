import { User } from '@/interfaces';

export interface ContentProps {
  logout: () => void;
  isLoading: boolean;
  user: User;
}
