import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';

const { HAS_BUYER_FINANCIAL_ACCOUNTS } = YOUR_BUYER_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: { BUYER_FINANCIAL_INFORMATION_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Change your answers - Buyer financial accounts - As an exporter, I want to change my answers to the buyer financial accounts section',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeUpToSpecifiedYourBuyerSectionAnswers({ section: 'buyerFinancialInformation' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(HAS_BUYER_FINANCIAL_ACCOUNTS, () => {
      const fieldId = HAS_BUYER_FINANCIAL_ACCOUNTS;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${BUYER_FINANCIAL_INFORMATION_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: BUYER_FINANCIAL_INFORMATION_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts: true });
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
        });
      });
    });
  },
);
