import { FIELD_IDS } from '../../constants';
import { field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  cy.keyboardInput(field(GOODS_OR_SERVICES).textarea(), application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
  cy.keyboardInput(field(YEARS_EXPORTING).input(), application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
  cy.keyboardInput(field(EMPLOYEES_UK).input(), application.EXPORTER_BUSINESS[EMPLOYEES_UK]);

  submitButton().click();
};
