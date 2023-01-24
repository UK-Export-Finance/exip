import { submitButton } from '../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  APPLICATION,
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
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

context('Insurance - Policy and exports - Multiple contract policy page - form validation - maximum buyer will owe', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTI);

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

  const field = multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE];

  describe('when total sales to buyer is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].IS_EMPTY}`,
      );
    });
  });

  describe('when total sales to buyer is not a number', () => {
    it('should render a validation error', () => {
      multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().clear().type('ten!');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when total sales to buyer contains a decimal', () => {
    it('should render a validation error', () => {
      multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().clear().type('1.2');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when total sales to buyer is below the minimum', () => {
    it('should render a validation error', () => {
      multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().clear().type('0');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when total sales to buyer is above the maximum', () => {
    it('should render a validation error', () => {
      const MAXIMUM = APPLICATION.POLICY_AND_EXPORT.MAXIMUM_BUYER_CAN_OWE;

      multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().clear().type(MAXIMUM + 1);
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].ABOVE_MAXIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].ABOVE_MAXIMUM}`,
      );
    });
  });
});
