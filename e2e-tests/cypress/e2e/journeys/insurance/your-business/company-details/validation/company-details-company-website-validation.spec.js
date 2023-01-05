import { companyDetails } from '../../../../../pages/your-business';
import { submitButton, yesRadioInput } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../partials';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - company website validation", () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.visit(url, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`${WEBSITE} error`, () => {
    it('should display validation errors if company website incorrectly entered', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().type(WEBSITE_EXAMPLES.INVALID);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
        });
    });

    it('should focus to the company website section when clicking the error', () => {
      partials.errorSummaryListItemLinks().first().click();
      companyDetails.companyWebsite().should('have.focus');
    });

    it('should display the validation error for company website', () => {
      companyDetails.companyWebsiteError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT}`);
        });
    });
  });

  describe(`when ${WEBSITE} is left empty`, () => {
    it('should not display validation errors', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear();
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 0);
    });
  });

  describe(`when ${WEBSITE} is correctly entered`, () => {
    it('should not display validation errors', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 0);
    });
  });
});
