import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const {
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
} = FIELD_IDS;

/**
 * assertEmptyTradingHistoryFieldValues
 * Assert all field values in the "trading history" form are empty.
 */
const assertEmptyTradingHistoryFieldValues = () => {
  cy.assertNoRadioOptionIsNotChecked(0);
  cy.assertYesRadioOptionIsNotChecked(0);

  cy.assertNoRadioOptionIsNotChecked(1);
  cy.assertYesRadioOptionIsNotChecked(1);

  cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), '');
  cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), '');
};

export default assertEmptyTradingHistoryFieldValues;
