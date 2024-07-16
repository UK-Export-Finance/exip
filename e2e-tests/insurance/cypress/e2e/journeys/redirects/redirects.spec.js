import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  MVP_INSURANCE_ROOT,
  ROOT,
  START_ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const checkIfEligibleUrl = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

context(`Insurance - Redirects - '${MVP_INSURANCE_ROOT}' URLs should redirect to the '${ROOT}' equivalent URL`, () => {
  describe(`${MVP_INSURANCE_ROOT}${START_ROOT}`, () => {
    it(`should redirect to ${MVP_INSURANCE_ROOT}${START_ROOT}`, () => {
      cy.navigateToUrl(`${MVP_INSURANCE_ROOT}${START_ROOT}`);

      cy.assertUrl(checkIfEligibleUrl);
    });
  });

  describe(`${MVP_INSURANCE_ROOT}/eligibility/check-if-eligible`, () => {
    it(`should redirect to ${CHECK_IF_ELIGIBLE}`, () => {
      cy.navigateToUrl('/insurance/eligibility/check-if-eligible');

      cy.assertUrl(checkIfEligibleUrl);
    });
  });
});
