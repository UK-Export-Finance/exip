import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage, multipleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const multiplePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const multiplePolicyField = typeOfPolicyPage[multiplePolicyFieldId].multiple;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_SALES_TO_BUYER },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy and exports - Multiple contract policy page - form validation - total sales to buyer', () => {
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

    multiplePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  const field = multipleContractPolicyPage[TOTAL_SALES_TO_BUYER];

  describe('when total sales to buyer is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].IS_EMPTY}`,
      );
    });
  });

  describe('when total sales to buyer is not a number', () => {
    it('should render a validation error', () => {
      multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().clear().type('ten!');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when total sales to buyer contains a decimal', () => {
    it('should render a validation error', () => {
      multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().clear().type('1.2');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when total sales to buyer is below the minimum', () => {
    it('should render a validation error', () => {
      multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().clear().type('0');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].BELOW_MINIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].BELOW_MINIMUM}`,
      );
    });
  });
});
