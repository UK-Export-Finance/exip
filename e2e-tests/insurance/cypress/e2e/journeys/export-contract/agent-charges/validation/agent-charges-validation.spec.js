import { autoCompleteField } from '../../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../../pages/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES: AGENT_CHARGES_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const expectedErrorsCount = 2;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent charges page - form validation', () => {
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
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(METHOD, () => {
    const ERROR_MESSAGES_OBJECT = AGENT_CHARGES_ERROR_MESSAGES[METHOD];

    it(`should render validation errors when ${METHOD} is not selected`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertRadioErrors({
        field: agentChargesPage[METHOD][FIXED_SUM],
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });
  });

  describe(PAYABLE_COUNTRY_CODE, () => {
    it(`should render validation errors when ${PAYABLE_COUNTRY_CODE} is left empty`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field: autoCompleteField(PAYABLE_COUNTRY_CODE),
        errorIndex: 1,
        expectedErrorsCount,
        expectedErrorMessage: AGENT_CHARGES_ERROR_MESSAGES[PAYABLE_COUNTRY_CODE].IS_EMPTY,
      });
    });
  });
});
