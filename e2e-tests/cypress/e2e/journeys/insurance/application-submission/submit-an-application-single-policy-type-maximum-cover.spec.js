import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

context('Insurance - submit an application single policy type - As an Exporter, I want to submit my completed export insurance application with the maximum value of 500000, So that UKEF can process and make a decision on my application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyAndExportsMaximumValue: true,
    }).then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

    cy.url().should('eq', expectedUrl);
  });
});
