export interface SubmitHiddenButtonProps {
  onValid: (isValid: boolean) => void;
  validator: () => boolean;
}
