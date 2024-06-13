import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { summaryList } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: { CREDIT_INSURANCE_COVER_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Change your answers - Credit insurance history - As an exporter, I want to change my answers to the credit insurance history section',
  () => {
    let url;
    let referenceNumber;

    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startInsuranceYourBuyerSection({});

        cy.completeAndSubmitCompanyOrOrganisationForm({});
        cy.completeAndSubmitConnectionWithTheBuyerForm({});
        cy.completeAndSubmitTradedWithBuyerForm({});
        cy.completeAndSubmitCreditInsuranceCoverForm({});
        cy.completeAndSubmitBuyerFinancialInformationForm({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(`change ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} from no to yes`, () => {
      const fieldId = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${CREDIT_INSURANCE_COVER_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CREDIT_INSURANCE_COVER_CHANGE, fieldId });
        });
      });

      describe(`form submission with a new answer - ${fieldId} as yes`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWithBuyer: true });
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it(`should render the new answer for ${fieldId}`, () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
        });

        it(`should render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
          cy.assertSummaryListRowValue(summaryList, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);
        });
      });

      describe(`form submission with a new answer - ${fieldId} as no`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.completeAndSubmitConnectionWithTheBuyerForm({});
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it(`should render the new answer for ${fieldId}`, () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
        });

        it(`should NOT render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
          cy.assertSummaryListRowDoesNotExist(summaryList, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER);
        });
      });
    });
  },
);
