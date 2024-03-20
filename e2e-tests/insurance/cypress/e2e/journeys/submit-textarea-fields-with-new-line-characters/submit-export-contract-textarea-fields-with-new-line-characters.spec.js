import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../constants/field-ids/insurance/export-contract';
import { backLink } from '../../../../../pages/shared';
import {
  FULL_ADDRESS_MULTI_LINE_STRING,
  FULL_ADDRESS_EXPECTED_MULTI_LINE_STRING,
} from '../../../../../constants';

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

context('Insurance - Textarea fields - `Export contract` textarea fields should render new lines without character codes after submission', () => {
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
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(aboutGoodsOrServicesUrl);

        cy.completeAndSubmitAboutGoodsOrServicesForm({
          description: FULL_ADDRESS_MULTI_LINE_STRING,
        });

        backLink().click();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: DESCRIPTION,
          expectedValue: FULL_ADDRESS_EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});
