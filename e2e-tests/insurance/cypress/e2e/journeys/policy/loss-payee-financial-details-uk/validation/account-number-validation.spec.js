import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { MAXIMUM_CHARACTERS, MINIMUM_CHARACTERS } from '../../../../../../../constants';

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT },
} = INSURANCE_ROUTES;

const {
  LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const FIELD_ID = ACCOUNT_NUMBER;

const MINIMUM = MINIMUM_CHARACTERS.ACCOUNT_NUMBER;
const MAXIMUM = MAXIMUM_CHARACTERS.ACCOUNT_NUMBER;

context('Insurance - Policy - Loss Payee Financial Details UK - Account number - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'lossPayeeDetails', isAppointingLossPayee: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;

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

  const ERROR = ERRORS[FIELD_ID];

  const assertions = {
    field: fieldSelector(FIELD_ID),
    errorIndex: 1,
    expectedErrorsCount: 3,
  };

  it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
  });

  it(`should render validation errors when ${FIELD_ID} is over ${MAXIMUM} characters`, () => {
    const value = '1'.repeat(MAXIMUM + 1);

    cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.ABOVE_MAXIMUM });
  });

  it(`should render validation errors when ${FIELD_ID} is below ${MINIMUM} characters`, () => {
    const value = '1'.repeat(MINIMUM - 1);

    cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.BELOW_MINIMUM });
  });

  it(`should render validation errors when ${FIELD_ID} has a letter`, () => {
    const value = `${'1'.repeat(MINIMUM)}E`;

    cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
  });

  it(`should render validation errors when ${FIELD_ID} has a special character`, () => {
    const value = `${'1'.repeat(MINIMUM)}!`;

    cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
  });

  describe(`when ${FIELD_ID} is correctly entered`, () => {
    it('should not render validation errors', () => {
      cy.keyboardInput(fieldSelector(FIELD_ID).input(), '1234567');

      cy.clickSubmitButton();

      cy.assertErrorSummaryListLength(2);
    });
  });
});
