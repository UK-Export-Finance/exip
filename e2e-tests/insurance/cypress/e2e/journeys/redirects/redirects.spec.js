import { LINKS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { EXTERNAL } = LINKS;

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  MVP_INSURANCE_ROOT,
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Redirects - '${MVP_INSURANCE_ROOT}' URLs should redirect to the '${ROOT}' equivalent URL`, () => {
  describe(`/${MVP_INSURANCE_ROOT}/start`, () => {
    it(`should redirect to ${EXTERNAL.FULL_APPLICATION}`, () => {
      cy.navigateToUrl('/insurance/start');

      cy.assertUrl(EXTERNAL.FULL_APPLICATION);
    });
  });

  describe(`${MVP_INSURANCE_ROOT}/eligibility/check-if-eligible`, () => {
    it(`should redirect to ${CHECK_IF_ELIGIBLE}`, () => {
      cy.navigateToUrl('/insurance/eligibility/check-if-eligible');

      const expectedUrl = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
