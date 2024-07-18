import dashboardPage from '../../../../../pages/insurance/dashboard';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { table } = dashboardPage;

const { DASHBOARD } = INSURANCE_ROUTES;

context('Insurance - Dashboard - new application', () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${DASHBOARD}`;

      cy.clickHeaderApplicationsLink();

      cy.assertUrl(url);

      cy.assertLength(table.body.rows(), 1);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when starting and completing insurance eligibility via the `start new` button ', () => {
    let secondReferenceNumber;

    before(() => {
      dashboardPage.startNewApplicationButton().click();

      cy.submitInsuranceEligibilityAnswersFromExporterLocationHappyPath({});

      // get the reference number and check we're on the "all sections" and not the "do you have an account" page
      cy.getReferenceNumber().then((refNumber) => {
        referenceNumber = refNumber;

        cy.assertAllSectionsUrl(referenceNumber);
      });
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickHeaderApplicationsLink();
    });

    after(() => {
      cy.deleteApplication(secondReferenceNumber);
    });

    it('should render the newly created application and the previously created application', () => {
      cy.assertLength(table.body.rows(), 2);
    });

    it('should order the applications in descending order', () => {
      let firstReferenceNumber;
      let lastReferenceNumber;

      table.body.firstRow
        .referenceNumber()
        .invoke('text')
        .then((text) => {
          firstReferenceNumber = Number(text);
        });

      table.body.lastRow
        .referenceNumber()
        .invoke('text')
        .then((text) => {
          lastReferenceNumber = Number(text);

          expect(firstReferenceNumber).to.be.greaterThan(lastReferenceNumber);
        });
    });
  });
});
