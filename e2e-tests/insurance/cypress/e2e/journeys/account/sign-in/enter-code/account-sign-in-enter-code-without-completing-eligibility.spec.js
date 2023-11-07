import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS },
    SIGN_IN: { ENTER_CODE },
  },
  DASHBOARD,
} = ROUTES;

context('Insurance - Account - Sign in - Enter code - without completing eligibility', () => {
  const enterCodeUrl = `${Cypress.config('baseUrl')}${ENTER_CODE}`;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(YOUR_DETAILS);

    cy.completeAndSubmitCreateAccountForm();

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm({});
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(enterCodeUrl);
  });

  describe('when submitting a valid security code', () => {
    let validSecurityCode;

    before(() => {
      cy.navigateToUrl(enterCodeUrl);

      // create and get an OTP for the exporter's account
      cy.accountAddAndGetOTP().then((securityCode) => {
        validSecurityCode = securityCode;
      });
    });

    it(`should redirect to ${DASHBOARD}`, () => {
      cy.completeAndSubmitEnterCodeAccountForm(validSecurityCode);

      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
