import estimatedAnnualTurnover from './estimated-annual-turnover';
import percentageTurnover from './percentage-of-turnover';
import { ValidationErrors } from '../../../../../../../types';

const rules = [estimatedAnnualTurnover, percentageTurnover] as Array<() => ValidationErrors>;

export default rules;
