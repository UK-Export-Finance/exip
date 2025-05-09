import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { ELIGIBLE_TO_APPLY_ONLINE, NEED_TO_START_AGAIN_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - You are eligible to apply online page - user signed in, no eligibility answers', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(() => {
      // visit the page directly without completing eligibility
      cy.navigateToUrl(ELIGIBLE_TO_APPLY_ONLINE);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);

    cy.deleteAccount();
  });

  it(`should redirect to ${NEED_TO_START_AGAIN_EXIT}`, () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN_EXIT}`;

    cy.assertUrl(expectedUrl);
  });
});
