import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: { AGENT },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });
  });

  describe(`when selecting no for ${FIELD_ID}`, () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      cy.completeAgentForm({ isUsingAgent: false });

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);
    });

    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsuranceExportContractSection({});

        // go through 2 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 2 });

        cy.assertNoRadioOptionIsChecked();
      });
    });
  });

  describe(`when selecting yes for ${FIELD_ID}`, () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      cy.completeAgentForm({ isUsingAgent: true });
      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsuranceExportContractSection({});

        // go through 2 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 2 });

        cy.assertYesRadioOptionIsChecked();
      });
    });
  });
});
