import { summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

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
    LOSS_PAYEE_CHANGE,
    LOSS_PAYEE_DETAILS_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Loss payee - No to yes - As an exporter, I want to change my answers to the loss payee section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let lossPayeeDetailsUrl;
  let lossPayeeFinancialUkUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ isAppointingLossPayee: false });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      lossPayeeDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_CHANGE}`;
      lossPayeeFinancialUkUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE}`;
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
      it(`should redirect to ${LOSS_PAYEE_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${LOSS_PAYEE_DETAILS_CHANGE}, ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) loss payee details and financial UK fields`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee: true });
        cy.assertUrl(`${lossPayeeDetailsUrl}#${FIELD_ID}-label`);

        cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: true });
        cy.assertUrl(`${lossPayeeFinancialUkUrl}#${FIELD_ID}-label`);

        cy.completeAndSubmitLossPayeeFinancialDetailsUkForm({});
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new answers and change links for ${FIELD_ID} and all loss payee details fields`, () => {
        checkSummaryList[FIELD_ID]({ isAppointingLossPayee: true });
        checkSummaryList.LOSS_PAYEE[NAME]({ shouldRender: true });
        checkSummaryList.LOSS_PAYEE[FINANCIAL_ADDRESS]({ shouldRender: true, isUk: true });
        checkSummaryList.LOSS_PAYEE[SORT_CODE]({ shouldRender: true });
        checkSummaryList.LOSS_PAYEE[ACCOUNT_NUMBER]({ shouldRender: true });
      });
    });
  });
});
