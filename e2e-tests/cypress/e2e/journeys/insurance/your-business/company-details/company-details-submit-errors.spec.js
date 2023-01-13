import { companyDetails } from '../../../../pages/your-business';
import { submitButton, inlineErrorMessage } from '../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import partials from '../../../../partials';
import {
  ROUTES, FIELD_IDS, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES,
} from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      INPUT,
    },
    YOUR_COMPANY: {
      TRADING_NAME,
      TRADING_ADDRESS,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('all page errors', () => {
    it('should display validation errors if required inputs are not correctly answered', () => {
      companyDetails.companyWebsite().type(WEBSITE_EXAMPLES.INVALID);
      companyDetails.phoneNumber().type(INVALID_PHONE_NUMBERS.LANDLINE.LONG);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 5);

      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[INPUT].INCORRECT_FORMAT);
        });

      partials.errorSummaryListItems().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });

      partials.errorSummaryListItems().eq(2).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
        });

      partials.errorSummaryListItems().eq(3).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
        });

      partials.errorSummaryListItems().eq(4).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT);
        });
    });

    it('should display the validation error for companies house input in companies house section', () => {
      companyDetails.companiesHouseSearchError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[INPUT].INCORRECT_FORMAT}`);
        });
    });

    it('should display the validation error for trading name in radio error summary', () => {
      inlineErrorMessage().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY}`);
        });
    });

    it('should display the validation error for trading address in radio error summary', () => {
      inlineErrorMessage().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY}`);
        });
    });

    it('should display the validation error for company website in company website section', () => {
      companyDetails.companyWebsiteError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT}`);
        });
    });

    it('should display the validation error for phone number in phone number section', () => {
      companyDetails.phoneNumberError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT}`);
        });
    });

    it('should display companies house error and trading name, address errors when companies house incorrectly entered', () => {
      companyDetails.companiesHouseSearch().clear().type('123456!');
      companyDetails.companiesHouseSearchButton().click();

      submitButton().click();
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[INPUT].INCORRECT_FORMAT);
        });

      partials.errorSummaryListItems().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });

      partials.errorSummaryListItems().eq(2).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
        });
    });

    it('should display companies house error and trading name, address errors when companies house not found', () => {
      companyDetails.companiesHouseSearch().clear().type('123456');
      companyDetails.companiesHouseSearchButton().click();

      submitButton().click();
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[INPUT].NOT_FOUND);
        });

      partials.errorSummaryListItems().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });

      partials.errorSummaryListItems().eq(2).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
        });
    });
  });
});
