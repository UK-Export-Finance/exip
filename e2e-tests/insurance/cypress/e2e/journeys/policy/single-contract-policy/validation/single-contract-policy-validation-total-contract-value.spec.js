import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY: {
      SINGLE_CONTRACT_POLICY,
      NAME_ON_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY: {
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
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - total contract value', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

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

  const field = fieldSelector(TOTAL_CONTRACT_VALUE);

  it('should render a validation error when total contract value is not provided', () => {
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

  it('should render a validation error when total contract value is not a number', () => {
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

  it('should render a validation error when total contract value is not a whole number', () => {
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

  it('should render a validation error when total sales to buyer contains a decimal', () => {
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

  it('should render a validation error when total sales to buyer contains a comma and decimal', () => {
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

  it('should render a validation error when total contract value is below the minimum', () => {
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

  it('should render a validation error when total contract value is above the maximum', () => {
    cy.keyboardInput(field.input(), '500001');
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

  it('should redirect to the next page when total contract value is valid and contains a comma as all fields are valid', () => {
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.clickBackLink();

    cy.keyboardInput(field.input(), '1,234');
    submitButton().click();

    const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
    cy.assertUrl(expectedUrl);
  });
});
