export interface AnalyticsCategoryRender {
  key: number;
  name: string;
  plan: number;
  fact: number;
  diff: {
    value: number;
    isPositive: boolean;
  };
}
