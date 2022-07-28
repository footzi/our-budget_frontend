export interface AnalyticsSavingRender {
  key: number;
  name: string;
  income: number;
  expense: number;
  diff: {
    value: number;
    isPositive: boolean;
  };
}

export interface AnalyticsSavingTotal {
  income: number;
  expense: number;
  diff: {
    value: number;
    isPositive: boolean;
  };
}
