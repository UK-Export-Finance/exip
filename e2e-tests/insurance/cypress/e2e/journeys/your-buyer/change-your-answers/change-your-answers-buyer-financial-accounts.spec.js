import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';

const {
  YOUR_BUYER: {
    HAS_BUYER_FINANCIAL_ACCOUNTS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    BUYER_FINANCIAL_INFORMATION_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

context('Insurance - Your buyer - Change your answers - Buyer financial accounts - As an exporter, I want to change my answers to the buyer financial accounts section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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
});
