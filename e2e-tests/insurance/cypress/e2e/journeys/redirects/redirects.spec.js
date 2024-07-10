import { LINKS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { EXTERNAL } = LINKS;

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Redirects - `insurance` URLs should redirect to the `apply` equivalent URL', () => {
  describe('/insurance/start', () => {
    it(`should redirect to ${EXTERNAL.FULL_APPLICATION}`, () => {
      cy.navigateToUrl('/insurance/start');

      cy.assertUrl(EXTERNAL.FULL_APPLICATION);
    });
  });

  describe('/insurance/eligibility/check-if-eligible', () => {
    it(`should redirect to ${CHECK_IF_ELIGIBLE}`, () => {
      cy.navigateToUrl('/insurance/eligibility/check-if-eligible');

      const expectedUrl = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
