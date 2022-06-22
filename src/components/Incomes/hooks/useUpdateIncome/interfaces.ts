export interface UseUpdateIncomeBody {
  id: number;
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UseUpdateIncomeResult {
  isLoading: boolean;
  update: (body: UseUpdateIncomeBody) => void;
}
