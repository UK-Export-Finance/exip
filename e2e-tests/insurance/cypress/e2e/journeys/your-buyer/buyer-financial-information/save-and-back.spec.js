import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  YOUR_BUYER: { BUYER_FINANCIAL_INFORMATION },
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Buyer financial information - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
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

      it(`should redirect to ${ALL_SECTIONS}`, () => {
        cy.assertUrl(allSectionsUrl);
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

      it(`should redirect to ${ALL_SECTIONS}`, () => {
        cy.assertUrl(allSectionsUrl);
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
