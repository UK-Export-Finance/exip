import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

context('Insurance - application submitted page - visit directly without a completed application', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      const url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${ALL_SECTIONS}`, () => {
    const url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

    cy.url().should('eq', url);
  });
});
