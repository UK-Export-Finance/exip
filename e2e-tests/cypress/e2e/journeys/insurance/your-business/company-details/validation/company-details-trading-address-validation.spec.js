import { companyDetails } from '../../../../../pages/your-business';
import { submitButton, inlineErrorMessage } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../partials';
import { ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER } from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - trading address validation", () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('trading address error', () => {
    it('should display validation errors if trading address question is not answered', () => {
      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);

      cy.checkText(partials.errorSummaryListItems().first(), COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
    });

    it('should focus to the trading address section when clicking the error', () => {
      partials.errorSummaryListItemLinks().first().click();
      companyDetails.tradingAddressYesRadioInput().should('have.focus');
    });

    it('should display the validation error for trading address in radio error summary', () => {
      cy.checkText(inlineErrorMessage(), `Error: ${COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY}`);
    });
  });
});
