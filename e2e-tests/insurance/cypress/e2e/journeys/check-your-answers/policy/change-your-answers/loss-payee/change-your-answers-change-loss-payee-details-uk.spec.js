import partials from '../../../../../../../../partials';
import { field, summaryList } from '../../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../../content-strings/fields/insurance/policy';
import formatSortCode from '../../../../../../../../helpers/format-sort-code';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Loss payee details - UK - As an exporter, I want to change my answers to the loss payee section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationMultiplePolicyType({
        referenceNumber,
        isAppointingLossPayee: true,
        lossPayeeIsLocatedInUK: true,
      });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(SORT_CODE, () => {
    const fieldId = SORT_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '405060';

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer', () => {
        const expectedAnswer = formatSortCode(newAnswer);

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedAnswer);
      });
    });
  });

  describe(ACCOUNT_NUMBER, () => {
    const fieldId = ACCOUNT_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '91011121';

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(FINANCIAL_ADDRESS, () => {
    const fieldId = FINANCIAL_ADDRESS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const mockNewAddress = 'Mock new address';

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).textarea(), mockNewAddress);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.LOSS_PAYEE_FINANCIAL_UK[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        row.value().contains(mockNewAddress);
      });
    });
  });
});
