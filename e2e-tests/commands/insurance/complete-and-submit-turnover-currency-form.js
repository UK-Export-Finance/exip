import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import { EUR_CURRENCY_CODE } from '../../fixtures/currencies';

const { CURRENCY: { CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitTurnoverCurrencyForm
 * complete and submit the "turnover currency" form.
 */
const completeAndSubmitTurnoverCurrencyForm = () => {
  field(`${CURRENCY_CODE}-${EUR_CURRENCY_CODE}`).input().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitTurnoverCurrencyForm;
