import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';

const {
  ROOT,
  EXPORT_CONTRACT: { HOW_MUCH_THE_AGENT_IS_CHARGING },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How much the agent is charging - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({
        formToStopAt: 'currencyOfAgentCharges',
        isUsingAgent: true,
        agentIsCharging: true,
        fixedSumMethod: true,
      });

      url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`;

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

      cy.completeHowMuchIsTheAgentChargingForm({});

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `export contract` as ` in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeHowMuchIsTheAgentChargingForm({});

      cy.clickSaveAndBackButton();

      // TODO: EMS-3828 - renable
      // cy.checkTaskExportContractStatusIsInProgress();
    });
  });

  describe(`when submitting ${FIELD_ID} as a pure number`, () => {
    const fixedSumAmount = '1000';

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeHowMuchIsTheAgentChargingForm({ fixedSumAmount });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should have the submitted value', () => {
        cy.checkValue(field(FIELD_ID), fixedSumAmount);
      });
    });
  });

  describe(`when submitting ${FIELD_ID} with a comma`, () => {
    const fixedSumAmount = '1,000';
    const amount = '1000';

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeHowMuchIsTheAgentChargingForm({ fixedSumAmount });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
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
        cy.checkValue(field(FIELD_ID), amount);
      });
    });
  });

  describe(`when submitting ${FIELD_ID} as a decimal number`, () => {
    const fixedSumAmount = '100.54';

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeHowMuchIsTheAgentChargingForm({ fixedSumAmount });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should have the submitted value', () => {
        cy.checkValue(field(FIELD_ID), fixedSumAmount);
      });
    });
  });
});
