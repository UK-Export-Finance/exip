import partials from '../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { field, status, summaryList } from '../../../../../../../pages/shared';
import application from '../../../../../../../fixtures/application';
import { singleContractPolicyPage } from '../../../../../../../pages/insurance/policy';
import formatCurrency from '../../../../../../../helpers/format-currency';
import CURRENCIES from '../../../../../../../fixtures/currencies';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../helpers/date';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      CREDIT_PERIOD_WITH_BUYER,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Single contract policy - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('single policy type answers', () => {
    describe(REQUESTED_START_DATE, () => {
      const fieldId = REQUESTED_START_DATE;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      const newAnswer = {
        ...application.POLICY[fieldId],
        year: application.POLICY[fieldId].year + 1,
      };

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        const contractCompletionDateYearChange = newAnswer.year + 1;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = newAnswer.year;

          cy.changeAnswerField(fieldVariables, field(fieldId).yearInput(), false);

          fieldVariables.newValueInput = contractCompletionDateYearChange;
          cy.changeAnswerField(fieldVariables, field(CONTRACT_COMPLETION_DATE).yearInput());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, contractCompletionDateYearChange));
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(CONTRACT_COMPLETION_DATE, () => {
      const fieldId = CONTRACT_COMPLETION_DATE;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      const newAnswer = {
        ...application.POLICY[fieldId],
        year: application.POLICY[fieldId].year + 2,
      };

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = newAnswer.year;

          cy.changeAnswerField(fieldVariables, field(fieldId).yearInput());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(TOTAL_CONTRACT_VALUE, () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = application.POLICY[fieldId] - 500;
          cy.changeAnswerField(fieldVariables, singleContractPolicyPage[fieldId].input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatCurrency(fieldVariables.newValueInput);
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(CREDIT_PERIOD_WITH_BUYER, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;

      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();
          fieldVariables.newValueInput = `${String(application.POLICY[fieldId])} additional text`;

          cy.changeAnswerField(fieldVariables, field(fieldId).input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = fieldVariables.newValueInput;
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          fieldVariables.newValueInput = CURRENCIES[3].isoCode;
          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = CURRENCIES[3].isoCode;
          cy.changeAnswerSelectField(fieldVariables, policyCurrencyCodeFormField.input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
        });

        it('should render the new answer and retain a `completed` status tag', () => {
          const { 3: expected } = CURRENCIES;
          const { name } = expected;

          fieldVariables.newValue = name;
          cy.checkChangeAnswerRendered(fieldVariables);

          cy.checkTaskStatusCompleted(status());
        });
      });
    });
  });
});
