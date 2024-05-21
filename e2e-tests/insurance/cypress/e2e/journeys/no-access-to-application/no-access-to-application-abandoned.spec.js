import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { APPLICATION } from '../../../../../constants/application';

const { ABANDONED } = APPLICATION.STATUS;

const {
  ROOT,
  ALL_SECTIONS,
  NO_ACCESS_TO_APPLICATION,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - no access to application page - Abandoned application - to ensure that the system should automatically marks applications as abandoned where the application has not been submitted 30 days after it was started', () => {
  let refNumber;
  let allSectionsUrl;

  before(() => {
    cy.saveSession();

    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createAnAbandonedApplication(accountId).then((createdApplication) => {
        allSectionsUrl = `${baseUrl}${ROOT}/${createdApplication.referenceNumber}${ALL_SECTIONS}`;
        refNumber = createdApplication.referenceNumber;
      });
    });
  });

  after(() => {
    cy.deleteApplication(refNumber);
  });

  describe(`when trying to access an ${ABANDONED} application`, () => {
    beforeEach(() => {
      cy.navigateToUrl(allSectionsUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, () => {
      const expectedUrl = `${baseUrl}${NO_ACCESS_TO_APPLICATION}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
