import { field as fieldSelector, submitButton } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../../constants';

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY: {
      MULTIPLE_CONTRACT_POLICY,
      NAME_ON_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_SALES_TO_BUYER },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy export value page - form validation - total sales to buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const field = fieldSelector(TOTAL_SALES_TO_BUYER);

  it('should render a validation error when total sales to buyer is not provided', () => {
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

  it('should render a validation error when total sales to buyer is not a number', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), 'ten!');
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

  it('should render a validation error when total sales to buyer contains a decimal', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '1.2');
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

  it('should render a validation error when total sales to buyer contains a comma and decimal', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '1,234.56');
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

  it('should render a validation error when total sales to buyer is below the minimum', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '0');
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

  describe('when total sales to buyer is valid and contains a comma', () => {
    it('should redirect to the next page as all fields are valid', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitMultipleContractPolicyForm();
      cy.clickBackLink();

      cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '1,234');
      submitButton().click();

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });
  });
});
