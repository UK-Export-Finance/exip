import partials from '../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { field, summaryList } from '../../../../../../../pages/shared';
import application from '../../../../../../../fixtures/application';
import { multipleContractPolicyPage } from '../../../../../../../pages/insurance/policy';
import formatCurrency from '../../../../../../../helpers/format-currency';
import { USD } from '../../../../../../../fixtures/currencies';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../helpers/date';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - multiple contract policy - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber });

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

  describe('multiple policy type answers', () => {
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

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
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
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(TOTAL_MONTHS_OF_COVER, () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = String(Number(application.POLICY[fieldId]) + 1);
          cy.changeAnswerField(fieldVariables, field(fieldId).input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = `${fieldVariables.newValueInput} months`;
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(TOTAL_SALES_TO_BUYER, () => {
      const fieldId = TOTAL_SALES_TO_BUYER;

      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
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
          cy.changeAnswerField(fieldVariables, field(fieldId).input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatCurrency(fieldVariables.newValueInput);
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(MAXIMUM_BUYER_WILL_OWE, () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;

      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = Number(application.POLICY[fieldId]) + 1000;
          cy.changeAnswerField(fieldVariables, multipleContractPolicyPage[fieldId].input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
        });

        it('should render the new answer', () => {
          fieldVariables.newValue = formatCurrency(fieldVariables.newValueInput);
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;

      const fieldVariables = {
        ...getFieldVariables(fieldId, referenceNumber),
        newValueInput: USD.isoCode,
        newValue: USD.name,
      };

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
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

        it('should render the new answer', () => {
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });
  });
});
