import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { PRIVATE_MARKET },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Private market - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitHowWasTheContractAwardedForm();
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRIVATE_MARKET}`;

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
  });

  describe(`when selecting no for ${FIELD_ID}`, () => {
    it('should redirect to `all sections`', () => {
      cy.navigateToUrl(url);

      cy.completePrivateMarketForm({ attemptedPrivateMarketCover: false });
      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `export contract` task status as `in progress`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        // go through 2 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 2 });

        cy.assertNoRadioOptionIsChecked();
      });
    });
  });

  describe(`when selecting yes for ${FIELD_ID}`, () => {
    it('should redirect to `all sections`', () => {
      cy.navigateToUrl(url);

      cy.completePrivateMarketForm({ attemptedPrivateMarketCover: true });
      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `export contract` task status as `in progress`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        // go through 2 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 2 });

        cy.assertYesRadioOptionIsChecked();
      });
    });
  });
});
