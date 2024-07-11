import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SUSPENDED: { EMAIL_SENT },
  },
} = ROUTES;

context('Insurance - Account - Create account - Create an account which already exists and is blocked', () => {
  const baseUrl = Cypress.config('baseUrl');
  const emailSentUrl = `${baseUrl}${EMAIL_SENT}`;

  after(() => {
    cy.deleteAccount();
  });

  beforeEach(() => {
    cy.createAnAccountAndBecomeBlocked({});

    cy.navigateToCheckIfEligibleUrl();
  });

  it(`should redirect to ${emailSentUrl} when creating an account which already exists and is blocked`, () => {
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.assertUrl(emailSentUrl);
  });
});
