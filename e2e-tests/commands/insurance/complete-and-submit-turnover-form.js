import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitTurnoverForm
 * complete and submit the "turnover" form.
 * @param {Boolean} alternativeCurrencyTurnover: Select the "alternative currency" option
 */
const completeAndSubmitTurnoverForm = ({ alternativeCurrencyTurnover = false }) => {
  if (alternativeCurrencyTurnover) {
    cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });
  }

  cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
  cy.keyboardInput(field(PERCENTAGE_TURNOVER).input(), application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

  cy.clickSubmitButton();
};

export default completeAndSubmitTurnoverForm;
