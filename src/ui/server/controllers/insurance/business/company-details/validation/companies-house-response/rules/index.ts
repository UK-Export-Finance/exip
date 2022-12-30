import notFound from './notFound';
import apiError from './apiError';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [notFound, apiError] as Array<() => ValidationErrors>;

export default rules;
