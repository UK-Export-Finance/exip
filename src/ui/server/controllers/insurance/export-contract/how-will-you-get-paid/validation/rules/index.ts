import paymentTermsDescription from './payment-terms-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [paymentTermsDescription] as Array<() => ValidationErrors>;

export default rules;
