export interface UseUpdateExpenseBody {
  id: number;
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UseUpdateExpenseResult {
  isLoading: boolean;
  update: (body: UseUpdateExpenseBody) => void;
}
