import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { NON_STANDARD_CURRENCY_NAME } from '../../../../../../fixtures/currencies';

const {
  ROOT,
  YOUR_BUYER: { OUTSTANDING_OR_OVERDUE_PAYMENTS },
} = INSURANCE_ROUTES;

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const currencyName = NON_STANDARD_CURRENCY_NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Outstanding or overdue payments - Alternative currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`;

      cy.completeAndSubmitYourBuyerForms({
        formToStopAt: 'currencyOfLatePayments',
        outstandingPayments: true,
        exporterHasTradedWithBuyer: true,
        alternativeCurrency: true,
        clickAlternativeCurrencyLink: false,
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
      it('should render a label with the alternative currency', () => {
        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS[TOTAL_OUTSTANDING_PAYMENTS].LABEL,
          currencyName,
          selector: field(TOTAL_OUTSTANDING_PAYMENTS).label(),
        });
      });

      it('should NOT render a prefix', () => {
        field(TOTAL_OUTSTANDING_PAYMENTS).prefix().should('not.exist');
      });
    });

    describe(TOTAL_AMOUNT_OVERDUE, () => {
      it('should render a label with the alternative currency', () => {
        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS[TOTAL_AMOUNT_OVERDUE].LABEL,
          currencyName,
          selector: field(TOTAL_AMOUNT_OVERDUE).label(),
        });
      });

      it('should NOT render a prefix', () => {
        field(TOTAL_AMOUNT_OVERDUE).prefix().should('not.exist');
      });
    });
  });
});
