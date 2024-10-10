import { field } from '../../../pages/shared';
import FIELD_IDS from '../../../constants/field-ids/insurance/policy';

const {
  CONTRACT_POLICY: { REQUESTED_START_DATE },
} = FIELD_IDS;

/**
 * assertEmptyRequestedStartDateFieldValues
 * Assert all REQUESTED_START_DATE field values are empty.
 */
const assertEmptyRequestedStartDateFieldValues = () => {
  const selector = field(REQUESTED_START_DATE);

  cy.checkDateFieldValues({ selector });
};

export default assertEmptyRequestedStartDateFieldValues;
