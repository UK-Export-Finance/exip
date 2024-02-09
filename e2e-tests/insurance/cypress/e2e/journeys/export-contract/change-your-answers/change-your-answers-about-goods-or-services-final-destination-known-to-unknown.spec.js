import { summaryList } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { DEFAULT } from '../../../../../../content-strings';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
  },
} = INSURANCE_FIELD_IDS;

const fieldId = FINAL_DESTINATION;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - About goods or services - Change Final destination known from `yes` to `no`', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`form submission with ${FINAL_DESTINATION_KNOWN} as 'unknown'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown: false });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it('should render an empty destination/country', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, DEFAULT.EMPTY);
    });

    describe(`when going back to ${ALL_SECTIONS}`, () => {
      it('should retain a `completed` status tag', () => {
        cy.clickSaveAndBackButton();

        cy.checkTaskExportContractStatusIsComplete();
      });
    });
  });
});
