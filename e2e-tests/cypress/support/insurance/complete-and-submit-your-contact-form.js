import { FIELD_IDS } from '../../../constants';
import { yourContactPage } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import application from '../../fixtures/application';

const {
  CONTACT: {
    POSITION,
    BUSINESS_CONTACT_DETAIL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = FIELD_IDS.INSURANCE;

const businessContactDetails = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL];

const completeAndSubmitYourContact = ({
  firstName = businessContactDetails[FIRST_NAME],
  lastName = businessContactDetails[LAST_NAME],
}) => {
  cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), firstName);
  cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), lastName);
  cy.keyboardInput(yourContactPage.field(EMAIL).input(), businessContactDetails[EMAIL]);
  cy.keyboardInput(yourContactPage.field(POSITION).input(), businessContactDetails[POSITION]);

  submitButton().click();
};

export default completeAndSubmitYourContact;
