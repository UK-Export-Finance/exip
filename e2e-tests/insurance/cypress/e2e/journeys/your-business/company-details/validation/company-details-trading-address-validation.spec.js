import { companyDetails } from '../../../../../../../pages/your-business';
import { submitButton, inlineErrorMessage } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
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
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
    companyDetails.tradingNameYesRadioInput().click();

    submitButton().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors if trading address question is not answered', () => {
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
