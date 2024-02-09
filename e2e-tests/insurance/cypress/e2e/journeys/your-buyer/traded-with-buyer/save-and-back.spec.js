import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: {
    TRADED_WITH_BUYER,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Working with buyer - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`;

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
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `completed`', () => {
      cy.checkTaskBuyerStatusIsComplete();
    });

    it('should retain all inputs on the page', () => {
      cy.startInsuranceYourBuyerSection({});

      // submit button to get to working with buyer page
      cy.clickSubmitButton();
      // submit connectionToBuyer form to get to working with buyer page
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      cy.assertYesRadioOptionIsChecked();
    });
  });
});
