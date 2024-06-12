import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { YOUR_BUYER as BUYER_FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';
import {
  MULTI_LINE_STRING,
  EXPECTED_MULTI_LINE_STRING,
} from '../../../../../constants';

const {
  ROOT,
  YOUR_BUYER: { CONNECTION_WITH_BUYER, COMPANY_OR_ORGANISATION, CREDIT_INSURANCE_COVER },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: { ADDRESS },
  CONNECTION_WITH_BUYER_DESCRIPTION,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = BUYER_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Buyer` textarea fields should render new lines without character codes after submission', () => {
  let referenceNumber;
  let companyOrganisationUrl;
  let connectionToTheBuyerUrl;
  let creditInsuranceCoverUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      companyOrganisationUrl = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;
      connectionToTheBuyerUrl = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`;
      creditInsuranceCoverUrl = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(ADDRESS, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(companyOrganisationUrl);

        cy.completeAndSubmitCompanyOrOrganisationForm({
          buyerAddress: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: ADDRESS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(CONNECTION_WITH_BUYER_DESCRIPTION, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(connectionToTheBuyerUrl);

        cy.completeAndSubmitConnectionWithTheBuyerForm({
          hasConnectionToBuyer: true,
          description: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: CONNECTION_WITH_BUYER_DESCRIPTION,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(creditInsuranceCoverUrl);

        cy.completeCreditInsuranceCoverForm({
          hasHadCreditInsuranceCover: true, // TODO: rename to include 'with buyer'
          creditInsuranceCoverDescription: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});
