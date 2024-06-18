import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../constants/field-ids/insurance/export-contract';
import {
  MULTI_LINE_STRING,
  EXPECTED_MULTI_LINE_STRING,
} from '../../../../../constants';

const {
  ROOT,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    DECLINED_BY_PRIVATE_MARKET,
  },
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  PRIVATE_MARKET: { DECLINED_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Export contract` textarea fields should render new lines without character codes after submission', () => {
  let referenceNumber;
  let aboutGoodsOrServicesUrl;
  let declinedByPrivateMarketUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      aboutGoodsOrServicesUrl = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      declinedByPrivateMarketUrl = `${baseUrl}${ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`;
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
          description: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: DESCRIPTION,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(DECLINED_DESCRIPTION, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(declinedByPrivateMarketUrl);

        cy.completeDeclinedByPrivateMarketForm({
          declinedDescription: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: DECLINED_DESCRIPTION,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});
