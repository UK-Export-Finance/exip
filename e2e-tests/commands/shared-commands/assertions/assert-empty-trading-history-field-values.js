import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

/**
 * assertEmptyTradingHistoryFieldValues
 * Assert all field values in the "trading history" form are empty.
 */
const assertEmptyTradingHistoryFieldValues = () => {
  cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
  cy.clickSubmitButton();

  cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), '');
  cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), '');
};

export default assertEmptyTradingHistoryFieldValues;
