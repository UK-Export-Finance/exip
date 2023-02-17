import { FIELD_IDS } from '../../../constants';
import { natureOfBusiness } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import application from '../../fixtures/application';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
    EMPLOYEES_INTERNATIONAL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  cy.keyboardInput(natureOfBusiness[GOODS_OR_SERVICES].input(), application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
  cy.keyboardInput(natureOfBusiness[YEARS_EXPORTING].input(), application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
  cy.keyboardInput(natureOfBusiness[EMPLOYEES_UK].input(), application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
  cy.keyboardInput(natureOfBusiness[EMPLOYEES_INTERNATIONAL].input(), application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);

  submitButton().click();
};
