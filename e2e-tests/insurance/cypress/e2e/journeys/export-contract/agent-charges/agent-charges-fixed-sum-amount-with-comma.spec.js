import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent charges page - Fixed sum amount with a comma', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({ formToStopAt: 'agentService', isUsingAgent: true, agentIsCharging: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true, fixedSumAmount });

        cy.assertUrl(checkYourAnswersUrl);
      });

      it('should update the `export contract` task status to `completed`', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.checkTaskExportContractStatusIsComplete();
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
