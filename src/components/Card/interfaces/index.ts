import { Category, Expense } from '@/interfaces';

export interface CardProps {
  title: string;
  list: Expense[];
  categories: Category[];
  total: number;
  isLoadingSave: boolean;
  onSave: (categoryId: string, value: number) => void;
}
