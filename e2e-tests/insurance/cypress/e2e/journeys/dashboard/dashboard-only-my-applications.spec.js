import dashboardPage from '../../../../../pages/insurance/dashboard';
import { header } from '../../../../../partials';
import { ROUTES } from '../../../../../constants';

const { table } = dashboardPage;

const { DASHBOARD } = ROUTES.INSURANCE;

const firstAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
const secondAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

const accountEmails = [firstAccountEmail, secondAccountEmail];

context(
  "Insurance - Dashboard - As an Exporter, I want to access only my UKEF credit insurance application from my dashboard, So that I do not have access to another exporter's application",
  () => {
    const baseUrl = Cypress.config('baseUrl');

    let referenceNumbers;
    let firstReferenceNumber;
    const dashboardUrl = `${baseUrl}${DASHBOARD}`;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumbers = [refNumber];

        firstReferenceNumber = refNumber;

        cy.clickHeaderApplicationsLink();

        cy.assertUrl(dashboardUrl);
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToDashboardUrl();
    });

    after(() => {
      referenceNumbers.forEach((refNumber) => {
        cy.deleteApplication(refNumber);
      });

      accountEmails.forEach((email) => {
        cy.deleteAccount(email);
      });
    });

    it('should have only one application', () => {
      cy.assertLength(table.body.rows(), 1);
    });

    it('should have the correct reference number', () => {
      const expectedReferenceNumber = String(firstReferenceNumber);

      cy.checkText(table.body.firstRow.referenceNumber(), expectedReferenceNumber);
    });

    describe('when a different exporter signs in and creates an application', () => {
      let secondReferenceNumber;

      before(() => {
        cy.saveSession();

        cy.navigateToDashboardUrl();

        // sign out of the current account
        header.navigation.signOut().click();

        // sign into a different accont
        cy.completeSignInAndGoToApplication({ email: secondAccountEmail }).then(({ referenceNumber: refNumber }) => {
          referenceNumbers = [...referenceNumbers, refNumber];

          secondReferenceNumber = refNumber;

          // go back to the dashboard
          cy.clickBackLink();
        });
      });

      describe('when visiting the dashboard', () => {
        beforeEach(() => {
          cy.saveSession();

          cy.navigateToDashboardUrl();
        });

        it('should have only one application', () => {
          cy.assertLength(table.body.rows(), 1);
        });

        it('should NOT have a reference number that equals the first application/reference number, created by a different exporter', () => {
          table.body.firstRow
            .referenceNumber()
            .invoke('text')
            .then((refNumber) => {
              expect(refNumber.trim()).to.not.equal(firstReferenceNumber);
            });
        });

        it('should have the correct reference number', () => {
          const expectedReferenceNumber = String(secondReferenceNumber);

          cy.checkText(table.body.firstRow.referenceNumber(), expectedReferenceNumber);
        });
      });
    });
  },
);
