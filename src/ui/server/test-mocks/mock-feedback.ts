import { FIELD_IDS } from '../constants/field-ids';
import { SERVICE_NAME, APPLY } from '../constants';

const { SATISFACTION, IMPROVEMENT, OTHER_COMMENTS, SERVICE, PRODUCT } = FIELD_IDS.FEEDBACK;

export const mockInsuranceFeedback = {
  [SATISFACTION]: '',
  [IMPROVEMENT]: 'test',
  [OTHER_COMMENTS]: '',
  [SERVICE]: APPLY,
  [PRODUCT]: SERVICE_NAME,
};
