import { autoCompleteField } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/declarations';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const ERROR_STRINGS = ERROR_MESSAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const errorSummaryLength = 3;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - validation - submitting all radios as no', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

      cy.navigateToUrl(url);
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.completeAndSubmitModernSlavery({
      willAdhereToAllRequirements: false,
      hasNoOffensesOrInvestigations: false,
      isNotAwareOfExistingSlavery: false,
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a ${CANNOT_ADHERE_TO_ALL_REQUIREMENTS} validation error`, () => {
    const fieldId = CANNOT_ADHERE_TO_ALL_REQUIREMENTS;

    cy.assertFieldErrors({
      field: autoCompleteField(fieldId),
      errorIndex: 0,
      errorSummaryLength,
      errorMessage: ERROR_STRINGS.CONDITIONAL_REASONS[fieldId].IS_EMPTY,
    });
  });

  it(`should render a ${OFFENSES_OR_INVESTIGATIONS} validation error`, () => {
    const fieldId = OFFENSES_OR_INVESTIGATIONS;

    cy.assertFieldErrors({
      field: autoCompleteField(fieldId),
      errorIndex: 1,
      errorSummaryLength,
      errorMessage: ERROR_STRINGS.CONDITIONAL_REASONS[fieldId].IS_EMPTY,
    });
  });

  it(`should render a ${AWARE_OF_EXISTING_SLAVERY} validation error`, () => {
    const fieldId = AWARE_OF_EXISTING_SLAVERY;

    cy.assertFieldErrors({
      field: autoCompleteField(fieldId),
      errorIndex: 2,
      errorSummaryLength,
      errorMessage: ERROR_STRINGS.CONDITIONAL_REASONS[fieldId].IS_EMPTY,
    });
  });
});
