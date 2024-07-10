import { field as fieldSelector } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
    NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: {
        TOTAL_CONTRACT_VALUE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: CONTRACT_POLICY_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy - Total contract value page - form validation - total contract value', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

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
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total contract value is not a number', () => {
    cy.keyboardInput(field.input(), 'Fifty');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total contract value is not a whole number', () => {
    cy.keyboardInput(field.input().clear(), '123.456');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total sales to buyer contains a decimal', () => {
    cy.keyboardInput(field.input().clear(), '1.2');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total sales to buyer contains a comma and decimal', () => {
    cy.keyboardInput(field.input(), '1,234.56');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total contract value is below the minimum', () => {
    cy.keyboardInput(field.input(), '0');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].BELOW_MINIMUM,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_POLICY_ERROR_MESSAGES.SINGLE[TOTAL_CONTRACT_VALUE].BELOW_MINIMUM}`,
    );
  });

  it('should redirect to the next page when total contract value is valid and contains a comma as all fields are valid', () => {
    cy.completeAndSubmitTotalContractValueForm({});
    cy.clickBackLink();

    cy.keyboardInput(field.input(), '1,234');
    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
    cy.assertUrl(expectedUrl);
  });
});
