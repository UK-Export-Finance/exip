import name from './name';
import location from './location';
import { ValidationErrors } from '../../../../../../../types';

const rules = [name, location] as Array<() => ValidationErrors>;

export default rules;
