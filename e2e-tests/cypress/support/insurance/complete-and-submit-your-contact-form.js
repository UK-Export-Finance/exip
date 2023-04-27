import { FIELD_IDS } from '../../../constants';
import { yourContactPage } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';

const {
  CONTACT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL_ADDRESS,
    POSITION,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  // TODO: change to fixtures and constants on saving PR
  cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), 'test');
  cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), 'test');
  cy.keyboardInput(yourContactPage.field(EMAIL_ADDRESS).input(), 'test@test.com');
  cy.keyboardInput(yourContactPage.field(POSITION).input(), 'test');

  submitButton().click();
};
