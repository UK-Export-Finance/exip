import partials from '../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { field, summaryList } from '../../../../../../../pages/shared';
import application from '../../../../../../../fixtures/application';
import { multipleContractPolicyPage } from '../../../../../../../pages/insurance/policy';
import formatCurrency from '../../../../../../../helpers/format-currency';
import currencies from '../../../../../../../fixtures/currencies';
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
      CREDIT_PERIOD_WITH_BUYER,
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

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

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

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
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
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
          cy.changeAnswerSelectField(fieldVariables, field(fieldId).input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
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
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
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

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          fieldVariables.newValueInput = currencies[3].isoCode;
          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = currencies[3].isoCode;
          cy.changeAnswerSelectField(fieldVariables, policyCurrencyCodeFormField.input());
        });

        it(`should redirect to ${TYPE_OF_POLICY}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);
        });

        it('should render the new answer', () => {
          const { 3: expected } = currencies;
          const { name } = expected;

          fieldVariables.newValue = name;
          cy.checkChangeAnswerRendered(fieldVariables);
        });
      });
    });
  });
});
