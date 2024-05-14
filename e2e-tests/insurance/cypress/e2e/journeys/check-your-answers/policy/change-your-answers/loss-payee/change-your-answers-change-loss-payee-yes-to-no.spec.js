import { summaryList } from '../../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../../../../../../constants';

const {
  LOSS_PAYEE: {
    IS_APPOINTED: FIELD_ID,
  },
  LOSS_PAYEE_DETAILS: { NAME },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    LOSS_PAYEE_CHECK_AND_CHANGE,
    LOSS_PAYEE_DETAILS_ROOT,
    LOSS_PAYEE_FINANCIAL_UK,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Loss payee - Yes to no - As an exporter, I want to change my answers to the loss payee section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationMultiplePolicyType({ isAppointingLossPayee: true });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${LOSS_PAYEE_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_CHECK_AND_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitBrokerForm({ isAppointingLossPayee: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and change link, with no other loss payee details fields`, () => {
        cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);

        cy.assertSummaryListRowDoesNotExist(summaryList, NAME);

        cy.assertSummaryListRowDoesNotExist(summaryList, FINANCIAL_ADDRESS);
        cy.assertSummaryListRowDoesNotExist(summaryList, SORT_CODE);
        cy.assertSummaryListRowDoesNotExist(summaryList, ACCOUNT_NUMBER);
      });

      describe('when changing the answer again from no to yes', () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);

          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee: true });
        });

        describe(`when going back to ${LOSS_PAYEE_DETAILS_ROOT} and ${LOSS_PAYEE_FINANCIAL_UK}`, () => {
          it('should have empty field values', () => {
            cy.assertEmptyLossPayeeDetailsFieldValues();

            /**
             * Submit the loss payee details form, located in the UK.
             * Then, assert that the UK financial details fields are empty.
             */
            cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: true });

            cy.assertEmptyLossPayeeFinancialUkFieldValues();
          });
        });
      });
    });
  });
});
