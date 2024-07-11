import { field as fieldSelector } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
    NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: {
        MULTIPLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy - Export value page - form validation - total sales to buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({ policyType });
      cy.completeAndSubmitMultipleContractPolicyForm({ policyType });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;

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
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total sales to buyer is not a number', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), 'ten!');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total sales to buyer contains a decimal', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '1.2');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total sales to buyer contains a comma and decimal', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '1,234.56');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when total sales to buyer is below the minimum', () => {
    cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '0');
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
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

      cy.completeExportValueForm();
      cy.clickBackLink();

      cy.keyboardInput(fieldSelector(TOTAL_SALES_TO_BUYER).input(), '1,234');
      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });
  });
});
