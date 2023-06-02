import descriptionRules from './description';
import finalDestinationRules from './final-destination';
import { ValidationErrors } from '../../../../../../../types';

const rules = [descriptionRules, finalDestinationRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
