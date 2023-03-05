import { submitButton } from '../../../../../pages/shared';
import { singleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY_AND_EXPORTS: {
      SINGLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
    },
  },
} = ROUTES;

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
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  const field = singleContractPolicyPage[TOTAL_CONTRACT_VALUE];

  describe('when total contract value is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total contract value is not a number', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(field.input(), 'Fifty');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total contract value is not a whole number', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(field.input().clear(), '123.456');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total sales to buyer contains a decimal', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(field.input().clear(), '1.2');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total sales to buyer contains a comma and decimal', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(field.input(), '1,234.56');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
      );
    });
  });

  describe('when total contract value is below the minimum', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(field.input(), '0');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].BELOW_MINIMUM,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when total contract value is above the maximum', () => {
    it('should render a validation error', () => {
      cy.keyboardInput(field.input(), '500000');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].ABOVE_MAXIMUM,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].ABOVE_MAXIMUM}`,
      );
    });
  });

  describe('when total contract value is valid and contains a comma', () => {
    it('should redirect to the next page as all fields are valid', () => {
      cy.completeAndSubmitSingleContractPolicyForm();
      partials.backLink().click();

      cy.keyboardInput(field.input(), '1,234');
      submitButton().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      cy.url().should('eq', expectedUrl);
    });
  });
});
