import notFound from './notFound';
import { ValidationErrors } from '../../../../../../types';

const rules = [notFound] as Array<() => ValidationErrors>;

export default rules;
