import { saveAndBackButton, field } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const {
  YOUR_BUYER: { OUTSTANDING_OR_OVERDUE_PAYMENTS },
  ROOT,
} = INSURANCE_ROUTES;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Outstanding or overdue payments - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`;

      cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'currencyOfLatePayments', outstandingPayments: true, exporterHasTradedWithBuyer: true });

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

      saveAndBackButton().click();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });
  });

  describe('when submitting a partially filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(TOTAL_OUTSTANDING_PAYMENTS).input(), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);

      saveAndBackButton().click();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain completed input on the page', () => {
      cy.navigateToUrl(url);

      cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitOutstandingOrOverduePaymentsForm({});

      saveAndBackButton().click();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain all inputs on the page', () => {
      cy.navigateToUrl(url);

      cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);
      cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), BUYER[TOTAL_AMOUNT_OVERDUE]);
    });
  });
});
