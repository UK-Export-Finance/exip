import improveService from './improve-service';
import otherComments from './other-comments';
import { ValidationErrors } from '../../../../../../../types';

const rules = [improveService, otherComments] as Array<() => ValidationErrors>;

export default rules;
