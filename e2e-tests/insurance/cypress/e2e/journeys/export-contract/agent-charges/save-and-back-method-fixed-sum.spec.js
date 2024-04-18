import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM,
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Agent charges - Save and go back - ${METHOD} as ${FIXED_SUM}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
      cy.completeAndSubmitAgentForm({ isUsingAgent: true });
      cy.completeAndSubmitAgentDetailsForm({});
      cy.completeAndSubmitAgentServiceForm({ agentIsCharging: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when fields are partially completed', () => {
    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitAgentChargesForm({
        fixedSumMethod: true,
        fixedSumAmount: '',
        payableCountry: '',
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertAgentChargesFieldValues({
          fixedSumMethod: true,
          fixedSumAmount: '',
          payableCountry: '',
        });
      });
    });
  });

  describe('when all fields are provided', () => {
    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true });

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        // go through 5 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        cy.assertAgentChargesFieldValues({ fixedSumMethod: true });
      });
    });
  });
});
