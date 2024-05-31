import { field } from '../../../pages/shared';
import FIELD_IDS from '../../../constants/field-ids/insurance/policy';

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE },
  },
} = FIELD_IDS;

/**
 * assertEmptyContractCompletionDateFieldValues
 * Assert all CONTRACT_COMPLETION_DATE field values are empty.
 */
const assertEmptyContractCompletionDateFieldValues = () => {
  field(CONTRACT_COMPLETION_DATE).dayInput().should('have.value', '');
  field(CONTRACT_COMPLETION_DATE).monthInput().should('have.value', '');
  field(CONTRACT_COMPLETION_DATE).yearInput().should('have.value', '');
};

export default assertEmptyContractCompletionDateFieldValues;
