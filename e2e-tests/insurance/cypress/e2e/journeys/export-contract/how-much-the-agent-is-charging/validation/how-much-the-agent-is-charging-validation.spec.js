import { field as fieldSelector } from '../../../../../../../pages/shared';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { HOW_MUCH_THE_AGENT_IS_CHARGING },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

const assertions = {
  field: fieldSelector(FIELD_ID),
  errorIndex: 0,
  expectedErrorsCount: 1,
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How much the agent is charging page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY });
  });

  it(`should render validation errors when ${FIELD_ID} has special characters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '10!',
      expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT,
    });
  });

  it(`should render validation errors when ${FIELD_ID} has letters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: 'one',
      expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT,
    });
  });

  it(`should render validation errors when ${FIELD_ID} is below ${MINIMUM_CHARACTERS.ONE}`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: String(MINIMUM_CHARACTERS.ONE - 1),
      expectedErrorMessage: ERROR_MESSAGES_OBJECT.BELOW_MINIMUM,
    });
  });

  it(`should NOT display validation errors when ${FIELD_ID} is a decimal place number`, () => {
    cy.keyboardInput(fieldSelector(FIELD_ID).input(), '1.50');

    cy.clickSubmitButton();
    cy.assertErrorSummaryListDoesNotExist();
  });
});
