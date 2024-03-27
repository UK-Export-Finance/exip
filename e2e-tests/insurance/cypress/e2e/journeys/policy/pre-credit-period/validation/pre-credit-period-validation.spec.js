import { noRadio, field as fieldSelector } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  ROOT,
  POLICY: { PRE_CREDIT_PERIOD },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER: FIELD_ID,
} = POLICY_FIELD_IDS;

const {
  [FIELD_ID]: { MAXIMUM },
} = FIELDS;

const POLICY_ERROR_MESSAGES = ERROR_MESSAGES.INSURANCE.POLICY;

const descriptionField = fieldSelector(FIELD_ID);

const textareaField = {
  ...descriptionField,
  input: descriptionField.textarea,
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Pre-credit period page - validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

      cy.navigateToUrl(url);
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a validation error when ${NEED_PRE_CREDIT_PERIOD} is not provided`, () => {
    const fieldId = NEED_PRE_CREDIT_PERIOD;

    const expectedErrorsCount = 1;
    const expectedErrorMessage = POLICY_ERROR_MESSAGES[fieldId].IS_EMPTY;

    cy.submitAndAssertRadioErrors({
      field: noRadio(fieldId),
      expectedErrorsCount,
      expectedErrorMessage,
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is 'no'`, () => {
    it('should not render any validation errors', () => {
      cy.navigateToUrl(url);
      cy.clickNoRadioInput();

      cy.assertErrorSummaryListDoesNotExist();
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is 'yes'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
    });

    it(`should render a validation error when ${FIELD_ID} is not provided`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        expectedErrorMessage: POLICY_ERROR_MESSAGES[FIELD_ID].IS_EMPTY,
      });
    });

    it(`should render a validation error when ${FIELD_ID} is above the maximum`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(MAXIMUM + 1),
        expectedErrorMessage: POLICY_ERROR_MESSAGES[FIELD_ID].ABOVE_MAXIMUM,
      });
    });

    it(`should not render any validation errors when ${FIELD_ID} is below the minimum`, () => {
      cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod: true });

      cy.assertErrorSummaryListDoesNotExist();
    });
  });
});
