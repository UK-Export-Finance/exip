import { autoCompleteField } from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
import { checkAutocompleteInput } from '../../../../../../shared-test-assertions';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    HOW_WILL_YOU_GET_PAID,
  },
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
} = FIELD_IDS;

const finalDestinationField = autoCompleteField(FINAL_DESTINATION);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - Final destination not known - As an exporter, I want to enter the details of the export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
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

    it(`should redirect to ${HOW_WILL_YOU_GET_PAID}`, () => {
      cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown: false });

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;
      cy.assertUrl(expectedUrl);
    });

    describe('after submitting the form', () => {
      it('should update the `export contract` task status to `completed`', () => {
        cy.navigateToUrl(`${ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        cy.checkTaskExportContractStatusIsComplete();
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        aboutGoodsOrServicesPage[DESCRIPTION].textarea().should('have.value', application.EXPORT_CONTRACT[DESCRIPTION]);

        cy.assertNoRadioOptionIsChecked();
      });

      it(`should NOT have a visible ${FINAL_DESTINATION}`, () => {
        cy.navigateToUrl(url);

        checkAutocompleteInput.isNotVisible(finalDestinationField);
      });
    });
  });
});
