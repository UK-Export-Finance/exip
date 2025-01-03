import { yesRadio } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/declarations';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = DECLARATIONS_FIELD_IDS;

const ERROR_STRINGS = ERROR_MESSAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const expectedErrorsCount = 3;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - validation - submitting an empty form', () => {
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

    cy.navigateToUrl(url);

    cy.clickSubmitButton();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render ${WILL_ADHERE_TO_ALL_REQUIREMENTS} validation error`, () => {
    cy.submitAndAssertRadioErrors({
      errorIndex: 0,
      field: yesRadio(WILL_ADHERE_TO_ALL_REQUIREMENTS),
      expectedErrorsCount,
      expectedErrorMessage: ERROR_STRINGS[WILL_ADHERE_TO_ALL_REQUIREMENTS].IS_EMPTY,
      fieldShouldGainFocus: true,
    });
  });

  it(`should render ${HAS_NO_OFFENSES_OR_INVESTIGATIONS} validation error`, () => {
    cy.submitAndAssertRadioErrors({
      errorIndex: 1,
      field: yesRadio(HAS_NO_OFFENSES_OR_INVESTIGATIONS),
      expectedErrorsCount,
      expectedErrorMessage: ERROR_STRINGS[HAS_NO_OFFENSES_OR_INVESTIGATIONS].IS_EMPTY,
      fieldShouldGainFocus: true,
    });
  });

  it(`should render ${IS_NOT_AWARE_OF_EXISTING_SLAVERY} validation error`, () => {
    cy.submitAndAssertRadioErrors({
      errorIndex: 2,
      field: yesRadio(IS_NOT_AWARE_OF_EXISTING_SLAVERY),
      expectedErrorsCount,
      expectedErrorMessage: ERROR_STRINGS[IS_NOT_AWARE_OF_EXISTING_SLAVERY].IS_EMPTY,
      fieldShouldGainFocus: true,
    });
  });
});
