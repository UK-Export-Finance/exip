import { multipleContractPolicyExportValuePage } from '../../../../../../../../pages/insurance/policy';
import { errorSummaryListItems } from '../../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE, NAME_ON_POLICY },
} = INSURANCE_ROUTES;

const {
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: { MULTIPLE: EXPORT_VALUE_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy - Export value page - form validation - maximum buyer will owe', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'multipleContractPolicy', policyType });

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
    cy.clickSubmitButton();

    cy.checkText(errorSummaryListItems().eq(1), EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT);

    cy.checkText(field.errorMessage(), `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`);
  });

  it('should render a validation error when maximum buyer will owe is not a number', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), 'ten!');
    cy.clickSubmitButton();

    cy.checkText(errorSummaryListItems().eq(1), EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT);

    cy.checkText(field.errorMessage(), `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`);
  });

  it('should render a validation error when maximum buyer will owe contains a decimal', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '1.2');
    cy.clickSubmitButton();

    cy.checkText(errorSummaryListItems().eq(1), EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT);

    cy.checkText(field.errorMessage(), `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`);
  });

  it('should render a validation error when maximum buyer will owe contains a comma and decimal', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '1,234.56');
    cy.clickSubmitButton();

    cy.checkText(errorSummaryListItems().eq(1), EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT);

    cy.checkText(field.errorMessage(), `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`);
  });

  it('should render a validation error when maximum buyer will owe is below the minimum', () => {
    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '0');
    cy.clickSubmitButton();

    cy.checkText(errorSummaryListItems().eq(1), EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM);

    cy.checkText(field.errorMessage(), `Error: ${EXPORT_VALUE_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM}`);
  });

  it('should redirect to the next page when maximum buyer will owe is valid and contains a comma as all fields are valid', () => {
    cy.completeExportValueForm({});
    cy.clickBackLink();

    cy.keyboardInput(multipleContractPolicyExportValuePage[MAXIMUM_BUYER_WILL_OWE].input(), '1,234');
    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
    cy.assertUrl(expectedUrl);
  });
});
