import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
  YOUR_BUYER: { CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const { BUYER } = application;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Check your answers - Your buyer - Credit insurance history - As an exporter, I want to change my answers to the credit insurance history section',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          referenceNumber,
          totalContractValueOverThreshold: true,
        });

        task.link().click();

        // To get past "Your business" check your answers page
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

        url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('when clicking the `change` link', () => {
      describe(`change ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} from no to yes`, () => {
        const fieldId = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

        describe('when clicking the `change` link', () => {
          it(`should redirect to ${CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE}`, () => {
            cy.navigateToUrl(url);

            summaryList.field(fieldId).changeLink().click();

            cy.assertChangeAnswersPageUrl({ referenceNumber, route: CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE, fieldId });
          });
        });

        describe(`form submission with a new answer - ${fieldId} as yes`, () => {
          beforeEach(() => {
            cy.navigateToUrl(url);

            summaryList.field(fieldId).changeLink().click();

            cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWithBuyer: true });
          });

          it(`should redirect to ${YOUR_BUYER}`, () => {
            cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
          });

          it(`should render the new answer for ${fieldId}`, () => {
            cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
          });

          it(`should render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
            cy.assertSummaryListRowValue(summaryList, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);
          });

          it('should retain a `completed` status tag', () => {
            cy.checkTaskStatusCompleted(status);
          });
        });

        describe(`form submission with a new answer - ${fieldId} as no`, () => {
          beforeEach(() => {
            cy.navigateToUrl(url);

            summaryList.field(fieldId).changeLink().click();

            cy.completeAndSubmitConnectionWithTheBuyerForm({});
          });

          it(`should redirect to ${YOUR_BUYER}`, () => {
            cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
          });

          it(`should render the new answer for ${fieldId}`, () => {
            cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
          });

          it(`should NOT render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
            cy.assertSummaryListRowDoesNotExist(summaryList, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER);
          });
        });
      });
    });
  },
);
