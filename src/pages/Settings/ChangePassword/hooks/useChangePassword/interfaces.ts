export interface UseChangePasswordResult {
  changePassword: (body: ChangePasswordBody) => void;
  isLoading: boolean;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}
