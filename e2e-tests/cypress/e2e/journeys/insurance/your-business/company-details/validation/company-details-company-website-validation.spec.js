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

let yourContactUrl;
let url;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - company website validation", () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      yourContactUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.CONTACT}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${WEBSITE} error`, () => {
    describe('invalid website format', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm(COMPANIES_HOUSE_NUMBER, null, WEBSITE_EXAMPLES.INVALID);

        submitButton().click();
      });

      it('should display validation errors', () => {
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
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm(COMPANIES_HOUSE_NUMBER, null, WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH);

        submitButton().click();
      });

      it('should display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 1);

        cy.checkText(partials.errorSummaryListItems().first(), COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
      });

      it('should display the validation error for company website', () => {
        cy.checkText(companyDetails.companyWebsiteError(), `Error: ${COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT}`);
      });
    });
  });

  describe(`when ${WEBSITE} is left empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm(COMPANIES_HOUSE_NUMBER);

      companyDetails.companyWebsite().clear();

      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it(`should redirect to ${yourContactUrl}`, () => {
      cy.url().should('eq', yourContactUrl);
    });
  });

  describe(`when ${WEBSITE} is correctly entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm(COMPANIES_HOUSE_NUMBER, null, WEBSITE_EXAMPLES.VALID);

      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it(`should redirect to ${yourContactUrl}`, () => {
      cy.url().should('eq', yourContactUrl);
    });
  });
});
