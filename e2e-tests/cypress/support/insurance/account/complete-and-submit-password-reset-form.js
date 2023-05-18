import { submitButton } from '../../../e2e/pages/shared';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';
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

const completeAndSubmitPasswordResetForm = ({ assertRedirectUrl = true }) => {
  cy.keyboardInput(accountFormFields[EMAIL].input(), mockAccount[EMAIL]);

  submitButton().click();

  if (assertRedirectUrl) {
    cy.url().should('eq', linkSentUrl);
  }
};

export default completeAndSubmitPasswordResetForm;
