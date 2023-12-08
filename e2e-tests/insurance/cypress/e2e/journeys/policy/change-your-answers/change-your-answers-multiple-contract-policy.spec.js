import { field, submitButton, summaryList } from '../../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../../../helpers/date';
import formatCurrency from '../../../../../../helpers/format-currency';
import application from '../../../../../../fixtures/application';
import currencies from '../../../../../../fixtures/currencies';

const {
  ROOT,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
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

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Multiple contract policy - As an exporter, I want to change my answers to the type of policy section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicySection({ policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY[fieldId],
          year: application.POLICY[fieldId].year + 1,
        };

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).yearInput(), newAnswer.year);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(TOTAL_MONTHS_OF_COVER, () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = String(Number(application.POLICY[fieldId]) + 1);

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          field(fieldId).input().select(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = `${newAnswer} months`;

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(TOTAL_SALES_TO_BUYER, () => {
      const fieldId = TOTAL_SALES_TO_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY[fieldId] - 500;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(MAXIMUM_BUYER_WILL_OWE, () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = Number(application.POLICY[fieldId]) + 1000;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(multipleContractPolicyPage[fieldId].input(), newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(CREDIT_PERIOD_WITH_BUYER, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = `${application.POLICY[fieldId]} additional text`;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = newAnswer;

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = currencies[3].isoCode;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          policyCurrencyCodeFormField.input().select(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const { 3: expected } = currencies;
          const { name } = expected;

          cy.assertSummaryListRowValue(summaryList, fieldId, name);
        });
      });
    });
  });
});
