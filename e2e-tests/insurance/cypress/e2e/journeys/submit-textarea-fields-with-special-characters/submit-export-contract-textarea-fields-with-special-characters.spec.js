import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../constants/field-ids/insurance/export-contract';
import { field, backLink } from '../../../../../pages/shared';
import mockStringWithSpecialCharacters from '../../../../../fixtures/string-with-special-characters';

const {
  ROOT,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
  },
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Export contract` textarea fields should render special characters without character codes after submission', () => {
  let referenceNumber;
  let aboutGoodsOrServicesUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});

      aboutGoodsOrServicesUrl = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(DESCRIPTION, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(aboutGoodsOrServicesUrl);

        cy.completeAndSubmitAboutGoodsOrServicesForm({
          description: mockStringWithSpecialCharacters,
        });

        backLink().click();

        cy.assertUrl(aboutGoodsOrServicesUrl);
      });

      it('should render special characters exactly as they were submitted', () => {
        const descriptionField = field(DESCRIPTION);

        const textareaField = {
          ...descriptionField,
          input: descriptionField.textarea,
        };

        cy.checkValue(textareaField, mockStringWithSpecialCharacters);
      });
    });
  });
});
