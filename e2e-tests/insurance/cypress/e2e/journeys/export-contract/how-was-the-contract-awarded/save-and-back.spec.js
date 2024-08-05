import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { HOW_WAS_THE_CONTRACT_AWARDED },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How was the contract awarded page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WAS_THE_CONTRACT_AWARDED}`;

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

    it('should retain the `export contract` task status as `not started yet`', () => {
      cy.checkTaskExportContractStatusIsNotStartedYet();
    });
  });

  describe('when fields are partially completed', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should update the status of task `export contract` to `in progress`', () => {
      cy.completeHowWasTheContractAwardedForm({
        otherMethod: true,
        otherMethodText: null,
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.assertHowWasTheContractAwardedFieldValues({
          otherMethodText: '',
        });
      });
    });
  });

  describe('when all fields are provided', () => {
    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeHowWasTheContractAwardedForm({ otherMethod: true });

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        cy.assertHowWasTheContractAwardedFieldValues({ otherMethod: true });
      });
    });
  });
});
