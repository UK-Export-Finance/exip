import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: { DECLINED_BY_PRIVATE_MARKET },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { DECLINED_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Declined by private market - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
      cy.completeAndSubmitPrivateMarketForm({ attemptedPrivateMarketCover: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`;
      allSectionsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });
  });

  describe('when submitting a valid answer', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      cy.completeDeclinedByPrivateMarketForm({});
      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsuranceExportContractSection({});

        // go through 3 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 3 });

        cy.checkTextareaValue({
          fieldId: FIELD_ID,
          expectedValue: application.EXPORT_CONTRACT.PRIVATE_MARKET[FIELD_ID],
        });
      });
    });
  });
});