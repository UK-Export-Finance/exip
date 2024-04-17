import { field as fieldSelector } from '../../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../../pages/insurance/export-contract';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, FIXED_SUM_AMOUNT: FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES: {
        [FIELD_ID]: ERROR_MESSAGES_OBJECT,
      },
    },
  },
} = ERROR_MESSAGES;

const assertions = {
  field: fieldSelector(FIELD_ID),
  errorIndex: 0,
  expectedErrorsCount: 2,
};

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Agent charges page - form validation - ${METHOD} as ${FIXED_SUM}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;

      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    agentChargesPage[METHOD][FIXED_SUM].input().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should display validation errors when ${FIELD_ID} is left empty`, () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY });
  });

  it(`should display validation errors when ${FIELD_ID} is a decimal place number`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '1.2',
      expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT,
    });
  });

  it(`should display validation errors when ${FIELD_ID} has special characters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '10!',
      expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT,
    });
  });

  it(`should display validation errors when ${FIELD_ID} is below ${MINIMUM_CHARACTERS.ONE}`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: String(MINIMUM_CHARACTERS.ONE - 1),
      expectedErrorMessage: ERROR_MESSAGES_OBJECT.BELOW_MINIMUM,
    });
  });
});
