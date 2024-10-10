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
  cy.checkValue(field(CONTRACT_COMPLETION_DATE).dayInput(), '');
  cy.checkValue(field(CONTRACT_COMPLETION_DATE).monthInput(), '');
  cy.checkValue(field(CONTRACT_COMPLETION_DATE).yearInput(), '');
};

export default assertEmptyContractCompletionDateFieldValues;
