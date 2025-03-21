import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES, AGENT_CHARGES_CURRENCY },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent charges page - Fixed sum amount with a comma', () => {
  let referenceNumber;
  let url;
  let agentChargesCurrencyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({ stopSubmittingAfter: 'agentService', isUsingAgent: true, agentIsCharging: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;
      agentChargesCurrencyUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(`when submitting with ${METHOD} as ${FIXED_SUM} with a comma`, () => {
      const fixedSumAmount = '1,000';
      const amount = '1000';

      it(`should redirect to ${AGENT_CHARGES_CURRENCY}`, () => {
        cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true, fixedSumAmount });

        cy.assertUrl(agentChargesCurrencyUrl);
      });

      it('should retain the status of task `export contract` as `in progress`', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.checkTaskExportContractStatusIsInProgress();
      });

      describe('when going back to the page', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should have the submitted value without the comma', () => {
          cy.assertAgentChargesFieldValues({ fixedSumMethod: true, expectedFixedSumAmount: amount });
        });
      });
    });
  });
});
