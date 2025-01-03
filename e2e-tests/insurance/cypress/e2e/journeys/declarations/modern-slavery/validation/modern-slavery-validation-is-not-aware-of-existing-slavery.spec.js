import { autoCompleteField } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/declarations';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const ERROR_STRINGS = ERROR_MESSAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const MAXIMUM = MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON;

const reasonOverMaximum = 'a'.repeat(MAXIMUM + 1);

const fieldId = IS_NOT_AWARE_OF_EXISTING_SLAVERY;
const conditionalFieldId = AWARE_OF_EXISTING_SLAVERY;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Declarations - Modern slavery page - validation - ${fieldId}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

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

  describe(`when ${fieldId} is 'no', but ${conditionalFieldId} is not provided`, () => {
    it(`should render a ${conditionalFieldId} validation error`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({
        isNotAwareOfExistingSlavery: false,
      });

      cy.assertFieldErrors({
        field: autoCompleteField(conditionalFieldId),
        errorIndex: 0,
        errorSummaryLength: 1,
        errorMessage: ERROR_STRINGS.CONDITIONAL_REASONS[conditionalFieldId].IS_EMPTY,
      });
    });
  });

  describe(`when ${fieldId} is 'no', but ${conditionalFieldId} is over ${MAXIMUM} characters`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({
        isNotAwareOfExistingSlavery: false,
      });

      cy.completeAndSubmitModernSlaveryFormConditionalFields({
        awareOfExistingSlavery: reasonOverMaximum,
        offensesOrInvestigations: null,
        cannotAdhereToAllRequirements: null,
      });
    });

    it(`should render a ${conditionalFieldId} validation error`, () => {
      cy.assertFieldErrors({
        field: autoCompleteField(conditionalFieldId),
        errorIndex: 2,
        errorSummaryLength: 3,
        errorMessage: ERROR_STRINGS.CONDITIONAL_REASONS[conditionalFieldId].ABOVE_MAXIMUM,
      });
    });

    it('should retain the submitted values', () => {
      cy.checkTextareaValue({
        fieldId: conditionalFieldId,
        expectedValue: reasonOverMaximum,
      });

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
