import { broker } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import { FIELD_IDS } from '../../../constants';
import application from '../../fixtures/application';

const {
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    EMAIL,
    POSTCODE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  broker[USING_BROKER].yesRadioInput().click();
  cy.keyboardInput(broker[NAME].input(), application.EXPORTER_BROKER[NAME]);
  cy.keyboardInput(broker[ADDRESS_LINE_1].input(), application.EXPORTER_BROKER[ADDRESS_LINE_1]);
  cy.keyboardInput(broker[ADDRESS_LINE_2].input(), application.EXPORTER_BROKER[ADDRESS_LINE_2]);
  cy.keyboardInput(broker[TOWN].input(), application.EXPORTER_BROKER[TOWN]);
  cy.keyboardInput(broker[COUNTY].input(), application.EXPORTER_BROKER[COUNTY]);
  cy.keyboardInput(broker[EMAIL].input(), application.EXPORTER_BROKER[EMAIL]);
  cy.keyboardInput(broker[POSTCODE].input(), application.EXPORTER_BROKER[POSTCODE]);

  submitButton().click();
};
