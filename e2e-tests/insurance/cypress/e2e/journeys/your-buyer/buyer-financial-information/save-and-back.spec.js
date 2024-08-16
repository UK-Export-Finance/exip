import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  YOUR_BUYER: { BUYER_FINANCIAL_INFORMATION },
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Buyer financial information - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'tradedWithBuyer' });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });
  });

  describe('when submitting a fully filled form', () => {
    describe('when submitting as "no"', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeBuyerFinancialInformationForm({});

        cy.clickSaveAndBackButton();
      });

      it('should redirect to `all sections`', () => {
        cy.assertAllSectionsUrl(referenceNumber);
      });

      it('should retain the `your buyer` task status as `completed`', () => {
        cy.checkTaskBuyerStatusIsComplete();
      });

      it('should retain all inputs on the page', () => {
        // get to form
        cy.navigateToUrl(url);

        cy.assertNoRadioOptionIsChecked();
      });
    });

    describe('when submitting as "yes"', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts: true });

        cy.clickSaveAndBackButton();
      });

      it('should redirect to `all sections`', () => {
        cy.assertAllSectionsUrl(referenceNumber);
      });

      it('should retain the `your buyer` task status as `completed`', () => {
        cy.checkTaskBuyerStatusIsComplete();
      });

      it('should retain all inputs on the page', () => {
        // get to form
        cy.navigateToUrl(url);

        cy.assertYesRadioOptionIsChecked();
      });
    });
  });
});
