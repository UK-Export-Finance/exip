import { field, submitButton, summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../../../helpers/date';
import application from '../../../../../../fixtures/application';
import { USD } from '../../../../../../fixtures/currencies';

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
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
    EXPORT_VALUE: {
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Multiple contract policy - As an exporter, I want to change my answers to the type of policy section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

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

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId });
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
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
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

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = String(Number(application.POLICY[fieldId]) + 1);

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
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

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId });
        });
      });

      // describe('form submission with a new answer', () => {
      //   const newAnswer = application.POLICY[fieldId] - 500;

      //   beforeEach(() => {
      //     cy.navigateToUrl(url);

      //     summaryList.field(fieldId).changeLink().click();

      //     cy.keyboardInput(field(fieldId).input(), newAnswer);

      //     submitButton().click();
      //   });

      //   it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      //     cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      //   });

      //   it('should render the new answer', () => {
      //     const expected = formatCurrency(newAnswer);

      //     cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      //   });
      // });
    });

    describe(MAXIMUM_BUYER_WILL_OWE, () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId });
        });
      });

      // describe('form submission with a new answer', () => {
      //   const newAnswer = Number(application.POLICY[fieldId]) + 1000;

      //   beforeEach(() => {
      //     cy.navigateToUrl(url);

      //     summaryList.field(fieldId).changeLink().click();

      //     cy.keyboardInput(multipleContractPolicyExportValuePage[fieldId].input(), newAnswer);

      //     submitButton().click();
      //   });

      //   it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      //     cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      //   });

      //   it('should render the new answer', () => {
      //     const expected = formatCurrency(newAnswer);

      //     cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      //   });
      // });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;

      const fieldVariables = {
        fieldId,
        newValueInput: USD.isoCode,
        newValue: USD.name,
      };

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId });
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
