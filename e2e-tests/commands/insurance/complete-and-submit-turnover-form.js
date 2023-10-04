import { FIELD_IDS } from '../../constants';
import { field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
  cy.keyboardInput(field(PERCENTAGE_TURNOVER).input(), application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

  submitButton().click();
};
