import { submitButton } from '../../../../../../../../pages/shared';
import { multipleContractPolicyExportValuePage } from '../../../../../../../../pages/insurance/policy';
import partials from '../../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { APPLICATION, FIELD_VALUES } from '../../../../../../../../constants';
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
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: {
        MULTIPLE: EXPORT_VALUE_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy - export value page - form validation - maximum buyer will owe', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(policyType);
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

  const field = multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE];

  it('should render a validation error when maximum buyer will owe is not provided', () => {
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe is not a number', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), 'ten!');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe contains a decimal', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '1.2');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe contains a comma and decimal', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '1,234.56');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe is below the minimum', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '0');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM}`,
    );
  });

  it('should render a validation error when maximum buyer will owe is above the maximum', () => {
    const MAXIMUM = APPLICATION.POLICY.MAXIMUM_BUYER_CAN_OWE;

    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), MAXIMUM + 1);
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].ABOVE_MAXIMUM,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].ABOVE_MAXIMUM}`,
    );
  });

  it('should redirect to the next page when maximum buyer will owe is valid and contains a comma as all fields are valid', () => {
    cy.completeExportValueForm();
    cy.clickBackLink();

    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '1,234');
    submitButton().click();

    const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
    cy.assertUrl(expectedUrl);
  });
});
