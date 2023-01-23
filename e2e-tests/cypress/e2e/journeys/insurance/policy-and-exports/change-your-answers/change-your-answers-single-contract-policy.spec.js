import { submitButton } from '../../../../pages/shared';
import { singleContractPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import { createTimestampFromNumbers, formatDate } from '../../../../helpers/date';
import formatCurrency from '../../../../helpers/format-currency';
import checkText from '../../../../helpers/check-text';
import application from '../../../../../fixtures/application';
import currencies from '../../../../../fixtures/currencies';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    SINGLE_CONTRACT_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const { summaryList } = checkYourAnswersPage;

const assertChangePageUrl = (referenceNumber, fieldId) => {
  const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${fieldId}-label`;
  cy.url().should('eq', expected);
};

const assertAnswersPageUrl = (referenceNumber, fieldId) => {
  const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}#${fieldId}-label`;

  cy.url().should('eq', expected);
};

const assertSummaryListRowValue = (fieldId, expected) => {
  checkText(
    summaryList[fieldId].value(),
    expected,
  );
};

context('Insurance - Policy and exports - Check your answers - Single contract policy - As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('single policy type answers', () => {
    describe(REQUESTED_START_DATE, () => {
      const fieldId = REQUESTED_START_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          assertChangePageUrl(referenceNumber, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          day: application.POLICY_AND_EXPORTS[fieldId].day + 1,
          month: application.POLICY_AND_EXPORTS[fieldId].month + 1,
        };

        before(() => {
          singleContractPolicyPage[fieldId].dayInput().clear().type(newAnswer.day);
          singleContractPolicyPage[fieldId].monthInput().clear().type(newAnswer.month);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          assertAnswersPageUrl(referenceNumber, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          assertSummaryListRowValue(fieldId, expected);
        });
      });
    });

    describe(CONTRACT_COMPLETION_DATE, () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          assertChangePageUrl(referenceNumber, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          day: application.POLICY_AND_EXPORTS[fieldId].day + 2,
          month: application.POLICY_AND_EXPORTS[fieldId].month + 2,
        };

        before(() => {
          singleContractPolicyPage[fieldId].dayInput().clear().type(newAnswer.day);
          singleContractPolicyPage[fieldId].monthInput().clear().type(newAnswer.month);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          assertAnswersPageUrl(referenceNumber, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          assertSummaryListRowValue(fieldId, expected);
        });
      });
    });

    describe(TOTAL_CONTRACT_VALUE, () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          assertChangePageUrl(referenceNumber, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY_AND_EXPORTS[fieldId] - 500;

        before(() => {
          singleContractPolicyPage[fieldId].input().clear().type(newAnswer);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          assertAnswersPageUrl(referenceNumber, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          assertSummaryListRowValue(fieldId, expected);
        });
      });
    });

    describe(CREDIT_PERIOD_WITH_BUYER, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          assertChangePageUrl(referenceNumber, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = `${application.POLICY_AND_EXPORTS[fieldId]} additional text`;

        before(() => {
          singleContractPolicyPage[fieldId].input().clear().type(newAnswer);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          assertAnswersPageUrl(referenceNumber, fieldId);
        });

        it('should render the new answer', () => {
          const expected = newAnswer;

          assertSummaryListRowValue(fieldId, expected);
        });
      });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          assertChangePageUrl(referenceNumber, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = currencies[3].isoCode;

        before(() => {
          singleContractPolicyPage[fieldId].input().select(newAnswer);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          assertAnswersPageUrl(referenceNumber, fieldId);
        });

        it('should render the new answer', () => {
          const { isoCode, name } = currencies[3];

          const expected = `${isoCode} ${name}`;

          assertSummaryListRowValue(fieldId, expected);
        });
      });
    });
  });
});
