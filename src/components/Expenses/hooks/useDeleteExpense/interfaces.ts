export interface UseDeleteExpenseResult {
  isLoading: boolean;
  delete: (id: number) => void;
}
