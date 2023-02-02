import estimatedAnnualTurnover from './estimated-annual-turnover';
import { ValidationErrors } from '../../../../../../../types';

const rules = [estimatedAnnualTurnover] as Array<() => ValidationErrors>;

export default rules;
