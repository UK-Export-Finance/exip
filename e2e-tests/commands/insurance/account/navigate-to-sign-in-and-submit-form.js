import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const {
  SIGN_IN: { ROOT: SIGN_IN_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

/**
 * navigateToSignInAndSubmitForm
 * 1) Navigate to the sign in form.
 * 2) Complete and submit the form.
 */
const navigateToSignInAndSubmitForm = () => {
  cy.navigateToUrl(signInUrl);

  cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });
};

export default navigateToSignInAndSubmitForm;
