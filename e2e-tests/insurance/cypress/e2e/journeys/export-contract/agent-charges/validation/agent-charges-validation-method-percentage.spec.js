import { agentChargesPage } from '../../../../../../../pages/insurance/export-contract';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { percentageFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    METHOD, PERCENTAGE, PERCENTAGE_CHARGE: FIELD_ID,
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

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Agent charges page - form validation - ${METHOD} as ${PERCENTAGE}`, () => {
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

    agentChargesPage[METHOD][PERCENTAGE].input().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  percentageFieldValidation({
    fieldId: FIELD_ID,
    errorMessages: ERROR_MESSAGES_OBJECT,
    totalExpectedErrors: 2,
    totalExpectedOtherErrorsWithValidPercentage: 1,
    minimum: MINIMUM_CHARACTERS.ONE,
  });
});
