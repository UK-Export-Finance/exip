import partials from '../../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { field, status, summaryList } from '../../../../../../../../pages/shared';
import application from '../../../../../../../../fixtures/application';
import formatCurrency from '../../../../../../../../helpers/format-currency';
import { USD } from '../../../../../../../../fixtures/currencies';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../../helpers/date';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE, SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
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

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

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
      const newStartDate = {
        ...application.POLICY[fieldId],
        year: application.POLICY[fieldId].year + 1,
      };

      const newEndDate = {
        ...application.POLICY[fieldId],
        year: newStartDate.year + 1,
      };

      const fieldVariables = {
        startDate: {
          ...getFieldVariables(fieldId, referenceNumber),
          newValueInput: newStartDate.year,
        },
        endDate: {
          ...application.POLICY[CONTRACT_COMPLETION_DATE],
          ...getFieldVariables(CONTRACT_COMPLETION_DATE, referenceNumber),
          newValueInput: newEndDate.year,
        },
      };

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);

          cy.checkChangeLinkUrl(fieldVariables.startDate, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.changeAnswerField(fieldVariables.startDate, field(fieldId).yearInput(), false);

          cy.changeAnswerField(fieldVariables.endDate, field(CONTRACT_COMPLETION_DATE).yearInput());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer', () => {
          const { day, month, year } = newStartDate;

          fieldVariables.startDate.newValue = formatDate(createTimestampFromNumbers(day, month, year));
          cy.checkChangeAnswerRendered({ fieldVariables: fieldVariables.startDate });
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
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));
          cy.checkChangeAnswerRendered({ fieldVariables });
        });
      });
    });

    describe(TOTAL_CONTRACT_VALUE, () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      const fieldVariables = {
        route: SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
        newValueInput: application.POLICY[fieldId] - 500,
        fieldId,
        referenceNumber,
        summaryList,
        changeLink: summaryList.field(fieldId).changeLink,
      };

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: fieldVariables.route, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = application.POLICY[fieldId] - 500;
          cy.changeAnswerField(fieldVariables, field(fieldId).input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatCurrency(fieldVariables.newValueInput);
          cy.checkChangeAnswerRendered({ fieldVariables });
        });
      });
    });

    describe(CURRENCY_CODE, () => {
      const fieldId = CURRENCY_CODE;
      const fieldVariables = {
        ...getFieldVariables(fieldId, referenceNumber),
        newValueInput: USD.isoCode,
        newValue: USD.name,
      };

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.changeAnswerRadioField(fieldVariables);
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer and retain a `completed` status tag', () => {
          cy.checkChangeAnswerRendered({ fieldVariables });

          cy.checkTaskStatusCompleted(status);
        });
      });
    });
  });
});
