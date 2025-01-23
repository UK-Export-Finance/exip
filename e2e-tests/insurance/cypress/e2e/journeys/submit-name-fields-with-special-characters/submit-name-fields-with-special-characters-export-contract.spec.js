import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as FIELD_IDS } from '../../../../../constants/field-ids/insurance/export-contract';
import { field } from '../../../../../pages/shared';

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { AGENT_DETAILS },
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME },
} = FIELD_IDS;

const nameValue = "O'Neill";

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Name fields - Export contract - Name field should render an apostrophe without character codes after submission', () => {
  let referenceNumber;
  let agentDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({
        isUsingAgent: true,
        stopSubmittingAfter: 'agent',
      });

      agentDetailsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}`;

      cy.assertUrl(agentDetailsUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    describe('when submitting the name field with an apostrophe and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(agentDetailsUrl);

        cy.completeAndSubmitAgentDetailsForm({ name: nameValue });

        cy.clickBackLink();

        cy.assertUrl(agentDetailsUrl);
      });

      it('should render name exactly as they were submitted', () => {
        cy.checkValue(field(NAME), nameValue);
      });
    });
  });
});
