import notFound from './not-found';
import { ValidationErrors } from '../../../../../../types';

const rules = [notFound] as Array<() => ValidationErrors>;

export default rules;
