import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage, singleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
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
        SINGLE: {
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

context('Insurance - Policy and exports - Single contract policy page - form validation - total contract value', () => {
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

  const field = singleContractPolicyPage[TOTAL_CONTRACT_VALUE];

  describe('when total contract value is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].IS_EMPTY}`,
      );
    });
  });

  describe('when total contract value is not a number', () => {
    it('should render a validation error', () => {
      field.input().type('Fifty');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when total contract value is not a whole number', () => {
    it('should render a validation error', () => {
      field.input().clear().type('123.456');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when total contract value is below the minimum', () => {
    it('should render a validation error', () => {
      field.input().clear().type('0');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].BELOW_MINIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when total contract value is above the maximum', () => {
    it('should render a validation error', () => {
      field.input().clear().type('500000');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].ABOVE_MAXIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].ABOVE_MAXIMUM}`,
      );
    });
  });
});
