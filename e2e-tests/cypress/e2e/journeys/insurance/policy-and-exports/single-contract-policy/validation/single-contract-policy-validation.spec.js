import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const singlePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const singlePolicyField = typeOfPolicyPage[singlePolicyFieldId].single;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: {
          CONTRACT_COMPLETION_DATE,
          TOTAL_CONTRACT_VALUE,
        },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy and exports - Single contract policy page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.visit(INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    singlePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    partials.errorSummaryListItems().should('exist');

    const TOTAL_REQUIRED_FIELDS = 5;
    partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

    checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY,
    );

    checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY,
    );

    checkText(
      partials.errorSummaryListItems().eq(2),
      CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].IS_EMPTY,
    );

    checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].IS_EMPTY,
    );

    checkText(
      partials.errorSummaryListItems().eq(4),
      CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY,
    );
  });
});
