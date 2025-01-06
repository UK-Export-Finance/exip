import { field as fieldSelector } from '../../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import assertNameFieldValidation from '../../../../../../../shared-test-assertions/name-field-validation';

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { LOSS_PAYEE_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const {
  LOSS_PAYEE_DETAILS: { NAME, LOCATION, IS_LOCATED_IN_UK },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss Payee Details - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ formToStopAt: 'lossPayee', isAppointingLossPayee: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;

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

  describe(NAME, () => {
    const FIELD_ID = NAME;
    const ERROR = ERRORS[FIELD_ID];

    assertNameFieldValidation({
      fieldId: FIELD_ID,
      errorIndex: 0,
      maximum: 'a'.repeat(MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME + 1),
      errorMessages: ERROR,
      totalExpectedErrors: 2,
      totalExpectedOtherErrorsWithValidName: 1,
    });
  });

  describe(LOCATION, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const FIELD_ID = LOCATION;
    const ERROR = ERRORS[FIELD_ID];

    it('should display validation error when radio is not selected', () => {
      const radioField = {
        ...fieldSelector(FIELD_ID),
        input: fieldSelector(`${LOCATION}-${IS_LOCATED_IN_UK}`).input,
      };

      cy.submitAndAssertRadioErrors({
        field: radioField,
        errorIndex: 1,
        expectedErrorsCount: 2,
        expectedErrorMessage: ERROR.IS_EMPTY,
      });
    });
  });
});
