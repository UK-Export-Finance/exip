import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_DETAILS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent details - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
      cy.completeAndSubmitAgentForm({ usingAgent: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_DETAILS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when no fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });
  });

  describe('when fields are partially completed', () => {
    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentDetailsForm({
        fullAddress: '',
        countryCode: '',
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertAgentDetailsFieldValues({
          expectedFullAddress: '',
          countryCode: '',
        });
      });
    });
  });

  describe('when all fields are provided', () => {
    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentDetailsForm({});

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        // go through 3 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 3 });

        cy.assertAgentDetailsFieldValues({});
      });
    });
  });
});
