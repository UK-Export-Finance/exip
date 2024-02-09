import { noRadio, field as fieldSelector } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  ROOT,
  POLICY: { PRE_CREDIT_PERIOD },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

const {
  [CREDIT_PERIOD_WITH_BUYER]: { MAXIMUM },
} = FIELDS;

const POLICY_ERROR_MESSAGES = ERROR_MESSAGES.INSURANCE.POLICY;

const descriptionField = fieldSelector(CREDIT_PERIOD_WITH_BUYER);

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

    cy.submitAndAssertRadioErrors(
      noRadio(fieldId),
      0,
      expectedErrorsCount,
      expectedErrorMessage,
    );
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is 'no'`, () => {
    it('should not render any validation errors', () => {
      cy.navigateToUrl(url);
      cy.clickNoRadioInput();

      partials.errorSummaryListItems().should('not.exist');
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is 'yes'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
    });

    it(`should render a validation error when ${CREDIT_PERIOD_WITH_BUYER} is not provided`, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;
      const submittedValue = '';

      const errorIndex = 0;
      const expectedErrorsCount = 1;
      const expectedErrorMessage = POLICY_ERROR_MESSAGES[fieldId].IS_EMPTY;

      cy.submitAndAssertFieldErrors(
        textareaField,
        submittedValue,
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage,
      );
    });

    it(`should render a validation error when ${CREDIT_PERIOD_WITH_BUYER} is above the maximum`, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;
      const submittedValue = 'a'.repeat(MAXIMUM + 1);

      const errorIndex = 0;
      const expectedErrorsCount = 1;
      const expectedErrorMessage = POLICY_ERROR_MESSAGES[fieldId].ABOVE_MAXIMUM;

      cy.submitAndAssertFieldErrors(
        textareaField,
        submittedValue,
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage,
      );
    });

    it(`should not render any validation errors when ${CREDIT_PERIOD_WITH_BUYER} is below the minimum`, () => {
      cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod: true });

      partials.errorSummaryListItems().should('not.exist');
    });
  });
});
