import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field as fieldSelector } from '../../pages/shared';

const { CURRENCY: { CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitTurnoverCurrencyForm
 * complete and submit the "turnover currency" form.
 */
const completeAndSubmitTurnoverCurrencyForm = () => {
  fieldSelector(CURRENCY_CODE).input().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitTurnoverCurrencyForm;
