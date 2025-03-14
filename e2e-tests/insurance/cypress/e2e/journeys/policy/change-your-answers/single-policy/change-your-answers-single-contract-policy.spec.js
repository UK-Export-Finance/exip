import { field, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../helpers/date';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';
import { USD } from '../../../../../../../fixtures/currencies';

const {
  ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, SINGLE_CONTRACT_POLICY_CHANGE, SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE, REQUESTED_CREDIT_LIMIT, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Single contract policy - As an exporter, I want to change my answers to the type of policy section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

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

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: SINGLE_CONTRACT_POLICY_CHANGE, fieldId });
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
          cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).yearInput(), newAnswer.year + 1);

          cy.clickSubmitButton();
        });

        it('should redirect to the check answers page', () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(CONTRACT_COMPLETION_DATE, () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: SINGLE_CONTRACT_POLICY_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY[fieldId],
          year: application.POLICY[fieldId].year + 2,
        };

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).yearInput(), newAnswer.year);

          cy.clickSubmitButton();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(TOTAL_CONTRACT_VALUE, () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY[fieldId] - 500;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          cy.clickSubmitButton();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(REQUESTED_CREDIT_LIMIT, () => {
      const fieldId = REQUESTED_CREDIT_LIMIT;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY[fieldId] - 100;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          cy.clickSubmitButton();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(CURRENCY_CODE, () => {
      const fieldId = CURRENCY_CODE;

      const fieldVariables = {
        fieldId,
        newValueInput: USD.isoCode,
        newValue: USD.name,
      };

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: SINGLE_CONTRACT_POLICY_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.changeAnswerRadioField(fieldVariables);
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, fieldVariables.newValue);
        });
      });
    });
  });
});
