import { AddPlanBody } from '../../interfaces';

export interface UseAddPlanResult {
  isLoading: boolean;
  add: (body: AddPlanBody) => void;
}
