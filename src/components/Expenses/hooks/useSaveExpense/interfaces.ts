export interface UseSaveExpenseBody {
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UseSaveExpenseResult {
  isLoading: boolean;
  save: (body: UseSaveExpenseBody) => void;
}
