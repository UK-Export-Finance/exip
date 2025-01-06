import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

/**
 * assertEmptyOverdueOrOutstandingFieldValues
 * Assert all field values in the "overdue or outstanding" form are empty.
 */
const assertEmptyOverdueOrOutstandingFieldValues = () => {
  cy.assertEmptyFieldValue(TOTAL_AMOUNT_OVERDUE);
  cy.assertEmptyFieldValue(TOTAL_OUTSTANDING_PAYMENTS);
};

export default assertEmptyOverdueOrOutstandingFieldValues;
