import totalSalesToBuyerRules from './total-sales-to-buyer';
import maximumBuyerWillOweRules from './maximum-buyer-will-owe';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [totalSalesToBuyerRules, maximumBuyerWillOweRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
