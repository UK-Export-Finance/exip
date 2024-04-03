import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../constants/field-ids/insurance/export-contract';
import mockStringWithSpecialCharacters from '../../../../../fixtures/string-with-special-characters';

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

context('Insurance - Textarea fields - `Export contract` textarea fields should render special characters without character codes after submission', () => {
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
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(aboutGoodsOrServicesUrl);

        cy.completeAndSubmitAboutGoodsOrServicesForm({
          description: mockStringWithSpecialCharacters,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: DESCRIPTION,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });

  describe(DECLINED_DESCRIPTION, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(declinedByPrivateMarketUrl);

        cy.completeDeclinedByPrivateMarketForm({
          declinedDescription: mockStringWithSpecialCharacters,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: DECLINED_DESCRIPTION,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });
});
