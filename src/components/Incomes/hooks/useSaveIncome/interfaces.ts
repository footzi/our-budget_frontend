export interface UseSaveIncomeBody {
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UseSaveIncomeResult {
  isLoading: boolean;
  save: (body: UseSaveIncomeBody) => void;
}
