import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { ROOT: INSURANCE_ROOT, APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - application submitted page - visit directly without a completed application', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      const url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should redirect to `all sections`', () => {
    cy.assertAllSectionsUrl(referenceNumber);
  });
});
