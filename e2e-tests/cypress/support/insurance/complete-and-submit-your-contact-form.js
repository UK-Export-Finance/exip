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

/**
 * completeAndSubmitYourContact
 * Runs through the exporter contact details form in the "your business" section
 * @param {Object} Object with flags on how to complete specific parts of the application
 * firstName: First name to submit in the form, defaults to test data.
 * lastName: Last name to submit in the form, defaults to test data.
 * - useDifferentContactEmail: Should submit a different email address in the "exporter contact" details form.
 */
const completeAndSubmitYourContact = ({
  firstName = businessContactDetails[FIRST_NAME],
  lastName = businessContactDetails[LAST_NAME],
  useDifferentContactEmail = false,
}) => {
  cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), firstName);
  cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), lastName);

  let email = businessContactDetails[EMAIL];

  if (useDifferentContactEmail) {
    email = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');
  }

  cy.keyboardInput(yourContactPage.field(EMAIL).input(), email);

  cy.keyboardInput(yourContactPage.field(POSITION).input(), businessContactDetails[POSITION]);

  submitButton().click();
};

export default completeAndSubmitYourContact;
