import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  NO_ACCESS_TO_APPLICATION,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - no access to application page - Abandoned application', () => {
  let refNumber;
  let applicationUrl;

  before(() => {
    cy.saveSession();

    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createAnAbandonedApplication(accountId).then((createdApplication) => {
        applicationUrl = `${baseUrl}${ROOT}/${createdApplication.referenceNumber}${ALL_SECTIONS}`;
        refNumber = createdApplication.referenceNumber;
      });
    });
  });

  after(() => {
    cy.deleteApplication(refNumber);
  });

  describe('when trying to access an Abandoned application', () => {
    beforeEach(() => {
      cy.navigateToUrl(applicationUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, () => {
      const expectedUrl = `${baseUrl}${NO_ACCESS_TO_APPLICATION}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
