import descriptionRules from './description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [descriptionRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
