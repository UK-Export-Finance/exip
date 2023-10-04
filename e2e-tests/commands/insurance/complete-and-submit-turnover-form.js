import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    TURNOVER: {
      ESTIMATED_ANNUAL_TURNOVER,
      PERCENTAGE_TURNOVER,
    },
  },
} = INSURANCE_FIELD_IDS;

export default () => {
  cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
  cy.keyboardInput(field(PERCENTAGE_TURNOVER).input(), application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

  submitButton().click();
};
