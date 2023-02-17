import { companyDetails } from '../../../../../pages/your-business';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../partials';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

let natureOfBusinessUrl;
let url;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - company website validation", () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      natureOfBusinessUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe(`${WEBSITE} error`, () => {
    describe('invalid website format', () => {
      it('should display validation errors', () => {
        cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
        companyDetails.tradingNameYesRadioInput().click();
        companyDetails.tradingAddressYesRadioInput().click();
        cy.keyboardInput(companyDetails.companyWebsite(), WEBSITE_EXAMPLES.INVALID);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 1);

        cy.checkText(partials.errorSummaryListItems().first(), COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
      });

      it('should focus to the company website section when clicking the error', () => {
        partials.errorSummaryListItemLinks().first().click();
        companyDetails.companyWebsite().should('have.focus');
      });

      it('should display the validation error for company website', () => {
        cy.checkText(companyDetails.companyWebsiteError(), `Error: ${COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT}`);
      });
    });

    describe('website above 191 characters', () => {
      it('should display validation errors', () => {
        cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
        companyDetails.tradingNameYesRadioInput().click();
        companyDetails.tradingAddressYesRadioInput().click();
        cy.keyboardInput(companyDetails.companyWebsite(), WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 1);

        cy.checkText(partials.errorSummaryListItems().first(), COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
      });

      it('should display the validation error for company website', () => {
        cy.checkText(companyDetails.companyWebsiteError(), `Error: ${COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT}`);
      });
    });
  });

  describe(`when ${WEBSITE} is left empty`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);
      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      companyDetails.companyWebsite().clear();
      submitButton().click();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });
  });

  describe(`when ${WEBSITE} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);
      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      cy.keyboardInput(companyDetails.companyWebsite(), WEBSITE_EXAMPLES.VALID);
      submitButton().click();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });
  });
});
