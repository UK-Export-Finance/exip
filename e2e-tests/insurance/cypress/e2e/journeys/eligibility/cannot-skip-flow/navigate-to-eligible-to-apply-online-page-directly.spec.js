import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { ELIGIBLE_TO_APPLY_ONLINE, NEED_TO_START_AGAIN_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Eligible to apply online` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ELIGIBLE_TO_APPLY_ONLINE);
  });

  it(`should redirect to ${NEED_TO_START_AGAIN_EXIT}`, () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN_EXIT}`;

    cy.assertUrl(expectedUrl);
  });
});
