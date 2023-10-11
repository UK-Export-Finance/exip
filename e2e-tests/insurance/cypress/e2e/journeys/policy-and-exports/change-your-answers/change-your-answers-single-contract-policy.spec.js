import { field, submitButton, summaryList } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../../../helpers/date';
import formatCurrency from '../../../../../../helpers/format-currency';
import application from '../../../../../../fixtures/application';
import currencies from '../../../../../../fixtures/currencies';

const {
  ROOT,
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    SINGLE_CONTRACT_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      CREDIT_PERIOD_WITH_BUYER,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Change your answers - Single contract policy - As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicyAndExportSection({});

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

  describe('single policy type answers', () => {
    describe(REQUESTED_START_DATE, () => {
      const fieldId = REQUESTED_START_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          year: application.POLICY_AND_EXPORTS[fieldId].year + 1,
        };

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).yearInput(), newAnswer.year);
          cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).yearInput(), newAnswer.year + 1);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
        });
      });
    });

    describe(CONTRACT_COMPLETION_DATE, () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          year: application.POLICY_AND_EXPORTS[fieldId].year + 2,
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

          cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
        });
      });
    });

    describe(TOTAL_CONTRACT_VALUE, () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY_AND_EXPORTS[fieldId] - 500;

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

          cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
        });
      });
    });

    describe(CREDIT_PERIOD_WITH_BUYER, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = `${application.POLICY_AND_EXPORTS[fieldId]} additional text`;

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

          cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
        });
      });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
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
          cy.assertSummaryListRowValueNew(summaryList, fieldId, name);
        });
      });
    });
  });
});
