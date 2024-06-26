import { field, submitButton } from '../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import mockAccount from '../../../fixtures/account';

const {
  ACCOUNT: {
    PASSWORD_RESET: { LINK_SENT },
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const linkSentUrl = `${Cypress.config('baseUrl')}${LINK_SENT}`;

/**
 * completeAndSubmitPasswordResetForm
 * @param {Object} Object with flags on how to complete password reset form.
 */
const completeAndSubmitPasswordResetForm = ({ assertRedirectUrl = true }) => {
  cy.keyboardInput(field(EMAIL).input(), mockAccount[EMAIL]);

  submitButton().click();

  if (assertRedirectUrl) {
    cy.assertUrl(linkSentUrl);
  }
};

export default completeAndSubmitPasswordResetForm;
