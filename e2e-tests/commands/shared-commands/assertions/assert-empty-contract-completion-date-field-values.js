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
  const selector = field(CONTRACT_COMPLETION_DATE);

  cy.checkDateFieldValues({ selector });
};

export default assertEmptyContractCompletionDateFieldValues;
