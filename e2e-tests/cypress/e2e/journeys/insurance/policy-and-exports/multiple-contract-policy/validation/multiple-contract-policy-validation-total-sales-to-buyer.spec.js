import { submitButton } from '../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY_AND_EXPORTS: {
      MULTIPLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
    },
  },
} = ROUTES;

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
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
    // TODO: delete application
  });

  const field = multipleContractPolicyPage[TOTAL_SALES_TO_BUYER];

  describe('when total sales to buyer is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total sales to buyer is not a number', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input(), 'ten!');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total sales to buyer contains a decimal', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input(), '1.2');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total sales to buyer contains a comma and decimal', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input(), '1,234.56');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total sales to buyer is below the minimum', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input(), '0');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].BELOW_MINIMUM,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when total sales to buyer is valid and contains a comma', () => {
    it('should redirect to the next page as all fields are valid', () => {
      cy.completeAndSubmitMultipleContractPolicyForm();
      partials.backLink().click();

      cy.keyboardInput(multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input(), '1,234');
      submitButton().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      cy.url().should('eq', expectedUrl);
    });
  });
});
