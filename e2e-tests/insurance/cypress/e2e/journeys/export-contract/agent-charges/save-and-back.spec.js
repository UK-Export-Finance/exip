import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE, PERCENTAGE_CHARGE, METHOD, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Agent charges - Save and go back - empty ${METHOD}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({ formToStopAt: 'agentService', isUsingAgent: true, agentIsCharging: true });

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

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentChargesForm({
        fixedSumMethod: false,
        percentageMethod: false,
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have no submitted values', () => {
        cy.navigateToUrl(url);

        cy.assertAgentChargesFieldValues({});
      });
    });
  });

  describe(`when submitting only a ${METHOD} as ${FIXED_SUM}, without a ${FIXED_SUM_AMOUNT} via 'save and go back' button`, () => {
    it('should retain the status of task `export contract` as ` in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentChargesForm({
        fixedSumMethod: true,
        percentageMethod: false,
        fixedSumAmount: '',
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertAgentChargesFieldValues({
          fixedSumMethod: true,
          expectedFixedSumAmount: '',
        });
      });
    });
  });

  describe(`when submitting only a ${METHOD} as ${PERCENTAGE}, without a ${PERCENTAGE_CHARGE} via 'save and go back' button`, () => {
    it('should retain the status of task `export contract` as ` in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentChargesForm({
        fixedSumMethod: false,
        percentageMethod: true,
        percentageCharge: '',
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertAgentChargesFieldValues({
          percentageMethod: true,
          expectedPercentageCharge: '',
        });
      });
    });
  });

  describe(`when submitting only a ${PAYABLE_COUNTRY_CODE} via 'save and go back' button`, () => {
    it('should retain the status of task `export contract` as ` in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentChargesForm({
        fixedSumMethod: false,
        percentageMethod: false,
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertAgentChargesFieldValues({});
      });
    });
  });
});
