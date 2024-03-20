import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { YOUR_BUYER as BUYER_FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';
import { field, backLink } from '../../../../../pages/shared';
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

      // go to the page we want to test.
      cy.startInsuranceYourBuyerSection({});

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

        backLink().click();
      });

      it('should render special characters exactly as they were submitted', () => {
        const descriptionField = field(ADDRESS);

        cy.checkValue(descriptionField, mockStringWithSpecialCharacters);
      });
    });
  });

  describe(CONNECTION_WITH_BUYER_DESCRIPTION, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(connectionToTheBuyerUrl);

        cy.completeAndSubmitConnectionToTheBuyerForm({
          hasConnectionToBuyer: true,
          description: mockStringWithSpecialCharacters,
        });

        backLink().click();
      });

      it('should render special characters exactly as they were submitted', () => {
        const descriptionField = field(CONNECTION_WITH_BUYER_DESCRIPTION);

        const textareaField = {
          ...descriptionField,
          input: descriptionField.textarea,
        };

        cy.checkValue(textareaField, mockStringWithSpecialCharacters);
      });
    });
  });

  // TODO: EMS-2473
  // describe("'buyer - credit insurance cover' page", () => {
  // });
});
