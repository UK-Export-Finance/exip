import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ACCOUNT: { CREATE, CREATE_ROOT, PASSWORD_RESET, PASSWORD_RESET_ROOT, SIGN_IN_ROOT },
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Redirects - `insurance` account URLs should redirect to the `apply` equivalent URL', () => {
  describe(`/insurance${CREATE_ROOT}`, () => {
    it(`should redirect to ${CREATE_ROOT}`, () => {
      cy.navigateToUrl(`/insurance${CREATE_ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}${CREATE_ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance${CREATE.ROOT}/your-details`, () => {
    it(`should redirect to ${CREATE.YOUR_DETAILS}`, () => {
      cy.navigateToUrl(`/insurance${CREATE_ROOT}/your-details`);

      const expectedUrl = `${baseUrl}${CREATE.YOUR_DETAILS}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance${SIGN_IN_ROOT}`, () => {
    it(`should redirect to ${SIGN_IN_ROOT}`, () => {
      cy.navigateToUrl(`/insurance${SIGN_IN_ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}${SIGN_IN_ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance${PASSWORD_RESET_ROOT}`, () => {
    it(`should redirect to ${PASSWORD_RESET_ROOT}`, () => {
      cy.navigateToUrl(`/insurance${PASSWORD_RESET_ROOT}`);

      const expectedUrl = `${baseUrl}${ROOT}${PASSWORD_RESET_ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`/insurance${PASSWORD_RESET_ROOT}/link-sent`, () => {
    it(`should redirect to ${PASSWORD_RESET.LINK_SENT}`, () => {
      cy.navigateToUrl(`/insurance${PASSWORD_RESET_ROOT}/link-sent`);

      const expectedUrl = `${baseUrl}${PASSWORD_RESET.LINK_SENT}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
