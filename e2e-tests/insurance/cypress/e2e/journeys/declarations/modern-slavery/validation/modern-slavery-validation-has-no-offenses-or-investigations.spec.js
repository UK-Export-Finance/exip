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
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: FIELD_ID,
    CONDITIONAL_REASONS: { OFFENSES_OR_INVESTIGATIONS },
  },
} = DECLARATIONS_FIELD_IDS;

const ERROR_STRINGS = ERROR_MESSAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const MAXIMUM = MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON;

const reasonOverMaximum = 'a'.repeat(MAXIMUM + 1);

const conditionalFieldId = OFFENSES_OR_INVESTIGATIONS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Declarations - Modern slavery page - validation - ${FIELD_ID}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

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

  describe(`when ${FIELD_ID} is 'no', but ${conditionalFieldId} is not provided`, () => {
    it(`should render a ${conditionalFieldId} validation error`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({
        hasNoOffensesOrInvestigations: false,
      });

      cy.assertFieldErrors({
        field: autoCompleteField(conditionalFieldId),
        errorIndex: 0,
        errorSummaryLength: 1,
        errorMessage: ERROR_STRINGS.CONDITIONAL_REASONS[conditionalFieldId].IS_EMPTY,
      });
    });
  });

  describe(`when ${FIELD_ID} is 'no', but ${conditionalFieldId} is over ${MAXIMUM} characters`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({ hasNoOffensesOrInvestigations: false });

      cy.completeAndSubmitModernSlaveryFormConditionalFields({
        offensesOrInvestigations: reasonOverMaximum,
        cannotAdhereToAllRequirements: null,
        awareOfExistingSlavery: null,
      });
    });

    it(`should render a ${conditionalFieldId} validation error`, () => {
      cy.assertFieldErrors({
        field: autoCompleteField(conditionalFieldId),
        errorIndex: 0,
        errorSummaryLength: 1,
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

  describe(`when ${FIELD_ID} is 'yes' and no other required radio fields are provided`, () => {
    it('should retain the submitted radio value', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({
        willAdhereToAllRequirements: null,
        hasNoOffensesOrInvestigations: true,
        isNotAwareOfExistingSlavery: null,
      });

      cy.assertYesRadioOptionIsChecked(1);
    });
  });

  describe(`when ${FIELD_ID} is 'no', and no other required radio fields are provided`, () => {
    it('should retain the submitted radio value', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({
        willAdhereToAllRequirements: null,
        hasNoOffensesOrInvestigations: false,
        isNotAwareOfExistingSlavery: null,
      });

      cy.assertNoRadioOptionIsChecked(1);
    });
  });
});
