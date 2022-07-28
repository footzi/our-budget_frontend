import { AnalyticsSavingRender, AnalyticsSavingTotal } from '../../interfaces';

export interface UseGetSavingsAnalyticsResult {
  savings: AnalyticsSavingRender[];
  total: AnalyticsSavingTotal;
}
