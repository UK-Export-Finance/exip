import paymentTermsDescription from './declined-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [paymentTermsDescription] as Array<() => ValidationErrors>;

export default rules;
