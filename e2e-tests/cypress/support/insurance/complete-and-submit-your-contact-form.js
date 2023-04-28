import { FIELD_IDS } from '../../../constants';
import { yourContactPage } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import account from '../../fixtures/account';

const {
  CONTACT: {
    POSITION,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = FIELD_IDS.INSURANCE;

export default () => {
  // TODO: EMS:1513 - change to fixtures and constants on saving PR
  cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), 'test');
  cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), 'test');
  cy.keyboardInput(yourContactPage.field(EMAIL).input(), account[EMAIL]);
  cy.keyboardInput(yourContactPage.field(POSITION).input(), 'test');

  submitButton().click();
};
