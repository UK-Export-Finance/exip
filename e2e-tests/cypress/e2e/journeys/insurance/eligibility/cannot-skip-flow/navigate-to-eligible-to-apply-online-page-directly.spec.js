import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { ELIGIBLE_TO_APPLY_ONLINE, NEED_TO_START_AGAIN },
} = INSURANCE_ROUTES;

context('Manually going to the `Eligible to apply online` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ELIGIBLE_TO_APPLY_ONLINE);
  });

  it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
    cy.assertUrl(NEED_TO_START_AGAIN);
  });
});
