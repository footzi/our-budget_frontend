import { UpdatePlanBody } from '../../interfaces';

export interface UseUpdatePlanResult {
  isLoading: boolean;
  update: (body: UpdatePlanBody) => void;
}
