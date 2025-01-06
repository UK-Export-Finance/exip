import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { SYMBOLS, USD } from '../../../../../../fixtures/currencies';

const {
  ROOT,
  YOUR_BUYER: { OUTSTANDING_OR_OVERDUE_PAYMENTS },
} = INSURANCE_ROUTES;

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const currencyName = USD.name;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Outstanding or overdue payments - Non-GBP (supported) currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`;

      cy.completeAndSubmitYourBuyerForms({
        stopSubmittingAfter: 'currencyOfLatePayments',
        outstandingPayments: true,
        exporterHasTradedWithBuyer: true,
        isoCode: USD.isoCode,
      });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(TOTAL_OUTSTANDING_PAYMENTS, () => {
      it('should render a label with the non-GBP currency', () => {
        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS[TOTAL_OUTSTANDING_PAYMENTS].LABEL,
          currencyName,
          selector: field(TOTAL_OUTSTANDING_PAYMENTS).label(),
        });
      });

      it('should render a prefix', () => {
        cy.assertPrefix({ fieldId: TOTAL_OUTSTANDING_PAYMENTS, value: SYMBOLS.USD });
      });
    });

    describe(TOTAL_AMOUNT_OVERDUE, () => {
      it('should render a label with the non-GBP currency', () => {
        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS[TOTAL_AMOUNT_OVERDUE].LABEL,
          currencyName,
          selector: field(TOTAL_AMOUNT_OVERDUE).label(),
        });
      });

      it('should render a prefix', () => {
        cy.assertPrefix({ fieldId: TOTAL_AMOUNT_OVERDUE, value: SYMBOLS.USD });
      });
    });
  });
});
