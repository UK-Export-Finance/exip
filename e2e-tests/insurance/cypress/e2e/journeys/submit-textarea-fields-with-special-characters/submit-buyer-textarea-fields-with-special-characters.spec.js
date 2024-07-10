import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { YOUR_BUYER as BUYER_FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';
import mockStringWithSpecialCharacters from '../../../../../fixtures/string-with-special-characters';

const {
  ROOT,
  YOUR_BUYER: { CONNECTION_WITH_BUYER, COMPANY_OR_ORGANISATION },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: { ADDRESS },
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = BUYER_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Buyer` textarea fields should render special characters without character codes after submission', () => {
  let referenceNumber;
  let companyOrganisationUrl;
  let connectionToTheBuyerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      companyOrganisationUrl = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;
      connectionToTheBuyerUrl = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(ADDRESS, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(companyOrganisationUrl);

        cy.completeAndSubmitCompanyOrOrganisationForm({
          buyerAddress: mockStringWithSpecialCharacters,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: ADDRESS,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });

  describe(CONNECTION_WITH_BUYER_DESCRIPTION, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(connectionToTheBuyerUrl);

        cy.completeAndSubmitConnectionWithTheBuyerForm({
          hasConnectionToBuyer: true,
          description: mockStringWithSpecialCharacters,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: CONNECTION_WITH_BUYER_DESCRIPTION,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });

  // TODO: EMS-2473
  // describe("'buyer - credit insurance cover' page", () => {
  // });
});
